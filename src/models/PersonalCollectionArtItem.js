import React, { Component } from 'react';
import { Animated, View, Text, Image, StyleSheet,TouchableHighlight,TouchableOpacity,Modal } from 'react-native';
export default class PersonalCollectionArtItem extends Component  {
    progress = new Animated.Value(0);
    constructor() {
        super();
        this.state = {
            showDetails:false
        }
    }

    componentDidMount() {
    }
    
    onPress() { 
        this.setState({showDetails:true});
      }

    render() {
      /*  let opacity = this.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],{opacity, transform: [{ scale }]}]}>
        });

        let scale = this.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
        });*/
        const { title, author, otherInformation,primaryimageURL,pageURL,id} = this.props.event;

        return (
            
            <View style={styles.container}> 
                <TouchableOpacity  onPress={() => this.onPress()}>
                <Image
                    resizeMode="contain"
                    style={styles.image}
                    source={{ uri: primaryimageURL }}
                />
                </TouchableOpacity>
            </View>
        );
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
        height: 150,
        width: 150,
        marginRight: 0
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
    buttonLove: {

    }
})