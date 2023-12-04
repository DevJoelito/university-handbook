import React, { useEffect, useState, useCallback } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, Text, View, RefreshControl, ScrollView } from 'react-native';
import DepartmentCon from './sub/DepartmentCon';
import * as RNFS from 'react-native-fs';

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
    let result = await fetch(`https://barbac.000webhostapp.com/folders/evsu_handbook/api/get_handbook.php?dept_list=1`);
    let data   = await result.text();

    if(!await writeDeptLocal('deptName.txt', data)) return await result.json();
    
    final = await readLocalFile('deptName.txt');

    if(!final) return await result.json();

    return JSON.parse(final);
  } catch(e) {
    final = await readLocalFile('deptName.txt');

    if(!final) return [ { dept : 0 } ];

    return JSON.parse(final);
  }
}

const DeptView = ({ navigation, sDim, wDim }) => {  
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
          (chapterNames[0].dept === 0) ? 
          <ScrollView style = {{ flex : 1 }} refreshControl = { <RefreshControl refreshing = { refresh } onRefresh = { refreshList } /> }>
            <Text style = {{ textAlign : 'center', color : 'black', fontWeight : 'bold', fontSize: 18 }}>Something went wrong.</Text>
          </ScrollView> 
          : 
          ((chapterNames[0].dept == 'no_dept') && !chapterNames[0].dept_name) ? 
          <ScrollView style = {{ flex : 1 }} refreshControl = { <RefreshControl refreshing = { refresh } onRefresh = { refreshList } /> }>
            <Text style = {{ textAlign : 'center', color : 'black', fontWeight : 'bold', fontSize: 18 }}>No chapter found.</Text>
          </ScrollView>
          :
          <FlatList
            data       = { chapterNames }
            renderItem = { ({ item }) => { return (<DepartmentCon 
                                                    navigation = { navigation }
                                                    title      = { item.dept_name }
                                                    deptId     = { item.dept }
                                                    sDim       = { sDim }
                                                    wDim       = { wDim } />)} }
            refreshControl = { <RefreshControl refreshing = { refresh } onRefresh = { refreshList } /> }
          />
        }
      </View>
    </SafeAreaView>
  );
}

export default DeptView;
