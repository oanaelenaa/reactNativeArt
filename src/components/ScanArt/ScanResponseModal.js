import React, { Component } from 'react';
import { TouchableOpacity, ActivityIndicator, TouchableHighlight, View, Text, StyleSheet, Button, FlatList, TextInput, Alert, Image } from 'react-native';
import Modal from "react-native-modal";
import RNFetchBlob from 'react-native-fetch-blob';
import Firebase from '../../utils/authentication/Firebase';
import authors from './../../utils/authors';
import paintings from './../../utils/paintings';
const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

export default class ScanResponseModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: true,
            uri: props.uri,
            processedLabels: [],
            notFoundMessage: "",
            hasResults: true,
            response: null,
            done: false,
            uploadedURL: null,
            title: "",
            author: ""
        }
        this.classifyImageFile = this.classifyImageFile.bind(this);
        this.validateResponse = this.validateResponse.bind(this);
        this.initializeLabels = this.initializeLabels.bind(this);
        this.checkForBadPredictions = this.checkForBadPredictions.bind(this);
        this.savePictureToCollection = this.savePictureToCollection.bind(this);
        this.uploadToFirebase = this.uploadToFirebase.bind(this);
    }

    uploadToFirebase(uri, mime = 'application/octet-stream') {
        ///  debugger
        return new Promise((resolve, reject) => {
            let uploadBlob = null
            const imageRef = Firebase.storageRef.ref('images').child('image_003')
            fs.readFile(uri, 'base64')
                .then((data) => {
                    return Blob.build(data, { type: `${mime};BASE64` })
                })
                .then((blob) => {
                    uploadBlob = blob
                    return imageRef.put(blob, { contentType: mime })
                })
                .then(() => {
                    uploadBlob.close()
                    return imageRef.getDownloadURL()
                })
                .then((url) => {
                    resolve(url)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }

    componentDidMount() {
       /* this.uploadToFirebase(this.state.uri)
            .then(url => {
                this.setState({ uploadedURL: url })
                this.classifyImageFile();
            })
            .catch(error => console.log(error))*/
            console.log(paintings);
            console.log(paintings.indexOf('starrynight'));
    }




    _toggleModal = () =>
        this.setState({ modalVisible: !this.state.modalVisible });

    checkForBadPredictions() {

    }

    componentWillUnmount() {
        ///   this.savePictureToCollection();

    }

    async savePictureToCollection() {
        const uid = Firebase.registrationInfo.UID;
        //process image file to be saved
        //onst title = this.state.processedLabels[0].tagName;
        //const author = this.state.processedLabels[1].tagName;
        const pictureURL = this.state.uploadedURL;
        var objToSave = ({
            "title": this.state.title,
            "author": this.state.author,
            "imageURL": pictureURL
        });
        console.log("obj", objToSave);
        isSuccessful = true;
        var ref = Firebase.database.ref(`/SavedArtItems/${uid}`);
        ref.push(JSON.parse(JSON.stringify(objToSave)))
            .then((result) => {
                console.log('result', result);

            }).catch(function (error) {
                console.log(error.code)
                console.log(error.message)
            });
    }

    initializeLabels(datas) {
        data = datas.slice(0, 2);
        this.setState({
            processedLabels: data,
            done: true
        })
        var title = "";
        var author = "";
        if (paintings.find(this.state.processedLabels[0].tagName) != null) {
            title = this.state.processedLabels[0].tagName;
            author = this.state.processedLabels[1].tagName;
        } else {
            title = this.state.processedLabels[1].tagName;
            author = this.state.processedLabels[0].tagName
        }
        this.setState({
            title: title,
            author: author
        })
        this.savePictureToCollection();
    }



    validateResponse(data) {
        console.log(data, "vali");
        if (data.predictions != null && data.predictions.length > 0)
            this.initializeLabels(data.predictions);
        else
            this.setState({ notFoundMessage: "no results were found for this art" });
        ///  this.setModalVisible(true);
    }

    async classifyImageFile() {
        //  debugger;
        const url = this.state.uri;
        var baseUrl = "https://southcentralus.api.cognitive.microsoft.com/customvision/v2.0/Prediction/bcd68e65-9e51-4d34-b120-0bae92a8bcab/image?iterationId=ddfee652-0132-4fc1-b7d2-580df387f3ad"
        RNFetchBlob.fetch('POST', baseUrl, {
            'Content-Type': 'application/octet-stream',
            'Prediction-Key': 'e55e3d08cfae46768f86aba72e051021'

        }, RNFetchBlob.wrap(url)).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                this.setState({
                    response: responseJson
                })
                if (this.state.response != null) {
                    this.validateResponse(this.state.response);
                }
            }).catch(function (error) {
                console.log(error.code)
                console.log(error.message)
            });
    }


    render() {

        return (
            <Modal isVisible={this.state.modalVisible}
                animationType="slide"
                transparent={true}>

                <View style={styles.modalView}>
                    <TouchableHighlight style={styles.closeButton}
                        onPress={this._toggleModal}>
                        <Image
                            resizeMode="contain"
                            source={require('./../../assets/closeIcon.png')} />

                    </TouchableHighlight>
                    <View>
                        <Image style={styles.pictureStyle}
                            resizeMode="contain"
                            source={{ uri: this.state.uri, isStatic: true }}>
                        </Image>
                        <Text>{this.props.errorMessage}</Text>
                        {
                            this.state.done ?

                                <View>
                                    <Text style={styles.userMessage}>done</Text>
                                    <Image
                                        resizeMode="contain"
                                        source={require('./../../assets/foundScan.png')} />
                                </View>

                                :

                                <View>
                                    <Text>Please wait</Text>
                                    <ActivityIndicator size="large" color='#8979B7' />
                                </View>
                        }
                        <FlatList
                            data={this.state.processedLabels}
                            renderItem={
                                ({ item }) => <View>
                                    <Text style={styles.text} >Tag name:{item.tagName}</Text>
                                    <Text style={styles.text} >Probability:{item.probability}</Text>
                                </View>
                            }
                        />


                    </View>
                </View>
            </Modal>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        // alignItems: 'center',
        flexDirection: 'row',
        // padding: 10,
        borderBottomColor: '#cdcdcd',
        borderBottomWidth: 1
    },
    textContainer: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10
    },
    title: {
        fontSize: 13,
        fontWeight: 'bold'
    },
    text: {
        fontSize: 17,
        //  color: '#FFFFFF'
    },
    userMessage: {
        fontSize: 17,
    },
    buttonLove: {

    },
    modalView: {
        backgroundColor: '#FAFAFA',
        //    margin: 5,
    },
    iconResponse: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 100
    },
    pictureStyle: {
        justifyContent: 'center',
        width: 300,
        height: 300
    },
    closeButton: {
        position: 'absolute',
        top: 5,
        right: 5
    }
})