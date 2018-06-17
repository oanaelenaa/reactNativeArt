import React, { Component } from 'react';
import { TouchableOpacity, TouchableHighlight, View, Text, StyleSheet, Button, FlatList, Modal, Alert } from 'react-native';
import NewsFeedArtItem from '../../models/NewsFeedArtItem';
import { SearchBar } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
const categories = ['object', 'person', 'exhibition', 'publication', 'gallery', 'spectrum', 'place', 'period'];
export default class ArtCollection extends Component {

    constructor() {
        super();
        this.state = {
            visible: false,
            artItems: [],
            lastPress: 0
        }
    }

    componentWillMount() {
        this.loadData();
    }

    componentDidMount() {
    }


    loadData() {
        fetch('https://api.harvardartmuseums.org/object?apikey=3c32a450-65e8-11e8-85de-6b944c9ddaed&size=100')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    artItems: data.records,
                    visible: !this.state.visible
                })
            })
        console.log(this.state.artItems);
    }


    smartSearch() {
    }

    //addedToCollectionNew={this.addedToCollectionNew.bind(this)}
    renderItem(item) {
        return (
            <NewsFeedArtItem event={item} />
        )
    }

    render() {
        //   let items=this.state.artItems;
        return (
            <View style={styles.container}>

                <SearchBar
                    round
                    onChangeText={this.smartSearch()}
                    onClearText={this.smartSearch()}
                    placeholder='or maybe we can look up for you...' />
                    <FlatList
                        data={this.state.artItems}
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
        // justifyContent: 'flex-end',
        // alignItems: 'center',
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