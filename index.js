/**
 * @format
 */

import {AppRegistry, PermissionsAndroid} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotification from "react-native-push-notification";

PushNotification.configure({
    permissions : {
        alert : true,
        badge : true,
        sound : true,
    },
    popInitialNotification : true,
    requestPermissions     : Platform.OS === 'ios',
});

PushNotification.createChannel(
    {
      channelId          : "thesis-handbook-app-notif", 
      channelName        : "handbook-notif", 
      channelDescription : "Notification for new events and chapters.", 
      playSound          : true, 
      soundName          : "default",
      vibrate            : true, 
    }
);

const checkApplicationPermission = async () => {
    if (Platform.OS === 'android') {
        try {
            await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
            );
        } catch (error) {}
    }
}

checkApplicationPermission();

AppRegistry.registerComponent(appName, () => App);
