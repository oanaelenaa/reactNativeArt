import React, { Component } from 'react';
import { TouchableOpacity, TouchableHighlight, View, Text, StyleSheet, Button, FlatList, TextInput, Alert, Image } from 'react-native';
import Modal from "react-native-modal";
export default class ScanResponseModal extends Component {
    constructor() {
        super();
        this.state = {
            modalVisible: true
        }
    }
    _toggleModal = () =>
        this.setState({ modalVisible: !this.state.modalVisible });

    searchWebReferences() {

    }

    render() {
        const hasResults = this.props.hasResults;
        const imageURI = this.props.url;
        return (
            <Modal isVisible={this.state.modalVisible}
                animationType="slide"
                transparent={false}>

                <TouchableHighlight
                    onPress={this._toggleModal}>
                    <Text>Close</Text>

                </TouchableHighlight>
                <View>
                    <Image style={styles.pictureStyle}
                        resizeMode="contain"
                        source={{ uri: imageURI }}>
                    </Image>
                    <Text>{this.props.errorMessage}</Text>
                    <FlatList
                        data={this.props.labels}
                        renderItem={({ item }) => <Text style={styles.text} >Tag name:{item.tagName},Probability:{item.probability}</Text>}
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
    },
    pictureStyle: {
        marginTop: 0,
        justifyContent: 'center',
        width: 200,
        height: 200
    }
})