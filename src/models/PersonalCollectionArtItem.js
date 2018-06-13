import React, { Component } from 'react';
import { Animated, View, Text, Image, StyleSheet,TouchableHighlight,TouchableOpacity } from 'react-native';
//import ArtItem from './ArtItem';
export default class PersonalCollectionArtItem extends Component  {
    progress = new Animated.Value(0);
    constructor() {
        super();
        this.state = {
        }
    }

    componentDidMount() {
    }
    
    onPress() { 
        //see details
      }

    render() {
        let opacity = this.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
        });

        let scale = this.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
        });
        const { title, author, otherInformation,primaryimageURL,pageURL} = this.props.event;

        return (
            <Animated.View style={[styles.container, {opacity, transform: [{ scale }]}]}>
                <TouchableOpacity  style={styles.buttonLove} onPress={() => this.onPress()}>
                <Image
                    resizeMode="contain"
                    style={styles.image}
                    source={{ uri: primaryimageURL }}
                />
                </TouchableOpacity>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width:100,
        height:200,
        flexDirection: 'row',
        padding: 10,
        borderBottomColor: '#cdcdcd',
        borderBottomWidth: 1
    },
    image: {
        height: 90,
        width: 100,
        marginRight: 10
    },
    textContainer: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    text: {
        fontSize: 13
    },
    buttonLove:{

    }
})