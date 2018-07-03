import React, { Component } from 'react';
import { TouchableOpacity, TouchableHighlight, View, Text, StyleSheet, Button, FlatList, TextInput, Alert, Image } from 'react-native';
import { RNCamera } from 'react-native-camera';
console.log(RNCamera);

export default class CameraView extends Component {
	constructor(props) {
		super(props)
		this.state = {
			response: "",
			imageUrl: "",
			base64: "",
			useClassify:false
		}
		this.capture = this.capture.bind(this);
	}

	async capture() {
		const options = { quality: 0.5, base64: true };
		try {
			if (this.camera) {
				const cameraData = await this.camera.takePictureAsync(options);
				console.log(cameraData.uri);
				this.setState({
					imageUrl: cameraData.uri,
					base64: cameraData.base64
				});
				this.handleScanResponseChange();
			}
		} catch (e) {
			console.log(e)
		}
	}

	handleScanResponseChange() {
		var imageURI = this.state.imageUrl;
		var base64 = this.state.base64;
		if (this.state.useClassify) {
			this.props.onGetResponseScan(imageURI, base64, true);
		}
		this.props.onGetResponseScan(imageURI, base64, false);
	}

	/*	tenserflowCladd(){
			const results = await ifImageRecognition.recognize({
				///image: ,
			  });
		}*/

	render() {
		if (!this.props.enabled) {
			return (
				<View style={{ flex: 1, flexDirection: 'column' }} />
			)
		}
		return (
			<View style={styles.container}>
				<RNCamera
					ref={ref => {
						this.camera = ref;
					}}
					style={styles.preview}
					type={RNCamera.Constants.Type.back}
					value={this.props.url}
					permissionDialogTitle={'Permission to use camera'}
					permissionDialogMessage={'We need your permission to use your camera phone'}
				/>
				<TouchableOpacity
					onPress={() => {
						this.setState({ useClassify: true })
						this.capture();
					}}
					style={styles.capture}>
					<Text style={styles.scanButtonText}> Scan Art </Text>

				</TouchableOpacity>

				<TouchableOpacity
					onPress={() => {
						this.setState({ useClassify: false })
						this.capture();
					}}>
					<Text style={styles.SEARCHwEBText}> Search on Web </Text>
				</TouchableOpacity>
			</View>
		);

	}
}


const styles = StyleSheet.create({
	preview: {
		height: 300,
	},
	container:{
		backgroundColor:"#FAFAFA"
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
		backgroundColor: "#8979B7",
		padding:0,
		fontSize: 17,
		height:48,
		width:315,
		color:"#FFFFFF",
		borderRadius:2,
		textAlign: 'center',
		paddingTop:10
	},
	SEARCHwEBText:{
		color: "#8979B7",
		fontSize:17,
		textAlign: 'center'
	}
})

// after press button show loading and empty screen with nav bar
// and on done open modal 