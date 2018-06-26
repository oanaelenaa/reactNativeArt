/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View, TextInput, Keyboard, Button, TouchableOpacity, AsyncStorage, PixelRatio, StatusBar, Image
} from 'react-native';
import Firebase from '../utils/authentication/Firebase';
export default class Login extends Component {
  static navigationOptions = { header: null }

  constructor(props) {
    super(props)
    this.state = {
      email: "",
      name: "",
      password: "",
      error: "", loading: false, showErrorMessage: false,
      createA: false
    }
    this.goToHomeScreen = this.goToHomeScreen.bind(this);

  }

  componentDidMount() {
    Keyboard.dismiss();
  }

  async logIn() {
    Firebase.auth
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((result) => {
        Firebase.updateFirebaseService(result);
        AsyncStorage.setItem('userToken', result.user.uid);
        this.goToHomeScreen();
      }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error.code)
        console.log(error.message)
      });
  }


  async createAccount() {
    this.setState({
      createA: true
    });
    Firebase.auth//createUserWithEmailAndPassword
      //.setPersistance(Firebase.persistanceLevel)
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((result) => {
        Firebase.updateFirebaseService(result, this.state.name);
        this.writeUserData(result.user.uid, this.state.name);
        AsyncStorage.setItem('userToken', result.user.uid);
        this.goToHomeScreen();
      }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error.code)
        console.log(error.message)
      });
  }


  writeUserData(uid, name) {
    debugger;
    // the_uid can also come from let userId = firebaseApp.auth().currentUser.uid;
    Firebase.database.ref('users/' + uid + '/').set({
      name: name,
    });
  }

  goToHomeScreen() {
    this.props.navigation.navigate('Home');
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          resizeMode="contain"
          style={styles.image}
          source={require("../assets/logoFinal.png")}
        />
        <View style={styles.formContainer}>
          {
            this.state.createA ? <TextInput style={styles.input} placeholder="name" value={this.state.name} onChangeText={(name) => this.setState({ name })} /> : null
          }
          <TextInput style={styles.input} placeholder="username" keyboardTyppe="email-address" value={this.state.email} onChangeText={(email) => this.setState({ email })} />

          <TextInput style={styles.input} placeholder="password" secureTextEntry value={this.state.password} onChangeText={(password) => this.setState({ password })} />
          <View style={styles.buttonsView}>

            <TouchableOpacity onPress={this.createAccount.bind(this)} style={styles.buttonContainer}>
              <Text style={styles.buttonText}>create an account</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonContainer} onPress={() => this.goToHomeScreen()} style={styles.buttonContainer}>
              <Text style={styles.buttonText}>I'll do it later on</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
/* <TouchableOpacity onPress={this.logIn.bind(this)} style={styles.buttonContainer}>
              <Text style={styles.buttonText}>take me to my account</Text>
            </TouchableOpacity> */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  formContainer: {
    /// paddingVertical: 20
    //  marginLeft: 20,
    // marginRight: 20
    marginTop: 0
  },
  input: {
    height: 40,
    margin: 20,
    color: '#000000',
    paddingHorizontal: 10
  },
  instructions: {
    fontSize: 12,
    textAlign: 'center',
    color: '#888',
    marginBottom: 5
  },
  image: {
    width: 350,
    height: 300,
    //flex:1,
    marginTop: 0,
    justifyContent: 'center',
    //  marginLeft: 
  },
  data: {
    padding: 15,
    marginTop: 10,
    backgroundColor: '#ddd',
    borderColor: '#888',
    borderWidth: 1 / PixelRatio.get(),
    color: '#777'
  },
  buttonContainer: {
    paddingVertical: 15
  },
  buttonText: {
    color: "#8979B7",
    fontSize: 18
  },
  buttonsView: {
    marginLeft: 45
  }
});