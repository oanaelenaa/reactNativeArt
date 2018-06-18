import React, { Component } from 'react';
import { WebView, Linking } from 'react-native';

export default class WebViewLink extends Component {
  render() {
    const uri = this.props.link//'http://stackoverflow.com/questions/35531679/react-native-open-links-in-browser';
    console.log(this.props.link);
    return (
      <WebView
        ref={(ref) => { this.webview = ref; }}
        source={{ uri }}
        onNavigationStateChange={(event) => {
          if (event.url !== uri) {
            this.webview.stopLoading();
            Linking.openURL(event.url);
          }
        }}
      />
    );
  }
}