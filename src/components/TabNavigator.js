import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { TabNavigator } from 'react-navigation';
import EventsList from './EventsList';

class InfoScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>React Native introduction workshop!</Text>
        <Text>Thank you!</Text>
      </View>
    );
  }
}

export default TabNavigator(
  {
    Events: EventsList,
    Info: InfoScreen,
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