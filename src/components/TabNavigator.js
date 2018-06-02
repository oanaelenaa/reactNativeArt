import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { TabNavigator } from 'react-navigation';
import ScanArt from './ScanArt';
import ArtCollection from './ArtCollection';
import Event from './Event.js';
import MyCollection from './MyCollection';
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
    Profile:MyCollection
  },
  {
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
      labelStyle: {
        color: '#000000',
        fontSize: 12,
        flex: 1
      },
    },
  }
);