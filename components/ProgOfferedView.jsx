import React, { useEffect, useState, useCallback } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, Text, View, RefreshControl, ScrollView, TouchableOpacity } from 'react-native';
import ProgramOfferCon from './sub/ProgramOfferCon';
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

const getProgName = async (dept) => {
  try {
    let result = await fetch(`https://barbac.000webhostapp.com/folders/evsu_handbook/api/get_handbook.php?dept=${dept}`);
    let data   = await result.text();

    if(data == '__error__') return data;

    let objRes = JSON.parse(data);

    if(!await writeLocal(`${dept}_progName.txt`, data)) return objRes;

    return objRes;
  } catch(e) {
    let final = await readLocalFile(`${dept}_progName.txt`);

    if(!final) return '__error__';

    try {
      return JSON.parse(final);
    } catch(e) {
      return '__error__';
    }
  }
}

const ProgOfferedView = ({ navigation, sDim, wDim, deptId }) => {  
  let [programs, setPrograms] = useState([]);
  let [refresh, setRefresh]   = useState(true);

  useEffect(() => {
    let unsubscribe = navigation.addListener('focus', async () => {
      setPrograms(await getProgName(deptId));
      setRefresh(false);
    });

    return unsubscribe;
  }, [navigation, deptId]);

  useEffect(() => {
    let blurListener = navigation.addListener('blur', async () => {
      setPrograms([]);
      setRefresh(true);
    });

    return blurListener;
  }, [navigation]);

  const refreshList = useCallback(async () => {
    setPrograms([]);
    setRefresh(true);
    setPrograms(await getProgName(deptId));
    setRefresh(false);
  }, [deptId])
  
  return (
    <SafeAreaView style = {{ flex : 1 }}>
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
          (programs == '__error__') ? 
          <View style = {{ flex : 1, justifyContent : 'center', alignItems : 'center' }} >
            <Text style = {{ textAlign : 'center', color : 'black', fontWeight : 'bold', fontSize: 18 }}>Something went wrong.</Text>
            <View>
              <TouchableOpacity>
                <Text style = {{ color : '#5dade2', fontWeight : 'bold', textDecorationLine : 'underline', textAlign : 'center' }} onPress = { refreshList }>RELOAD</Text>
              </TouchableOpacity>
            </View>
          </View> 
          : 
          (!programs.length) ? 
          <View style = {{ flex : 1, justifyContent : 'center', alignItems : 'center' }} >
            <Text style = {{ textAlign : 'center', color : 'black', fontWeight : 'bold', fontSize: 18 }}>No programs found.</Text>
            <View>
              <TouchableOpacity>
                <Text style = {{ color : '#5dade2', fontWeight : 'bold', textDecorationLine : 'underline', textAlign : 'center' }} onPress = { refreshList }>RELOAD</Text>
              </TouchableOpacity>
            </View>
          </View>
          :
          <FlatList
            data       = { programs }
            renderItem = { ({ item }) => { return (
              <ProgramOfferCon 
                navigation   = { navigation }
                programTitle = { item.name }
                sDim         = { sDim }
                wDim         = { wDim } />
            )} }
            refreshControl = { <RefreshControl refreshing = { refresh } onRefresh = { refreshList } /> }
          />
        }
      </View>
    </SafeAreaView>
  );
}

export default ProgOfferedView;
