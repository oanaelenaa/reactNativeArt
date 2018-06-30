import React, { Component } from 'react';
import { TouchableOpacity, TouchableHighlight, View, Text, StyleSheet, Button, FlatList, TextInput, Alert, Image } from 'react-native';
import Firebase from '../../utils/authentication/Firebase';
import RNFetchBlob from 'react-native-fetch-blob';
import ScanResponseModal from './ScanResponseModal';
import CameraView from './CameraView';
import config from './../../../config';
import WebReferencesResponseModal from './WebReferencesResponseModal';

export default class ScanArt extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisibleScans: false,
            modalVisibleWeb: false,
            url: "",
            imageFile: null,
            camEnabled: true,
            openClassifierModal: true
        }

        this.displayScansResponseModal = this.displayScansResponseModal.bind(this);
        this.displayWebResponseModal = this.displayWebResponseModal.bind(this);
        this.savePictureToCollection = this.savePictureToCollection.bind(this);
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

    /*  async searchImageOnWeb(url) {
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
      }*/

    _toggleModalScans = () =>
        this.setState({ modalVisibleScans: !this.state.modalVisibleScans });

    _toggleModalWeb = () =>
        this.setState({ modalVisibleWeb: !this.state.modalVisibleWeb });


    displayScansResponseModal() {
        if (this.state.modalVisibleScans) {
            return (<ScanResponseModal hasResults={true} uri={this.state.url} modalVisible={this.state.modalVisibleScans}></ScanResponseModal>);
        }
    }

    displayWebResponseModal() {
        if (this.state.modalVisibleWeb) {
            return (<WebReferencesResponseModal url={this.state.url} modalVisible={this.state.modalVisibleScans} base64={this.state.base64}></WebReferencesResponseModal>);
        }
    }



    handleScanResponse = (langValue, base64, action) => {
        this.setState({
            url: langValue,
            base64: base64,
            openClassifierModal: action
        });
        if (action)
            this._toggleModalScans();
        else
            this._toggleModalWeb();
    }


    render() {
        return (
            <View style={styles.container}>
                <CameraView
                    enabled={this.state.camEnabled}
                    ref={(cam) => { this.camera = cam }}
                    onGetResponseScan={this.handleScanResponse}
                />
                {this.displayScansResponseModal()}
                {this.displayWebResponseModal()}
            </View>
        );
    }

    /*  async classifyImageURL() {
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
                  return responseJson;
              }).catch(function (error) {
                  console.log(error.code)
                  console.log(error.message)
                  return null;
              });
          return null;
      }*/

    async savePictureToCollection() {
        const uid = Firebase.registrationInfo.UID;
        //process image file to be saved
        var objToSave = ({


        });
        console.log("obj", objToSave);
        isSuccessful = true;
        var ref = Firebase.database.ref(`/SavedScans/${uid}`);
        ref.push(JSON.parse(JSON.stringify(objToSave)))
            .then((result) => {
                console.log('result', result);

            }).catch(function (error) {
                console.log(error.code)
                console.log(error.message)
            });
        this.handleSaveChange(isSuccessful);

    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 0,
        width: '100%',
        backgroundColor: "#FAFAFA"
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