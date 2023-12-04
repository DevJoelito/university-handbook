import React, { useEffect, useState, useCallback } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, Text, View, RefreshControl, ScrollView } from 'react-native';
import ProgramOfferCon from './sub/ProgramOfferCon';
import * as RNFS from 'react-native-fs';

const writeProgLocal = async (fileName, content) => {
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

const getProgName = async (dept) => {
  try {
    let result = await fetch(`https://barbac.000webhostapp.com/folders/evsu_handbook/api/get_handbook.php?dept=${dept}`);
    let data   = await result.text();

    if(!await writeProgLocal(`${dept}_progName.txt`, data)) return await result.json();
    
    final = await readLocalFile(`${dept}_progName.txt`);

    if(!final) return await result.json();

    return JSON.parse(final);
  } catch(e) {
    final = await readLocalFile(`${dept}_progName.txt`);

    if(!final) return [ { dept : 0 } ];

    return JSON.parse(final);
  }
}

const ProgOfferedView = ({ navigation, sDim, wDim, deptId }) => {  
  let [chapterNames, setChapterNames] = useState([]);
  let [refresh, setRefresh]           = useState(false);

  useEffect(() => {
    let unsubscribe = navigation.addListener('focus', async () => {
      setChapterNames(await getProgName(deptId));
    });

    return unsubscribe;
  }, [navigation, deptId]);

  useEffect(() => {
    let blurListener = navigation.addListener('blur', async () => {
      setChapterNames([]);
    });

    return blurListener;
  }, [navigation]);

  const refreshList = useCallback(async (idDept) => {
    setChapterNames([]);
    setRefresh(true);
    setChapterNames(await getProgName(idDept));
    setRefresh(false);
  }, [])
  
  return (
    <SafeAreaView style = {{ flex : 1 }}>
      <View style = {{ 
        paddingTop   : (sDim.width * 0.04), 
        paddingLeft  : (sDim.width * 0.01), 
        paddingRight : (sDim.width * 0.01),
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
          (chapterNames[0].prog === 0) ? 
          <ScrollView style = {{ flex : 1 }} refreshControl = { <RefreshControl refreshing = { refresh } onRefresh = { () => refreshList(deptId) } /> }>
            <Text style = {{ textAlign : 'center', color : 'black', fontWeight : 'bold', fontSize: 18 }}>Something went wrong.</Text>
          </ScrollView> 
          : 
          ((chapterNames[0].prog == 'no_prog') || (!chapterNames[0].length)) ? 
          <ScrollView style = {{ flex : 1 }} refreshControl = { <RefreshControl refreshing = { refresh } onRefresh = { () => refreshList(deptId) } /> }>
            <Text style = {{ textAlign : 'center', color : 'black', fontWeight : 'bold', fontSize: 18 }}>No programs found.</Text>
          </ScrollView>
          :
          <FlatList
            data       = { chapterNames }
            renderItem = { ({ item }) => { return (
                                                    (item.length == 1) ? 
                                                      <View style = {{
                                                        display        : 'flex',
                                                        flexDirection  : 'row',
                                                        justifyContent : 'space-around',
                                                        alignItems     : 'center',
                                                        marginBottom   : ( wDim.height * 0.015 )
                                                      }}>
                                                        <ProgramOfferCon 
                                                          navigation   = { navigation }
                                                          programTitle = { item[0].prog_name }
                                                          sDim         = { sDim }
                                                          wDim         = { wDim } />
                                                      </View>
                                                      :
                                                      <View style = {{
                                                        display        : 'flex',
                                                        flexDirection  : 'row',
                                                        justifyContent : 'space-around',
                                                        alignItems     : 'center',
                                                        marginBottom   : ( wDim.height * 0.015 )
                                                      }}> 
                                                        <ProgramOfferCon 
                                                          navigation   = { navigation }
                                                          programTitle = { item[0].prog_name }
                                                          sDim         = { sDim }
                                                          wDim         = { wDim } />
                                                        <ProgramOfferCon 
                                                          navigation   = { navigation }
                                                          programTitle = { item[1].prog_name }
                                                          sDim         = { sDim }
                                                          wDim         = { wDim } />
                                                      </View>

            )} }
            refreshControl = { <RefreshControl refreshing = { refresh } onRefresh = { () => refreshList(deptId) } /> }
          />
        }
      </View>
    </SafeAreaView>
  );
}

export default ProgOfferedView;
