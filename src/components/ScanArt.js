import React, { Component } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Button, FlatList, TextInput, Alert, Image } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Modal from "react-native-modal";
import Firebase from './Firebase';
console.log(RNCamera);
export default class ScanArt extends Component {

    constructor() {
        super();
        this.state = {
            dialogShow: true,
            url: "",
            imageFile: null,
        }
        this.classifyImageURL = this.classifyImageURL.bind(this);
        this.classifyImageFile = this.classifyImageFile.bind(this);
    }

    componentDidMount() {
     //   console.log(Firebase.registrationInfo.email);
       // console.log(Firebase.registrationInfo.refreshToken);
    }

    componentWillMount() {
    }

    toggleModal() {
        this.setState({ dialogShow: !this.state.dialogShow })
    }

    render() {
        return (
            <View style={styles.container}>
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
                    onPress={this.takePicture.bind(this)}
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
        console.log(this.state.url);
        debugger;
        // Make the REST API call.
        var baseUrl = "https://southcentralus.api.cognitive.microsoft.com/customvision/v2.0/Prediction/cfb6e5e4-57e1-4a35-8d5f-736613c6bf56/url?iterationId=f903217a-63bf-4c54-ae65-3777cdbcc5de";
        fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Prediction-Key': '3f85f3746d0f4e82843f9eae70e09e97'
            },
            body: { "Url": "https://thumbs-prod.si-cdn.com/uTAij75m6bRq94JAv-gQtcWBfQs=/800x600/filters:no_upscale():focal(3455x1709:3456x1710)/https://public-media.smithsonianmag.com/filer/d1/bb/d1bbf47d-256a-4833-b57c-eeb71a48b0bd/mona.jpg" }

        }).then(function (result) {
            console.log("raspuns ", result);

            // FirebaseUser user = FirebaseAuth.getInstance().getCurrentUser();
            // DatabaseReference ref = FirebaseDatabase.getInstance().getReference(USERS_TABLE);
            //s   ref.child(user.getUid()).setValue(user_class);
        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(error.code)
            console.log(error.message)
        });
    }
    //https://thumbs-prod.si-cdn.com/uTAij75m6bRq94JAv-gQtcWBfQs=/800x600/filters:no_upscale():focal(3455x1709:3456x1710)/https://public-media.smithsonianmag.com/filer/d1/bb/d1bbf47d-256a-4833-b57c-eeb71a48b0bd/mona.jpg

    async classifyImageFile() {
        ///    console.log(this.state.url);
        debugger;
        // Make the REST API call.
        var baseUrl = "https://southcentralus.api.cognitive.microsoft.com/customvision/v2.0/Prediction/cfb6e5e4-57e1-4a35-8d5f-736613c6bf56/image?iterationId=f903217a-63bf-4c54-ae65-3777cdbcc5de";
        fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/octet-stream',
                'Prediction-Key': '3f85f3746d0f4e82843f9eae70e09e97'
            },
            body: this.state.imageFile
        }).then(function (result) {
            console.log("raspuns ", result);

            // FirebaseUser user = FirebaseAuth.getInstance().getCurrentUser();
            // DatabaseReference ref = FirebaseDatabase.getInstance().getReference(USERS_TABLE);
            //s   ref.child(user.getUid()).setValue(user_class);
        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(error.code)
            console.log(error.message)
        });
    }

    async savePictureToCollection(){
       // let id=Firebase.databaseRef

    }



    takePicture = async function () {
        if (this.camera) {
            const options = { quality: 0.5, base64: true };
            const data = await this.camera.takePictureAsync(options)
            alert(data.uri)
            console.log(data.uri);
            this.setState({imageFile:data.base64});
           // this.classifyImageURL();
        }
    };
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 0,
        width: '100%'
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