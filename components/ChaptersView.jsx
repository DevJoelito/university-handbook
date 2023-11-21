import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, TouchableOpacity, SafeAreaView, Text, View, TextInput } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons/faVolumeUp';
import { faRefresh } from '@fortawesome/free-solid-svg-icons/faRefresh';
import * as RNFS from 'react-native-fs';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { WebView } from 'react-native-webview';

const writeChapterLocal = async (fileName, content) => {
  
  try {
    let path = RNFS.DocumentDirectoryPath + '/' + fileName + '.html';

    await RNFS.writeFile(path, content, 'utf8');

    return true;
  } catch(e) {
    return false;
  }
}

const readLocalFile = async (fileName) => {
  let trueFileName = fileName + '.html';
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

    console.log(trueFileName);
    if (found) resultFile = await RNFS.readFile(resultInfo[count].path, 'utf8');

    return resultFile;
  } catch(e) {
    return false;
  }
}
 
const Links = ({ navigation, chapterName, sDim, wDim }) => {
  let [chapterHtml, setChapterHtml] = useState('<meta name="viewport" content="width=device-width, initial-scale=1.0"><style>body {background-color : #F7EFEF;}</style><h3 style="text-align : center">Fetching chapter...</h3>');
  let [srchWord, setSrchWord]       = useState('');
  let webViewRef                    = useRef('');

  useEffect(() => {
    let unsubscribe = navigation.addListener('focus', async () => {
      setChapterHtml(await getChapter(chapterName));
    });

    return unsubscribe;
  }, [navigation, chapterName]);

  const getChapter = async (chapter) => {
    setChapterHtml('<meta name="viewport" content="width=device-width, initial-scale=1.0"><style>body {background-color : #F7EFEF;}</style><h3 style="text-align : center">Fetching chapter...</h3>');
    let final = false;
    
    try {
      let result = await fetch(`http://192.168.1.9/evsu_handbook/api/get_handbook.php?chapter=${ chapter }`);
      let data   = '<meta name="viewport" content="width=device-width, initial-scale=1.0"><style>body {background-color : #F7EFEF;}</style>' + await result.text() + '<script type="text/javascript"> document.addEventListener("message", function(message) { let i = JSON.parse(message.data); if(i.srch == "back") { window.find(i.word, false, true) } else if(i.srch == "forward") {  window.find(i.word, false, false) } }); </script>';
      
      if(!await writeChapterLocal(chapter, data)) return data;
      
      final = await readLocalFile(chapter);
      
      if(!final) return data;
  
      return final;
    } catch (e) {
      final = await readLocalFile(chapter);
  
      if(!final) return '<meta name="viewport" content="width=device-width, initial-scale=1.0"><style>body {background-color : #F7EFEF;}</style><h3 style="text-align : center">Something went wrong.</h3>';
  
      return final;
    }
  }

  return (
    <SafeAreaView style = {{ flex : 1, backgroundColor: '#F7EFEF' }}>
        <View style = {{ 
          backgroundColor : 'white',
          height          : (sDim.height * 0.05),
          paddingRight    : (sDim.width * 0.03),
          alignItems      : 'flex-end',
          justifyContent  : 'center'
         }}>
          <TouchableOpacity
            onPress = { () => {
            } }>
            <FontAwesomeIcon icon = { faVolumeUp } size = { sDim.height * 0.04 } color='#710000' />
          </TouchableOpacity>
        </View>
        {/* <ScrollView style = {{ borderWidth : 2, borderColor : 'red' }}> */}
          <View style = {{ 
            marginTop    : (sDim.height * 0.01), 
            marginBottom : (sDim.height * 0.01),
            flex         : 1,
          }}>
            <View style = {{
              display        : 'flex',
              flexDirection  : 'row',
              alignItems     : 'center',
              justifyContent : 'center'
            }}>
              <TextInput 
                style = {{
                  borderWidth  : 0.7,
                  height       : 40,
                  width        : (wDim.width * 0.7),
                  borderRadius : 0.5,
                  marginBottom : (wDim.height * 0.01), 
                  color        : 'black',
                  fontFamily   : 'Times New Roman'
                }}
                placeholder  = 'Find'
                onChangeText = { setSrchWord }/>
              <View style = {{ 
                display        : 'flex',
                flexDirection  : 'row',
                justifyContent : 'center',
                alignItems     : 'center'
               }}>
                <TouchableOpacity 
                  style   = {{ marginLeft : ( wDim.width * 0.028 ) }}
                  onPress = { () => webViewRef.current.postMessage(JSON.stringify({ srch : 'back', word : srchWord })) }>
                  <View>
                    <FontAwesomeIcon icon = { faArrowLeft } size = { sDim.height * 0.04 } color='#710000' />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity 
                  style   = {{ marginLeft : ( wDim.width * 0.028 ) }}
                  onPress = { () => webViewRef.current.postMessage(JSON.stringify({ srch : 'forward', word : srchWord })) }>
                  <View>
                    <FontAwesomeIcon icon = { faArrowRight } size = { sDim.height * 0.04 } color='#710000' />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <WebView
              source           = {{ html:  chapterHtml }} 
              originWhitelist  = {['*']} 
              mixedContentMode = 'compatibility'
              style            = {{ marginLeft : (wDim.width * 0.015), marginRight : (wDim.width * 0.015) }} 
              ref              = { webViewRef }/>
          </View>
        {/* </ScrollView> */}
    </SafeAreaView>
  );
}

export default Links;
