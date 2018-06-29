import React, { Component } from 'react';
import { TouchableOpacity, TouchableHighlight, View, Text, StyleSheet, Button, FlatList, TextInput, Alert, Image } from 'react-native';
import Modal from "react-native-modal";



export default class WebReferencesResponseModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: true,
            imageUri: this.props.url,
            responseWeb: this.props.results
        }
    }

    _toggleModal = () =>
        this.setState({ modalVisible: !this.state.modalVisible });


    componentDidMount() {
       console.log(this.state.responseWeb,"fff");
    }

    render() {
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
                        source={{ uri: this.state.imageUri, isStatic: true }}>
                </Image>
                </View>
            </Modal>
        );
    }
}


/**
 * <Image style={styles.pictureStyle}
                        resizeMode="contain"
                        source={{ uri: this.state.imageUri, isStatic: true }}>
                    </Image>
                    <Text>{this.props.errorMessage}</Text>
                    <FlatList
                        data={this.state.labelAnnotations}
                        renderItem={
                            ({ item }) => <View>
                                <Text style={styles.text} >Tag name:{item.description}</Text>
                            </View>
                        }
                    />
                    
                        <Image style={styles.iconResponse} source={require('./../../assets/foundScan.png')} /> : <Image source={require('./../../assets/notFound.png')} />
                    

 * 
 * 
 * 
 */

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
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