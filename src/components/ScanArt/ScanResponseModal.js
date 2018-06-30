import React, { Component } from 'react';
import { TouchableOpacity, ActivityIndicator, TouchableHighlight, View, Text, StyleSheet, Button, FlatList, TextInput, Alert, Image } from 'react-native';
import Modal from "react-native-modal";
import RNFetchBlob from 'react-native-fetch-blob';

function FoundLabel() {
    this.probability = 0;
    this.tagId = 0;
    this.tagName = "";
}
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

        }

        this.classifyImageFile = this.classifyImageFile.bind(this);
        this.validateResponse = this.validateResponse.bind(this);
        this.initializeLabels = this.initializeLabels.bind(this);
        this.checkForBadPredictions = this.checkForBadPredictions.bind(this);
    }

    componentDidMount() {
        this.classifyImageFile();
    }

    _toggleModal = () =>
        this.setState({ modalVisible: !this.state.modalVisible });


    checkForBadPredictions() {


    }

    initializeLabels(datas) {
        data = datas.slice(0, 2);
        this.setState({
            processedLabels: data,
            done: true
        })
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
                        this.state.done ? <Text>done</Text> : <Text>loading</Text>
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