import { useState, useEffect, useCallback } from 'react';
import { FlatList, SafeAreaView, Text, View, ActivityIndicator, RefreshControl, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import EvsuLinkContainer from './sub/EvsuLinksContainer';
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

const getLinks = async () => {
  try {
    let result = await fetch(`http://192.168.5.185/evsu_handbook/api/get_handbook.php?links=1`);
    let data   = await result.text();

    if(data == '__error__') return data;
    
    let objRes = JSON.parse(data);

    if(!await writeLocal('links.json', data)) return objRes;
    
    return objRes;
  } catch(e) {
    let final = await readLocalFile('links.json');

    if(!final) return '__error__';

    try {
      return JSON.parse(final);
    } catch(e) {
      return '__errror__';
    }
  }
}

const Links = ({ navigation, sDim, wDim }) => {  
  let [links, setLinks]            = useState([]);
  let [refresh, setRefresh]        = useState(true);

  useEffect(() => {
    let focusListener = navigation.addListener('focus', async () => {
      setLinks(await getLinks()); 
      setRefresh(false);
    });

    return focusListener;
  }, [navigation]);

  useEffect(() => {
    let blurListener = navigation.addListener('blur', async () => {
      setLinks([]);
      setRefresh(true);
    });

    return blurListener;
  }, [navigation]);

  const refreshList = useCallback(async () => {
    setRefresh(true);
    setLinks([]);
    setLinks(await getLinks());
    setRefresh(false);
  }, []);

  console.log(links)

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
          (links == '__error__') ? 
          <View style = {{ flex : 1, justifyContent : 'center', alignItems : 'center' }}>
            <Text style = {{ textAlign : 'center', color : 'black', fontWeight : 'bold', fontSize: 18 }}>Something went wrong.</Text>
            <View>
              <TouchableOpacity>
                <Text style = {{ color : '#5dade2', fontWeight : 'bold', textDecorationLine : 'underline', textAlign : 'center' }} onPress = { refreshList }>RELOAD</Text>
              </TouchableOpacity>
            </View>
          </View> 
          : 
          (!links.length) ? 
          <View style = {{ flex : 1, justifyContent : 'center', alignItems : 'center' }}>
            <Text style = {{ textAlign : 'center', color : 'black', fontWeight : 'bold', fontSize: 18 }}>No links found.</Text>
            <View>
              <TouchableOpacity>
                <Text style = {{ color : '#5dade2', fontWeight : 'bold', textDecorationLine : 'underline', textAlign : 'center' }} onPress = { refreshList }>RELOAD</Text>
              </TouchableOpacity>
            </View>
          </View>
          :
          <FlatList
            data       = { links }
            renderItem = { ({ item }) => { return (<EvsuLinkContainer 
                                                    navigation = { navigation }
                                                    title      = { item.name }
                                                    link       = { item.path }
                                                    sDim       = { sDim }
                                                    wDim       = { wDim } />)} }  
            refreshControl = { <RefreshControl refreshing = { refresh } onRefresh = { refreshList } /> }
          />
        }
      </View>
    </SafeAreaView>
  );
}

export default Links;
