import React, { Component } from 'react';
import { TouchableOpacity,TouchableHighlight, View, Text, StyleSheet, Button, FlatList, TextInput, Alert, Image } from 'react-native';
import Modal from "react-native-modal";

export default class ScanResponseModal extends Modal{
    constructor() {
        super();
        this.state = {
            //modalVisible:false
        }
    }
    render(){
        return(
            <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.props.modalVisible}
                    onRequestClose={() => {
                        alert('Modal has been closed.');
                    }}>
                    <View style={{ marginTop: 22 }}>
                        <View>
                            <Text>{this.props.errorMessage}</Text>
                            <FlatList
                                data={this.props.labels}
                                renderItem={({ item }) => <Text>Tag name:{item.tagName},Probability:{item.probability}</Text>}
                            />
                            <TouchableHighlight
                                onPress={() => {
                                    this.setModalVisible(!this.props.modalVisible);
                                }}>
                                <Text>Hide Modal</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>

        );
    }


}