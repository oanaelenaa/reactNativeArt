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


  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      error: "", loading: false, showErrorMessage: false,
      code: null,
      cca2: 'US',
      callingCode: '1',
    }
    this.goToHomeScreen=this.goToHomeScreen.bind(this);

  }

  componentDidMount() {
    Keyboard.dismiss();
  }

  async logIn() {
    debugger
    ///irebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    //.then(function () {
    //createUserWithEmailAndPassword
    //return 
    const credentials=this.state.email;
    Firebase.auth//signInWithEmailAndPassword
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(function (result) {
        console.log("Account created", result);
        // this.setState({ isAuthenticated: true });
         Firebase.registrationInfo.email = credentials;
         Firebase.registrationInfo.isAuthenticated = true;
         Firebase.registrationInfo.refreshToken=result.user.refreshToken;
         Firebase.registrationInfo.UID=result.user.UID;

        // FirebaseUser user = FirebaseAuth.getInstance().getCurrentUser();
        // DatabaseReference ref = FirebaseDatabase.getInstance().getReference(USERS_TABLE);
        //s   ref.child(user.getUid()).setValue(user_class);
      }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error.code)
        console.log(error.message)
      });
      this.goToHomeScreen();
    /// });
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
          source={require("./LogoSample_ByTailorBrands-2.jpg")}
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



/**
 *  <Modal isVisible={this.state.dialogShow} onSwipe={() => this.setState({ dialogShow: false, isAuthenticated: false })}
                    swipeDirection="left">
                    <View style={styles.modal}>
*/

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
    width: 150,
    height: 150,
    //flex:1,
    marginTop: 50,
    justifyContent: 'center',
    marginLeft: 100
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
