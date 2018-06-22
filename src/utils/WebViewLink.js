import React, { Component } from 'react';
import { WebView, Linking } from 'react-native';
//import WebView from 'WebView';
import Dimensions from 'Dimensions';
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default class WebViewLink extends Component {
  render() {
    console.log(width, height);
    debugger;// this.props.link;
    const uri = 'http://hmnh.harvard.edu/africa-gallery';
    //this.props.link;
    //'http://stackoverflow.com/questions/35531679/react-native-open-links-in-browser';
    /// console.log(this.state.uri);
    return (
      <WebView
        style={{ width: width, height: height }}
        style={{ marginTop: 20 }}
        ref={(ref) => { this.webview = ref; }}
        source={{ uri: uri }}
        startInLoadingState={true}
        onNavigationStateChange={(event) => {
          if (event.url !== uri) {
            this.webview.stopLoading();
            Linking.openURL(event.url);
          }
        }}
      />
      /* <View>
            <WebView
              source={{ uri: uri }}
              style={{ marginTop: 20 }}
            />
          </View>*/
    );
  }
}