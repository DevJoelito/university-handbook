import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ActivityIndicator, ScrollView, TouchableOpacity, SafeAreaView, Text, View, TextInput, RefreshControl, FlatList } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Tts from 'react-native-tts';
import * as RNFS from 'react-native-fs';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import ChaptersViewCon from './sub/ChaptersViewCon';


const speakTheChapter = async (voiceOn, text) => {
  try {
    await Tts.getInitStatus();
  
    if(voiceOn) {
      Tts.speak(text);
    } else {
      Tts.stop();
    }
  } catch(e) {
    // Decided to leave it blank.
  }
}

const writeLocal = async (fileName, content) => {
  try {
    let path = RNFS.DocumentDirectoryPath + '/' + fileName + '_store.json';

    await RNFS.writeFile(path, content, 'utf8');

    return true;
  } catch(e) {
    return false;
  }
}

const readLocalFile = async (fileName) => {
  let trueFileName = fileName + '_store.json';
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

const getChapter = async (chapter) => {
  try {
    let result   = await fetch(`https://barbac.000webhostapp.com/folders/evsu_handbook/api/get_handbook.php?chapter=${ chapter }`);
    let response = await result.text();
    if(response == '__error__') return response;
    
    let objRes = JSON.parse(response);

    if(!await writeLocal(chapter, response)) return objRes;
    
    return objRes;
  } catch (e) {
    let finalText = await readLocalFile(chapter);

    if(!finalText) return '__error__';

    try {
      return JSON.parse(finalText);
    } catch(e) {
      return '__error__';
    }
  }
}; 
 
const ChaptersView = ({ navigation, chapterName, chapterId, sDim, wDim }) => {
  let [content, setContent]           = useState([]);
  let [searchText, setSearchText]     = useState('');
  let [refresh, setRefresh]           = useState(true);

  useEffect(() => {
    let focusListener = navigation.addListener('focus', async () => {

      let d = await getChapter(chapterId);

      setContent(d);
      setRefresh(false);
    });

    return focusListener;
  }, [navigation, chapterName]);

  useEffect(() => {
    let blurListener = navigation.addListener('blur', async () => {
      setContent([]);
      setRefresh(true);
      Tts.stop();
    });

    return blurListener;
  }, [navigation]);

  const search = useCallback(() => {
    return new Promise((resolve, reject) => {
      let wordSearch = new RegExp(searchText, 'i');
      let chapLen    = content.length;
      let objRes     = [];
  
      for(i = 0; i < chapLen; i++) {
        let res = content[i].name.search(wordSearch, 'i');
  
        if(res >= 0) {
          objRes.push(content[i]);
        }
      }
      
      if(!objRes.length) return resolve([]);

      resolve(objRes);
    })
  }, [content, searchText]);

  const useSearch = useCallback(async () => {
    setRefresh(true);
    setContent([]);
    setContent(await search());
    setRefresh(false);
  }, [content, searchText]);

  const refreshList = useCallback(async () => {
    setRefresh(true);
    Tts.stop();

    let d = await getChapter(chapterId);

    setContent(d);
    setRefresh(false);
  }, [chapterId]);

  return (
    <SafeAreaView style = {{ flex : 1 }}>
      <View style = {{ 
        backgroundColor : 'white',
        height          : (sDim.height * 0.07),
      }}>
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
              onChangeText = { setSearchText }/>
              <TouchableOpacity style = {{ display : 'flex', justifyContent : 'center', alignItems : 'center', paddingLeft : (wDim.width * 0.02), paddingRight : (wDim.width * 0.02) }} onPress = { useSearch }>
                <FontAwesomeIcon icon={ faSearch } size = { sDim.height * 0.030 } color = '#710000' />
              </TouchableOpacity>
            <View style = {{ 
              display        : 'flex',
              flexDirection  : 'row',
              justifyContent : 'center',
              alignItems     : 'center'
              }}>
            </View>
          </View>
        </View>
      </View>
      <View style = {{ flex : 1 }}>
        {
          (refresh) ? 
          <View style = {{
            flex           : 1,
            justifyContent : 'center', 
            alignItems     : 'center'
          }}>
            <ActivityIndicator size="large" color="#900303" />
          </View>
          :
          (content == '__error__') ?
          <View style = {{ flex : 1, justifyContent : 'center', alignItems : 'center' }}>
            <Text style = {{ textAlign : 'center', color : 'black', fontWeight : 'bold', fontSize: 18 }}>Something went wrong.</Text>
            <View>
              <TouchableOpacity>
                <Text style = {{ color : '#5dade2', fontWeight : 'bold', textDecorationLine : 'underline', textAlign : 'center' }} onPress = { refreshList }>RELOAD</Text>
              </TouchableOpacity>
            </View>
          </View> 
          :
          (!content.length) ? 
          <View style = {{ flex : 1, justifyContent : 'center', alignItems : 'center' }}>
            <Text style = {{ textAlign : 'center', color : 'black', fontWeight : 'bold', fontSize: 18 }}>No article found.</Text>
            <View>
              <TouchableOpacity>
                <Text style = {{ color : '#5dade2', fontWeight : 'bold', textDecorationLine : 'underline', textAlign : 'center' }} onPress = { refreshList }>RELOAD</Text>
              </TouchableOpacity>
            </View>
          </View>
          : 
          <FlatList
            data       = { content }
            renderItem = { ({ item }) => { return ( <ChaptersViewCon 
                                                      wDim                = { wDim }
                                                      sDim                = { sDim }
                                                      title               = { item.name }
                                                      webContent          = { item.web_content }
                                                      article             = { item.content } /> ) } } 
                                                      refreshControl = { <RefreshControl refreshing = { refresh } onRefresh = { refreshList } /> } />
        }
      </View>
    </SafeAreaView>
  );
}

export default ChaptersView;
