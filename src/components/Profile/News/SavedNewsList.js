import React, { Component } from 'react';
import { TouchableOpacity, TouchableHighlight, View, Text, ActivityIndicator, StyleSheet, Button, FlatList, Modal, Alert } from 'react-native';
import Firebase from '../../../utils/authentication/Firebase';
import SavedNewsItem from './SavedNewsItem';
import GridView from 'react-native-super-grid';
export default class SavedNewsList extends Component {

    constructor() {
        super();
        this.savedNewsFeedCollection = [],
            this.state = {
                visible: false,
                lastPress: 0,
                loaded: false,
            }
        this.loadData = this.loadData.bind(this);
    }

    componentWillMount() {
    }

    componentDidMount() {
        this.loadData();

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
                    people:doc.toJSON().people,
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
        this.setState({
            refreshing: false, loaded: true
        });
        this.savedNewsFeedCollection = list;
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
        debugger;
        var items = this.savedNewsFeedCollection;
      /*  if (this.state.loaded == false) {
            return (
                <View>
                    <ActivityIndicator size="large" color='#8979B7' />
                </View>
            )
        }*/
        return (
                <GridView
                    itemDimension={130}
                    items={items}
                    renderItem={item => this.renderItem(item)}
                // keyExtractor={(item) => item.id.toString()}
                />
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