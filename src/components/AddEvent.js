import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';

export default class AddEvent extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            description: '',
            location: '',
            when: ''
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.line}>
                    <Text style={styles.label}>Name:</Text>
                    <TextInput value={this.state.name} onChangeText={name => this.setState({name})} style={styles.textInput} />
                </View>

                <View style={styles.line}>
                    <Text style={styles.label}>Description:</Text>
                    <TextInput value={this.state.description} onChangeText={description => this.setState({description})} style={styles.textInput} />
                </View>

                <View style={styles.line}>
                    <Text style={styles.label}>Where:</Text>
                    <TextInput value={this.state.location} onChangeText={location => this.setState({location})} style={styles.textInput} />
                </View>

                <View style={styles.line}>
                    <Text style={styles.label}>When:</Text>
                    <TextInput value={this.state.when} onChangeText={when => this.setState({when})} style={styles.textInput} />
                </View>

                <Button title="Save" onPress={this.saveEvent.bind(this)}/>
            </View>
        )
    }

    saveEvent() {
        if (typeof this.props.onAddEvent === 'function') {
            this.props.onAddEvent(this.state)
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50
    },
    line: {
        flexDirection: 'row',
        padding: 10
    },
    label: {
        fontSize: 14,
        width: 100
    },
    textInput: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#cdcdcd'
    }
})