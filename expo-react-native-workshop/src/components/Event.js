import React, { Component } from 'react';
import { Animated, View, Text, Image, StyleSheet } from 'react-native';

export default class Event extends Component {
    progress = new Animated.Value(0);

    componentDidMount() {
        Animated.timing(this.progress, { toValue: 1, duration: 500 }).start();
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

        const { name, logo, description, location, when } = this.props.event;
        return (
            <Animated.View style={[styles.container, {opacity, transform: [{ scale }]}]}>
                <Image
                    resizeMode="contain"
                    style={styles.image}
                    source={{ uri: logo }}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{name}</Text>
                    <Text style={styles.text} numberOfLines={2}>{description}</Text>
                    <Text style={styles.text}>Where: {location}</Text>
                    <Text style={styles.text}>When: {when}</Text>
                </View>
            </Animated.View>
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
    }
})