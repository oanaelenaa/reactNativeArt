import React, { Component } from 'react';
import { TouchableOpacity, TouchableHighlight, View, Text, StyleSheet, Button, FlatList, TextInput, Alert, Image } from 'react-native';
import Firebase from '../../utils/authentication/Firebase';
import RNFetchBlob from 'react-native-fetch-blob';
//const vision = require('@google-cloud/vision');
///const client = new vision.ImageAnnotatorClient();
export default class SearchOnWeb extends Component {

    constructor(props) {
        super(props);
        this.state = {
            url: this.props.url
        }
    }

    componentDidMount() {
        this.searchImageOnWeb();

    }

    componentWillMount() {

    }

    componentWillUnmount() {

    }

    searchImageOnWeb() {
            client
            .labelDetection(this.state.surl)
            .then(results => {
                const labels = results[0].labelAnnotations;
                console.log('Labels:');
                labels.forEach(label => console.log(label.description));
            })
            .catch(err => {
                console.error('ERROR:', err);
            });
    }

    async searchWebReferences(url) {
     ///   var fs = require(url);
        ////var imageFile = fs.readFileSync('./output.txt');
        // Covert the image data to a Buffer and base64 encode it.
        var encoded = new Buffer(url).toString('base64');
        var apiKey = 'AIzaSyBOi8uZx9f8518IlWIQPK-5MXX2u-2BMU0';
        var url = `https://vision.googleapis.com/v1/images:annotate=${encodeURIComponent(apiKey)}`;
        var requestList = {
            "requests": [
                {
                    "image": {
                        "content": encoded
                    },
                    "features": [
                        {
                            "type": "LABEL_DETECTION",
                            "maxResults": 1
                        }
                    ]
                }
            ]
        };
    }

    async searchWebReferences(url) {
        debugger
        objtosend = {
            "requests": [
                {
                    "image": {
                        "content": this.state.url
                    },
                    "features": [
                        {
                            "type": "WEB_DETECTION"
                        }
                    ]
                }
            ]
        }
        var baseUrl = `POST https://vision.googleapis.com/v1/images:annotate?key=AIzaSyD669FCzMq4x7B7H9xSb5AYlfSpUP6x8Ls`;
        fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Prediction-Key': 'e55e3d08cfae46768f86aba72e051021'
            },
            body: JSON.stringify(objtosend)
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                this.validateResponse(responseJson);
            }).catch(function (error) {
                console.log(error.code)
                console.log(error.message)
            });
    }


    async searchImageOnWeb(url) {
        baseUrl = "";
        RNFetchBlob.fetch('POST', baseUrl, {
            'Content-Type': 'application/octet-stream',
            'Prediction-Key': 'e55e3d08cfae46768f86aba72e051021'

        }, RNFetchBlob.wrap(url)).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                this.setState({
                    response: responseJson
                })
            }).catch(function (error) {
                console.log(error.code)
                console.log(error.message)
            });

    }

    render() {
        return (
            <View style={styles.container}>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 0,
        width: '100%',
        backgroundColor: "#FFFFFF"
    },
    modal: {
        paddingTop: 20,
        flex: 1,
        padding: 10,
        backgroundColor: '#000000',
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    input: {
        height: 40,
        marginBottom: 20,
        color: '#000000',
        paddingHorizontal: 10
    },
    preview: {
        height: 300,
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20
    },
    buttonContainer: {
        paddingVertical: 15
    },
})