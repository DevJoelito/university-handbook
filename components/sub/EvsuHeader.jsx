import { useState, useEffect } from 'react';
import { ActivityIndicator, Text, View, Image, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons/faBell';
import * as RNFS from 'react-native-fs';
import { parse } from 'react-native-svg';

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

const notifLength = (notif, comNotif) => {
  let n = [];
  
  if (notif != '__error__' && notif.length && comNotif) {
    let eventNotifCount   = parseInt(notif[0].chapter_count) - parseInt(comNotif[0].chapterNotifCount);
    let chapterNotifCount = parseInt(notif[0].event_count) - parseInt(comNotif[0].eventNotifCount); 
    let allNotifCount     = eventNotifCount + chapterNotifCount;
    n                     = [{ eventNotifCount, chapterNotifCount, allNotifCount }];
  }

  return n;
}

const overWriteNotif = (notif, comNotif, notType) => {
  let ex = comNotif;

  if (notif != '__error__' && notif.length && comNotif) {
    if(notType == 'event') {
      ex[0].eventNotifCount = notif[0].event_count;
    } else if(notType == 'chapter') {
      ex[0].chapterNotifCount = notif[0].chapter_count;
    }

    try {
      writeLocal('comNotif.json', JSON.stringify(comNotif));
    } catch(e) {}

  }

  return ex;
}

const EvsuHeader = ({ navigation, sDim, wDim }) => {
  let [notif, setNotif]           = useState([]);
  let [notifCount, setNotifCount] = useState([]);
  let [showBox, setShowBox]       = useState(false);
  let [refresh, setRefresh]       = useState(true);

  useEffect(() => {
    let focusListener = navigation.addListener('focus', async () => {
      let comNotif = false;

      setNotif(await getNotif());
      
      try {
        comNotif = await readLocalFile('comNotif.json'); 
        
        if(!comNotif) {
          await writeLocal('comNotif.json', '[{"eventNotifCount":"0","chapterNotifCount":"0","allNotifCount":"0"}]');
        } else {
          comNotif = JSON.parse(comNotif);
        }
      } catch(e) {
        console.log('error');
      }

      setNotifCount(notifLength(notif, comNotif));
      setRefresh(false);
    })

    return focusListener;
  }, [navigation, notif]);

  return (
    <View style = {{ zIndex : 2 }}>
      <View>
        <View style = {{
          backgroundColor : '#710000',
          height          : (wDim.height * 0.07),
          marginTop       : (wDim.height * 0.01),
          marginBottom    : (wDim.height * 0.01),
          paddingRight    : (wDim.width * 0.02),
          position        : 'relative'
        }}>
          <View style = {{
            position : 'absolute',
            top      : (wDim.height * 0.01) * -1, 
            left     : (wDim.width * 0.02)
        }}>
            <Image 
              style = {{
                height : (wDim.height * 0.09),
                width  : (wDim.height * 0.09),
              }}
              source = { require('../../assets/images/the-evsu-logo.png') } />
          </View>
          <View style = {{ 
            position : 'absolute', 
            top      : (wDim.height * 0.024), 
            left     : (wDim.height * 0.108) }}>
            <Image 
              style = {{
                height : (wDim.height * 0.021),
                width  : (wDim.width * 0.6),
                resizeMode : 'stretch'
              }}
              source = { require('../../assets/images/main-text.png') } />
          </View>
          <View style= {{
            zIndex   : 2, 
            position : 'absolute', 
            top      : (wDim.height * 0.015), 
            right    : (wDim.width * 0.02) }}>
              {/* <TouchableOpacity onPress = { () => navigation.navigate('EventsView') }> */}
              <TouchableOpacity onPress = { () => setShowBox(!showBox) } >
                {
                  (notif != 0 && notif != '__error__') && <View style = {{ top : (wDim.height * 0.015), right : (wDim.width * 0.053), width : (wDim.height * 0.018), height : (wDim.height * 0.018), borderWidth : 1.5, position : 'absolute', backgroundColor : 'blue', zIndex : 2, borderRadius : 100, backgroundColor : '#710000' }}></View>
                }
                <FontAwesomeIcon 
                  size  = { (sDim.height * 0.035) }
                  icon  = { faBell } />
              </TouchableOpacity>
          </View>
          <TouchableOpacity style = {{ display : (showBox) ? 'block' : 'none', position : 'absolute', width : '100%', top : 0, height : (wDim.height) }} onPress = { () => setShowBox(!showBox) }>
          </TouchableOpacity>
          <View style = {{ zIndex : 2, display : (showBox) ? 'block' : 'none', position : 'absolute', top : (wDim.height * 0.062), right : (wDim.width * 0.01), width : (wDim.width * 0.75), backgroundColor : 'transparent' }}>
            <View style = {{ position : 'absolute', right : (wDim.width * 0.024), backgroundColor : 'white', width : (wDim.width * 0.05), height : (wDim.width * 0.05), transform : 'rotate(-45deg)', borderWidth : 0.5, borderColor : '#abb2b9' }}>
            </View>
            <View style = {{ position : 'absolute', top : (wDim.height * 0.0095), right : (wDim.width * 0.01), backgroundColor : 'white', width : '100%', borderWidth : 0.5, borderColor : '#abb2b9' }}>
              <View style = {{ padding : (wDim.width * 0.02) }}>
                {
                  (refresh) ? 
                  <ActivityIndicator size="large" color="#900303" />
                  :
                  (notif == '__error__') ? 
                  <View><Text style = {{ color : 'black' }}>Something went wrong.</Text></View>
                  : 
                  (notifCount.length) ?
                  <View>
                    <TouchableOpacity onPress = { () => setNotifCount(notifLength(notif, overWriteNotif(notif, notifCount, 'chapter'))) } style = {{ paddingTop : 8, marginBottom : (wDim.height * 0.01), display : (notifCount[0].chapterNotifCount != 0) ? 'block' : 'none', padding : (wDim.height * 0.005), borderBottomWidth : 0.5, borderColor : '#abb2b9' }}><Text style = {{ color : 'black', fontSize : (wDim.height * 0.024), fontWeight : 'bold' }}>{ notifCount[0].chapterNotifCount } new chapter/s added.</Text></TouchableOpacity>
                    <TouchableOpacity onPress = { () => setNotifCount(notifLength(notif, overWriteNotif(notif, notifCount, 'event'))) } style = {{ paddingTop : 8, marginBottom : (wDim.height * 0.01), display : (notifCount[0].eventNotifCount != 0) ? 'block' : 'none', padding : (wDim.height * 0.005), borderBottomWidth : 0.5, borderColor : '#abb2b9' }}><Text style = {{ color : 'black', fontSize : (wDim.height * 0.024), fontWeight : 'bold' }}>{ notifCount[0].eventNotifCount } new event/s added.</Text></TouchableOpacity>
                  </View>
                  :
                  <View><Text style = {{ color : 'black' }}>0 notifications.</Text></View>
                }
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

export default EvsuHeader;
