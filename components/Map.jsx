import { useState, useEffect, useCallback } from 'react';
import { View, SafeAreaView, Modal, Image, TouchableOpacity, FlatList, RefreshControl, Text, ActivityIndicator } from 'react-native';
import * as RNFS from 'react-native-fs';
import ImageViewer from 'react-native-image-zoom-viewer';
import { WebView } from 'react-native-webview';

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
    console.log(e);
    return false;
  }
}

const getMaps = async () => {
  try {
    let result = await fetch(`https://evsuhandbooksite.000webhostapp.com/sites/evsu_handbook/api/get_handbook.php?map_list=1`);
    let data   = await result.text();

    if(data == '__error__') return data;
    
    let objRes = JSON.parse(data);

    if(!await writeLocal('map.json', data)) return objRes;

    return objRes;
  } catch(e) {
    console.log(e);
    let final = await readLocalFile('map.json');

    if(!final) return '__error__';

    try {
      return JSON.parse(final);
    } catch(e) {
      return '__errror__';
    }
  }
}

const Map = ({sDim, wDim, navigation}) => {
  let [maps, setMaps] = useState([]);
  let [refresh, setRefresh] = useState(true);

  useEffect(() => {
    let focusListener = navigation.addListener('focus', async () => {
      setMaps(await getMaps()); 
      setRefresh(false);
    });

    return focusListener;
  }, [navigation]);

  useEffect(() => {
    let blurListener = navigation.addListener('blur', async () => {
      setMaps([]);
      setRefresh(true);
    });

    return blurListener;
  }, [navigation]);

  const refreshList = useCallback(async () => {
    setRefresh(true);
    setMaps([]);
    setMaps(await getMaps());
    setRefresh(false);
  }, []);

  return (
    <SafeAreaView style = {{flex : 1, backgroundColor: '#F7EFEF' }}>
      <View style = {{
          flex        : 1,
        }}>
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
          (maps == "__error__") ?
          <View style = {{ flex : 1, justifyContent : 'center', alignItems : 'center' }}>
            <Text style = {{ textAlign : 'center', color : 'black', fontWeight : 'bold', fontSize: 18 }}>Something went wrong.</Text>
            <View>
              <TouchableOpacity>
                <Text style = {{ color : '#5dade2', fontWeight : 'bold', textDecorationLine : 'underline', textAlign : 'center' }} onPress = { refreshList }>RELOAD</Text>
              </TouchableOpacity>
            </View>
          </View>
          :
          (!maps.length) ? 
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
            data       = { maps }
            renderItem = { ({ item }) => { return ( 
              <TouchableOpacity style = {{ borderTopWidth : 0.3, borderBottomWidth : 0.3, padding : (wDim.height * 0.03), marginVertical : (wDim.height * 0.005) }} onPress = { () => navigation.navigate('ComponentView', { screen : 'MapWebView', title : item.name, link : item.link }) }>
                <Text style = {{ color : 'black', fontSize : (wDim.height * 0.030), fontWeight : 'bold' }}>{item.name}</Text>
              </TouchableOpacity> ) } } 
            refreshControl = { <RefreshControl refreshing = { refresh } onRefresh = { refreshList } /> } />
        }
      </View>
    </SafeAreaView>
  );
}

export default Map;
