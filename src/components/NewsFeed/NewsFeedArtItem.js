import React, { Component } from 'react';
import { Animated, View, Text, Image, StyleSheet, TouchableHighlight, TouchableOpacity } from 'react-native';
import Firebase from '../../utils/authentication/Firebase';
import ImagePreview from 'react-native-image-preview';

export default class NewsFeedArtItem extends Component {
    progress = new Animated.Value(0);
    constructor(props) {
        super(props);
        this.state = {
            lastPress: 0,
            lastIdPressed: 0,
            message: "succesfully added!",
            visible: false,
            imageUrl:""
            
        }
        this.saveTopersonalCollection = this.saveTopersonalCollection.bind(this);
        this.openPreviewImage = this.openPreviewImage.bind(this);
        this.togglePreviewImage = this.togglePreviewImage.bind(this);
        this.openUrl = this.openUrl.bind(this);
    }

    componentDidMount() {
        Animated.timing(this.progress, { toValue: 1, duration: 500 }).start();
    }

    openUrl(url) {

    }

    async saveTopersonalCollection() {
        var isSuccessful = false;
        let uid = Firebase.registrationInfo.UID;
        var objToSave = ({
            department: this.props.event.department,
            title: this.props.event.title,
            /// people=this.props.event.people,
            creditline: this.props.event.creditline,
            culture: this.props.event.culture,
            accessionyear: this.props.event.accessionyear,
            primaryimageURL: this.props.event.primaryimageurl,
            pageURL: this.props.event.url,
            id: this.props.event.id
        });
        console.log("obj", objToSave);
        isSuccessful = true;
        var ref = Firebase.database.ref(`/SavedNewsFeedItems/${uid}`);
        ref.push(JSON.parse(JSON.stringify(objToSave)))
            .then((result) => {
                console.log('result', result);

            }).catch(function (error) {
                console.log(error.code)
                console.log(error.message)
            });
        this.handleSaveChange(isSuccessful);
    }

    togglePreviewImage() {
        const newVal = this.state.visible;
        this.setState({
            visible: !newVal
        });
    }

    onPress() {
        this.saveTopersonalCollection();
        console.log(this.props.event);
    }

    handleSaveChange(success) {
        this.props.onSaveItem(success);
    }

    openPreviewImage() {
        if (this.state.visible) {
            return (
                <ImagePreview visible={this.state.visible} source={{ uri: this.props.event.primaryimageurl }} close={this.togglePreviewImage} />
            );

        }
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
        const { department, creditline, culture, accessionyear, title, primaryimageurl, url, id } = this.props.event;
        return (
            <Animated.View style={[styles.container, { opacity, transform: [{ scale }] }]}>
                < TouchableOpacity onPress={this.togglePreviewImage}>
                    <Image
                        resizeMode="contain"
                        style={styles.image}
                        source={{ uri: primaryimageurl }}
                    />
                </ TouchableOpacity>
                <View style={styles.textContainer}>

                    <Text style={styles.title}>{title}</Text>

                    <TouchableOpacity onPress={this.saveTopersonalCollection}>
                        <Image source={require('./../../assets/like.png')} />
                    </TouchableOpacity>
                    <Text style={styles.text}>Culture: {culture}</Text>
                    <Text style={styles.text}>Accession year: {accessionyear}</Text>
                    <Text style={styles.text} numberOfLines={2}>{department}</Text>
                    <Text style={styles.text}>Credits: {creditline}</Text>
                    <TouchableOpacity onPress={this.openUrl(url)}>
                        <Text style={styles.web} >visit website</Text>
                    </TouchableOpacity>

                </View>
                {this.openPreviewImage()}
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
        //  marginRight: 10
        flex: 1,
        //height: 150,
    },
    textContainer: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10
    },
    title: {
        fontSize: 17,
        fontWeight: 'bold'
    },
    text: {
        fontSize: 13,
        color: '#8A8A8F'
    },
    label: {

    },
    buttonLove: {

    },
    web: {
        color: '#8979B7',
        fontSize: 17
    }
})