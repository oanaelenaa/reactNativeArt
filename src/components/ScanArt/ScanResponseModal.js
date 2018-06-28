import React, { Component } from 'react';
import { TouchableOpacity, TouchableHighlight, View, Text, StyleSheet, Button, FlatList, TextInput, Alert, Image } from 'react-native';
import Modal from "react-native-modal";
export default class ScanResponseModal extends Component {
    constructor() {
        super();
        this.state = {
            modalVisible: true
        }
        this.searchonWebReferences = this.searchonWebReferences.bind(this);
    }

    _toggleModal = () =>
        this.setState({ modalVisible: !this.state.modalVisible });

    render() {
        const hasResults = this.props.hasResults;
        const imageURI = this.props.url;
        console.log(imageURI);
        return (
            <Modal isVisible={this.state.modalVisible}
                swipeDirection="up"

                animationType="slide"
                transparent={false}>
                <TouchableHighlight style={styles.closeButton}
                    onPress={this._toggleModal}>
                    <Image
                        resizeMode="contain"
                        source={require('./../../assets/closeIcon.png')} />

                </TouchableHighlight>
                <View>
                    <Image style={styles.pictureStyle}
                        resizeMode="contain"
                        source={{ uri: imageURI, isStatic: true }}>
                    </Image>
                    <Text>{this.props.errorMessage}</Text>
                    <FlatList
                        data={this.props.labels}
                        renderItem={
                            ({ item }) => <View>
                                <Text style={styles.text} >Tag name:{item.tagName}</Text>
                                <Text style={styles.text} >Probability:{item.probability}</Text>
                            </View>
                        }
                    />
                    {
                        hasResults ? <Image style={styles.iconResponse} source={require('./../../assets/foundScan.png')} /> : <Image source={require('./../../assets/notFound.png')} />
                    }

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
        fontSize: 18,
        color: '#FFFFFF'
    },
    buttonLove: {

    },
    iconResponse: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 100
    },
    pictureStyle: {
        justifyContent: 'center',
        width: 300,
        height: 300
    },
    closeButton: {
        position: 'absolute',
        top: 5,
        right: 5
    }
})