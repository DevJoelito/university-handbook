/**
 * @format
 */

import {AppRegistry, PermissionsAndroid} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotification from "react-native-push-notification";
import { useNavigation } from '@react-navigation/native';
import * as RNFS from 'react-native-fs';

const writeLocal = async (fileName, content) => {
    try {
        let path = RNFS.DocumentDirectoryPath + '/' + fileName;
  
        await RNFS.writeFile(path, content, 'utf8');
  
        return true;
    } catch(e) {
        return false;
    }
}
  
const readLocalFile = async (fileName) => {
    let trueFileName = fileName;
    let count        = 0;
    let found        = false;
    let resultFile   = false;
  
    try {
        let resultInfo = await RNFS.readDir(RNFS.DocumentDirectoryPath);

        for(; count < resultInfo.length; count++) {
            if (resultInfo[count].name == trueFileName) {
                found = true;
                
                break;
            };
        }

        if (found) resultFile = await RNFS.readFile(resultInfo[count].path, 'utf8');
    
        return resultFile;
    } catch(e) {
        return false;
    }
}

const getNotif = async () => {
    try {
        let result = await fetch(`http://192.168.1.7/evsu_handbook/api/get_handbook.php?notif=1`);
        let data   = await result.text();

        if(data == '__error__') return data;
        
        let objRes = JSON.parse(data);

        if(!await writeLocal('notif.json', data)) return objRes;
        
        return objRes;
    } catch(e) {
        let final = await readLocalFile('notif.json');

        if(!final) return '__error__';

        try {
            return JSON.parse(final);
        } catch(e) {
            return '__error__';
        }
    }
}

PushNotification.configure({
    onNotification: function (notification) {
        let navigation = useNavigation();

        if(notification.data.type == "event") {
            navigation.navigate("EventsView");
        } else if(notification.data.type == "chapter") {
            navigation.navigate("HandBookView");
        }

        console.log("NOTIFICATION:", notification);
    },

    onAction: function (notification) {
        console.log("ACTION:", notification.action);
        console.log("NOTIFICATION:", notification);
    },

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

PushNotification.localNotificationSchedule({
    channelId  : "thesis-handbook-app-notif",
    id         : 0,
    title      : "EVSU handbook",
    message    : "Scheduled testing notification.",
    date       : new Date(Date.now() + (60 * 1000)), // in 60 secs
});


const checkApplicationPermission = async () => {
    if (Platform.OS === 'android') {
        try {
            await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
            );
        } catch (error) {}
    }
};

checkApplicationPermission();


AppRegistry.registerComponent(appName, () => App);
