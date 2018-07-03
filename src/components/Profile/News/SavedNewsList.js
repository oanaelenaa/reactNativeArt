import React, { Component } from 'react';
import { TouchableOpacity, TouchableHighlight, View, Text, ActivityIndicator, StyleSheet, Button, FlatList, Modal, Alert } from 'react-native';
import Firebase from '../../../utils/authentication/Firebase';
import SavedNewsItem from './SavedNewsItem';
import GridView from 'react-native-super-grid';
export default class SavedNewsList extends Component {

    constructor(props) {
        super(props);
        this.savedNewsFeedCollection = [],
            this.state = {
                visible: false,
                savedList: props.saves
            }
    }

    componentWillMount() {

    }

    componentDidMount() {
    }

    smartSearch() {
    }

    renderItem(item) {
        return (
            <SavedNewsItem event={item} />
        )
    }

    render() {
        var items = this.props.saves;
        if (this.state.loaded == false || items == []) {
            return (
                <View>
                    <ActivityIndicator size="large" color='#8979B7' />
                </View>
            )
        }
        return (
            <GridView
                itemDimension={130}
                items={items}
                renderItem={item => this.renderItem(item)}
            // keyExtractor={(item) => item.id.toString()}
            />
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
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20
    }
})