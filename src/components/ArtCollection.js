import React, { Component } from 'react';
import { TouchableOpacity,TouchableHighlight, View, Text, StyleSheet, Button, FlatList, Modal,Alert } from 'react-native';
import ArtItem from './ArtItem';
import { SearchBar } from 'react-native-elements'
export default class ArtCollection extends Component {

    constructor() {
        super();
        this.state = {
            title: 'art news feed',
            visibleAddEvent: false,
            articles: [],
            lastPress: 0
        }
    }

    componentWillMount() {
       this.loadData();
    }
    onPress() {
        debugger;
        var delta = new Date().getTime() - this.state.lastPress;
    
        if(delta < 200) {
          // double tap happend
          console.log("double");
        }
    
        this.setState({
          lastPress: new Date().getTime()
        })
      }

    loadData(){
        fetch('https://api.harvardartmuseums.org/object?apikey=3c32a450-65e8-11e8-85de-6b944c9ddaed')
        .then(response => response.json())
        .then(data =>{
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
    smartSearch(){

    }

    render() {
        return (
            <View style={styles.container}>

    <SearchBar
            round
            onChangeText={this.smartSearch()}
            onClearText={this.smartSearch()}
            placeholder='or maybe we can look up for you...' />
               <FlatList
                    data={this.state.articles}
                    renderItem={({item})=> this.renderItem(item)}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
        );
    }
}

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