import React, { Component } from 'react';
import { TouchableOpacity, TouchableHighlight, AsyncStorage, View, ActivityIndicator, Text, StyleSheet, Button, FlatList, Modal, Alert } from 'react-native';
import MuseumModel from './MuseumModel';
import { Popup } from 'react-native-map-link';
export default class MuseumsFinder extends Component {
    constructor(props) {
        super(props);
        this.museumsRef = [];
        this.state = {
            latitude: "46.770439",
            longitude: "23.591423",
            destinationLatitude: "",
            destinationLongitude: "",
            loaded: false,
            museumsDetailsList: [],
            isMapsModalVisible: false,
            destinationTitle: "Museum"
        }
        this.showLocationsDetails = this.showLocationsDetails.bind(this);
        this.loadPlaces = this.loadPlaces.bind(this);
        this.orderMuseumsByRating = this.orderMuseumsByRating.bind(this);
        this.getCoordinates = this.getCoordinates.bind(this);
        this.handleOpenInMaps = this.handleOpenInMaps.bind(this);
    }

    componentWillMount() {
     
    }

    componentDidMount() {
        this.getCoordinates();
    }

    /* displayMapsPopup() {
         if (this.state.isMapsModalVisible) {
             return (<GmapsDirections></GmapsDirections>);
         }
     }*/

    getCoordinates() {
        navigator.geolocation.watchPosition(
            (position) => {
                console.log(position);
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                });
                this.loadPlaces();
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
        );
    }


    loadPlaces() {
    //    var location = "46.7666872,23.5996782"
        var location = this.state.latitude + ',' + this.state.longitude;
        params = { location: location, type: "museum", key: "AIzaSyCWU8IjM7VbjRw37ZXX5GwLnZPddQRw4lU", radius: "500" }
        var url2 = `https://maps.googleapis.com/maps/api/place/radarsearch/json?key=${encodeURIComponent(params.key)}&location=${encodeURIComponent(params.location)}&radius=${encodeURIComponent(params.radius)}&type=${encodeURIComponent(params.type)}`
        console.log(url2);
        fetch(url2)
            .then(response => response.json())
            .then(data => {
                console.log("Dataa", data);
                this.museumsRef = data.results;
                this.showLocationsDetails();
                /// this.state.loaded = true;
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

    handleOpenInMaps = (latitude, longitude, name) => {
        debugger
        this.setState({
            destinationLatitude: latitude,
            destinationLongitude: longitude,
            destinationTitle: name,
            isMapsModalVisible: true
        })
    }


    renderItem(item) {
        return (
            <MuseumModel onOpenInMaps={this.handleOpenInMaps} event={item} />
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
        if (this.state.loaded == false) {
            return (
                <View>
                    <ActivityIndicator size="large" color='#8979B7' />
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <FlatList
                        data={this.state.museumsDetailsList}
                        renderItem={({ item }) => this.renderItem(item)}
                        keyExtractor={(item) => item.id}
                    />
                    <Popup
                        isVisible={this.state.isMapsModalVisible}
                        onCancelPressed={() => this.setState({ isMapsModalVisible: false })}
                        onAppPressed={() => this.setState({ isMapsModalVisible: false })}
                        onBackButtonPressed={() => this.setState({ isMapsModalVisible: false })}
                        options={{
                            latitude: this.state.destinationLatitude,
                            longitude: this.state.destinationLatitude,
                            sourceLatitude: this.state.latitude,  // optionally specify starting location for directions
                            sourceLongitude: this.state.longitude,  // not optional if sourceLatitude is specified
                            title: this.state.destinationTitle,
                            dialogTitle: 'Choose an app to get direction',
                            dialogMessage: this.state.destinationTitle,
                            cancelText: 'Cancel'
                        }}
                        modalProps={{ // you can put all react-native-modal props inside.
                            animationIn: 'slideInUp'
                        }}
                        appsWhiteList={['google-maps']}
                    />
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flex: 1,
        paddingTop: 0,
        width: '100%'
    },
    spinnerStyle:{
      //  size:"large",
        color:'#8979B7',
        flex: 1,
        marginTop:240,
        justifyContent: 'center',
        alignItems:'center'
    }

});
