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
    let eventNotifCount   = parseInt(notif[0].event_count) - parseInt(comNotif[0].eventNotifCount);
    let chapterNotifCount = parseInt(notif[0].chapter_count) - parseInt(comNotif[0].chapterNotifCount);
    let allNotifCount     = eventNotifCount + chapterNotifCount;
    n                     = [{ eventNotifCount, chapterNotifCount, allNotifCount }];
  }


  return n;
}

const overWriteNotif = async (ahead, behind, type) => {
  let moded = behind;
  
  if(type == 'event') {
    moded[0].event_count = ahead[0].event_count;
  } else if(type == 'chapter') {
    moded[0].chapter_count = ahead[0].chapter_count;
  }

  try {
    await writeLocal('comNotif.json', JSON.stringify(moded));
  } catch(e) {}
}

const EvsuHeader = ({ navigation, sDim, wDim }) => {
  let [notif, setNotif]             = useState([{"chapter_count":"0", "event_count":"0"}]);
  let [behindNotif, setBehindNotif] = useState([{"chapter_count":"0", "event_count":"0"}]);
  let [showBox, setShowBox]         = useState(false);
  let [refresh, setRefresh]         = useState(true);

  useEffect(() => {
    let focusListener = navigation.addListener('focus', async () => {
      setNotif(await getNotif());

      try {
        let behNotif = await readLocalFile('comNotif.json'); 
        
        if(!behNotif) {
          await writeLocal('comNotif.json', '[{"chapter_count":"0","event_count":"0"}]');
        } else {
          setBehindNotif(JSON.parse(behNotif));
        }
      } catch(e) {}

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
              <TouchableOpacity onPress = { () => setShowBox(!showBox) } >
                {
                  ((parseInt(notif[0].chapter_count) - parseInt(behindNotif[0].chapter_count)) != 0 || (parseInt(notif[0].event_count) - parseInt(behindNotif[0].event_count)) != 0 && notif != '__error__') && <View style = {{ 
                                                            top             : 0, 
                                                            right           : (wDim.width * 0.040), 
                                                            borderWidth     : 1.5, 
                                                            position        : 'absolute', 
                                                            zIndex          : 2, 
                                                            borderRadius    : 100,
                                                            backgroundColor : '#710000' }}>    
                                                            <Text style = {{ 
                                                              color      : 'white',
                                                              fontWeight : 'bold',
                                                              fontSize   : (wDim.width * 0.035),
                                                              padding    : 2
                                                             }}>
                                                              { (parseInt(notif[0].chapter_count) - parseInt(behindNotif[0].chapter_count)) + (parseInt(notif[0].event_count) - parseInt(behindNotif[0].event_count)) }
                                                            </Text>
                                                          </View>
                }
                <FontAwesomeIcon 
                  size  = { (sDim.height * 0.035) }
                  icon  = { faBell } />
              </TouchableOpacity>
          </View>
          <TouchableOpacity style = {{ 
            display  : (showBox) ? 'block' : 'none', 
            position : 'absolute', 
            width    : '100%', 
            top      : 0, 
            height   : (wDim.height) 
          }} 
            onPress = { () => setShowBox(!showBox) }>
          </TouchableOpacity>
          <View style = {{ 
            zIndex          : 2, 
            display         : (showBox) ? 'block' : 'none', 
            position        : 'absolute', 
            top             : (wDim.height * 0.062), 
            right           : (wDim.width * 0.01), 
            width           : (wDim.width * 0.75), 
            backgroundColor : 'transparent' }}>
            <View style = {{ 
              position        : 'absolute', 
              right           : (wDim.width * 0.024), 
              backgroundColor : 'white', 
              width           : (wDim.width * 0.05), 
              height          : (wDim.width * 0.05), 
              transform       : 'rotate(-45deg)', 
              borderWidth     : 0.5, 
              borderColor     : '#abb2b9' }}>
            </View>
            <View style = {{ 
              position        : 'absolute', 
              top             : (wDim.height * 0.0095), 
              right           : (wDim.width * 0.01), 
              backgroundColor : 'white', 
              width           : '100%', 
              borderWidth     : 0.5, 
              borderColor     : '#abb2b9' }}>
              <View style = {{ padding : (wDim.width * 0.02) }}>
                {
                  (refresh) ? 
                  <ActivityIndicator size="large" color="#900303" />
                  :
                  (notif == '__error__') ? 
                  <View><Text style = {{ color : 'black' }}>Something went wrong.</Text></View>
                  : 
                  (behindNotif.length ) ?
                  ((parseInt(notif[0].chapter_count) - parseInt(behindNotif[0].chapter_count)) == 0 && (parseInt(notif[0].event_count) - parseInt(behindNotif[0].event_count)) == 0) ? 
                  <View><Text style = {{ color : 'black' }}>0 notifications.</Text></View>
                  :
                  <View>
                    <TouchableOpacity style = {{ 
                      paddingTop        : 8, 
                      marginBottom      : (wDim.height * 0.01), 
                      display           : (notif[0].chapter_count - behindNotif[0].chapter_count != 0) ? 'block' : 'none', 
                      padding           : (wDim.height * 0.005), 
                      borderBottomWidth : 0.5, 
                      borderColor       : '#abb2b9' }}
                      onPress = { () => {
                        overWriteNotif(notif, behindNotif, 'chapter');
                        navigation.navigate('HandBookView');
                      } }>
                      <Text style = {{ 
                        color      : 'black', 
                        fontSize   : (wDim.height * 0.024), 
                        fontWeight : 'bold' }}>
                        { (parseInt(notif[0].chapter_count) - parseInt(behindNotif[0].chapter_count)) } new chapter/s added.
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {{ 
                      paddingTop        : 8, 
                      marginBottom      : (wDim.height * 0.01), 
                      display           : (notif[0].event_count - behindNotif[0].event_count != 0) ? 'block' : 'none', 
                      padding           : (wDim.height * 0.005), 
                      borderBottomWidth : 0.5, 
                      borderColor       : '#abb2b9' }}
                      onPress = { () => {
                        overWriteNotif(notif, behindNotif, 'event');
                        navigation.navigate('EventsView');
                      } }>
                      <Text style = {{ 
                        color      : 'black', 
                        fontSize   : (wDim.height * 0.024), 
                        fontWeight : 'bold' }}>
                        { (parseInt(notif[0].event_count) - parseInt(behindNotif[0].event_count)) } new event/s added.
                      </Text>
                    </TouchableOpacity>
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
