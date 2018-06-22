import React, { Component } from 'react';
import { TouchableOpacity, TouchableHighlight, View, Text, StyleSheet, Button, FlatList, Modal, Alert } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Firebase from '../../Firebase';
import PersonalCollectionArtItem from './PersonalCollectionArtItem';
export default class Scanslist extends Component {

    constructor() {
        super();
        this.personalCollection=[],
        this.state = {
            visible: false,
            lastPress: 0
        }
        this.loadData=this.loadData.bind(this);
    }

    componentWillMount() {
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        ///debugger;
        this.setState({ refreshing: true });
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
        this.personalCollection=list;
    }



    renderItem(item) {
        return (
            <PersonalCollectionArtItem event={item} />
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.personalCollection}
                    renderItem={({ item }) => this.renderItem(item)}
                    keyExtractor={(item) => item.id.toString()}
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