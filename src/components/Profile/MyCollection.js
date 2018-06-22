import React, { Component } from 'react';
import { TouchableOpacity, TouchableWithoutFeedback, TouchableHighlight, Image, View, Text, StyleSheet, Button, FlatList, Modal, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Firebase from '../Firebase';
import SavedNewsList from './News/SavedNewsList';
import ScansList from './Scans/ScansList';
export default class MyCollection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            refreshing: false,
            savedNewsFeedCollection: [],
            showNewsFeed: false,
            showScans: true,
            changeList: false,
            textColored: true
        }
        this.showScans = this.showScans.bind(this);
        this.showSavedNews = this.showSavedNews.bind(this);
        this.logOut = this.logOut.bind(this);
        this.colorText = this.colorText.bind(this);
        this.resetText = this.resetText.bind(this);

    }

    componentWillMount() {
    }

    componentDidMount() {
        this.setState({ email: Firebase.registrationInfo.email });
        this.showScans();
        ///this.onRefresh();
    }

    showScans() {
        this.setState({
            changeList: false,
        });

    }
    showSavedNews() {
        this.setState({
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


    colorText() {
        this.setState({ textColored: true });
    }
    resetText() {
        this.setState({ textColored: false });
    }
    textColored() {
        if (this.state.textColored) {
            return styles.textColored;
        } else {
            return styles.textNormal;
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
                <View style={styles.listsButtons}>

                    <TouchableOpacity onPressIn={this.colorText} onPressOut={this.resetText}
                        style={styles.capture}
                        onPress={this.showScans.bind(this)}
                    >
                        <Text style={styles.ListsButtonText}>SCANS </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPressIn={this.colorText} onPressOut={this.resetText}
                        style={styles.capture}
                        onPress={this.showSavedNews.bind(this)}
                    >
                        <Text style={styles.ListsButtonText}>SAVED NEWS</Text>
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
    listsButtons: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center'
    },
    logOutButton: {
        top: 10,
        right: 0,
        paddingLeft: 150
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