import React, { Component } from 'react';
import { TouchableOpacity, TouchableHighlight, View, Text, StyleSheet, Button, FlatList, Modal, Alert } from 'react-native';
import NewsFeedArtItem from '../../models/NewsFeedArtItem';
import Spinner from 'react-native-loading-spinner-overlay';
import Firebase from '../Firebase';
import SavedNewsItem from '../../models/SavedNewsItem';
export default class SavedNewsList extends Component {

    constructor() {
        super();
        this.savedNewsFeedCollection= [],
        this.state = {
            visible: false,
            lastPress: 0
        }
        this.loadData = this.loadData.bind(this);
    }

    componentWillMount() {
        this.loadData();
    }

    componentDidMount() {
    }


    loadData() {
        //debugger;
        const uid = Firebase.registrationInfo.UID;
        var list = [];//databaseRef.
        Firebase.databaseRef.child(`/SavedNewsFeedItems/${uid}`).on('value', (childSnapshot) => {
            childSnapshot.forEach((doc) => {
               // debugger;
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
        this.savedNewsFeedCollection=list;
        console.log(this.savedNewsFeedCollection);
    }


    smartSearch() {
    }

    renderItem(item) {
        return (
            <SavedNewsItem event={item} />
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.savedNewsFeedCollection}
                    renderItem={({ item }) => this.renderItem(item)}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
        );
    }
}
//                <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{ color: '#FFF' }}>

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