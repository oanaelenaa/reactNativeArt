import React, { Component } from 'react';
import { TouchableOpacity, TouchableHighlight, View, Text, StyleSheet, ActivityIndicator, Button, FlatList, Modal, Alert } from 'react-native';
import Firebase from '../../../utils/authentication/Firebase';
import PersonalCollectionArtItem from './PersonalCollectionArtItem';
import GridView from 'react-native-super-grid';

export default class Scanslist extends Component {

    constructor(props) {
        super(props);
        this.personalCollection = [],
            this.state = {
                visible: false,
                lastPress: 0,
                loaded: true,
                scansList: props.scans
            }
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    renderItem(item) {
        return (
            <PersonalCollectionArtItem event={item} />
        )
    }

    render() {
        var items = this.props.scans
        if (this.state.loaded == false || items==[]) {
            return (
                <View style={styles.centerLoader}>
                    <ActivityIndicator size="large" color='#8979B7' />
                </View>
            )
        }
        return (
            <View>
                <GridView
                    itemDimension={130}
                    items={items}
                    renderItem={item => this.renderItem(item)}
                //  keyExtractor={(item) => item.id}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 0,
        width: '100%'
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    preview: {
        height: 200,
        width: 200
    },
})