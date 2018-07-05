import React, { Component } from 'react';
import { TouchableOpacity, TouchableHighlight, View, Linking, ActivityIndicator, Text, StyleSheet, Image } from 'react-native';
import Modal from "react-native-modal";
import LabelFinder from '../../utils/LabelFinder';
import RNFetchBlob from 'react-native-fetch-blob';
import Firebase from '../../utils/authentication/Firebase';
var randomString = require('random-string');
const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
///window.Blob = Blob
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
            author: "",
            authorPage: "",
            paintingPage: ""
        }
        this.classifyImageFile = this.classifyImageFile.bind(this);
        this.validateResponse = this.validateResponse.bind(this);
        this.initializeLabels = this.initializeLabels.bind(this);
        this.uploadToFirebase = this.uploadToFirebase.bind(this);
        this.savePictureToCollection = this.savePictureToCollection.bind(this);
        this.visitWebsite = this.visitWebsite.bind(this);
    }

    visitWebsite(url) {
        Linking.openURL(url);
    }

    initializeLabels(datas) {
        data = datas.slice(0, 2);
        this.setState({
            processedLabels: data,
            done: true
        })
        var title = "";
        var author = "";
        var labels = LabelFinder.findLabels(data[0].tagName, data[1].tagName)
        title = labels.title;
        author = labels.author;
        ///   console.log(labels);
        var urlPaintingPage = this.getFormatpageTitleLink(title);
        var urlAuthorPage = this.getFormatpageTitleLink(author);
        this.setState({
            title: labels.title,
            author: labels.author,
            authorPage: urlAuthorPage,
            paintingPage: urlPaintingPage
        })
        //https://firebasestorage.googleapis.com/v0/b/whatsart1995.appspot.com/o/images%2FUiJ8RV?alt=media&token=a6249bf5-a036-4176-a6ed-948d0722dbd1
    }

    async savePictureToCollection() {
        const uid = Firebase.registrationInfo.UID;
        const pictureURL = this.state.uploadedURL;
        var objToSave = ({
            "title": this.state.title,
            "author": this.state.author,
            "imageURL": pictureURL,
            "authorURL": this.state.authorPage,
            "titleURL": this.state.paintingPage
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

    getFormatpageTitleLink(pageTitle) {
        var formatted = pageTitle.split(' ').join('_');
        return 'https://en.wikipedia.org/wiki/' + formatted;
    }
    //image/jpeg'
    uploadToFirebase(uri, mime = 'image/jpeg') {//application/octet-stream
        var x = randomString({ length: 6 });
        //keep reference to original value
        const originalXMLHttpRequest = window.XMLHttpRequest;
        console.log(originalXMLHttpRequest);

        window.Blob = Blob;
        window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;

        let uploadBlob = null
        const imageRef = Firebase.storageRef.ref('images').child(x)
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
                //revert value to original
                window.XMLHttpRequest = originalXMLHttpRequest;
                imageRef.getDownloadURL().then((url) => {
                    this.setState({
                        uploadedURL: url
                    })
                    this.savePictureToCollection();
                }
                )
            })
            .catch((error) => {
                reject(error)
            })
    }


    componentDidMount() {
        this.classifyImageFile();
    }

    validateResponse(data) {
        console.log(data, "vali");
        if (data.predictions != null && data.predictions.length > 0 && data.predictions[0].probability >= 0.6) {
            this.initializeLabels(data.predictions);
            this.uploadToFirebase(this.state.uri);
        }
        else
            this.setState({ notFoundMessage: "Sorry,but no results were found for this art", done: true });
    }

    async classifyImageFile() {
        const url = this.state.uri;
        var baseUrl = "https://southcentralus.api.cognitive.microsoft.com/customvision/v2.0/Prediction/bcd68e65-9e51-4d34-b120-0bae92a8bcab/image?iterationId=cf23791d-b6a2-4508-b626-ecc13e0babcf"
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

    _toggleModal = () =>
        this.setState({ modalVisible: !this.state.modalVisible });

    render() {
        return (
            <Modal isVisible={this.state.modalVisible}
                animationType="slide"
                transparent={false}>
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
                        this.state.done && this.state.notFoundMessage == "" ?

                            <View>
                                <View style={styles.msgHolder}>
                                    <Text style={styles.text}>We are done</Text>
                                    <Image
                                        resizeMode="contain"
                                        source={require('./../../assets/foundScan.png')} />
                                </View>
                                <View>
                                    <Text style={styles.text} >Title:{this.state.title}</Text>
                                    <Text style={styles.text} >Author:{this.state.author}</Text>
                                </View>

                                <View style={styles.actionButtons}>
                                    <TouchableOpacity
                                        style={styles.actionsB}
                                        onPress={() => {
                                            this.visitWebsite(this.state.authorPage);
                                        }} >
                                        <Text style={styles.textActions}>view author references </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.actionsB}
                                        onPress={() => {
                                            this.visitWebsite(this.state.paintingPage);
                                        }} >
                                        <Text style={styles.textActions}>view title references </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            :
                            <View>
                                <Text style={styles.text}>Please wait while we processing the request</Text>
                                <ActivityIndicator size="large" color='#8979B7' />
                            </View>
                    }
                    {this.state.notFoundMessage != "" ?

                        <View style={styles.msgHolder}>
                            <Text style={styles.text}>{this.state.notFoundMessage}</Text>
                            <Image
                                resizeMode="contain"
                                source={require('./../../assets/notFound.png')} />
                        </View> : null
                    }
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
    msgHolder: {
        flexDirection: 'row',
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
        fontSize: 18,
        color: '#FFFFFF'
    },
    buttonLove: {

    },
    actionButtons: {
        marginTop: 10,
        flexDirection: 'row',
    },
    textActions: {
        color: "#8979B7",
        fontSize: 13
    },
    actionsB: {
        height: 50,
        width: 150
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