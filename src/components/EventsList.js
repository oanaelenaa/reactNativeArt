import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, FlatList, Modal } from 'react-native';
import Event from './Event';
import AddEvent from './AddEvent';


export default class EventsList extends Component {

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

    toggleModal() {
        this.setState({ visibleAddEvent: !this.state.visibleAddEvent })
    }

    renderItem(item) {
        return (
            <Event event={item}/>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderModal()}
                <Text style={styles.title}>{this.state.title}</Text>
                <Button title="Update events" onPress={this.updateEventList.bind(this)} />
                <Button title="Add event" onPress={this.toggleModal.bind(this)} />
                
                <FlatList
                    data={this.state.eventList}
                    renderItem={({item})=> this.renderItem(item)}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
        );
    }

    renderModal() {
        return (
            <Modal
                visible={this.state.visibleAddEvent}
            >
                <AddEvent onAddEvent={this.addEvent.bind(this)}/>
            </Modal>
        )
    }

    updateEventList() {
        this.setState({eventList: [...this.state.eventList, {id: Math.random(), name: 'Test'}]});
    }

    addEvent(event) {
        this.setState({eventList: [...this.state.eventList, {...event, id: Math.random()}]});
        this.toggleModal();
    }
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
    }
})