import React, { Component } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Button, FlatList, Modal, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PersonalCollectionArtItem from '../models/PersonalCollectionArtItem';
import NewsFeedArtItem from '../models/NewsFeedArtItem';
import Firebase from './Firebase';
export default class MyCollection extends Component {

    constructor(props) {
        super(props);
        this.personalCollection = [];
        this.savedNewsFeedCollection = [];
        this.state = {
            email: "",
            refreshing: false
        }
        this.onLoad = this.onLoad.bind(this);
        this.getSavedNewsFeedArtCollecton = this.getSavedNewsFeedArtCollecton.bind(this);
    }

    componentWillMount() {
        ///this.onRefresh();
        this.onLoad();
        this.getSavedNewsFeedArtCollecton();
    }

    componentDidMount() {
        //  this.setState({ email: Firebase.registrationInfo.email });
    }

    getSavedNewsFeedArtCollecton() {
        const uid = Firebase.registrationInfo.UID;
        Firebase.databaseRef.child(`/SavedNewsFeedItems/${uid}`).on('value', (childSnapshot) => {
            childSnapshot.forEach((doc) => {
                var artItem = {
                    department: doc.toJSON().department,
                    title: doc.toJSON().title,
                    creditline: doc.toJSON().creditline,
                    pageURL: doc.toJSON().pageURL,
                    culture: doc.toJSON().culture,
                    accessionyear: doc.toJSON().accessionyear,
                    primaryimageURL: doc.toJSON().primaryimageURL,
                    id: doc.toJSON().id
                }
                //  console.log(doc.toJSON());

                this.savedNewsFeedCollection.push(artItem);
            });
        });
        this.setState({ refreshing: false });
        console.log(this.savedNewsFeedCollection);
    }


    /*  renderItem(item) {
          console.log(this.personalCollection);
          debugger;
          return (
              <PersonalCollectionArtItem event={item} />
          )
      }
  */

    renderItem(item) {
        console.log(this.personalCollection);
        debugger;
        return (
            <NewsFeedArtItem event={item} />
        )
    }

    onLoad() {
        this.setState({ refreshing: true });
        const uid = Firebase.registrationInfo.UID;
        Firebase.databaseRef.child(`/SavedArtItems/${uid}`).on('value', (childSnapshot) => {
            childSnapshot.forEach((doc) => {
                var artItem = {
                    imageURL: doc.toJSON().imageURL,
                    title: doc.toJSON().title,
                    author: doc.toJSON().author,
                    pageURL: doc.toJSON().pageURL,
                    id: doc.toJSON().id,
                    //  otherInformation:doc.toJSON().otherInformation,
                    // userId:doc.toJSON().userId
                }
                //  console.log(doc.toJSON());

                this.personalCollection.push(artItem);
            });
        });
        this.setState({ refreshing: false });
        console.log(this.personalCollection);
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
                <FlatList style={styles.containerList}
                    data={this.personalCollection}
                    renderItem={({ item }) => this.renderItem(item)}
                    keyExtractor={(item) => item.id}
                />



            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        paddingLeft: 10,
        width: '100%'
    },
    containerList: {
        flex: 1,
        paddingTop: 0,
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
        margin: 10
    }
})