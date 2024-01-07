import React, { useEffect, useState, useCallback } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, Text, View, RefreshControl, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import HandBookChapterCon from './sub/HandBookChapterCon';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
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

const getChapterName = async () => {
  try {
    let result = await fetch(`https://barbac.000webhostapp.com/folders/evsu_handbook/api/get_handbook.php?chapter_list=1`);
    let data   = await result.text();

    if(data == '__error__') return data;
    
    let objRes = JSON.parse(data);

    if(!await writeLocal('chapterName.json', data)) return objRes;
    
    return objRes;
  } catch(e) {
    let final = await readLocalFile('chapterName.json');

    if(!final) return '__error__';

    try {
      return JSON.parse(final);
    } catch(e) {
      return '__error__';
    }
  }
}

const HandBook = ({ navigation, sDim, wDim }) => {  
  let [chapterNames, setChapterNames] = useState([]);
  let [refresh, setRefresh]           = useState(true);
  let [searchText, setSearchText]     = useState('');

  useEffect(() => {
    let focusListener = navigation.addListener('focus', async () => {
      setChapterNames(await getChapterName()); 
      setRefresh(false);
    });

    return focusListener;
  }, [navigation]);

  useEffect(() => {
    let blurListener = navigation.addListener('blur', async () => {
      setChapterNames([]);
      setRefresh(true);
    });

    return blurListener;
  }, [navigation]);

  const refreshList = useCallback(async () => {
    setRefresh(true);
    setChapterNames([]);
    setChapterNames(await getChapterName());
    setRefresh(false);
  }, []);

  const search = useCallback(() => {
    return new Promise((resolve, reject) => {
      let wordSearch = new RegExp(searchText, 'i');
      let chapLen    = chapterNames.length;
      let objRes     = [];
  
      for(i = 0; i < chapLen; i++) {
        let res = chapterNames[i].chapter_name.search(wordSearch, 'i');
  
        if(res >= 0) {
          objRes.push(chapterNames[i]);
        }
      }

      
      if(!objRes.length) return resolve([]);

      resolve(objRes);
    })
  }, [chapterNames, searchText]);

  const useSearch = useCallback(async () => {
    setRefresh(true);
    setChapterNames([]);
    setChapterNames(await search());
    setRefresh(false);
  }, [chapterNames, searchText])
  
  return (
    <SafeAreaView style = {{ flex : 1 }}>
      <View style = {{
        padding           : (wDim.height * 0.006),
        paddingLeft       : (wDim.height * 0.02),
        paddingRight      : (wDim.height * 0.02),        
        borderBottomWidth : 0.7,
        borderColor       : '#949494',
        display           : 'flex',
        flexDirection     : 'row',
      }}>
        <TextInput
          style        = {{ 
            borderWidth     : 0.5,
            borderRadius    : 2, 
            flexGrow        : 1,
            height          : (wDim.height * 0.048),
            backgroundColor : '#faf5f5',
            color           : 'black',
          }}
          onChangeText = { setSearchText }
        />
        <TouchableOpacity style = {{ display : 'flex', justifyContent : 'center', alignItems : 'center', paddingLeft : (wDim.width * 0.02), paddingRight : (wDim.width * 0.02) }} onPress = { useSearch }>
          <FontAwesomeIcon icon={ faSearch } size = { sDim.height * 0.030 } color = '#710000' />
        </TouchableOpacity>
      </View>
      <View style = {{ 
        paddingTop   : (sDim.width * 0.04), 
        paddingLeft  : (sDim.width * 0.01), 
        paddingRight : (sDim.width * 0.01),
        flex         : 1 }}>
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
          (chapterNames == '__error__') ? 
          <View style = {{ flex : 1, justifyContent : 'center', alignItems : 'center' }}>
            <Text style = {{ textAlign : 'center', color : 'black', fontWeight : 'bold', fontSize: 18 }}>Something went wrong.</Text>
            <View>
              <TouchableOpacity>
                <Text style = {{ color : '#5dade2', fontWeight : 'bold', textDecorationLine : 'underline', textAlign : 'center' }} onPress = { refreshList }>RELOAD</Text>
              </TouchableOpacity>
            </View>
          </View> 
          : 
          (!chapterNames.length) ? 
          <View style = {{ flex : 1, justifyContent : 'center', alignItems : 'center' }}>
            <Text style = {{ textAlign : 'center', color : 'black', fontWeight : 'bold', fontSize: 18 }}>No chapter found.</Text>
            <View>
              <TouchableOpacity>
                <Text style = {{ color : '#5dade2', fontWeight : 'bold', textDecorationLine : 'underline', textAlign : 'center' }} onPress = { refreshList }>RELOAD</Text>
              </TouchableOpacity>
            </View>
          </View>
          :
          <FlatList
            data       = { chapterNames }
            renderItem = { ({ item }) => { return (<HandBookChapterCon 
                                                    navigation = { navigation }
                                                    title      = { item.chapter_name }
                                                    chapId     = { item.id }
                                                    sDim       = { sDim }
                                                    wDim       = { wDim } />)} }
            refreshControl = { <RefreshControl refreshing = { refresh } onRefresh = { refreshList } /> }
          />
          
        }
      </View>
    </SafeAreaView>
  );
}

export default HandBook;
