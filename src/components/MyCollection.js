import React, { Component } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Button, FlatList, Modal,Alert,Icon } from 'react-native';
//import ArtItem from './ArtItem';
let resultsCache = [];
export default class MyCollection extends Component {

    constructor() {
        super();
        this.state = {
            title: 'My events for this year',
            visibleAddEvent: false,
            eventList: [],
            articles: []
        }
    }

    componentWillMount() {
      /// this.loadData();
    }

    loadData(){
        fetch('https://api.harvardartmuseums.org/object?apikey=3c32a450-65e8-11e8-85de-6b944c9ddaed')
        .then(response => response.json())
        .then(data =>{
           //s resultsCache=_.concat(resultsCache,_.toArray(data))
           this.setState({
                articles:data.records
            })           
        })

    }
    
    renderItem(item) {
        return (
            <ArtItem event={item}/>
        )
    }

    render() {
        return (
            <View style={styles.container}>
        
            </View>
        );
    }
/*
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
   <Icon name={"chevron-right"}  size={30} color="#01a699" />
 </TouchableOpacity>

*/
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
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