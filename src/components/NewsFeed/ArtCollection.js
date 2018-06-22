import React, { Component } from 'react';
import { TouchableOpacity, TouchableHighlight, View, Text, TextInput, StyleSheet, Button, FlatList, ActivityIndicator } from 'react-native';
import NewsFeedArtItem from './NewsFeedArtItem';
import { SearchBar } from 'react-native-elements';
//import Toaster from 'react-native-toaster';
//import { connect } from 'react-redux';
const categories = ['object', 'person', 'exhibition', 'publication', 'gallery', 'spectrum', 'place', 'period'];
//const mapStateToProps = ({ toastMessage }) => ({ toastMessage })
//<Toaster message={this.props.toastMessage} />
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

    }

    componentWillMount() {
        this.loadData();
        //this.loadSearchData();
    }

    componentDidMount() {

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
        debugger;
        var result = [];
        //${encodeURIComponent(this.state.searchTerm)}
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
            loaded: false
        })
        console.log(event);
    }


    renderItem(item) {
        return (
            <NewsFeedArtItem event={item} />
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
                <TextInput
                    style={styles.TextInputStyleClass}
                    onChangeText={(text) => this.smartSearch(text)}
                    //  value={this.state.searchTerm}
                    underlineColorAndroid='transparent'
                    placeholder="Search Here"
                    onSubmitEditing={this.loadSearchData}
                />
                <FlatList
                    data={this.state.artItems}
                    renderItem={({ item }) => this.renderItem(item)}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
        );
    }
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
    centerLoader: {
        justifyContent: 'center'
    },
    TextInputStyleClass: {

        textAlign: 'center',
        height: 40,
        borderWidth: 1,
        borderColor: '#009688',
        borderRadius: 7,
        backgroundColor: "#FFFFFF"

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