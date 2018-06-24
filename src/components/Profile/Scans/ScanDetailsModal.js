import React, { Component } from 'react';
import { TouchableOpacity, TouchableHighlight, ScrollView, View, Text, StyleSheet, Button, FlatList, TextInput, Alert, Image } from 'react-native';
import Modal from "react-native-modal";
import WebViewLink from '../../../utils/WebViewLink';
export default class ScanDetailsModal extends Component {

    state = {
        isModalVisible: true,
        openURL: false,
    };

    _toggleModal = () =>
        this.setState({ isModalVisible: !this.state.isModalVisible });

    _openUrl = () => {
        this.setState({ openURL: !this.state.openURL });
    }

    render() {
        const { title, author, otherInformation, primaryimageURL, pageURL, id } = this.props.event;
        return (

            <Modal isVisible={this.state.isModalVisible}
                animationType="slide"
                transparent={false}
            >
                <View>
                    {
                        this.state.openURL ? <WebViewLink link={pageURL} /> : null
                    }

                    <TouchableOpacity onPress={this._openUrl}>
                        <Image
                            resizeMode="contain"
                            source={require('./../../../assets/openPage.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.closeButton} onPress={this._toggleModal}>
                        <Image
                            resizeMode="contain"
                            source={require('./../../../assets/closeIcon.png')} />
                    </TouchableOpacity>
                    <View>
                        <Image
                            resizeMode="contain"
                            style={styles.image}
                            source={{ uri: primaryimageURL }} />
                    </View>
                    <ScrollView>
                        <Text style={styles.title}>Title: {title}</Text>
                        <Text style={styles.text}>Author: {author}</Text>
                    </ScrollView>
                </View>
            </Modal>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        // alignItems: 'center',
        flexDirection: 'row',
        // padding: 10,
        borderBottomColor: '#cdcdcd',
        borderBottomWidth: 1
    },
    image: {
        height: 250,
        width: 250,
        marginRight: 10
    },
    textContainer: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10
    },
    title: {
        fontSize: 13,
        fontWeight: 'bold'
    },
    text: {
        fontSize: 13
    },
    buttonLove: {

    },
    closeButton: {
        position: 'absolute', top: 5, right: 5
    }
})