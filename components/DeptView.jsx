import React, { useEffect, useState, useCallback } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, Text, View, RefreshControl, TouchableOpacity } from 'react-native';
import DepartmentCon from './sub/DepartmentCon';
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

const getDeptName = async (camp) => {
  try {
    let result = await fetch(`https://evsuhandbooksite.000webhostapp.com/sites/evsu_handbook/api/get_handbook.php?camp=${camp}`);
    let data   = await result.text();

    if(data == '__error__') return data;

    let objRes = JSON.parse(data);

    if(!await writeLocal(`${camp}_deptList.json`, data)) return objRes;
    
    return objRes
  } catch(e) {
    let final = await readLocalFile(`${camp}_deptList.json`);

    if(!final) return '__error__';

    try {
      return JSON.parse(final);
    } catch(e) {
      return '__error__';
    }
  }
}

const DeptView = ({ navigation, sDim, wDim, campId }) => {  
  let [deptNames, setDeptNames] = useState([]);
  let [refresh, setRefresh]     = useState(true);

  useEffect(() => {
    let unsubscribe = navigation.addListener('focus', async () => {
      setDeptNames(await getDeptName(campId));
      setRefresh(false);
    });

    return unsubscribe;
  }, [navigation, campId]);

  useEffect(() => {
    let blurListener = navigation.addListener('blur', async () => {
      setDeptNames([]);
      setRefresh(true);
    });

    return blurListener;
  }, [navigation]);

  const refreshList = useCallback(async () => {
    setDeptNames([]);
    setRefresh(true);
    setDeptNames(await getDeptName(campId));
    setRefresh(false);
  }, [campId]);
  
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
          (deptNames == '__error__') ? 
          <View style = {{ flex : 1, justifyContent : 'center', alignItems : 'center' }}>
            <Text style = {{ textAlign : 'center', color : 'black', fontWeight : 'bold', fontSize: 18 }}>Something went wrong.</Text>
            <View>
              <TouchableOpacity>
                <Text style = {{ color : '#5dade2', fontWeight : 'bold', textDecorationLine : 'underline', textAlign : 'center' }} onPress = { refreshList }>RELOAD</Text>
              </TouchableOpacity>
            </View>
          </View>
          : 
          (!deptNames.length) ? 
          <View style = {{ flex : 1, justifyContent : 'center', alignItems : 'center' }}>
            <Text style = {{ textAlign : 'center', color : 'black', fontWeight : 'bold', fontSize: 18 }}>No department found.</Text>
            <View>
              <TouchableOpacity>
                <Text style = {{ color : '#5dade2', fontWeight : 'bold', textDecorationLine : 'underline', textAlign : 'center' }} onPress = { refreshList }>RELOAD</Text>
              </TouchableOpacity>
            </View>
          </View>
          :
          <View>
            <View style = {{ paddingLeft : (wDim.width * 0.04), paddingTop : (wDim.height * 0.01), paddingBottom : (wDim.height * 0.02) }}>
              <Text style = {{ color : 'black', fontSize : (wDim.height * 0.030) }}>Select Department:</Text>
            </View>
            <FlatList
              data       = { deptNames }
              renderItem = { ({ item }) => { return (<DepartmentCon 
                                                      navigation = { navigation }
                                                      title      = { item.name }
                                                      deptId     = { item.id }
                                                      deptImg    = { item.dept_img }
                                                      sDim       = { sDim }
                                                      wDim       = { wDim } />)} }
              refreshControl = { <RefreshControl refreshing = { refresh } onRefresh = { refreshList } /> }
            />
          </View>
        }
      </View>
    </SafeAreaView>
  );
}

export default DeptView;
