import React, { Component } from 'react';
import { TouchableOpacity, TouchableHighlight, AsyncStorage, View, ActivityIndicator, Text, StyleSheet, Button, FlatList, Modal, Alert } from 'react-native';
import MapView from 'react-native-maps';
import MuseumModel from './MuseumModel';
//import GooglePlacesInput from './MuseumFinder/searchGoogle';
//var GooglePlacesInput=require('../components/MuseumFinder/searchGoogle');
//import { Popup } from 'react-native-map-link';
import GmapsDirections from '../../utils/GmapsDirections';
export default class MuseumsFinder extends Component {
    constructor(props) {
        super(props);
        this.museumsRef = [];
        this.state = {
            latitude: null,
            longitude: null,
            isModalVisible: true,
            loaded: true,
            museumsDetailsList: [],
            showMaps: false
        }
        this.showLocationsDetails = this.showLocationsDetails.bind(this);
        this.loadPlaces = this.loadPlaces.bind(this);
        this.orderMuseumsByRating = this.orderMuseumsByRating.bind(this);
        this.displayResponseModal = this.displayResponseModal.bind(this);
        this.getCoordinates = this.getCoordinates.bind(this);
    }

    componentWillMount() {
        //       this.getCoordinates();
        //this.getCoordinates();
        // debugger;
        //this.museumsDetailsList = AsyncStorage.getItem('locatii');
        //console.log(this.museumsDetailsList);

        //   this.getMuseumsEU();
    }

    componentDidMount() {
        //  this.loadPlaces();
    ///    this.displayResponseModal();
        this.getCoordinates();
    }

    getCoordinates() {
        debugger;
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



    _toggleModal = () =>
        this.setState({ showMaps: !this.state.showMaps });


    displayResponseModal() {
        debugger
        if (this.state.showMaps) {
            // return null;
            return (<GmapsDirections />);
        }
    }




    loadPlaces() {
        //new key:AIzaSyCMgNuq4LRHAM0q7qrew9EPuqkWtV8vIOQ
        /// var url='https://maps.googleapis.com/maps/api/place/radarsearch/json';
        var location = "46.7666872,23.5996782"
        params = { location: location, type: "museum", key: "AIzaSyCWU8IjM7VbjRw37ZXX5GwLnZPddQRw4lU", radius: "1000" }
        var url2 = `https://maps.googleapis.com/maps/api/place/radarsearch/json?key=${encodeURIComponent(params.key)}&location=${encodeURIComponent(params.location)}&radius=${encodeURIComponent(params.radius)}&type=${encodeURIComponent(params.type)}`
        console.log(url2);
        fetch(url2)
            .then(response => response.json())
            .then(data => {
                console.log("Dataa", data);
                this.museumsRef = data.results;
                this.showLocationsDetails();
                this.state.loaded = true;
            })
    }

    showLocationsDetails() {
        var result = [];
        this.museumsRef.map(function (x, i) {
            var place_id = x.place_id;
            var url = `https://maps.googleapis.com/maps/api/place/details/json?key=${encodeURIComponent(params.key)}&placeid=${place_id}`;
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    result.push(data.result);
                });
        })
        this.setState({
            loaded: true,
            museumsDetailsList: result
        })
        //      this.orderMuseumsByRating(); Ï

    }

    renderItem(item) {
        return (
            <MuseumModel event={item} />
        )
    }

    orderMuseumsByRating(list1) {
        if (list1.length = 0)
            return [];
        var list = list1
            .filter(item => item.rating != null)
            .sort(
                function (a, b) {
                    return (b.rating - a.rating)
                }
            )
        return list;

    }

    render() {
        ///this._toggleModal;
        ///  this.displayResponseModal;
        ///      { this.displayResponseModal(); }
       
         if (this.state.loaded == false) {
              return (
                  <View>
                      <ActivityIndicator size="large" color='#8979B7' />
                  </View>
              )
          }
          return (
              <View style={styles.container}>
                  <FlatList
                      data={this.orderMuseumsByRating(this.state.museumsDetailsList)}
                      renderItem={({ item }) => this.renderItem(item)}
                      keyExtractor={(item) => item.id}
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
