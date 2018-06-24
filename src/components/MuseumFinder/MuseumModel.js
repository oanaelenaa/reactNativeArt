import React, { Component } from 'react';
import { Animated, View, Text, Image, StyleSheet, TouchableHighlight, TouchableOpacity } from 'react-native';
export default class MuseumModel extends Component {
    progress = new Animated.Value(0);
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        Animated.timing(this.progress, { toValue: 1, duration: 500 }).start();
    }

    onPress() {

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
        debugger;
        const { name, formatted_address, rating, icon, opening_hours, id } = this.props.event;
        const isOpenNow = opening_hours.open_now;
        return (
            <Animated.View style={[styles.container, { opacity, transform: [{ scale }] }]}>
                <TouchableOpacity style={styles.buttonLove} onPress={() => this.onPress()}>
                    <Image
                        resizeMode="contain"
                        style={styles.image}
                        source={{ uri: icon }}
                    />

                </TouchableOpacity>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{name}</Text>
                    <View style={styles.showStatus}>
                        {
                            isOpenNow ? <Image source={require('./../../assets/open.png')} /> :

                                <Image source={require('./../../assets/open.png')} />
                        }
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.title}>Rating: {rating}</Text>
                        <Image style={styles.iconRating} source={require('./../../assets/iconStar.png')} />
                    </View>
                    <Text style={styles.text} numberOfLines={2}>Address: {formatted_address}</Text>

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
        fontSize: 18,
        fontWeight: 'bold'
    },
    text: {
        fontSize: 13
    },
    buttonLove: {

    },
    iconRating: {

    },
    showStatus: {
        position: 'absolute', top: 5, right: 5
    }
})