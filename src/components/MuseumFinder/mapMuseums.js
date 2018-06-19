import React, { Component } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Button, FlatList, Modal, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PersonalCollectionArtItem from '../models/PersonalCollectionArtItem';
import MapView from 'react-native-maps';
//import GooglePlacesInput from './MuseumFinder/searchGoogle';
//import NewsFeedArtItem from '../models/NewsFeedArtItem';
//var GooglePlacesInput=require('../components/MuseumFinder/searchGoogle');
export default class MapMuseums extends Component {
    constructor(props) {
        super(props);
        this.museumsRef = [];
        this.state = {
            latitude: null,
            longitude: null
        }
        this.getMuseumsEU = this.getMuseumsEU.bind(this);
        this.showLocationsDetails = this.showLocationsDetails.bind(this);
    }
    componentWillMount() {
        //       this.getCoordinates();
       // this.loadPlaces();
        //   this.getMuseumsEU();
    }

    componentDidMount() {
        this.getCoordinates();
    }
   

    initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -33.866, lng: 151.196},
          zoom: 15
        });

        var infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);

        service.getDetails({
          placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4'
        }, function(place, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            var marker = new google.maps.Marker({
              map: map,
              position: place.geometry.location
            });
            google.maps.event.addListener(marker, 'click', function() {
              infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
                'Place ID: ' + place.place_id + '<br>' +
                place.formatted_address + '</div>');
              infowindow.open(map, this);
            });
          }
        });
      }
   
    render() {
        return (
            <View>
               
            </View>
        );
    }
}
