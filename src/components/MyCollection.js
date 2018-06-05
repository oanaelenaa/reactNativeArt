import React, { Component } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Button, FlatList, Modal,Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
//import {MapView} from 'react-native-maps';
export default class MyCollection extends Component {

    constructor() {
        super();
        this.state = {
            title: 'My events for this year',
            visibleAddEvent: false,
            eventList: [],
            latitude:null,
            longitude:null
        }
    }

    componentWillMount() {
        this.getCoordinates();
        this.loadPlaces();
    }

    componentDidMount() {
        this.getCoordinates();
    }

    getCoordinates(){
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
     
    
    loadPlaces(){
       /// var url='https://maps.googleapis.com/maps/api/place/radarsearch/json';
     
       var location="46.7666872,23.5996782"
       params ={location:location,type:"museum",key:"AIzaSyCWU8IjM7VbjRw37ZXX5GwLnZPddQRw4lU",radius:"5000"}
        var url2=`https://maps.googleapis.com/maps/api/place/radarsearch/json?key=${encodeURIComponent(params.key)}&location=${encodeURIComponent(params.location)}&radius=${encodeURIComponent(params.radius)}&type=${encodeURIComponent(params.type)}`
        console.log(url2);
        fetch(url2)
        .then(response => response.json())
        .then(data =>{
            console.log("Dataa",data);     
        })

    }
    
    renderItem(item) {
        return (
            <ArtItem addevent={item}/>
        )
    }

    render() {
        return (
            <View style={styles.container}>
            <TouchableOpacity
   style={{
       borderWidth:1,
       borderColor:'rgba(0,0,0,0.2)',
       alignItems:'center',
       justifyContent:'center',
       width:100,
       height:100,
       backgroundColor:'#fff',
       borderRadius:100,
     }}
 >
   <Icon name={"user"}  size={60} color="#01a699" />
 </TouchableOpacity>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        paddingLeft:10,
        width: '100%'
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center'
    }
})