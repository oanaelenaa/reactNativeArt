import React, { Component } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Button, FlatList, TextInput } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Modal from "react-native-modal";
import firebase from 'react-native-firebase';
console.log(RNCamera)
export default class ScanArt extends Component {

    constructor() {
        super();
        this.state = {
            title: 'My events for this year',
            visibleAddEvent: false,
            dialogShow: true,
            enail: "",
            password: ""
        }
    }

    componentWillMount() {
    }

    toggleModal() {
        this.setState({ dialogShow: !this.state.dialogShow })
    }
    logIn(){

    }

    render() {
        return (
            <View style={styles.container}>
                <Modal isVisible={this.state.dialogShow} onSwipe={() => this.setState({ dialogShow : false })}
                    swipeDirection="left">
                    <View style={styles.modal}>
                        <TextInput style={styles.input} placeholder="username" keyboardTyppe="email-address" value={this.state.email} onChangeText={(email) => this.setState({ email })} />

                        <TextInput style={styles.input} placeholder="password" secureTextEntry value={this.state.password} onChangeText={(password) => this.setState({ password })} />
                        <TouchableOpacity onPress={() => this.logIn()} style={styles.buttonContainer}>
                            <Text style={styles.buttonText}>take me to my account</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.toggleModal.bind(this)} style={styles.buttonContainer}>
                            <Text style={styles.buttonText}>I'll do it later on</Text>
                        </TouchableOpacity>


                    </View>
                </Modal>
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

            </View>
        );
    }

    takePicture = async function () {
        if (this.camera) {
            const options = { quality: 0.5, base64: true };
            const data = await this.camera.takePictureAsync(options)
            alert(data.uri)
            console.log(data.uri);
        }
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 0,
        width: '100%'
    },
    modal:{
        paddingTop:20,
        flex:1,
        padding:10,
        backgroundColor:'#7A4988'
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
    }
})