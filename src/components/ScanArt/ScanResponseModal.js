import React, { Component } from 'react';
import { TouchableOpacity, TouchableHighlight, View, ActivityIndicator, Text, StyleSheet, Button, FlatList, TextInput, Alert, Image } from 'react-native';
import Modal from "react-native-modal";
import LabelFinder from '../../utils/LabelFinder';
import RNFetchBlob from 'react-native-fetch-blob';
import Firebase from '../../utils/authentication/Firebase';
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
    }

    initializeLabels(datas) {
        data = datas.slice(0, 2);
        this.setState({
            processedLabels: data,
            done: true
        })
        var title = "";
        var author = "";
        debugger;
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
        /// this.savePictureToCollection();
    }

    getFormatpageTitleLink(pageTitle) {
        var formatted = pageTitle.replace(" ", "_");
        return 'https://en.wikipedia.org/wiki/' + formatted;
    }



    componentDidMount() {
        /* this.uploadToFirebase(this.state.uri)
             .then(url => {
                 this.setState({ uploadedURL: url })
                 this.classifyImageFile();
             })
             .catch(error => console.log(error))*/
        this.classifyImageFile();
    }



    validateResponse(data) {
        console.log(data, "vali");
        if (data.predictions != null && data.predictions.length > 0 && data.predictions[0].probability >= 0.5)
            this.initializeLabels(data.predictions);
        else
            this.setState({ notFoundMessage: "Sorry,but no results were found for this art" });
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
                        this.state.done ?

                            <View>
                                <Text style={styles.userMessage}>We are done</Text>
                                <Image
                                    resizeMode="contain"
                                    source={require('./../../assets/foundScan.png')} />

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
                                            this.visitWebsite(this.state.pageTitle);
                                        }} >
                                        <Text style={styles.textActions}>view title references </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            :
                            <View>
                                <Text>Please wait while we processing the request</Text>
                                <ActivityIndicator size="large" color='#8979B7' />
                            </View>
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