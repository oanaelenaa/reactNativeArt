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
import Firebase from './src/components/Firebase'; 
import AppNavigator from './src/components/AppNavigator';
export default class App extends Component {

  state = {
    isAutheticated: false,
    loading:true,
  };

  componentDidMount() {
    Firebase.init();
  }

  render() {
   // const { isAutheticated } = this.state;
    //const { onNavigationStateChange } = this;
    return (
     // <View style={styles.container}>
        <AppNavigator></AppNavigator>
     /// </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
//        <TabNavigator screenProps={{ unreadMessagesCount: 8 , email:"",password:"" }}/>


/*

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loading: false, authenticated: true });
      } else {
        this.setState({ loading: false, authenticated: false });
      }
    });
  }

  render() {
    if (this.state.loading) return null; // Render loading/splash screen etc

    if (!this.state.authenticated) {
      return <Login />;
    }

    return <Home />;
  }


*/