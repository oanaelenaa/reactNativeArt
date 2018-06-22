import React, { Component } from 'react';
import { TouchableOpacity, TouchableHighlight, View, Text, StyleSheet, Button, FlatList, TextInput, Alert, Image } from 'react-native';
import { RNCamera } from 'react-native-camera';
import RNFetchBlob from 'react-native-fetch-blob';
console.log(RNCamera);
export default class CameraView extends Component {
	constructor(props) {
		super(props)
	}

	async capture() {
		const options = { quality: 0.5, base64: true };
		try {
			const cameraData = await this.camera.takePictureAsync(options);
			console.log(cameraData.uri);
			this.setState({
				url:cameraData.url
			})

		} catch (e) {
			// This logs the error
			console.log(e)
		}
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
					<Text style={{ fontSize: 14 }}> SNAP </Text>
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

})
