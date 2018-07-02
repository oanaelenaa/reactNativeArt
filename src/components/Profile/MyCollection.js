import React, { Component } from 'react';
import { TouchableOpacity, TouchableHighlight, Image, ScrollView, GridView, View, Text, StyleSheet, Button, FlatList, Modal, Alert, ActivityIndicator } from 'react-native';
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
        }

        this.logOut = this.logOut.bind(this);

    }

    componentWillMount() {
    }

    componentDidMount() {
        this.setState({ email: Firebase.registrationInfo.email });
        // this.showScans();
        ///this.onRefresh();
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

    //  <View style={{ flexDirection: "row" }}>
    render() {
        return (

            <ScrollableTabView
                style={{ marginTop: 20, }}
                renderTabBar={() => <ScrollableTabBar />} initialPage={0}>
                <ScansList tabLabel="Scans" />
                <SavedNewsList tabLabel="NewsFeedSaves" />
            </ScrollableTabView>
        );
    }
}



/**
 *  <View style={styles.container}>
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
            <ScrollableTabView
                style={{ marginTop: 20, }}
                renderTabBar={() => <ScrollableTabBar />} initialPage={0}>
                <View tabLabel="React" />
                <Text>dfgresdfre</Text>

                <View tabLabel="dddd" />
                <Text>dfgresdfre</Text>

            </ScrollableTabView>
            </View>
 * 
 * 
 */















//                    <ScansList tabLabel="React" />

// tabLabel='Scanned Arts'
// tabLabel='NewsFeed Saves'
// <ScrollableTabView
//style={{ marginTop: 20, }}
//renderTabBar={() => <ScrollableTabBar />}   initialPage={0}>
//                        <RefreshControlExample />
//                        <RefreshControlExample />

///    renderTabBar={() => <ScrollableTabBar />}>

/**<ScrollableTabView
                        tabBarUnderlineColor="#fff"
                        tabBarUnderlineStyle={{ backgroundColor: "#fff" }}
                        tabBarBackgroundColor="#075e54"
                        tabBarActiveTextColor="#fff"
                        tabBarInactiveTextColor="#88b0ac"
                        initialPage={0}>
 *    
 *                     </ScrollableTabView>

 * 
 * 
 */
/**
 *    <ScrollableTabView
                    style={{ marginTop: 20, }}
                    renderTabBar={() => <ScrollableTabBar />} initialPage={0}>
                    <View tabLabel="React" />
                    <Text>dfgresdfre</Text>

                    <View tabLabel="dddd" />
                    <Text>dfgresdfre</Text>

                </ScrollableTabView>

 * 
 * 
 * 
 * 
 */
const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        width: '100%'
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







/*
 <TouchableOpacity
                    style={{
                        borderWidth: 1,
                        borderColor: 'rgba(0,0,0,0.2)',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 100,
                        height: 100,
                        backgroundColor: '#fff',
                        borderRadius: 100,
                    }}
                >
                    <Icon name={"user"} size={60} color="#01a699" />

                </TouchableOpacity>
                <Text>{this.state.email}</Text>
                <TouchableOpacity
                    style={styles.logOutButton}
                    onPress={this.logOut.bind(this)}
                >

                    <Text style={{ fontSize: 14, alignItems: 'center', justifyContent: 'center', }}>LOG OUT </Text>
                </TouchableOpacity>
                <View style={styles.lineStyle} />
 */