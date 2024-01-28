import { useState, useEffect, useCallback } from 'react';
import { FlatList, SafeAreaView, Text, View, RefreshControl, ActivityIndicator, TouchableOpacity } from 'react-native';
import MissVisHymnContainer from './sub/MissVisHymnContainer';
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

const getMissVis = async () => {
  try {
    let result = await fetch(`http://192.168.1.7/evsu_handbook/api/get_handbook.php?dept_values=1`);
    let data   = await result.text();

    if(data == '__error__') return data;

    let objRes = JSON.parse(data);

    if(!await writeLocal('dept_values.txt', data)) return objRes;

    return objRes;
  } catch(e) {
    let final = await readLocalFile('dept_values.txt');

    if(!final) return '__error__';

    try {
      return JSON.parse(final);
    } catch(e) {
      return '__error__';
    }
  }
}

const Links = ({ navigation, sDim, wDim }) => { 
  let [missVis, setMissVis] = useState([]); 
  let [refresh, setRefresh] = useState(true);

  useEffect(() => {
    let unsubscribe = navigation.addListener('focus', async () => {
      setMissVis(await getMissVis());
      setRefresh(false);
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    let blurListener = navigation.addListener('blur', async () => {
      setMissVis([]);
      setRefresh(true);
    });

    return blurListener;
  }, [navigation]);

  const refreshList = useCallback(async () => {
    setRefresh(true);
    setMissVis(await getMissVis());
    setRefresh(false);
  }, []);

  return (
    <SafeAreaView style = {{ flex : 1 }}>
      <View style = {{ 
        paddingTop   : (sDim.width * 0.04), 
        paddingLeft  : (sDim.width * 0.01), 
        paddingRight : (sDim.width * 0.01),
        flex : 1 }} >
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
        (missVis == '__error__') ?
        <View style = {{ flex : 1, justifyContent : 'center', alignItems : 'center' }}>
          <Text style = {{ textAlign : 'center', color : 'black', fontWeight : 'bold', fontSize: 18 }}>Something went wrong.</Text>
          <View>
            <TouchableOpacity>
              <Text style = {{ color : '#5dade2', fontWeight : 'bold', textDecorationLine : 'underline', textAlign : 'center' }} onPress = { refreshList }>RELOAD</Text>
            </TouchableOpacity>
          </View>
        </View> 
        :
        (!missVis.length) ? 
        <View style = {{ flex : 1, justifyContent : 'center', alignItems : 'center' }}>
          <Text style = {{ textAlign : 'center', color : 'black', fontWeight : 'bold', fontSize: 18 }}>No data found.</Text>
          <View>
            <TouchableOpacity>
              <Text style = {{ color : '#5dade2', fontWeight : 'bold', textDecorationLine : 'underline', textAlign : 'center' }} onPress = { refreshList }>RELOAD</Text>
            </TouchableOpacity>
          </View>
        </View>
        :
        <FlatList
          data       = { missVis }
          renderItem = { ({ item }) => { return (<MissVisHymnContainer 
                                                  navigation = { navigation }
                                                  title      = { item.name }
                                                  mission    = { item.mission }
                                                  vision     = { item.vision }
                                                  sDim       = { sDim }
                                                  wDim       = { wDim } />) } }
          refreshControl = { <RefreshControl refreshing = { refresh } onRefresh = { refreshList }/> } />  
        }
      </View>
    </SafeAreaView>
  );
}

export default Links;
