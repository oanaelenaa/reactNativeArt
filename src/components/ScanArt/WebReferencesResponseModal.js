import React, { Component } from 'react';
import { TouchableOpacity, TouchableHighlight, ScrollView, ActivityIndicator, Linking, View, Text, StyleSheet, Button, FlatList, TextInput, Alert, Image } from 'react-native';
import Modal from "react-native-modal";

export default class WebReferencesResponseModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: true,
            imageUri: this.props.url,
            base64: this.props.base64,
            responseWeb: this.props.results,
            done: false,
            response: null,
            bestGuessLabels: [],
            webEntities: [],
            similarImages: [],
            pagesWithMatchingImages: []
        }
        this.searchWebReferences = this.searchWebReferences.bind(this);
        /// this.processEntities.Entities = this.processEntities.bind.this(this);
        this.viewPage = this.viewPage.bind(this);
    }

    _toggleModal = () =>
        this.setState({ modalVisible: !this.state.modalVisible });


    componentDidMount() {
        this.searchWebReferences();
    }

    viewPage(link) {
        Linking.openURL(link)
    }

    /**
     *   "api": "https://vision.googleapis.com/v1/images:annotate?key=",
            "apiKey": "AIzaSyBOi8uZx9f8518IlWIQPK-5MXX2u-2BMU0"
     */
    async searchWebReferences() {
        return await
            fetch('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyBOi8uZx9f8518IlWIQPK-5MXX2u-2BMU0', {
                method: 'POST',
                body: JSON.stringify({
                    "requests": [
                        {
                            "image": {
                                "content": this.state.base64
                            },
                            "features": [
                                {
                                    "type": "WEB_DETECTION"
                                }
                            ]
                        }
                    ]
                })
            }).then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                    var results = responseJson.responses;
                    var guessedLabels = results[0].webDetection.bestGuessLabels;
                    var webE = results[0].webDetection.webEntities;
                    var similarImg = results[0].webDetection.visuallySimilarImages;
                    var pages = results[0].webDetection.pagesWithMatchingImages;
                    this.setState({
                        response: results,
                        done: true,
                        bestGuesslabels: guessedLabels,
                        webEntities: webE,
                        visuallySimilarImages: similarImg,
                        pagesWithMatchingImages: pages
                    });
                }, (err) => {
                    console.error('promise rejected')
                    console.error(err)
                });
    }


    render() {
        return (
            <Modal isVisible={this.state.modalVisible}
                animationType="slide"
                transparent={false}>

                <TouchableHighlight style={styles.closeButton}
                    onPress={this._toggleModal}>
                    <Image
                        resizeMode="contain"
                        source={require('./../../assets/closeIcon.png')} />
                </TouchableHighlight>
                <ScrollView>
                    <Image style={styles.pictureStyle}
                        resizeMode="contain"
                        source={{ uri: this.state.imageUri, isStatic: true }}>
                    </Image>
                    {
                        this.state.done ?

                            <View>
                                <Text style={styles.userMessage}>Done</Text>
                                <Image
                                    resizeMode="contain"
                                    source={require('./../../assets/foundScan.png')} />
                            </View>

                            :

                            <View>
                                <Text>Please wait</Text>
                                <ActivityIndicator size="large" color='#8979B7' />
                            </View>
                    }

                    <Text style={styles.title}> Matching labels: </Text>

                    <FlatList
                        data={this.state.bestGuessLabels}
                        renderItem={
                            ({ item }) => <View>
                                <Text style={styles.text} >Matching labels:{item.label}</Text>
                            </View>
                        }
                    />

                    <FlatList
                        data={this.state.webEntities}
                        renderItem={
                            ({ item }) => <View>
                                <Text style={styles.text}> {item.description}</Text>
                            </View>
                        }
                    />

                    <Text style={styles.title}> Matching images: </Text>


                    <Text style={styles.title}> Matching pages: </Text>
                    <FlatList
                        data={this.state.pagesWithMatchingImages}
                        renderItem={
                            ({ item }) => <View>
                                <TouchableOpacity onPress={this.viewPage(item.url)}>
                                    <Text style={styles.text} >{item.pageTitle}</Text>
                                </TouchableOpacity>
                            </View>
                        }
                    />
                </ScrollView>
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