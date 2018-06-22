import React, { Component } from 'react';
import { TouchableOpacity, TouchableHighlight, View, Text, StyleSheet, Button, FlatList, TextInput, Alert, Image } from 'react-native';
import { RNCamera } from 'react-native-camera';
import RNFetchBlob from 'react-native-fetch-blob';
console.log(RNCamera);
export default class CameraView extends Component {
	constructor(props) {
		super(props)
		this.state = {
			response: ""
		}
	}

	async capture() {
		const options = { quality: 0.5, base64: true };
		try {
			const cameraData = await this.camera.takePictureAsync(options);
			console.log(cameraData.uri);
			this.classifyImageFile2(cameraData.uri)

		} catch (e) {
			// This logs the error
			console.log(e)
		}
	}

	handleScanResponseChange = () => {
		var response = this.state.response;
		this.props.onGetResponseScan(response);
	}


	async classifyImageFile(url) {
		debugger
		var baseUrl = "https://southcentralus.api.cognitive.microsoft.com/customvision/v2.0/Prediction/bcd68e65-9e51-4d34-b120-0bae92a8bcab/image?iterationId=ddfee652-0132-4fc1-b7d2-580df387f3ad"
		RNFetchBlob.fetch('POST', baseUrl, {
			'Content-Type': 'application/octet-stream',
			'Prediction-Key': 'e55e3d08cfae46768f86aba72e051021'

		}, RNFetchBlob.wrap(url)).then((response) => response.json())
			.then((responseJson) => {
				console.log(responseJson)
				this.setState({
					response: responseJson
				})
			}).catch(function (error) {
				var errorCode = error.code;
				var errorMessage = error.message;
				console.log(error.code)
				console.log(error.message)
			});
	}


	render() {
		if (!this.props.enabled) {
			return (
				<View style={{ flex: 1, flexDirection: 'column' }} />
			)
		}

		return (
			<View>
				<RNCamera
					ref={ref => {
						this.camera = ref;
					}}
					style={styles.preview}
					type={RNCamera.Constants.Type.back}
					value={this.props.url}
					//flashMode={RNCamera.Constants.FlashMode.on}
					permissionDialogTitle={'Permission to use camera'}
					permissionDialogMessage={'We need your permission to use your camera phone'}
				/>
				<TouchableOpacity
					onPress={this.capture.bind(this)}
					style={styles.capture}
				>
					<Text style={styles.scanButtonText}> SNAP </Text>
				</TouchableOpacity>
			</View>
		);

	}
}


const styles = StyleSheet.create({
	preview: {
		height: 300,
	},
	capture: {
		flex: 0,
		backgroundColor: '#fff',
		borderRadius: 5,
		padding: 15,
		paddingHorizontal: 20,
		alignSelf: 'center',
		margin: 20
	},
	scanButtonText: {
		color: "#8979B7",
		fontSize: 24
	}
})
