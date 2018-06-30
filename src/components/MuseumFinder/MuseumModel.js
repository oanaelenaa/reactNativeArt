import React, { Component } from 'react';
import { Animated, View, Text, Image, StyleSheet, TouchableHighlight, Linking, TouchableOpacity } from 'react-native';
import WebViewLink from '../../utils/WebViewLink';
export default class MuseumModel extends Component {
    progress = new Animated.Value(0);
    constructor(props) {
        super(props);
        this.state = {
            museum: this.props.event
        }
        this.openInMaps = this.openInMaps.bind(this);
        this.visitWebsite = this.visitWebsite.bind(this);
    }

    componentDidMount() {
        Animated.timing(this.progress, { toValue: 1, duration: 500 }).start();
    }

    openInMaps() {
        // console.log(this.state.museum);
        const latitude = this.state.museum.geometry.location.lat;
        const longitude = this.state.museum.geometry.location.lng;
        const name = this.state.museum.name;
        this.props.onOpenInMaps(latitude, longitude, name);
    }

    visitWebsite() {
        /* return
         (
             <WebViewLink link={this.state.museum.url} />
         )*/
        Linking.openURL(this.state.museum.url);
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

                                <Image source={require('./../../assets/closed.png')} />
                        }
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.title}>{rating}</Text>
                        <Image style={styles.iconRating} source={require('./../../assets/iconStar.png')} />
                    </View>
                    <Text style={styles.text} numberOfLines={2}>Address: {formatted_address}</Text>
                    <View style={styles.actionButtons}>
                        <TouchableOpacity
                            style={styles.actionsB}
                            onPress={() => {
                                this.visitWebsite();
                            }} >
                            <Text style={styles.textActions}>visit website </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.actionsB}
                            onPress={() => {
                                this.openInMaps();
                            }} >
                            <Text style={styles.textActions}>directions</Text>
                        </TouchableOpacity>
                    </View>
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
    },
    actionButtons: {
        marginTop: 10,
        flexDirection: 'row',
        //  justifyContent: 'center',
        //   alignItems: 'center'
    },
    actionsB: {
        height: 50,
        width: 150
    },
    textActions: {
        color: "#8979B7",
        fontSize: 13
    }
})