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

import EventsList from './src/components/EventsList';
// import TabNavigator from './src/components/TabNavigator';

export default class App extends Component {
  
  render() {
    return (
      <View style={styles.container}>
        <EventsList/>
        {/* <TabNavigator/> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
