import React, { useEffect, useState, useCallback } from 'react';
import { TouchableOpacity, ActivityIndicator, FlatList, SafeAreaView, Text, View, RefreshControl } from 'react-native';
import * as RNFS from 'react-native-fs';
import EventsCon from './sub/EventsCon';

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

const getEvents = async () => {
  try {
    let result = await fetch(`http://192.168.1.7/evsu_handbook/api/get_handbook.php?events=1`);
    let data   = await result.text();

    if(data == '__error__') return data;

    let objRes = JSON.parse(data);

    if(!await writeLocal('events.json', data)) return objRes;

    return objRes;
  } catch(e) {
    let final = await readLocalFile('events.json');

    if(!final) return '__error__';

    try {
      return JSON.parse(final);
    } catch(e) {
      return '__error__';
    }
  }
}

const Events = ({ navigation, sDim, wDim }) => {  
  let [events, setEvents]   = useState([]);
  let [refresh, setRefresh] = useState(true);

  useEffect(() => {
    let unsubscribe = navigation.addListener('focus', async () => {
      setEvents(await getEvents());
      setRefresh(false);
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    let blurListener = navigation.addListener('blur', async () => {
      setEvents([]);
      setRefresh(false);
    });

    return blurListener;
  }, [navigation]);

  const refreshList = useCallback(async () => {
    setEvents([]);
    setRefresh(true);
    setEvents(await getEvents());
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
          (refresh) ? 
          <View style = {{
            flex           : 1,
            justifyContent : 'center', 
            alignItems     : 'center'
          }}>
            <ActivityIndicator size="large" color="#900303" />
          </View> 
          :
          (events == '__error__') ? 
          <View style = {{ flex : 1, justifyContent : 'center', alignItems : 'center' }} >
            <Text style = {{ textAlign : 'center', color : 'black', fontWeight : 'bold', fontSize: 18 }}>Something went wrong.</Text>
            <View>
              <TouchableOpacity>
                <Text style = {{ color : '#5dade2', fontWeight : 'bold', textDecorationLine : 'underline', textAlign : 'center' }} onPress = { refreshList }>RELOAD</Text>
              </TouchableOpacity>
            </View>
          </View> 
          : 
          (!events.length) ? 
          <View style = {{ flex : 1, justifyContent : 'center', alignItems : 'center' }} >
            <Text style = {{ textAlign : 'center', color : 'black', fontWeight : 'bold', fontSize: 18 }}>No events found.</Text>
            <View>
              <TouchableOpacity>
                <Text style = {{ color : '#5dade2', fontWeight : 'bold', textDecorationLine : 'underline', textAlign : 'center' }} onPress = { refreshList }>RELOAD</Text>
              </TouchableOpacity>
            </View>
          </View>
          :
          <FlatList
            data       = { events }
            renderItem = { ({ item }) => { return ( <EventsCon wDim = { wDim } sDim = { sDim } item = { item } /> )} }
            refreshControl = { <RefreshControl refreshing = { refresh } onRefresh = { refreshList } /> }
          />
        }
      </View>
    </SafeAreaView>
  );
}

export default Events;
