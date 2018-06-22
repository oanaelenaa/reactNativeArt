import React, { Component } from 'react';
import { WebView, Linking } from 'react-native';

export default class WebViewLink extends Component {
  render() {
    debugger;// this.props.link;
    const uri='https://github.com/facebook/react-native/issues/9966';
    //this.props.link;
    //'http://stackoverflow.com/questions/35531679/react-native-open-links-in-browser';
   /// console.log(this.state.uri);
    return (
      <WebView
        style={{marginTop: 20}}
        ref={(ref) => { this.webview = ref; }}
        source={{ uri:uri }}
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