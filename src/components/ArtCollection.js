import React, { Component } from 'react';
import { TouchableOpacity,TouchableHighlight, View, Text, StyleSheet, Button, FlatList, Modal,Alert } from 'react-native';
import ArtItem from './ArtItem';
import { SearchBar } from 'react-native-elements'
//,{ SlideAnimation }
/*const slideAnimation = new SlideAnimation({
    slideFrom: 'bottom',
  });  
  <PopupDialog
                    ref={(popupDialog) => { this.popupDialog = popupDialog; }}
                >
                    <View>
                        <TextInput style={styles.input} placeholder="username" keyboardTyppe="email-address" value={this.state.email} onChangeText={(email) => this.setState({ email })} />

                        <TextInput style={styles.input} placeholder="password" secureTextEntry value={this.state.password} onChangeText={(password) => this.setState({ password })} />

                        <TouchableOpacity onPress={() => this.onLoginPressed()} style={styles.buttonContainer}>
                            <Text style={styles.buttonText}>LOGIN</Text></TouchableOpacity>
                    </View>

                </PopupDialog>*/
export default class ArtCollection extends Component {

    constructor() {
        super();
        this.state = {
            title: 'My events for this year',
            visibleAddEvent: false,
            articles: [],         
            lastPress: 0
        }
    }
    componentWillMount() {
        this.loadData();
        
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
            <ArtItem addedToCollectionNew={this.addedToCollectionNew.bind(this)} event={item}/>
        )
    }
    smartSearch(){

    }
    addedToCollectionNew(){
        
    }

    async onLoginPressed() {
        //var usersRef = firebase.database().ref().child('/Users');
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(function () {
                console.log(firebase.auth().currentUser.email + "!");
               /* this.popupDialog.dismiss(() => {
                    console.log('callback - will be called immediately')
                  });*/
            }).catch(function (error) {
                alert(error.code);
                alert(error.message);
            });
    }

    renderItem(item) {
        return (
            <ArtItem addedToCollectionNew={this.addedToCollectionNew.bind(this)} event={item}/>
        )
    }

    /*<TextInput style={styles.input} placeholder="username" keyboardTyppe="email-address" value={this.state.email} onChangeText={(email) => this.setState({ email })} />

        <TextInput style={styles.input} placeholder="password" secureTextEntry value={this.state.password} onChangeText={(password) => this.setState({ password })} />

        <TouchableOpacity onPress={() => this.onLoginPressed()} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>LOGIN</Text>
     */

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