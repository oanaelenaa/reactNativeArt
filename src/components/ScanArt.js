import React, { Component } from 'react';
import { TouchableOpacity,TouchableHighlight, View, Text, StyleSheet, Button, FlatList, TextInput, Alert, Image } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Modal from "react-native-modal";
import Firebase from './Firebase';
import MuseumsFinder from './MuseumsFinder';
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
            notFoundMessage: ""
        }
        this.classifyImageURL = this.classifyImageURL.bind(this);
        this.classifyImageFile = this.classifyImageFile.bind(this);
        this.getMuseumsEU = this.getMuseumsEU.bind(this);
        this.convertLinkToBlobFile = this.convertLinkToBlobFile.bind(this);
        this.initializeLabels = this.initializeLabels.bind(this);
        this.validateResponse = this.validateResponse.bind(this);
        this.setModalVisible=this.setModalVisible.bind(this);
        this.displayResponseModal=this.displayResponseModal.bind(this);
    }

    componentDidMount() {
        this.state.imageFile = "https://thumbs-prod.si-cdn.com/uTAij75m6bRq94JAv-gQtcWBfQs=/800x600/filters:no_upscale():focal(3455x1709:3456x1710)/https://public-media.smithsonianmag.com/filer/d1/bb/d1bbf47d-256a-4833-b57c-eeb71a48b0bd/mona.jpg";
        //  this.classifyImageFile();
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
        debugger;
        data = datas.slice(0, 4);
       // var obj = JSON.parse(data);
        var labels = [];
        for(var i=0;i<data.length;i++)
        {
                var x=data[i];
                var z = new FoundLabel;
                z.tagName = x.tagName;
                z.tagId = x.tagId;
                z.probability = x.probability;
                labels.push(z);
        }
        this.state.labels = labels;
        console.log(labels);
    }

    getMuseumsEU() {
        var apikey = "AdHmgwgdm";
        //var url2="https://www.europeana.eu/api/v2/search.json?wskey=AdHmgwgdm&query=europeana_collectionName?keyword=Cluj+napoca";
        var url2 = "https://www.europeana.eu/api/v2/search.json?wskey=AdHmgwgdm&query=museums";
        fetch(url2)
            .then(response => response.json())
            .then(data => {
                console.log("Dataa", data);
            })
            .catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(error.code)
                console.log(error.message)
            });
    }

    displayResponseModal(){
        if(this.state.modalVisible)
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
                        source={require("./map_finder.png")}
                    />
                    <Text style={{ fontSize: 14, alignItems: 'center', justifyContent: 'center', }}> nearby museums </Text>
                </TouchableOpacity>
            </View>
        );
    }

    async classifyImageURL() {
        debugger
        var img=this.state.url;
        //            "Url": "https://thumbs-prod.si-cdn.com/uTAij75m6bRq94JAv-gQtcWBfQs=/800x600/filters:no_upscale():focal(3455x1709:3456x1710)/https://public-media.smithsonianmag.com/filer/d1/bb/d1bbf47d-256a-4833-b57c-eeb71a48b0bd/mona.jpg"
        var objtosend = {
            "Url":img
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

    convertLinkToBlobFile(dataURI) {
        debugger
        // convert base64 to raw binary data held in a string
        // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
        var byteString = atob(dataURI.split(',')[1]);

        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

        // write the bytes of the string to an ArrayBuffer
        var ab = new ArrayBuffer(byteString.length);

        // create a view into the buffer
        var ia = new Uint8Array(ab);

        // set the bytes of the buffer to the correct values
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        // write the ArrayBuffer to a blob, and you're done
        var blob = new Blob([ab], { type: mimeString });
        return blob;

    }


    async classifyImageFile() {
        debugger
        // Make the REST API call.
        var baseUrl = "https://southcentralus.api.cognitive.microsoft.com/customvision/v2.0/Prediction/cfb6e5e4-57e1-4a35-8d5f-736613c6bf56/image?iterationId=f903217a-63bf-4c54-ae65-3777cdbcc5de";
        fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/octet-stream',
                'Prediction-Key': '3f85f3746d0f4e82843f9eae70e09e97'
            },
            body: this.convertLinkToBlobFile(this.state.imageFile)
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

    takePicture = async function () {
        debugger
        if (this.camera) {
            const options = { quality: 0.5, base64: true };
            const data = await this.camera.takePictureAsync(options)
            alert(data.uri)
            console.log(data.uri);
            //this.state.imageFile=data.uri;
            //this.setState({imageFile:data.uri});
            this.state.url=data.uri;
            this.classifyImageURL();
            // this.classifyImageFile();
        }
    };
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 0,
        width: '100%',
        backgroundColor:'#696969'
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
        // justifyContent: 'flex-end',
        // alignItems: 'center',
        height: 300,
        ///width:100%
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