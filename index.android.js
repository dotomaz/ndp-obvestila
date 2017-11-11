import  React  from 'react';
import { AppRegistry, Platform } from 'react-native';
import FCM, {
	FCMEvent, 
	RemoteNotificationResult, 
	WillPresentNotificationResult, 
	NotificationType
} from 'react-native-fcm';

import App from './App';


FCM.on(FCMEvent.RefreshToken, (token) => {
	
	console.log(token);

    var request = { 
	    method: 'POST',
	    headers: {
	    	'Accept': 'application/json',
			'Content-Type': 'application/json'
	    },
	    body: JSON.stringify({
	    	"os": "android",
	    	"token": token
	    }) 
	};


    fetch('https://nogomet-polzela.si/api/json/add-device', request)
    	.then( (res)=> console.log(res) )
    	.catch( (res)=> console.log(res) );
});

class NotificationAppWrapper extends React.Component {
    componentDidMount() {
		// iOS: show permission prompt for the first call. later just check permission in user settings
        // Android: check permission in user settings
        FCM.requestPermissions().then(()=>console.log('granted')).catch(()=>console.log('notification permission rejected'));
        
        FCM.getFCMToken().then(token => {

        	console.log(token);

            var request = { 
			    method: 'POST',
			    headers: {
			    	'Accept': 'application/json',
	    			'Content-Type': 'application/json'
			    },
			    body: JSON.stringify({
			    	"os": "android",
			    	"token": token
			    }) 
			};


	        fetch('https://nogomet-polzela.si/api/json/add-device', request)
	        	.then( (res)=> console.log(res) )
	        	.catch( (res)=> console.log(res) );
        });
        
        this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {
           console.log(notif);
        });
        
        // initial notification contains the notification that launchs the app. If user launchs app by clicking banner, 
        // the banner notification info will be here rather than through FCM.on event
        // sometimes Android kills activity when app goes to background, and when resume it broadcasts notification before JS is run. 
        // You can use FCM.getInitialNotification() to capture those missed events.
        // initial notification will be triggered all the time even when open app by icon so send some action identifier when you send notification
        FCM.getInitialNotification().then(notif=>{
           console.log(notif)
        });
    }

    componentWillUnmount() {
        // stop listening for events
        this.notificationListener.remove();
    }

    render() {
    	return ( 
    		<App style={{ flex:1 }} ></App>
    	);
    }
}
console.log("start");
AppRegistry.registerComponent('ndpobvestila', () => NotificationAppWrapper);




/*var PushNotification = require('react-native-push-notification');

PushNotification.configure({
 
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function(token) { 
        console.log( 'TOKEN:', token );

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
        	.then( (res)=> console.log(res) )
        	.catch( (res)=> console.log(res) );

    },

    // (required) Called when a remote or local notification is opened or received
    onNotification: function(notification) {
        console.log( 'NOTIFICATION:', notification );
    },

    // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
    senderID: "1033629730222",

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
        alert: true,
        badge: true,
        sound: true
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    //
    //  * (optional) default: true
    //  * - Specified if permissions (ios) and token (android and ios) will requested or not,
    //  * - if not, you must call PushNotificationsHandler.requestPermissions() later
    //
    requestPermissions: true,
});*/