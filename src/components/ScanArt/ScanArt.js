import React, { Component } from 'react';
import { TouchableHighlight, AsyncStorage, View, Text, StyleSheet, Button, FlatList, TextInput, Alert, Image } from 'react-native';
import Firebase from '../../utils/authentication/Firebase';
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
            openClassifierModal: true,
            name: ""
        }
        this.displayScansResponseModal = this.displayScansResponseModal.bind(this);
        this.displayWebResponseModal = this.displayWebResponseModal.bind(this);
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
            name: "oana"  //!!to do update remove hardcoded data
        })


        //${encodeURIComponent(search)}
        var search = 'Mona Lisa';
        url = `http://en.wikipedia.org/w/api.php?action=query&prop=url&format=json&titles=${encodeURIComponent(search)}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })

    }

    componentWillMount() {

    }

    componentWillUnmount() {
    }


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

    handleScanResponse = (langValue, base64, action = true) => {
        // debugger;
        this.setState({
            url: langValue,
            base64: base64,
            openClassifierModal: action,
            modalVisibleWeb: false,
            modalVisibleScans: false
        });
        if (action) {
            this._toggleModalScans();
        }
        else {
            this._toggleModalWeb();
        }
    }

    render() {
        return (
            <View style={styles.container}>
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
                {this.displayWebResponseModal()}
            </View>
        );
    }
}//                {this.displayScansResponseModal()}

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