import React, { Component } from 'react';
import { TouchableOpacity, TouchableHighlight, View, Text, TextInput, StyleSheet, Button, FlatList, ActivityIndicator } from 'react-native';
import NewsFeedArtItem from './NewsFeedArtItem';
const categories = ['object', 'person', 'exhibition', 'publication', 'gallery', 'spectrum', 'place', 'period'];
import Toast from 'react-native-toast-native';
import config from './../../../config';

export default class ArtCollection extends Component {

    constructor() {
        super();
        this.state = {
            visible: false,
            artItems: [],
            lastPress: 0,
            loaded: false,
            searchTerm: ''
        }
        this.smartSearch = this.smartSearch.bind(this);
        this.loadSearchData = this.loadSearchData.bind(this);
        this.showToastMessage = this.showToastMessage.bind(this);
    }

    componentWillMount() {
        this.loadData();
    }

    componentDidMount() {

    }

    showToastMessage = (isSuccessful) => {
        if (isSuccessful) {
            Toast.show("Successfully added to your collection");
        } else {
            Toast.show("Something went wrong, please check your internet connection", styles.styleError);
        }
    }


    loadData() {
        fetch('https://api.harvardartmuseums.org/object?apikey=3c32a450-65e8-11e8-85de-6b944c9ddaed&size=100')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    artItems: data.records,
                    visible: !this.state.visible,
                    loaded: true
                })
            })
    }

    loadSearchData() {
        var result = [];
        this.setState({
            loaded:false
        })
        fetch(`https://api.harvardartmuseums.org/object?apikey=3c32a450-65e8-11e8-85de-6b944c9ddaed&keyword=${encodeURIComponent(this.state.searchTerm)}&size=200`)
            .then(response => response.json())
            .then(data => {
                result = data.records.filter(item => item.primaryimageurl != null)
                this.setState({
                    artItems: result,
                    visible: !this.state.visible,
                    loaded: true
                })
                console.log(result);
            })
    }

    smartSearch(text) {
        this.setState({
            searchTerm: text,
        })
    }


    renderItem(item) {
        return (
            <NewsFeedArtItem event={item} onSaveItem={this.showToastMessage} />
        )
    }

    render() {
        if (this.state.loaded == false) {
            return (
                <View style={styles.centerLoader}>
                    <ActivityIndicator size="large" color='#8979B7' />
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <View style={styles.searchC}>
                    <TextInput
                        style={styles.TextInputStyleClass}
                        onChangeText={(text) => this.smartSearch(text)}
                        underlineColorAndroid='transparent'
                        placeholder="Search Here"
                    ///onSubmitEditing={this.loadSearchData}
                    />
                    <TouchableOpacity style={styles.SearchB} onPress={() => {
                        this.loadSearchData();
                    }}>
                        <Text>Search</Text>

                    </TouchableOpacity>
                </View>
                <FlatList
                    data={this.state.artItems}
                    renderItem={({ item }) => this.renderItem(item)}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
        );
    }
}

const style = {
    backgroundColor: "#29AB87"

}
const styles = StyleSheet.create({
    /* activity: {
         ///size:large,
         color:'#8979B7',
         justifyContent: 'center',
         alignItems: 'center'
     },*/
    container: {
        flex: 1,
        paddingTop: 0,
        width: '100%',
    },
    searchC: {
        flexDirection: 'row',
    },
    centerLoader: {
        justifyContent: 'center'
    },
    TextInputStyleClass: {
        textAlign: 'center',
        height: 40,
        borderWidth: 1,
        borderColor: '#009688',
        borderRadius: 7,
        backgroundColor: "#FFFFFF",
        width:300 
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
    SearchB:{
        backgroundColor: "#8979B7",
		padding: 0,
		height: 40,
		width: 60,
		borderRadius: 2,
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20
    },
    toastStyle: {
        backgroundColor: '#29AB87',
        color: '#FFFFFF'
    }
})