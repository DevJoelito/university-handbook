import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import HandBookChapterCon from './sub/HandBookChapterCon';
import * as RNFS from 'react-native-fs';

const writeChapterLocal = async (fileName, content) => {
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
    let result = await fetch(`http://192.168.1.9/evsu_handbook/api/get_handbook.php?chapter_list=1`);
    let data   = await result.text();

    if(!await writeChapterLocal('chapterName.txt', data)) return await result.json();
    
    final = await readLocalFile('chapterName.txt');

    if(!final) return await result.json();

    return JSON.parse(final);
  } catch(e) {
    final = await readLocalFile('chapterName.txt');

    if(!final) return [ { chap : 'Error was encountered.' } ];

    return JSON.parse(final);
  }
}

const HandBook = ({ navigation, sDim, wDim }) => {  
  let [chapterNames, setChapterNames] = useState([]);

  useEffect(() => {
    let unsubscribe = navigation.addListener('focus', async () => {
      setChapterNames(await getChapterName());
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView>
      <View style = {{ 
        paddingTop   : (sDim.width * 0.04), 
        paddingLeft  : (sDim.width * 0.01), 
        paddingRight : (sDim.width * 0.01) }}>
        {
          (!chapterNames) ? 
          <View>
            <Text style = {{ textAlign : 'center', color : 'black', fontWeight : 'bold', fontSize: 18 }}>Retrieving chapter lists...</Text>
          </View> 
          :
          <FlatList
            data       = { chapterNames }
            renderItem = { ({ item }) => { return (<HandBookChapterCon 
                                                    navigation = { navigation }
                                                    title      = { item.chap }
                                                    sDim       = { sDim }
                                                    wDim       = { wDim } />)} }  
          />
        }
      </View>
    </SafeAreaView>
  );
}

export default HandBook;
