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
  View, TextInput, Keyboard, Button, TouchableOpacity, PixelRatio, StatusBar, Image
} from 'react-native';
import Firebase from './Firebase';

/*var LoginState={
  email:string,
  password:string,
}*/
export default class Login extends Component {
  static navigationOptions = { header: null }

  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      error: "", loading: false, showErrorMessage: false,
    }
    this.goToHomeScreen = this.goToHomeScreen.bind(this);

  }

  componentDidMount() {
    Keyboard.dismiss();
  }

  async logIn() {
    Firebase.auth//createUserWithEmailAndPassword
      //.setPersistance(Firebase.persistanceLevel)
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((result) => {
        Firebase.registrationInfo.email = result.user.email;
        Firebase.registrationInfo.isAuthenticated = true;
        Firebase.registrationInfo.refreshToken = result.user.refreshToken;
        Firebase.registrationInfo.UID = result.user.uid;
        this.goToHomeScreen();
      }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error.code)
        console.log(error.message)
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
          <TextInput style={styles.input} placeholder="username" keyboardTyppe="email-address" value={this.state.email} onChangeText={(email) => this.setState({ email })} />

          <TextInput style={styles.input} placeholder="password" secureTextEntry value={this.state.password} onChangeText={(password) => this.setState({ password })} />
          <TouchableOpacity onPress={this.logIn.bind(this)} style={styles.buttonContainer}>
            <Text style={styles.buttonText}>take me to my account</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.LaterSignInContainer} onPress={() => this.goToHomeScreen()} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>I'll do it later on</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  formContainer: {
    padding: 20

  },
  input: {
    height: 40,
    marginBottom: 20,
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
    width: 300,
    height: 300,
    //flex:1,
    marginTop: 20,
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
  LaterSignInContainer: {
    marginLeft: 80,
    marginTop: 20,
  }
});