import React, { Component } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Button, FlatList, Modal } from 'react-native';
import { RNCamera } from 'react-native-camera';
console.log(RNCamera)


export default class ScanArt extends Component {

    constructor() {
        super();
        this.state = {
            title: 'My events for this year',
            visibleAddEvent: false,
            eventList: []
        }
    }

    componentWillMount() {
        fetch('https://arcane-cliffs-26946.herokuapp.com/events')
            .then(response => response.json())
            .then(data => {
                this.setState({eventList: data})
            })
    }

    toggleModal() {
        this.setState({ visibleAddEvent: !this.state.visibleAddEvent })
    }

    renderItem(item) {
        return (
            <Event event={item}/>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <RNCamera
                    ref={ref => {
                    this.camera = ref;
                    }}
                    style = {styles.preview}
                    type={RNCamera.Constants.Type.back}
                    //flashMode={RNCamera.Constants.FlashMode.on}
                    permissionDialogTitle={'Permission to use camera'}
                    permissionDialogMessage={'We need your permission to use your camera phone'}
                />
                <TouchableOpacity
            onPress={this.takePicture.bind(this)}
            style = {styles.capture}
        >
            <Text style={{fontSize: 14}}> SNAP </Text>
        </TouchableOpacity>
               
            </View>
        );
    }
    
    takePicture = async function() {
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
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center'
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
    }
})