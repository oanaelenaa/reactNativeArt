import React, { Component } from 'react';
import { Text, View } from 'react-native';
import ScanArt from './ScanArt';
import ArtCollection from './ArtCollection';
import MyCollection from './MyCollection';
import { createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import Login from './Login';
const TabNavi = createMaterialTopTabNavigator({
  ScanArt: ScanArt,
  ArtCollection: ArtCollection,
  MyCollection: MyCollection
});

TabNavi.navigationOptions = {
  // Hide the header from AppNavigator stack
  header: null,
};

TabNavi.tabBarOptions = {
  activeTintColor: 'tomato',
  inactiveTintColor: 'gray',
  backgroundColor: '#8979B7',
  labelStyle: {
    color: 'white',
    fontSize: 12,
    flex: 1,
    backgroundColor: '#8979B7'
  },
  style: {
    backgroundColor: '#8979B7'
  }
};

TabNavi.tabBarIcon = {
  backgroundColor: '#8979B7'
}

export default AppNavigator = createStackNavigator({
  Login: Login,
  Home: TabNavi
  /* // Optional: Override the `navigationOptions` for the screen
   navigationOptions: ({ navigation }) => ({
     title: `${navigation.state.params.name}'s Profile'`,
   }),*/
});

AppNavigator.navigationOptions = {
  header: null,
};