import React, { Component } from 'react';
import { TouchableOpacity, TouchableHighlight, View, Text, StyleSheet, Button, FlatList, Modal, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Firebase from '../Firebase';
import SavedNewsList from './SavedNewsList';
import ScansList from './ScansList';
export default class MyCollection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            refreshing: false,
            savedNewsFeedCollection: [],
            showNewsFeed: false,
            showScans: true,
            changeList: false
        }
        this.showScans = this.showScans.bind(this);
        this.showSavedNews = this.showSavedNews.bind(this);
        this.logOut = this.logOut.bind(this);

    }

    componentWillMount() {

    }

    componentDidMount() {
        this.setState({ email: Firebase.registrationInfo.email });
        ///this.onRefresh();
    }

    showScans() {
        //  debugger
        this.setState({
            showScans: true,
            showNewsFeed: false,
            changeList: false,

        });

    }
    showSavedNews() {
        //   debugger
        this.setState({
            showNewsFeed: true,
            showScans: false,
            changeList: true,
        });
    }


    async logOut() {
        try {
            if (Firebase.registrationInfo.isAutheticated == true) {
                await Firebase.auth.signOut();
            }
            this.props.navigation.navigate('Login');
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: "row" }}>

                    <TouchableOpacity
                        style={styles.profileIcon}
                    >
                        <Icon name={"user"} size={60} color="#01a699" />

                    </TouchableOpacity>

                    <Text>{this.state.email}</Text>
                    <TouchableHighlight
                        onLongPress={() => {
                            alert("we are logging out");
                            this.logOut();
                            //  this.onRefresh();
                        }}>
                        <Text>LOG OUT</Text>
                    </TouchableHighlight>
                </View>
                <View style={{ flexDirection: "row" }}>

                    <TouchableOpacity
                        style={styles.capture}
                        onPress={this.showScans.bind(this)}
                    >
                        <Text style={{ fontSize: 14, alignItems: 'center', justifyContent: 'center', }}>SCANS </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.capture}
                        onPress={this.showSavedNews.bind(this)}
                    >
                        <Text style={{ fontSize: 14, alignItems: 'center', justifyContent: 'center', }}>SAVED NEWS</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.lineStyle} />
                {
                    this.state.changeList ? <SavedNewsList /> : <ScansList />
                }

            </View>
        );
    }
}
/* {
                   this.state.showNewsFeed ? <SavedNewsList /> : null
               }
               {
                   this.state.showScans ? <ScansList /> : null
               }*/

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        paddingLeft: 0.5,
        width: '100%'
    },
    containerList: {
        flex: 1,
        paddingTop: 50,
        width: '100%'
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    logOutButton: {
        paddingTop: 10,
        paddingLeft: 100
    },
    lineStyle: {
        borderWidth: 0.5,
        borderColor: 'gray',
        margin: 0
    },
    header: {
        /// display: inline,
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20
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

    }
})
/*
 <FlatList style={styles.containerList}
                    data={this.savedNewsFeedCollection}
                    renderItem={({ item }) => this.renderItemNF(item)}
                    keyExtractor={(item) => item.id}
                />


*/
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