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
//import Firebase from './src/components/Firebase';
import Firebase from './src/components/Firebase'; 
import AppNavigator from './src/components/AppNavigator';
export default class App extends Component {

  state = {
    isAutheticated: false,
  };

  componentDidMount() {
    Firebase.init();
  }

  render() {
   // const { isAutheticated } = this.state;
    //const { onNavigationStateChange } = this;
    return (
      <View style={styles.container}>
        <AppNavigator></AppNavigator>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
//        <TabNavigator screenProps={{ unreadMessagesCount: 8 , email:"",password:"" }}/>
