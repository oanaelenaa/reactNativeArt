import React, { Component } from 'react';
import { TouchableOpacity, TouchableHighlight, View, Text, StyleSheet, Button, FlatList, TextInput, Alert, Image } from 'react-native';
import Firebase from '../Firebase';
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
            result: null,
            notFoundMessage: "",
            camEnabled: true
        }
        this.classifyImageURL = this.classifyImageURL.bind(this);
        this.classifyImageFile = this.classifyImageFile.bind(this);
        this.initializeLabels = this.initializeLabels.bind(this);
        this.validateResponse = this.validateResponse.bind(this);
        this.setModalVisible = this.setModalVisible.bind(this);
        this.displayResponseModal = this.displayResponseModal.bind(this);
        this.updateUrl=thi.updateUrl.bind(this);
    }
    onNavigation() {
        this.setState({ camEnabled: false })
    }

    updateUrl(){
      /*  this.setState({
            url:
        })*/

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
                <CameraView
                    enabled={this.state.camEnabled}
                    ref={(cam) => { this.camera = cam }} 
                   // onChange={this.state.url}
              //      value={this.props.url}
                    />
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

    async classifyImageFile() {
        debugger
        var baseUrl = "https://southcentralus.api.cognitive.microsoft.com/customvision/v2.0/Prediction/bcd68e65-9e51-4d34-b120-0bae92a8bcab/image?iterationId=ddfee652-0132-4fc1-b7d2-580df387f3ad"
        var pathtofile = this.state.url;
        conole.log(pathtofile);
        RNFetchBlob.fetch('POST', baseUrl, {
            'Content-Type': 'application/octet-stream',
            'Prediction-Key': 'e55e3d08cfae46768f86aba72e051021'
        }, RNFetchBlob.wrap()).then((response) => response.json())
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
        /* Alert(data.uri)
         this.setState({
             url: data.uri,
             imageFile: data
         })
         this.classifyImageFile();*/
        // uploadImage(this.state.url,"test");

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

/*   <TouchableOpacity
                    style={styles.museumsFinderButton}
                    onPress={this.setMuseumsmodalVisible}
                >
                    <Image
                        resizeMode="contain"
                        style={styles.image}
                        source={require("../map_finder.png")}
                    />
                    <Text style={{ fontSize: 14, alignItems: 'center', justifyContent: 'center', }}> nearby museums </Text>
                </TouchableOpacity>*/