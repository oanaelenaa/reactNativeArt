import React, { Component } from 'react';
import { TouchableOpacity, Linking, ScrollView, View, Text, StyleSheet, Button, FlatList, TextInput, Alert, Image } from 'react-native';
import Modal from "react-native-modal";
export default class NewsDetailsModal extends Component {

    state = {
        isModalVisible: true,
    };

    _toggleModal = () =>
        this.setState({ isModalVisible: !this.state.isModalVisible });

    visitWebsite(url) {
        Linking.openURL(url);
    }

    render() {
        const { department, creditline, culture, accessionyear, title, people, primaryimageurl, pageURL, id } = this.props.event;
        return (
            <Modal isVisible={this.state.isModalVisible}
                animationType="slide"
                transparent={false}
            >
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
                            source={{ uri: primaryimageurl }} />
                    </View>
                    <ScrollView>
                        <Text style={styles.title}>Title: {title}</Text>
                        <Text style={styles.text} numberOfLines={2}>Department: {department}</Text>
                        <Text style={styles.text}>Credits: {creditline}</Text>
                        <Text style={styles.text}>Culture: {culture}</Text>
                        <Text style={styles.text}>Accession year: {accessionyear}</Text>
                    </ScrollView>
                    <TouchableOpacity onPress={() => {
                        this.visitWebsite(pageURL);
                    }} >
                        <Text>Visit website</Text>
                    </TouchableOpacity>

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