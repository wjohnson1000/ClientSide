/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
	ActionSheetIOS,
	Geolocation,
	AsyncStorage,
	AppRegistry,
	Component,
	LinkingIOS,
	StyleSheet,
	Text,
	TouchableHighlight,
	View
} from 'react-native';

class ChirpAlert extends Component {
	componentDidMount() {
		LinkingIOS.addEventListener('url', this._handleOpenURL);
	}
	componentWillUnmount() {
		LinkingIOS.removeEventListener('url', this._handleOpenURL);
	}
	_handleOpenURL(event) {
		var token = event.url.replace('chirpalert://&token=', '');
		AsyncStorage.setItem("token", token);
	}
	_onPressButton() {
		LinkingIOS.openURL(
			'http://127.0.0.1:3000/auth/login/twitter'
		);
	}
	_onPressOtherButton() {
		AsyncStorage.getItem("token").then(function(token){
			console.log(token);
			fetch('http://127.0.0.1:3000/test', {
				method: 'GET',
				headers: {
					'Authorization': 'Bearer ' + token
				}
			})  
			.then(response => console.log(response))
			.catch((error) => {
				console.warn(error);
			});

		});
	}
	
	_onShareButton(){
		ActionSheetIOS.showShareActionSheetWithOptions({
			url: 'http://chirpalert.com',
		  message: 'I saw a fucking bird #chirpalert',
		},
		   (error) => {
	  	   console.error(error);
	  },
	  (success, method) => {
	  	if (success) {
				console.log('shared');
			}
		});	
	}

	_onLocateButton(){
		navigator.geolocation.getCurrentPosition(
			(position) => {
				console.log(position);
			},
			(error) => {
				console.log(error.message)
			},
			{enableHighAccuracy:true, timeout: 20000, maximumAge: 1000}
		);
	}

	render() {
		return (
			<View style={styles.container}>
			<Text style={styles.welcome}>
			Welcome to React Native!
			</Text>
			<TouchableHighlight style={styles.button}
			underlayColor='#99d9f4' onPress={this._onPressButton}>
			<Text style={styles.buttonText}>Go</Text>
			</TouchableHighlight>
			<TouchableHighlight style={styles.button}
			underlayColor='#99d9f4' onPress={this._onPressOtherButton}>
			<Text style={styles.buttonText}>Go</Text>
			</TouchableHighlight>
			<TouchableHighlight style={styles.button}
			underlayColor='#99d9f4' onPress={this._onLocateButton}>
			<Text style={styles.buttonText}>Find yourself</Text>
			</TouchableHighlight>
			<TouchableHighlight style={styles.button}
			underlayColor='#99d9f4' onPress={this._onShareButton}>
			<Text style={styles.buttonText}>Share</Text>
			</TouchableHighlight>
			<Text style={styles.instructions}>
			To get started, edit index.ios.js
			</Text>
			<Text style={styles.instructions}>
			Press Cmd+R to reload,{'\n'}
			Cmd+D or shake for dev menu
				</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	welcome: {
		flex: 2,
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	},
	buttonText: {
		color: 'white',
	},
	button: {
		height: 36,
		width: 36,
		flex: 1,
		backgroundColor: '#48BBEC ',
		borderColor: '#48BBEC ',
		borderWidth: 1,
		borderRadius: 8,
		marginBottom: 10,
		alignSelf: 'stretch',
		justifyContent: 'center'
	}
});

AppRegistry.registerComponent('ChirpAlert', () => ChirpAlert);
