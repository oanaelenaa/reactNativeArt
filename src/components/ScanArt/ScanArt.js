import React, { Component } from 'react';
import { TouchableOpacity, TouchableHighlight, View, Text, StyleSheet, Button, FlatList, TextInput, Alert, Image } from 'react-native';
import Firebase from '../../utils/authentication/Firebase';
import RNFetchBlob from 'react-native-fetch-blob';
import ScanResponseModal from './ScanResponseModal';
import CameraView from './CameraView';
function FoundLabel() {
    this.probability = 0;
    this.tagId = 0;
    this.tagName = "";
}
export default class ScanArt extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            url: "",
            imageFile: null,
            labels: [],
            result: [
                {
                    "tagName": "Gioconda",
                    "probability": "99%"
                },
                {
                    "tagName": "leonardo da Vinci",
                    "probability": "98%"
                }
            ],
            notFoundMessage: "",
            camEnabled: true
        }
        this.classifyImageURL = this.classifyImageURL.bind(this);
        this.initializeLabels = this.initializeLabels.bind(this);
        this.validateResponse = this.validateResponse.bind(this);
        this.setModalVisible = this.setModalVisible.bind(this);
        this.displayResponseModal = this.displayResponseModal.bind(this);
    }
    onNavigation() {
        this.setState({ camEnabled: false })
    }

    componentDidMount() {
        requestAnimationFrame(() => {
            // update the camera state here or send a value to a function that changes the cameraEnabled state
        })
    }

    componentWillMount() {
    }

    componentWillUnmount() {

    }

    async searchWebReferences(url){
        var fs=require(url);
        var imageFile=fs.readFileSync('./output.txt');
        // Covert the image data to a Buffer and base64 encode it.
        var encoded = new Buffer(imageFile).toString('base64');
        var apiKey='AIzaSyD_bnBI4l5RZEOCVfyrUhIFgw7okT2TRoM';
        var url=`https://vision.googleapis.com/v1/images:annotate=${encodeURIComponent(apiKey)}`;
        var requestList={
            "requests":[
              {
                "image":{
                  "content":encoded
                },
                "features":[
                  {
                    "type":"LABEL_DETECTION",
                    "maxResults":1
                  }
                ]
              }
            ]
          };


    }


    async classifyImageFile(url) {
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

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
        this.displayResponseModal();
    }

    validateResponse(data) {
        if (data.predictions.length > 0)
            this.initializeLabels(data.predictions);
        else
            this.setState({ notFoundMessage: "no results were found for this art" });
        this.setModalVisible(true);

    }

    initializeLabels(datas) {
        data = datas.slice(0, 4);
        var labels = [];
        for (var i = 0; i < data.length; i++) {
            var x = data[i];
            var z = new FoundLabel;
            z.tagName = x.tagName;
            z.tagId = x.tagId;
            z.probability = x.probability;
            labels.push(z);
        }
        this.state.labels = labels;
    }

    _toggleModal = () =>
        this.setState({ modalVisible: !this.state.modalVisible });


    displayResponseModal() {
        if (this.state.modalVisible)
            // return null;
            return <ScanResponseModal hasResults={true} url={this.state.url} modalVisible={this.state.modalVisible} labels={this.state.result} notFoundMessage={this.state.notFoundMessage}></ScanResponseModal>;
    }

    handleScanResponse = (langValue) => {
        this.setState({ url: langValue });
        this.setState({
            modalVisible: true
        })
    }


    render() {
        return (
            <View style={styles.container}>
                {this.displayResponseModal()}
                <CameraView
                    enabled={this.state.camEnabled}
                    ref={(cam) => { this.camera = cam }}
                    onGetResponseScan={this.handleScanResponse}
                />
            </View>
        );
    }

    async classifyImageURL() {
        var objtosend = {
            "Url": this.state.url
        };
        // Make the REST API call.
        var baseUrl = "https://southcentralus.api.cognitive.microsoft.com/customvision/v2.0/Prediction/bcd68e65-9e51-4d34-b120-0bae92a8bcab/url?iterationId=ddfee652-0132-4fc1-b7d2-580df387f3ad"
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
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(error.code)
                console.log(error.message)
            });
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
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(error.code)
                console.log(error.message)
            });
    }


    async savePictureToCollection() {
        const uid = Firebase.registrationInfo.UID;

    }

    async takePicture() {
        debugger;
        if (this.camera) {
            const options = { quality: 0.5, base64: true };
            //const data = await this.camera.takePictureAsync(options)
            try {
                const cameraData = await this.camera.takePictureAsync()
                console.log(cameraData.uri);
            } catch (e) {
                // This logs the error
                console.log(e)
            }
        }
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