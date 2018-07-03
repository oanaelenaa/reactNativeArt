import React, { Component } from 'react';
import { TouchableOpacity, TouchableHighlight, Image, View, Text, StyleSheet, Button, FlatList, Modal, Alert, ActivityIndicator } from 'react-native';
import Firebase from '../../utils/authentication/Firebase';
import SavedNewsList from './News/SavedNewsList';
import ScansList from './Scans/ScansList';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';

export default class MyCollection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "Oana",
            refreshing: false,
            scansList: [],
            savedList: [],
            loadedScans: false,
            loadedSaves: false
        }
        this.logOut = this.logOut.bind(this);
        this.loadScans = this.loadScans.bind(this);
        this.loadSaved = this.loadSaved.bind(this);
    }

    componentWillMount() {
    }

    componentDidMount() {
        this.setState({ email: Firebase.registrationInfo.email });
        this.loadScans();
        this.loadSaved();
        // this.showScans();
        ///this.onRefresh();
    }

    loadScans() {
        this.setState({ refreshing: true });
        const uid = Firebase.registrationInfo.UID;
        var list = [];
        Firebase.databaseRef.child(`/SavedArtItems/${uid}`).on('value', (childSnapshot) => {
            childSnapshot.forEach((doc) => {
                var artItem = {
                    primaryimageURL: doc.toJSON().imageURL,
                    title: doc.toJSON().title,
                    author: doc.toJSON().author,
                    pageURL: doc.toJSON().pageURL,
                    id: doc.key,
                }
                list.push(artItem);
            });
            this.setState({
                refreshing: false,
                loadedScans: true,
                scansList: list
            });
        });
    }

    loadSaved() {
        const uid = Firebase.registrationInfo.UID;
        var list = [];//databaseRef.
        Firebase.databaseRef.child(`/SavedNewsFeedItems/${uid}`).on('value', (childSnapshot) => {
            childSnapshot.forEach((doc) => {
                // debugger
                var artItem = {
                    department: doc.toJSON().department,
                    people: doc.toJSON().people,
                    creditline: doc.toJSON().creditline,
                    title: doc.toJSON().title,
                    pageURL: doc.toJSON().pageURL,
                    culture: doc.toJSON().culture,
                    accessionyear: doc.toJSON().accessionyear,
                    primaryimageurl: doc.toJSON().primaryimageURL,
                    id: doc.key,
                }
                //   console.log(artItem);
                list.push(artItem);
            });
            this.setState({
                loadedSaves: true,
                savedList: list
            });
        });
        ///console.log(this.savedNewsFeedCollection);
    }


    async logOut() {
        try {
            // if (Firebase.registrationInfo.isAutheticated == true) {
            await AsyncStorage.clear();
            await Firebase.auth.signOut();
            // } 
            debugger
            ///     console.log(AsyncStorage);
            this.props.navigation.navigate('Login');
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        return (

            /// {this.state.loadedSaves && this.state.loadedScans ?

            <ScrollableTabView
                style={{ marginTop: 20, }}
                renderTabBar={() => <ScrollableTabBar />} initialPage={0}>
                <ScansList scans={this.state.scansList} tabLabel="Scans" />
                <SavedNewsList saves={this.state.savedList} tabLabel="NewsFeedSaves" />
            </ScrollableTabView>

            //   :

            // <View>
            //   <ActivityIndicator size="large" color='#8979B7' />
            // </View>
            //       }
        );
    }
}



/*

 <ScrollView>
                <View style={styles.container}>
                    <View
                        style={styles.profileIcon}>
                        <Image style={styles.profilePicStyle}
                            source={require('../../assets/profile.jpg')} />
                    </View>
                    <Text style={styles.label}>{this.state.name}</Text>
                    <TouchableHighlight style={styles.logOutButton}
                        onLongPress={() => {
                            alert("we are logging out");
                            this.logOut();
                            //  this.onRefresh();
                        }}>
                        <Image
                            source={require('../../assets/logout.png')} />
                    </TouchableHighlight>
                </View>


*/
const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        width: '100%',
        flexDirection: "row"
    },
    containerList: {
        flex: 1,
        paddingTop: 50,
        width: '100%'
    },
    profilePicStyle: {

    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    listsButtons: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center'
    },
    logOutButton: {
        top: 10,
        right: 10,
        paddingLeft: 180
    },
    lineStyle: {
        borderWidth: 0.5,
        borderColor: 'gray',
        margin: 0
    },
    header: {
        /// display: inline,
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
    textNormal: {
        color: '#fff',

    },
    textColored: {
        color: 'gray'
    },
    ListsButtonText: {
        color: "#8979B7",
        fontSize: 18,
        fontSize: 14,
        alignItems: 'center',
        justifyContent: 'center'
    },
    label: {
        fontSize: 18,
        color: "#8979B7",
        marginTop: 50,
        paddingLeft: 10
    },
    profilePicStyle: {
        height: 100,
        width: 100,
        borderRadius: 64
    }

})

