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
  Navigator,
  NavigatorIOS,
	StyleSheet,
	Text,
	TouchableHighlight,
  TouchableOpacity,
	View
} from 'react-native';

var LandingPage = require('./routes/landingpage');
var singleBird = require('./routes/singleBird')
var searchResults = require('./routes/searchResults')

var ChirpAlert = React.createClass({
    render: function() {
        return (
            <NavigatorIOS
                style={styles.navigationContainer}
                initialRoute={{
                title: "Chirp Alert",
                component: singleBird,
            }}/>
        );
    }
});

var styles = StyleSheet.create({
    navigationContainer: {
        flex: 1
    }
});

AppRegistry.registerComponent("ChirpAlert", () => ChirpAlert);
//module.exports = ChirpAlert;
