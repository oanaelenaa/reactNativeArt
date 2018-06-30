import React, { Component } from 'react';
import { TouchableOpacity, TouchableHighlight, ScrollView, View, Text, StyleSheet, Button, Linking, FlatList, TextInput, Alert, Image } from 'react-native';
import config from './../../../config';
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

    _toggleModal = () => {
        this.setState({
            modalVisible: !this.state.modalVisible
        })
    }



    componentDidMount() {
        this.searchWebReferences();
    }

    processEntities(data) {

    }

    viewPage(link) {
        ///Linking.openURL(link)

    }

    async searchWebReferences() {
        return await
            fetch(config.googleCloud.api + config.googleCloud.apiKey, {
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
                    var results = responseJson.responses;
                    console.log(results);
                    var guessedLabels = results[0].webDetection.bestGuessLabels;
                    var webE = results[0].webDetection.webEntities;
                    var similarImg = results[0].webDetection.visuallySimilarImages;
                    var pages = results[0].webDetection.pagesWithMatchingImages;
                    console.log(pages);
                    this.setState({
                        response: results,
                        done: true,
                        bestGuesslabels: guessedLabels,
                        webEntities: webE,
                        visuallySimilarImages: similarImg,
                        pagesWithMatchingImages: pages
                    });
                    console.log(this.state.bestGuesslabels)
                    console.log(this.state.webEntities)
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
                <View>
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
                            this.state.done ? <Text>done</Text> : <Text>loading</Text>
                        }
                        <Text style={styles.title}> Matching labels: </Text>
                        <FlatList
                            data={this.state.bestGuessLabels}
                            renderItem={
                                ({ item }) => <View>
                                    <Text style={styles.text} >label:{item.label}</Text>
                                </View>
                            }
                        />

                        <FlatList
                            data={this.state.webEntities}
                            renderItem={
                                ({ item }) => <View>
                                    <Text style={styles.text} >Tag name:{item.description}</Text>
                                </View>
                            }
                        />
                        

                        <Text style={styles.title}> Matching pages: </Text>
                        <FlatList
                            data={this.state.pagesWithMatchingImages}
                            renderItem={
                                ({ item }) => <View>
                                    <TouchableOpacity onPress={this.viewPage(item.url)}>
                                        <Text style={styles.text} >Page title:{item.pageTitle}</Text>
                                    </TouchableOpacity>
                                </View>
                            }
                        />
                    </ScrollView>
                </View>
            </Modal>
        );
    }
}
/**
 * 
 * 
                    <FlatList
                        data={this.state.bestGuessLabels}
                        renderItem={
                            ({ item }) => <View>
                                <Text style={styles.text} >label:{item.label}</Text>
                            </View>
                        }
                    />

                    <FlatList
                        data={this.state.webEntities}
                        renderItem={
                            ({ item }) => <View>
                                <Text style={styles.text} >Tag name:{item.description}</Text>
                            </View>
                        }
                    />

 */

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
        fontSize: 17,
        fontWeight: 'bold'
    },
    text: {
        fontSize: 13,
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