import React, { Component } from 'react';
import { TouchableOpacity, TouchableHighlight, View, Text, StyleSheet, Button, FlatList, TextInput, Alert, Image } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Firebase from '../Firebase';
import MuseumsFinder from '../MuseumsFinder';
console.log(RNCamera);
import ScanResponseModal from './ScanResponseModal';
function FoundLabel() {
    this.probability = 0;
    this.tagId = 0;
    this.tagName = "";
}
export default class ScanArt extends Component {

    constructor() {
        super();
        this.state = {
            modalVisible: false,
            url: "",
            imageFile: null,
            labels: [],
            result: null,
            notFoundMessage: "",
            frebasest: null
        }
        this.classifyImageURL = this.classifyImageURL.bind(this);
        this.classifyImageFile = this.classifyImageFile.bind(this);
        this.initializeLabels = this.initializeLabels.bind(this);
        this.validateResponse = this.validateResponse.bind(this);
        this.setModalVisible = this.setModalVisible.bind(this);
        this.displayResponseModal = this.displayResponseModal.bind(this);
        this.getMuseumsEU = this.getMuseumsEU.bind(this);
    }


    componentDidMount() {
    }
    getMuseumsEU() {

    }

    componentWillMount() {
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


    displayResponseModal() {
        if (this.state.modalVisible)
            return <ScanResponseModal modalVisible={this.state.modalVisible} labels={this.state.labels} notFoundMessage={this.state.notFoundMessage}></ScanResponseModal>;
    }

    render() {
        return (
            <View style={styles.container}>
                {this.displayResponseModal()}
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    //flashMode={RNCamera.Constants.FlashMode.on}
                    permissionDialogTitle={'Permission to use camera'}
                    permissionDialogMessage={'We need your permission to use your camera phone'}
                />
                <TouchableOpacity
                    onPress={this.takePicture.bind(this)}
                    style={styles.capture}
                >
                    <Text style={{ fontSize: 14 }}> SNAP </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.museumsFinderButton}
                    onPress={this.getMuseumsEU.bind(this)}
                >
                    <Image
                        resizeMode="contain"
                        style={styles.image}
                        source={require("../map_finder.png")}
                    />
                    <Text style={{ fontSize: 14, alignItems: 'center', justifyContent: 'center', }}> nearby museums </Text>
                </TouchableOpacity>
            </View>
        );
    }

    async classifyImageURL() {
        debugger
        //"Url": "https://thumbs-prod.si-cdn.com/uTAij75m6bRq94JAv-gQtcWBfQs=/800x600/filters:no_upscale():focal(3455x1709:3456x1710)/https://public-media.smithsonianmag.com/filer/d1/bb/d1bbf47d-256a-4833-b57c-eeb71a48b0bd/mona.jpg"
        var objtosend = {
            "Url": this.state.url
        };
        // Make the REST API call.
        var baseUrl = "https://southcentralus.api.cognitive.microsoft.com/customvision/v2.0/Prediction/cfb6e5e4-57e1-4a35-8d5f-736613c6bf56/url?iterationId=f903217a-63bf-4c54-ae65-3777cdbcc5de";
        fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Prediction-Key': '3f85f3746d0f4e82843f9eae70e09e97'
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

    async classifyImageFile() {
        debugger
        var baseUrl = "https://southcentralus.api.cognitive.microsoft.com/customvision/v2.0/Prediction/cfb6e5e4-57e1-4a35-8d5f-736613c6bf56/image?iterationId=f903217a-63bf-4c54-ae65-3777cdbcc5de";
        fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/octet-stream',
                'Prediction-Key': '3f85f3746d0f4e82843f9eae70e09e97'
            },
            body: new Buffer.from(this.state.imageFile, 'base64')
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
    /* RNFS.readFile(data.uri.substring(7), "base64")  //substring(7) -> to remove the file://
      .then(res => console.log(res));
 */

    async takePicture() {
        /*  if (this.camera) {
              const options = { quality: 0.5, base64: true };
              const data = await this.camera.takePictureAsync(options)
              Alert(data.uri)
              this.setState({
                  url: data.uri,
                  imageFile: data.base64
              })
              //this.classifyImageFile();
      }*/
     // debugger
        if (this.camera) {
            this.camera
                .takePictureAsync()
                .then(data => {
                    //  CameraRoll.saveToCameraRoll(data.uri, "photo");
                    console.log(data);
                })
                .catch(err => {
                    alert("err");
                    console.log(err);
                });

        };
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 0,
        width: '100%',
        backgroundColor: '#696969'
    },
    modal: {
        paddingTop: 20,
        flex: 1,
        padding: 10,
        backgroundColor: '#7A4988'
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
    museumsFinderButton: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: 100,
        backgroundColor: '#fff',
        borderRadius: 100,
        position: "absolute",
        bottom: 0,
        right: 0
    }
})