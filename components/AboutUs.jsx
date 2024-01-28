import { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import * as RNFS from 'react-native-fs';
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
    return false;
  }
}

const getAboutUs = async () => {
  try {
    let result = await fetch(`http://192.168.1.7/evsu_handbook/api/get_handbook.php?about_us=1`);
    let data   = await result.text();

    if(data == '__error__') return data;
    
    let objRes = JSON.parse(data);

    if(!await writeLocal('about.json', data)) return objRes;
    
    return objRes;
  } catch(e) {
    let final = await readLocalFile('about.json');

    if(!final) return '__error__';

    try {
      return JSON.parse(final);
    } catch(e) {
      return '__errror__';
    }
  }
}

const AboutUs = ({ sDim, wDim, navigation }) => {
  let [about, setAbout]     = useState([]);
  let [refresh, setRefresh] = useState(true);

  useEffect(() => {
    let focusListener = navigation.addListener('focus', async () => {
      setAbout(await getAboutUs()); 
      setRefresh(false);
    });

    return focusListener;
  }, [navigation]);

  useEffect(() => {
    let blurListener = navigation.addListener('blur', async () => {
      setAbout([]);
      setRefresh(true);
    });

    return blurListener;
  }, [navigation]);

  return (
    <SafeAreaView style = {{ flex : 1, padding : (wDim.width * 0.04) }}>
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
        (!about.length) ?
        <View style = {{ flex : 1, justifyContent : 'center', alignItems : 'center' }}>
          <Text style = {{ color : 'black' }}>No content.</Text>
        </View>
        :
        <WebView source={{ html: `<meta name="viewport" content="width=device-width, initial-scale=1"/>${about[0].details}` }} style = {{ flex: 1, backgroundColor : '#d9d9d9' }} originWhitelist={['*']} />
      }
    </SafeAreaView>
  );
}

export default AboutUs;
