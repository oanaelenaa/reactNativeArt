import React, { Component } from 'react';
import { TouchableOpacity, Linking, TouchableHighlight, ScrollView, View, Text, StyleSheet, Button, FlatList, TextInput, Alert, Image } from 'react-native';
import Modal from "react-native-modal";
export default class ScanDetailsModal extends Component {

    state = {
        isModalVisible: true,
        openURL: false,
    };

    _toggleModal = () =>
        this.setState({ isModalVisible: !this.state.isModalVisible });

    visitWebsite(url) {
        Linking.openURL(url);
    }

    render() {
        const { title, author, primaryimageURL, authorURL, titleURL, id } = this.props.event;
        return (
            <Modal isVisible={this.state.isModalVisible}
                animationType="slide"
                transparent={false}>
                <View>
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
                        <Text style={styles.title}>Author: {author}</Text>
                    </ScrollView>
                    <View style={styles.actionButtons}>
                        <TouchableOpacity
                            style={styles.actionsB}
                            onPress={() => {
                                this.visitWebsite(authorURL);
                            }} >
                            <Text style={styles.textActions}>view author references </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.actionsB}
                            onPress={() => {
                                this.visitWebsite(titleURL);
                            }} >
                            <Text style={styles.textActions}>view title references </Text>
                        </TouchableOpacity>
                    </View>
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
    web: {
        color: '#8979B7',
        fontSize: 17
    },
    textContainer: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10
    },
    title: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#FFFFFF'
    },
    actionButtons: {
        marginTop: 10,
        flexDirection: 'row',
    },
    textActions: {
        color: "#8979B7",
        fontSize: 13
    },
    actionsB: {
        height: 50,
        width: 150
    },
    text: {
        fontSize: 13,
        color: '#FFFFFF'
    },
    buttonLove: {

    },
    closeButton: {
        position: 'absolute', top: 5, right: 5
    }
})