import React, { Component } from 'react';
import {TouchableHighlight, AsyncStorage, View, Text, StyleSheet, Button, FlatList, TextInput, Alert, Image } from 'react-native';
import Firebase from '../../utils/authentication/Firebase';
import RNFetchBlob from 'react-native-fetch-blob';
import ScanResponseModal from './ScanResponseModal';
import CameraView from './CameraView';
import config from './../../../config';
import WebReferencesResponseModal from './WebReferencesResponseModal';
import LabelFinder from '../../utils/LabelFinder';

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
            result: [],
            loaded: true,
            notFoundMessage: "",
            camEnabled: true,
            name: ""
        }
        this.classifyImageURL = this.classifyImageURL.bind(this);
        this.initializeLabels = this.initializeLabels.bind(this);
        this.validateResponse = this.validateResponse.bind(this);
        this.setModalVisible = this.setModalVisible.bind(this);
        this.displayResponseModal = this.displayResponseModal.bind(this);
        this.searchWebReferences = this.searchWebReferences.bind(this);
        this.savePictureToCollection = this.savePictureToCollection.bind(this);
        this.logOut = this.logOut.bind(this);
    }

    async logOut() {
        try {
            await AsyncStorage.clear();
            await Firebase.auth.signOut();
            this.props.navigation.navigate('Login');
        } catch (e) {
            console.log(e);
        }
    }

    onNavigation() {
        this.setState({ camEnabled: false })
    }

    componentDidMount() {
        requestAnimationFrame(() => {
            // update the camera state here or send a value to a function that changes the cameraEnabled state
        })
        ///console.log(LabelFinder.findLabels('starrynight', 'Leonardo da Vinci'));
        //const name = AsyncStorage.getItem('userName');
        this.setState({
            name: "oana"
        })
    }

    componentWillMount() {
    }

    componentWillUnmount() {
    }

    async searchWebReferences(base64) {
        return await
            fetch(config.googleCloud.api + config.googleCloud.apiKey, {
                method: 'POST',
                body: JSON.stringify({
                    "requests": [
                        {
                            "image": {
                                "content": base64
                            },
                            "features": [
                                {
                                    "type": "WEB_DETECTION"
                                }
                            ]
                        }
                    ]
                })
            }).then((response) => {
                return response.json();
            }, (err) => {
                console.error('promise rejected')
                console.error(err)
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
        this.state.result = labels;
    }

    _toggleModal = () =>
        this.setState({ modalVisible: !this.state.modalVisible });


    displayResponseModal() {
        console.log(this.state.url, "url");
        if (this.state.modalVisible) {
            if (this.state.openClassifierModal) {
                return (<ScanResponseModal hasResults={true} url={this.state.url} modalVisible={this.state.modalVisible}
                    labels={this.state.result} notFoundMessage={this.state.notFoundMessage}></ScanResponseModal>);
            }
            else {
                return (<WebReferencesResponseModal url={this.state.url} modalVisible={this.state.modalVisible}
                    responseWeb={this.state.result}></WebReferencesResponseModal>);
            }
        }
    }

    handleScanResponse = (langValue, base64, action) => {
        this.setState({ url: langValue });
        this.setState({ base64: base64 });
        this.setState({
            openClassifierModal: true
        });

        // if (action == 'classify') {
        this.classifyImageFile(langValue);
        //}
        /*  else {
              var labelsAnnotations = this.searchWebReferences(base64);
              if (labelsAnnotations != null) {
                  this.setState({
                      result: labelsAnnotations
                  });
                  console.log(labelsAnnotations);
              }
          }*/
        this.setState({
            modalVisible: true
        })
    }


    render() {
        return (
            <View style={styles.container}>
                {this.displayResponseModal()}
                <View style={styles.containerProfile}>
                    <View
                        style={styles.profileIcon}>
                        <Image style={styles.profilePicStyle}
                            source={require('./../../assets/profile.jpg')} />
                    </View>
                    <Text style={styles.label}>{this.state.name}</Text>
                    <TouchableHighlight style={styles.logOutButton}
                        onPress={() => {
                            this.logOut();
                        }}>
                        <Image
                            source={require('./../../assets/logout.png')} />
                    </TouchableHighlight>
                </View>
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
                console.log(error.code)
                console.log(error.message)
            });
    }

    async savePictureToCollection() {
        const uid = Firebase.registrationInfo.UID;
        var objToSave = ({

        });
        console.log("obj", objToSave);
        isSuccessful = true;
        var ref = Firebase.database.ref(`/SavedScans/${uid}`);
        ref.push(JSON.parse(JSON.stringify(objToSave)))
            .then((result) => {
                console.log('result', result);

            }).catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(error.code)
                console.log(error.message)
            });
        this.handleSaveChange(isSuccessful);

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
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 0,
        width: '100%',
        backgroundColor: "#FAFAFA"
    },
    containerProfile: {
        paddingTop: 10,
        width: '100%',
        flexDirection: "row"
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
    profileIcon: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: 100,
        backgroundColor: '#fff',
        borderRadius: 100,

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
    label: {
        fontSize: 18,
        color: "#8979B7",
        marginTop: 50,
        paddingLeft: 10
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
    profilePicStyle: {
        height: 100,
        width: 100,
        borderRadius: 64
    },
    logOutButton: {
        top: 10,
        right: 10,
        paddingLeft: 180
    }
})