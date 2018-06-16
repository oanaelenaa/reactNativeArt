import React, { Component } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Button, FlatList, Modal, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ListItem, List } from 'react-native-elements';
import PersonalCollectionArtItem from '../models/PersonalCollectionArtItem';
import NewsFeedArtItem from '../models/NewsFeedArtItem';
import Firebase from './Firebase';
export default class MyCollection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            refreshing: false,
            personalCollection: [],
            savedNewsFeedCollection: []
        }
        this.loadSavedArtItems = this.loadSavedArtItems.bind(this);
        this.getSavedNewsFeedArtCollecton = this.getSavedNewsFeedArtCollecton.bind(this);
    }

    componentWillMount() {
        ///this.onRefresh();
        this.loadSavedArtItems();
        this.getSavedNewsFeedArtCollecton();
        console.log(this.state.personalCollection, this.state.savedNewsFeedCollection);
    }

    componentDidMount() {
        this.setState({ email: Firebase.registrationInfo.email });
    }

    //        const { department, creditline, culture, accessionyear, title, primaryimageurl, pageURL,id } = this.props.event;


    async getSavedNewsFeedArtCollecton() {
        const uid = Firebase.registrationInfo.UID;
        var list = [];
        Firebase.databaseRef.child(`/SavedNewsFeedItems/${uid}`).on('value', (childSnapshot) => {
            childSnapshot.forEach((doc) => {
                var artItem = {
                    department: doc.toJSON().department,
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
        });
        this.setState({ refreshing: false });
      //  this.setState({savedNewsFeedCollection:list});
        this.state.savedNewsFeedCollection = list;
    }
    /*  async getSavedNewsFeedArtCollecton() {
          this.setState({ refreshing: true });
          const uid = Firebase.registrationInfo.UID;
          var list=[];
          Firebase.databaseRef.child(`/SavedNewsFeedItems/${uid}`).on('value', (childSnapshot) => {
              childSnapshot.forEach((doc) => {
                 list.push(doc.toJSON());
                 console.log(doc.toJSON(),"Fff");
              });
          });
          console.log(list,"lo");
          this.setState({savedNewsFeedCollection:list});
          this.setState({ refreshing: false});
          console.log(this.state.savedNewsFeedCollection,"Dddddd");
      }*/



    renderItem(item) {
        debugger;
        console.log(this.state.personalCollection, "hgc");
        return (
            <NewsFeedArtItem event={item} />
        )
    }


    /* renderItemNF(item) {
         item.id="deeee";
         console.log(this.savedNewsFeedCollection,"sed");
         return (
             <NewsFeedArtItem event={item} />
         )
     }*/
    /*async onLoad() {
        this.setState({ refreshing: true });
        const uid = Firebase.registrationInfo.UID;
        var list=[];
        Firebase.databaseRef.child(`/SavedArtItems/${uid}`).on('value', (childSnapshot) => {
            childSnapshot.forEach((doc) => {
               list.push(doc.toJSON());
               console.log(doc.toJSON(),"Fff");
            });
        });
        console.log(list,"lo");
        this.setState({personalCollection:list});
        this.setState({ refreshing: false});
        console.log(this.state.personalCollection,"Ddd");
        }*/

    /* loadData() {
    fetch('https://api.harvardartmuseums.org/object?apikey=3c32a450-65e8-11e8-85de-6b944c9ddaed')
        .then(response => response.json())
        .then(data => {
            this.setState({
                artItems: data.records
            })
        })
}
     */

    loadSavedArtItems() {
        /* this.setState({ refreshing: true });
         const uid = Firebase.registrationInfo.UID;
         var list=[];
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
         });
         this.setState({ refreshing: false });
    //     this.setState({ personalCollection: list });
         this.state.personalCollection=list;*/
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
                <FlatList
                    data={this.state.savedNewsFeedCollection}
                    renderItem={({ item }) => <Text>{item.title}</Text>}
                />
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
    logOutButton: {
        paddingTop: 10,
        paddingLeft: 100
    },
    lineStyle: {
        borderWidth: 0.5,
        borderColor: 'gray',
        margin: 0
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