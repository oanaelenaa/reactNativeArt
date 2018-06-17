import ScanArt from './ScanArt/ScanArt';
import ArtCollection from './NewsFeed/ArtCollection';
import MyCollection from './Profile/MyCollection';
import { createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import Login from './Login';

const TabNavi = createMaterialTopTabNavigator({
  ScanArt: ScanArt,
  NewsFeed: ArtCollection,
  Profile: MyCollection
}, {
    tabBarOptions: {
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
