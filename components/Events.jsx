import React, { useEffect, useState, useCallback } from 'react';
import { TouchableOpacity, ActivityIndicator, FlatList, SafeAreaView, Text, View, RefreshControl, ScrollView } from 'react-native';
import * as RNFS from 'react-native-fs';
import FastImage from 'react-native-fast-image';

const writeDeptLocal = async (fileName, content) => {
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

const getDeptName = async () => {
  try {
    let result = await fetch(`https://barbac.000webhostapp.com/folders/evsu_handbook/api/get_handbook.php?events=1`);
    let data   = await result.text();

    if(!await writeDeptLocal('events.txt', data)) return await result.json();

    
    final = await readLocalFile('events.txt');
    
    if(!final) return await result.json();
    
    return JSON.parse(final);
  } catch(e) {
    final = await readLocalFile('events.txt');

    if(!final) return [ { dept : 0 } ];

    return JSON.parse(final);
  }
}

const Events = ({ navigation, sDim, wDim }) => {  
  let [chapterNames, setChapterNames] = useState([]);
  let [refresh, setRefresh]           = useState(false);

  useEffect(() => {
    let unsubscribe = navigation.addListener('focus', async () => {
      setChapterNames(await getDeptName());
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    let blurListener = navigation.addListener('blur', async () => {
      setChapterNames([]);
    });

    return blurListener;
  }, [navigation]);

  const refreshList = useCallback(async () => {
    setChapterNames([]);
    setRefresh(true);
    setChapterNames(await getDeptName());
    setRefresh(false);
  }, [])
  
  return (
    <SafeAreaView style = {{ flex : 1 }}>
      <View style = {{ 
        paddingTop   : (sDim.width * 0.02), 
        paddingLeft  : (sDim.width * 0.03), 
        paddingRight : (sDim.width * 0.03),
        flex         : 1 }}>
        {
          (!chapterNames.length) ? 
          <View style = {{
            flex           : 1,
            justifyContent : 'center', 
            alignItems     : 'center'
          }}>
            <ActivityIndicator size="large" color="#900303" />
          </View> 
          :
          (chapterNames[0].name === 0) ? 
          <ScrollView contentContainerStyle = {{ flex : 1 }} refreshControl = { <RefreshControl refreshing = { refresh } onRefresh = { refreshList } /> }>
            <Text style = {{ textAlign : 'center', color : 'black', fontWeight : 'bold', fontSize: 18 }}>Something went wrong.</Text>
          </ScrollView> 
          : 
          ((chapterNames[0].name == 'no_events')) ? 
          <ScrollView contentContainerStyle = {{ flex : 1 }} refreshControl = { <RefreshControl refreshing = { refresh } onRefresh = { refreshList } /> }>
            <Text style = {{ textAlign : 'center', color : 'black', fontWeight : 'bold', fontSize: 18 }}>No events found.</Text>
          </ScrollView>
          :
          <FlatList
            data       = { chapterNames }
            renderItem = { ({ item }) => { return (
                                                    <TouchableOpacity style = {{ marginBottom : (wDim.height * 0.02) }}>
                                                      <View style = {{ width : '100%', backgroundColor : '#d9d9d9', borderRadius : 5 }}>
                                                        <View style = {{ height : (wDim.height * 0.20) }}>
                                                          <FastImage
                                                            style={{ width: '100%', height : '100%' }}
                                                            source={{ uri: item.image }}
                                                          />
                                                        </View>
                                                        <View style = {{ display : 'flex', flexDirection : 'row', justifyContent : 'space-between', padding : (wDim.width * 0.015) }}>
                                                          <Text style = {{ 
                                                            color      : 'black', 
                                                            fontSize   : (wDim.height * 0.025), 
                                                            fontWeight : 'bold' }}>{ item.name }</Text>
                                                          <Text style = {{ 
                                                            color      : 'black', 
                                                            fontSize   : (wDim.height * 0.02),
                                                            marginTop  : 'auto' }}>{ item.date_start }</Text> 
                                                        </View>
                                                      </View>
                                                    </TouchableOpacity>)} }
            refreshControl = { <RefreshControl refreshing = { refresh } onRefresh = { refreshList } /> }
          />
        }
      </View>
    </SafeAreaView>
  );
}

export default Events;
