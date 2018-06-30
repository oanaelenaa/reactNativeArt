import React, { Component } from 'react';
import { TouchableOpacity, TouchableHighlight, View, Text, StyleSheet, Button, FlatList, Modal, Alert, ActivityIndicator } from 'react-native';
import Firebase from '../../../utils/authentication/Firebase';
import PersonalCollectionArtItem from './PersonalCollectionArtItem';
import GridView from 'react-native-super-grid';
export default class Scanslist extends Component {

    constructor() {
        super();
        this.state = {
            visible: false,
            lastPress: 0,
            loaded: false,
            personalCollection: []
        }
        this.loadData = this.loadData.bind(this);
    }

    componentWillMount() {
        this.loadData();

    }

    componentDidMount() {
        //    this.loadData();
    }

    loadData() {
        debugger;
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
        });
        this.setState({
            refreshing: false,
            loaded: true,
            personalCollection: list
        });

    }



    renderItem(item) {
        return (
            <PersonalCollectionArtItem event={item} />
        )
    }

    render() {
        debugger;
        var items = this.state.personalCollection;
        /* if (this.state.loaded == false) {
             return (
                 <View>
                     <ActivityIndicator size="large" color='#8979B7' />
                 </View>
             )
         }*/
        return (
            <View>
                <GridView
                    itemDimension={130}
                    items={items}
                    renderItem={item => this.renderItem(item)}
                //  keyExtractor={(item) => item.id}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 0,
        width: '100%'
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    preview: {
        height: 200,
        width: 200
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20
    }
})