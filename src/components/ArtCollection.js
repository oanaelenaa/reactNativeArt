import React, { Component } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Button, FlatList, Modal } from 'react-native';
import Event from './Event.js';

export default class ArtCollection extends Component {

    constructor() {
        super();
        this.state = {
            title: 'My events for this year',
            visibleAddEvent: false,
            eventList: []
        }
    }

    componentWillMount() {
        fetch('https://arcane-cliffs-26946.herokuapp.com/events')
            .then(response => response.json())
            .then(data => {
                this.setState({eventList: data})
            })
    }

    renderItem(item) {
        return (
            <Event event={item}/>
        )
    }

    render() {
        return (
            <View style={styles.container}>
               <FlatList
                    data={this.state.eventList}
                    renderItem={({item})=> this.renderItem(item)}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
        );
    }
/* <Text style={styles.title}>{this.state.title}</Text>
                <Button title="Update events" onPress={this.updateEventList.bind(this)} />
                <Button title="Add event" onPress={this.toggleModal.bind(this)} />
                
                <FlatList
                    data={this.state.eventList}
                    renderItem={({item})=> this.renderItem(item)}
                    keyExtractor={(item) => item.id.toString()}
                />*/
  /*  renderModal() {
        return (
            <Modal
                style={{padding: 40}}
                transparent={true}
                visible={this.state.visibleAddEvent}
            >
                <AddEvent onAddEvent={this.addEvent.bind(this)}/>
            </Modal>
        )
    }*/
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        width: '100%'
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    preview: {
        // justifyContent: 'flex-end',
        // alignItems: 'center',
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