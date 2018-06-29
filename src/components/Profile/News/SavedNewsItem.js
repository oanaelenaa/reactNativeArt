import React, { Component } from 'react';
import { Animated, View, Text, Image, StyleSheet, TouchableHighlight, TouchableOpacity } from 'react-native';
import NewsDetailsModal from './NewsDetailsModal';
export default class SavedNewsItem extends Component {
    progress = new Animated.Value(0);
    constructor(props) {
        super(props);
        this.state = {
            showDetails: false
        }
        this.displayDetailsModal = this.displayDetailsModal.bind(this);
    }

    componentDidMount() {
        Animated.timing(this.progress, { toValue: 1, duration: 500 }).start();

    }

    onPress() {
        this.setState({
            showDetails: !this.state.showDetails
        })
    }
    displayDetailsModal() {
        if (this.state.showDetails)
            return <NewsDetailsModal isModalVisible={true} event={this.props.event}></NewsDetailsModal>;
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
        const primaryimageurl = this.props.event.primaryimageurl;
        return (
            <View styles={styles.container}>
                {this.displayDetailsModal()}
                <Animated.View style={[styles.container, { opacity, transform: [{ scale }] }]}>
                    <TouchableOpacity style={styles.buttonLove} onPress={() => this.onPress()}>
                        <Image
                            resizeMode="contain"
                            style={styles.image}
                            source={{ uri: primaryimageurl }}
                        />
                    </TouchableOpacity>
                </Animated.View>
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
        borderBottomWidth: 1,
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