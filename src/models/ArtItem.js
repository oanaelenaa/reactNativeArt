import React, { Component } from 'react';
import { Animated, View, Text, Image, StyleSheet,TouchableHighlight,TouchableOpacity } from 'react-native';

export class ArtItem extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
    }
   
    render() {
        const { department, creditline, culture, accessionyear, title,primaryimageurl,pageURL} = this.props.event;
        return null;
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
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