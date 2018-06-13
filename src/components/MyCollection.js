import React, { Component } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Button, FlatList, Modal, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PersonalCollectionArtItem from '../models/PersonalCollectionArtItem';
import Firebase from './Firebase';
export default class MyCollection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            personalCollection: [],
            email: "",
            refreshing: false
        }
        this.onLoad=this.onLoad.bind(this);
    }

    componentWillMount() {
        ///this.onRefresh();
        this.onLoad();
    }

    componentDidMount() {
    //  this.setState({ email: Firebase.registrationInfo.email });
    }

   /*  loadData() {
         fetch('https://api.harvardartmuseums.org/object?apikey=3c32a450-65e8-11e8-85de-6b944c9ddaed')
             .then(response => response.json())
             .then(data => {
                 this.setState({
                     personalCollection: data.records
                 })
                 console.log(this.state.personalCollection)
             })
     }*/

    renderItem(item) {
        ///item.primaryimageurl="";
        return (
            <PersonalCollectionArtItem event={item} />
        )
    }

    onLoad() {
       this.setState({ refreshing: true });
        const uid="UyX1xi8HPKOtKktDLZXKyD2rzfu2";
        Firebase.databaseRef.child("/SavedArtItems/UyX1xi8HPKOtKktDLZXKyD2rzfu2").on('value', (childSnapshot) => {
            childSnapshot.forEach((doc) => {
                var artItem = {
                    imageURL: doc.toJSON().imageURL,
                    title: doc.toJSON().title,
                    author:doc.toJSON().author,
                    pageURL: doc.toJSON().pageURL,
                  //  otherInformation:doc.toJSON().otherInformation,
                   // userId:doc.toJSON().userId
                }

                this.state.personalCollection.push(artItem);
            });
        });
        this.setState({ refreshing: false });
        console.log(this.state.personalCollection);
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
               

                
            </View>
        );
    }
}
/*
   <FlatList
                    data={this.state.personalCollection}
                    renderItem={({ item }) => this.renderItem(item)}
                    keyExtractor={(item) => item.id.toString()}
                    />
 */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        paddingLeft: 10,
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