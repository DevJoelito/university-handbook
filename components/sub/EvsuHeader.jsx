import { useState, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons/faBell';
import * as RNFS from 'react-native-fs';

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

    if (found) {
      resultFile = await RNFS.readFile(resultInfo[count].path, 'utf8'); 
      
      let a = JSON.parse(resultFile);

      if(a.length) {
        if(a[0].name == 'no_events') {
          return false
        } else {
          return true;
        }
      } else {
        return false;
      }
    } 
    
    return resultFile;
  } catch(e) {
    return false;
  }
}

const EvsuHeader = ({ navigation, sDim, wDim }) => {
  let [showNotif, setShowNotif] = useState(false);

  useEffect(() => {
    let focusListener = navigation.addListener('focus', async () => {
      setShowNotif(await readLocalFile('events.txt'));
    })

    return focusListener;
  }, [navigation]);


  return (
    <View>
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
            top : (wDim.height * 0.024), 
            left : (wDim.height * 0.108) }}>
            <Image 
              style = {{
                height : (wDim.height * 0.021),
                width  : (wDim.width * 0.6),
                resizeMode : 'stretch'
              }}
              source = { require('../../assets/images/main-text.png') } />
          </View>
          {
            showNotif && <View style = {{ top : (wDim.height * 0.015), right : (wDim.width * 0.053), width : (wDim.height * 0.018), height : (wDim.height * 0.018), borderWidth : 1.5, position : 'absolute', backgroundColor : 'blue', zIndex : 2, borderRadius : 100, backgroundColor : '#710000' }}></View>
          }
          <View style= {{ 
            position : 'absolute', 
            top : (wDim.height * 0.015), 
            right : (wDim.width * 0.02) }}>
              <TouchableOpacity onPress = { () => navigation.navigate('EventsView') }>
                <FontAwesomeIcon 
                  size  = { (sDim.height * 0.035) }
                  icon  = { faBell } />
              </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

export default EvsuHeader;
