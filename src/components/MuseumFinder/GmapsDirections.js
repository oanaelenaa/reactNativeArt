import Popup from 'react-native-map-link';
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

export default class GmapsDirection extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isMapsModalVisible: true
        }
    }

    componentDidMount() {
        debugger;
    }
    /*  handleGetDirections = () => {
          const data = {
              source: {
                  latitude: this.props.sourceLatitude,
                  longitude: this.props.sourceLatitude
              },
              destination: {
                  latitude: this.props.destinationLatitude,
                  longitude: this.props.destinationLatitude
              },
              params: [
                  {
                      key: "travelmode",
                      value: "driving"        // may be "walking", "bicycling" or "transit" as well
                  },
                  {
                      key: "dir_action",
                      value: "navigate"       // this instantly initializes navigation using the given travel mode 
                  }
              ]
          }
          getDirections(data)
      }*/

    render() {
        return (
          /// <View style={styles.container}>
            <Popup
                isVisible={this.state.isMapsModalVisible}
                onCancelPressed={() => this.setState({ isMapsModalVisible: false })}
                onAppPressed={() => this.setState({ isMapsModalVisible: false })}
                onBackButtonPressed={() => this.setState({ isMapsModalVisible: false })}
                options={{
                    latitude: 38.8976763,
                    longitude: -77.0387185,
                    sourceLatitude: -8.0870631,  // optionally specify starting location for directions
                    sourceLongitude: -34.8941619,  // not optional if sourceLatitude is specified
                    title: 'The White House',
                    dialogTitle: 'This is the dialog Title',
                    dialogMessage: 'This is the amazing dialog Message',
                    cancelText: 'This is the cancel button text'
                }}
                modalProps={{ // you can put all react-native-modal props inside.
                    animationIn: 'slideInUp'
                }}
                appsWhiteList={['google-maps']}
            />
     ///     </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        color: '#4682BC',
        margin: 10
    }
});