import React, { Component } from 'react';
import { TouchableOpacity, TouchableHighlight, View, ActivityIndicator, Text, StyleSheet, Button, FlatList, Modal, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView from 'react-native-maps';
import MuseumModel from './MuseumModel';
//import GooglePlacesInput from './MuseumFinder/searchGoogle';
//var GooglePlacesInput=require('../components/MuseumFinder/searchGoogle');
export default class MuseumsFinder extends Component {
    constructor(props) {
        super(props);
        this.museumsRef = [];
        this.museumsDetailsList = [];
        this.state = {
            latitude: null,
            longitude: null,
            isModalVisible: true,
            loaded: false
        }
        this.getMuseumsEU = this.getMuseumsEU.bind(this);
        this.showLocationsDetails = this.showLocationsDetails.bind(this);
    }
    componentWillMount() {
        //       this.getCoordinates();
        this.getCoordinates();
        //   this.loadPlaces();
        //   this.getMuseumsEU();
    }

    componentDidMount() {
    }
    getMuseumsEU() {
        debugger;
        var apikey = "AdHmgwgdm";
        var url2 = "http://museums.eu/search/index?keyword=Cluj+napoca&documenttype=";
        fetch(url2)
            .then(response => response.json())
            .then(data => {
                console.log("Dataa", data);
            })
    }
    /*
    getMuseumsEU() {
        var apikey = "AdHmgwgdm";
        var url2 = "https://www.europeana.eu/api/v2/search.json?wskey=AdHmgwgdm&query=museums";
        fetch(url2)
            .then(response => response.json())
            .then(data => {
                console.log("Dataa", data);
            })
            .catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(error.code)
                console.log(error.message)
            });
    }
     */

    getCoordinates() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log(position);
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                });
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
        );
    }

    loadPlaces() {
        // debugger;
        /// var url='https://maps.googleapis.com/maps/api/place/radarsearch/json';
        var location = "46.7666872,23.5996782"
        params = { location: location, type: "museum", key: "AIzaSyCWU8IjM7VbjRw37ZXX5GwLnZPddQRw4lU", radius: "5000" }
        var url2 = `https://maps.googleapis.com/maps/api/place/radarsearch/json?key=${encodeURIComponent(params.key)}&location=${encodeURIComponent(params.location)}&radius=${encodeURIComponent(params.radius)}&type=${encodeURIComponent(params.type)}`
        console.log(url2);
        fetch(url2)
            .then(response => response.json())
            .then(data => {
                console.log("Dataa", data);
                this.museumsRef = data.results;
                this.showLocationsDetails();
            })
    }

    showLocationsDetails() {
        this.museumsDetailsList = [];
        this.museumsRef.map(function (x, i) {// {$}
            var place_id = x.place_id;
            var url = `https://maps.googleapis.com/maps/api/place/details/json?key=${encodeURIComponent(params.key)}&placeid=${place_id}`;
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    this.museumsDetailsList.push(data);
                });
        })
        console.log(this.museumsDetailsList, "listaaaaa");
    }

    renderItem(item) {
        debugger
        return (
            <MuseumModel event={item} />
        )
    }

    render() {
        if (this.state.loaded == false) {
            console.log("not loaded");
            return (
                <ActivityIndicator size="large" color='#8979B7' />
            )
        }
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.museumsDetailsList}
                    renderItem={({ item }) => this.renderItem(item)}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flex: 1,
        paddingTop: 0,
        width: '100%'
    },

});
