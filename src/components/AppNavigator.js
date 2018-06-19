import React, { Component } from 'react';
import ScanArt from './ScanArt/ScanArt';
import ArtCollection from './NewsFeed/ArtCollection';
import MyCollection from './Profile/MyCollection';
import { createStackNavigator } from 'react-navigation';
import Login from './Login';
import MuseumsFinder from './MuseumFinder/MuseumsFinder';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import {Image} from 'react-native';

const TabNavi = createMaterialBottomTabNavigator({
  ScanArt: {
    screen: ScanArt,
    navigationOptions: ({
      tabBarIcon: (tintColor) => (
        <Image
          source={require('../assets/scanLogo.png')}
        />
      )
    })
  },
  NewsFeed: {
    screen: ArtCollection,
    navigationOptions: ({
      tabBarIcon: (tintColor) => (
        <Image
          source={require('../assets/newsfeedLogo.png')}
        />
      )
    })
  },
  Profile: {
    screen: MyCollection,
    navigationOptions: ({
      tabBarIcon: (tintColor) => (
        <Image
          source={require('../assets/logoProfile.png')}
        />
      )
    })
  },
  Museums: {
    screen: MuseumsFinder,
    navigationOptions: ({
      tabBarIcon: (tintColor) => (
        <Image
          source={require('../assets/findmuseum.png')}
        />
      )
    })
  }
}, {
    initialRouteName: 'ScanArt',
    barStyle: {
      backgroundColor: '#8979B7'
    }
  });

TabNavi.navigationOptions = {
  // Hide the header from AppNavigator stack
  header: null,
};

export default AppNavigator = createStackNavigator({
  Login: Login,
  Home: TabNavi,
});


