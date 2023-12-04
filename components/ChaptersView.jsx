import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ActivityIndicator, ScrollView, TouchableOpacity, SafeAreaView, Text, View, TextInput, RefreshControl } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons/faVolumeUp';
import { faVolumeMute } from '@fortawesome/free-solid-svg-icons/faVolumeMute';
import Tts from 'react-native-tts';
import * as RNFS from 'react-native-fs';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { WebView } from 'react-native-webview';

const speakTheChapter = async (voiceOn, text) => {
  await Tts.getInitStatus();

  if(voiceOn) {
    Tts.speak(text);
  } else {
    Tts.stop();
  }
}

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

    if (found) resultFile = await RNFS.readFile(resultInfo[count].path, 'utf8');

    return resultFile;
  } catch(e) {
    return false;
  }
}
 
const Links = ({ navigation, chapterName, chapterId, sDim, wDim }) => {
  let [chapterHtml, setChapterHtml]   = useState('');
  let [chapterVoice, setChapterVoice] = useState('No text');
  let [srchWord, setSrchWord]         = useState('');
  let [speak, setSpeak]               = useState(false);
  let [refresh, setRefresh]           = useState(false);
  let webViewRef                      = useRef('');

  useEffect(() => {
    let focusListener = navigation.addListener('focus', async () => {
      let d = await getChapter(chapterId);

      setChapterHtml(d.html);
      setChapterVoice(d.text);
      setSpeak(false);
    });

    return focusListener;
  }, [navigation, chapterName]);

  useEffect(() => {
    let blurListener = navigation.addListener('blur', async () => {
      setChapterVoice('No text');
      setChapterHtml('');
      setSpeak(false);
      Tts.stop();
    });

    return blurListener;
  }, [navigation]);

  const getChapter = useCallback(async (chapter) => {
    let finalHtml = false;
    let finalText = false;
    
    try {
      let result   = await fetch(`https://barbac.000webhostapp.com/folders/evsu_handbook/api/get_handbook.php?chapter=${ chapter }`);
      let response = await result.json();
      let data     = '<meta name="viewport" content="width=device-width, initial-scale=1.0"><style>body {background-color : #F7EFEF;}</style><body>' + response.html + '<script type="text/javascript"> document.addEventListener("message", function(message) { let i = JSON.parse(message.data); if(i.srch == "back") { window.find(i.word, false, true) } else if(i.srch == "forward") {  window.find(i.word, false, false) } else if(!i.srch && i.word == "speak") { var text = document.body.innerText; let speech = new SpeechSynthesisUtterance(); speech.text = text; window.speechSynthesis.speak(speech); } }); </script></body>';
      
      if(!await writeChapterLocal(chapter, data) || !await writeChapterLocal(chapter + '_for_voice', response.text)) return { html : data, text : response.text };
      
      finalHtml = await readLocalFile(chapter);
      finalText = await readLocalFile(chapter + '_for_voice');
      
      if(!finalHtml || !finalText) return { html : data, text : response.text };
  
      return { html : finalHtml, text : finalText };
    } catch (e) {
      finalHtml = await readLocalFile(chapter);
      finalText = await readLocalFile(chapter + '_for_voice');

      if(!finalHtml || !finalText) return { html : '<meta name="viewport" content="width=device-width, initial-scale=1.0"><style>body {background-color : #F7EFEF;}</style><h3 style="text-align : center">Something went wrong.</h3>', text : 'No text'};
  
      return { html : finalHtml, text : finalText };
    }
  }, []); 

  const refreshList = useCallback(async (idChapter) => {
    setChapterHtml('');
    setChapterVoice('No text');
    
    let d = await getChapter(idChapter);

    setRefresh(true);
    setSpeak(false);
    Tts.stop();
    setChapterHtml(d.html);
    setChapterVoice(d.text);
    setSpeak(false);
    setRefresh(false);
  }, [])

  return (
    <SafeAreaView style = {{ flex : 1, backgroundColor: '#F7EFEF' }}>
      <View style = {{ 
        backgroundColor : 'white',
        height          : (sDim.height * 0.05),
      }}>
        <View 
          style = {{ 
            width        : '100%',
            paddingRight : (sDim.width * 0.03),
            paddingTop   : (sDim.width * 0.0099),
            alignItems      : 'flex-end',
            justifyContent  : 'center'
          }} >
          <TouchableOpacity
            onPress = { () => {
              setSpeak(!speak);
              speakTheChapter(!speak, chapterVoice)
            } }>
            {
              speak ? 
              <FontAwesomeIcon icon = { faVolumeUp } size = { sDim.height * 0.04 } color='#710000' />
              :
              <FontAwesomeIcon icon = { faVolumeMute } size = { sDim.height * 0.04 } color='#710000' />
            }
          </TouchableOpacity>
        </View>
      </View>
      <View 
        style = {{ 
          marginTop    : (sDim.height * 0.01), 
          marginBottom : (sDim.height * 0.01),
          flex         : 1
        }}>
        <View style = {{
          display        : 'flex',
          flexDirection  : 'row',
          alignItems     : 'center',
          justifyContent : 'center'
        }}>
          <Text style = {{ color : 'black' }}>Find: </Text>
          <TextInput 
            style = {{
              borderWidth  : 0.7,
              height       : 35,
              borderWidth  : 0.5,
              borderRadius : 0.5,
              width        : (wDim.width * 0.7),
              borderRadius : 0.5,
              fontSize     : 15,
              marginBottom : (wDim.height * 0.01), 
              color        : 'black',
              fontFamily   : 'Times New Roman'
            }}
            onChangeText = { setSrchWord }/>
          <View style = {{ 
            display        : 'flex',
            flexDirection  : 'row',
            justifyContent : 'center',
            alignItems     : 'center'
            }}>
            <TouchableOpacity 
              style    = {{ marginLeft : ( wDim.width * 0.028 ) }}
              disabled = { chapterHtml == '' ? true : false } 
              onPress  = { () => webViewRef.current.postMessage(JSON.stringify({ srch : 'back', word : srchWord })) }>
              <View>
                <FontAwesomeIcon icon = { faArrowLeft } size = { sDim.height * 0.03 } color='#710000' />
              </View>
            </TouchableOpacity>
            <TouchableOpacity 
              style    = {{ marginLeft : ( wDim.width * 0.028 ) }}
              disabled = { chapterHtml == '' ? true : false } 
              onPress  = { () => webViewRef.current.postMessage(JSON.stringify({ srch : 'forward', word : srchWord })) }>
              <View>
                <FontAwesomeIcon icon = { faArrowRight } size = { sDim.height * 0.03 } color='#710000' />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {
          chapterHtml == '' ? 
          <View style = {{
            flex           : 1,
            justifyContent : 'center', 
            alignItems     : 'center'
          }}>
            <ActivityIndicator size="large" color="#900303" />
          </View>
          :
          <ScrollView 
            contentContainerStyle = {{ flex : 1 }}
            refreshControl        = { <RefreshControl refreshing = { refresh } onRefresh = { () => refreshList(chapterId) } /> }>
            <WebView
              source           = {{ html:  chapterHtml }} 
              originWhitelist  = {['*']} 
              mixedContentMode = 'compatibility'
              style            = {{ marginLeft : (wDim.width * 0.015), marginRight : (wDim.width * 0.015) }} 
              ref              = { webViewRef } />
          </ScrollView>
        }
      </View>
    </SafeAreaView>
  );
}

export default Links;
