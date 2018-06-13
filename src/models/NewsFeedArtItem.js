import React, { Component } from 'react';
import { Animated, View, Text, Image, StyleSheet, TouchableHighlight, TouchableOpacity } from 'react-native';
import Firebase from '../components/Firebase';
export default class NewsFeedArtItem extends Component {
    progress = new Animated.Value(0);
    constructor(props) {
        super(props);
        this.state = {
            lastPress: 0,
            lastIdPressed: 0,
        }
        this.saveTopersonalCollection = this.saveTopersonalCollection.bind(this);
    }

    componentDidMount() {
        Animated.timing(this.progress, { toValue: 1, duration: 500 }).start();

    }
    async saveTopersonalCollection() {
        let uid = Firebase.registrationInfo.UID;
        var objToSave = ({
            department: this.props.event.department,
            title: this.props.event.title,
            creditline: this.props.event.creditline,
            culture: this.props.event.culture,
            accessionyear: this.props.event.accessionyear,
            imageURL: this.props.event.primaryimageurl,
            pageURL: this.props.event.url,
            id: this.props.event.id
        });
        console.log("obj", objToSave);
        var ref = Firebase.database.ref(`/SavedNewsFeedItems/${uid}`);
        ref.push(JSON.parse(JSON.stringify(objToSave)))
            .then((result) => {
                console.log('result', result); //this wasn't null until the 3.1.0 version console.log(result.path); })
            }).catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(error.code)
                console.log(error.message)
            });
    }

    onPress() {
        var delta = new Date().getTime() - this.state.lastPress;

        if (delta < 200) {
            // double tap happend
            console.log("double");
            if (typeof this.props.addedToCollectionNew === 'function') {
                this.props.addedToCollectionNew(this.state);
                console.log("lol");
                this.saveTopersonalCollection();
                console.log(this.props.event);

            }
        }

        this.setState({
            lastPress: new Date().getTime()
        })
    }


    render() {
        let opacity = this.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
        });

        let scale = this.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
        });
        const { department, creditline, culture, accessionyear, title, primaryimageurl, pageURL,id } = this.props.event;


        return (
            <Animated.View style={[styles.container, { opacity, transform: [{ scale }] }]}>
                <TouchableOpacity style={styles.buttonLove} onPress={() => this.onPress()}>
                    <Image
                        resizeMode="contain"
                        style={styles.image}
                        source={{ uri: primaryimageurl }}
                    />
                </TouchableOpacity>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.text} numberOfLines={2}>{department}</Text>
                    <Text style={styles.text}>Credits: {creditline}</Text>
                    <Text style={styles.text}>Culture: {culture}</Text>
                    <Text style={styles.text}>Accession year: {accessionyear}</Text>
                </View>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        padding: 10,
        borderBottomColor: '#cdcdcd',
        borderBottomWidth: 1
    },
    image: {
        height: 90,
        width: 100,
        marginRight: 10
    },
    textContainer: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    text: {
        fontSize: 13
    },
    buttonLove: {

    }
})