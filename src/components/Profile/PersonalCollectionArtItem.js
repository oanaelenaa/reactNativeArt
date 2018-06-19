import React, { Component } from 'react';
import { Animated, View, Text, Image, StyleSheet, TouchableHighlight, TouchableOpacity, Modal } from 'react-native';
import DetailsModal from './DetailsModal';

export default class PersonalCollectionArtItem extends Component {
    progress = new Animated.Value(0);
    constructor() {
        super();
        this.state = {
            showDetails: false
        }
        this.displayDetailsModal = this.displayDetailsModal.bind(this);
    }

    componentDidMount() {
    }


    onPress() {
        debugger;
        console.log("dd");
        this.setState({
            showDetails: !this.state.showDetails
        })
    }
    displayDetailsModal() {
        if (this.state.showDetails)
            return <DetailsModal isModalVisible={true} event={this.props.event} isScan={true}></DetailsModal>;
    }

    render() {
        const { title, author, otherInformation, primaryimageURL, pageURL, id } = this.props.event;

        return (

            <View style={styles.container}>
                {this.displayDetailsModal()}
                <TouchableOpacity onPress={() => this.onPress()}>
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