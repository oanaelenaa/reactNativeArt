import { Navigation } from 'react-native-navigation';
import Login from './Login';
import ScanArt from './ScanArt/ScanArt';
import MyCollection from '././Profile/MyCollection';
import NewsFeed from './NewsFeed/ArtCollection';

export default (store, Provider) => {
    Navigation.registerComponent('Login', () => Login, store, Provider);
    Navigation.registerComponent('ScanArt', () => ScanArt, store, Provider);
    Navigation.registerComponent('NewsFeed', () => NewsFeed, store, Provider);
    Navigation.registerComponent('MyCollection', () => MyCollection, store, Provider);
}