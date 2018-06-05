/**
 * React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import ScanArt from './src/components/ScanArt';
import TabNavigator from './src/components/TabNavigator';
import * as firebase from "react-native-firebase";
//import Login from './src/components/Login';
//import { SignedOut } from "./src/components/router";

export default class App extends Component {
  
  componentDidMount() {
    const config = {
        apiKey: "AIzaSyBaRCxKGMD51bUzGH--BDDBLr1QJKN3QjQ",
        authDomain: "whatsart1995.firebaseapp.com",
        databaseURL: "https://whatsart1995.firebaseio.com",
        projectId: "whatsart1995",
        storageBucket: "whatsart1995.appspot.com",
        messagingSenderId: "1058765189399"
      };
      firebase.initializeApp(config);
      firebase.auth().signOut();

    }
  render() {
    return (
      <View style={styles.container}>
        <TabNavigator screenProps={{ unreadMessagesCount: 8 }}/>
      </View>
    );
    //return <SignedOut/>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
