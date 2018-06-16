import React, { Component } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Button, FlatList, Modal, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PersonalCollectionArtItem from '../models/PersonalCollectionArtItem';
import {MapView} from 'react-native-maps';
//import NewsFeedArtItem from '../models/NewsFeedArtItem';

export default class MuseumsFinder extends Component{
    constructor(props) {
        super(props);
        this.state = {
            latitude: null,
            longitude: null
        }
        this.getMuseumsEU=this.getMuseumsEU.bind(this);
    }
    componentWillMount() {
 //       this.getCoordinates();
   //     this.loadPlaces();
        this.getMuseumsEU();
    }

    componentDidMount() {
        this.getCoordinates();
    }
    getMuseumsEU(){
        var apikey="AdHmgwgdm";
        var url2="http://museums.eu/search/index?keyword=Cluj+napoca&documenttype=";
        fetch(url2)
            .then(response => response.json())
            .then(data => {
                console.log("Dataa", data);
            })
    }

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
        /// var url='https://maps.googleapis.com/maps/api/place/radarsearch/json';
        var location = "46.7666872,23.5996782"
        params = { location: location, type: "museum", key: "AIzaSyCWU8IjM7VbjRw37ZXX5GwLnZPddQRw4lU", radius: "5000" }
        var url2 = `https://maps.googleapis.com/maps/api/place/radarsearch/json?key=${encodeURIComponent(params.key)}&location=${encodeURIComponent(params.location)}&radius=${encodeURIComponent(params.radius)}&type=${encodeURIComponent(params.type)}`
        console.log(url2);
        fetch(url2)
            .then(response => response.json())
            .then(data => {
                console.log("Dataa", data);
            })

    }





}