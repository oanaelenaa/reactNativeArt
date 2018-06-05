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
  View, TextInput,Keyboard, Button, TouchableOpacity, PixelRatio, StatusBar
} from 'react-native';
//import firebase from 'react-native-firebase';
/*import CountryPicker, {
  getAllCountries
} from 'react-native-country-picker-modal'*/
//import { handleFbLogin } from './li
export default class LoginScreen extends Component {
  constructor(props) {
    //StatusBar.setHidden(true);
    super(props)

   // this.signup = this.signup.bind(this);
  //  this.getSelectedCountry = this.getSelectedCountry.bind(this);
    this.state = {
      email: "",
      password: "",
      error: "", loading: false, showErrorMessage: false,
      code: null,
      cca2:'US',
      callingCode:'1'
    }

  }

  componentDidMount() {
    console.log("dmd");
    Keyboard.dismiss();
  }

 /* _fbAuth() {
    LoginManager.logInWithReadPermissions(['public_profile']).then(
      function (result) {
        if (Result.isCancelled) {
          console.log('login cancelled');
        } else {
          console.log("succes" + result.grantedPermissions);
        }
      }, function (error) {
        console.log("rror" + error);

      })


  }
  async onLoginPressed() {
    //var usersRef = firebase.database().ref().child('/Users');
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(function () {
        console.log(firebase.auth().currentUser.email + "!");
      }).catch(function (error) {
        alert(error.code);
        alert(error.message);
      });
  }

  async signup() {
    console.log("djd");
    try {
      await firebase.auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.pass);
      console.log("Account created");
      // Navigate to the Home page, the user is auto logged in

    } catch (error) {
      console.log(error.toString())
    }

  }
  getInitialState() {
    return { code: null };
  }*/

  /*getSelectedCountry() {
    var _this = this;
    CountryPicker.show(function (country) {
      _this.setState({ code: country.code });
    });
  }*/

  render() {
    return (
      <View style={styles.container}>
      

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding:20,
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
  data: {
    padding: 15,
    marginTop: 10,
    backgroundColor: '#ddd',
    borderColor: '#888',
    borderWidth: 1 / PixelRatio.get(),
    color: '#777'
  },
  buttonContainer:{
    paddingVertical:15
  }
});
/*  <TextInput style={styles.input} placeholder="username" keyboardTyppe="email-address" value={this.state.email} onChangeText={(email) => this.setState({ email })} />

        <TextInput style={styles.input} placeholder="password" secureTextEntry value={this.state.password} onChangeText={(password) => this.setState({ password })} />

        <TouchableOpacity onPress={() => this.onLoginPressed()} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>take me to my account</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.signup()} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>I'll do it later on</Text>
        </TouchableOpacity> */


/*
<LoginButton
          publishPermissions={["publish_actions"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("login has error: " + result.error);
              } else if (result.isCancelled) {
                alert("login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    alert(data.accessToken.toString())
                  }
                )
              }
            }
          }
          onLogoutFinished={() => alert("logout.")}/> */