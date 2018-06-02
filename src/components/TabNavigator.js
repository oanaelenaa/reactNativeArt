import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { TabNavigator } from 'react-navigation';
import ScanArt from './ScanArt';
import ArtCollection from './ArtCollection';
import MyCollection from './MyCollection';
class InfoScreen extends Component {
  constructor(){
    super();
    this.state={
      counter:0
    }
  }
  componentDidMount(){
    if(this.state.counter!=0)
    {
      console.log("ff");
    }

  }

  addedToCollectionNew(){
    this.setState({counter:counter+1})
  }

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
    Profile:{
      screen:MyCollection,
      navigationOptions:{

      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    //  backgroundcolor:'#7A4988',
      backgroundColor:'#7A4988',
      labelStyle: {
        color: 'white',
        fontSize: 12,
        flex: 1
      },
    },
    tabBarIcon:{
      backgroundColor:'#7A4988'
    }
  }
);