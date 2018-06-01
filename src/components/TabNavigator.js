import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { TabNavigator } from 'react-navigation';
import ScanArt from './ScanArt';
import ArtCollection from './ArtCollection';
import Event from './Event.js';
class InfoScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>my collection is in progress....</Text>
      </View>
    );
  }
}

export default TabNavigator(
  {
    ScanArt: ScanArt,
    Collection: ArtCollection,
  },
  {
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
      labelStyle: {
        color: '#000000',
        fontSize: 20,
        flex: 1
      },
    },
  }
);