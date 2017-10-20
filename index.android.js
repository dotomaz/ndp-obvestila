import { AppRegistry } from 'react-native';
import App from './App';
var PushNotification = require('react-native-push-notification');

PushNotification.configure({

    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function(token) {
        //console.log( 'TOKEN:', token );

        var request = {
		    method: 'POST',
		    headers: {
		    	'Accept': 'application/json',
    			'Content-Type': 'application/json'
		    },
		    body: JSON.stringify({
		    	"os": "android",
		    	"token": token.token
		    })
		};


        fetch('https://nogomet-polzela.si/api/json/add-device', request)
        	.then( (res)=> console.log(res) );

    },

    // (required) Called when a remote or local notification is opened or received
    onNotification: function(notification) {
        //console.log( 'NOTIFICATION:', notification );
    },

    // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
    senderID: "YOUR GCM SENDER ID",

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
        alert: true,
        badge: true,
        sound: true
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
      * (optional) default: true
      * - Specified if permissions (ios) and token (android and ios) will requested or not,
      * - if not, you must call PushNotificationsHandler.requestPermissions() later
      */
    requestPermissions: true,
});

AppRegistry.registerComponent('ndpobvestila', () => App);