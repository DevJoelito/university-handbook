import React, { useEffect, useState, useCallback } from 'react';
import { TouchableOpacity, ActivityIndicator, FlatList, SafeAreaView, Text, View, RefreshControl } from 'react-native';
import * as RNFS from 'react-native-fs';
import FastImage from 'react-native-fast-image';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp';

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
    let result = await fetch(`http://192.168.5.185/evsu_handbook/api/get_handbook.php?events=1`);
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
  let [down, setDown]       = useState(false);
  let [show, setShow]       = useState(false);

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
            renderItem = { ({ item }) => { return (
                                                    <View style = {{ marginBottom : (wDim.height * 0.02) }}>
                                                      <View style = {{ width : '100%', backgroundColor : 'white', borderRadius : 5 }}>
                                                        <View style = {{ height : (wDim.height * 0.20) }}>
                                                          <FastImage
                                                            style={{ width: '100%', height : '100%' }}
                                                            source={{ uri: item.event_img }}
                                                          />
                                                        </View>
                                                        <View>
                                                          <View style = {{ display : 'flex', flexDirection : 'row', justifyContent : 'space-between', alignItems : 'center', padding : (wDim.width * 0.015) }}>
                                                            <Text style = {{ 
                                                              color      : 'black', 
                                                              fontSize   : (wDim.height * 0.025), 
                                                              fontWeight : 'bold' }}>{ item.name }</Text>
                                                            <View style = {{ display : 'flex', justifyContent : 'center', alignItems : 'center', flexDirection : 'row' }}>
                                                              <Text style = {{ 
                                                                color      : 'black', 
                                                                fontSize   : (wDim.height * 0.02),
                                                                marginTop  : 'auto' }}>{ item.date_start }</Text> 
                                                              <TouchableOpacity style = {{ display : 'flex', justifyContent : 'center', alignItems : 'center', paddingLeft : (wDim.width * 0.02), paddingRight : (wDim.width * 0.02) }} onPress = { () => {setDown(!down); setShow(!show)} }> 
                                                                {
                                                                  (down) ?
                                                                  <FontAwesomeIcon icon={ faChevronUp } size = { sDim.height * 0.022 } color = 'black' />
                                                                  :
                                                                  <FontAwesomeIcon icon={ faChevronDown } size = { sDim.height * 0.022 } color = 'black' />
                                                                }
                                                              </TouchableOpacity>
                                                            </View>
                                                          </View>
                                                          <View style = {{ display : ((show) ? "block" : "none"), padding : (wDim.width * 0.03) }}>
                                                            <Text style = {{ color : 'black' }}>{ item.description }</Text>
                                                          </View>
                                                        </View>
                                                      </View>
                                                    </View>)} }
            refreshControl = { <RefreshControl refreshing = { refresh } onRefresh = { refreshList } /> }
          />
        }
      </View>
    </SafeAreaView>
  );
}

export default Events;
