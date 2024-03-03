import { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import * as RNFS from 'react-native-fs';
import SoundPlayer from 'react-native-sound-player'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons/faVolumeUp';
import Tts from 'react-native-tts';
import { faVolumeMute } from '@fortawesome/free-solid-svg-icons/faVolumeMute';

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

const getMissVis = async (id) => {
  try {
    let result = await fetch(`https://evsuhandbooksite.000webhostapp.com/sites/evsu_handbook/api/get_handbook.php?dept_values=${id}`);
    let data   = await result.text();

    if(data == '__error__') return data;

    let objRes = JSON.parse(data);

    if(!await writeLocal(`dept_values_${id}.txt`, data)) return objRes;

    return objRes;
  } catch(e) {
    let final = await readLocalFile(`dept_values_${id}.txt`);

    if(!final) return '__error__';

    try {
      return JSON.parse(final);
    } catch(e) {
      return '__error__';
    }
  }
}

const playSong = (play) => {
  try {
    SoundPlayer.loadSoundFile('evsu', 'mp3');

    if(play) {
      SoundPlayer.resume();
    } else {
      SoundPlayer.pause();
    }
  } catch(e) {
    return false;
  }

  return true;
}

const speakTheEvsu = async (voiceOn, text) => {
  await Tts.getInitStatus();

  if(voiceOn) {
    Tts.speak(text);
  } else {
    Tts.stop();
  }
}

const Links = ({ navigation, sDim, wDim, deptId }) => { 
  let [missVis, setMissVis] = useState([{mission: null, vision: null}]); 
  let [play, setPlay]               = useState(false);
  let [playMission, setPlayMission] = useState(false);
  let [playVision, setPlayVision]   = useState(false);

  useEffect(() => {
    let unsubscribe = navigation.addListener('focus', async () => {
      setMissVis(await getMissVis(deptId));
    });

    return unsubscribe;
  }, [navigation, deptId]);

  useEffect(() => {
    let blurListener = navigation.addListener('blur', async () => {
      setMissVis([{mission: null, vision: null}]);
    });

    return blurListener;
  }, [navigation, deptId]);

  if(!playSong(play) && play) {
    setPlay(false);
  }

  useEffect(() => {
    let blurListener = navigation.addListener('blur', async () => {
      setPlay(false);
      setPlayMission(false);
      setPlayVision(false);
      SoundPlayer.pause();
      Tts.stop();
    });

    return blurListener;
  }, [navigation]);

  return (
    <SafeAreaView style = {{ flex : 1 }}>
      <ScrollView>
        {
          (missVis[0].mission != null && missVis[0].mission != '') ?
          <View>
            <Text style = {{ 
              color      : 'black',
              fontSize   : (wDim.height * 0.040),
              textAlign  : 'center',
              fontWeight : 'bold',
              marginTop  : 8, 
              position   : 'relative',
              fontWeight : 800
            }}>Mission</Text>
            <View style = {{ alignItems : 'center', marginTop : (wDim.height * 0.005) }}>
              {
                (!playMission) ? 
                <TouchableOpacity onPress = { () => { setPlayMission(!playMission); speakTheEvsu(!playMission, missVis[0].mission); } }>
                  <FontAwesomeIcon icon = { faVolumeMute } size = { sDim.height * 0.04 } color='#710000' />
                </TouchableOpacity>
                :
                <TouchableOpacity onPress = { () => { setPlayMission(!playMission); speakTheEvsu(!playMission, missVis[0].mission); } }>
                  <FontAwesomeIcon icon = { faVolumeUp } size = { sDim.height * 0.04 } color='#710000' />
                </TouchableOpacity>
              }
            </View>
            <Text style = {{
              textAlign     : 'center',
              fontSize      : (wDim.height * 0.025),
              color         : 'black',
              marginTop     : (wDim.height * 0.015),
              fontWeight    : 'bold',
              paddingLeft   : (wDim.width * 0.018),
              paddingRight  : (wDim.width * 0.018)
            }}>
              { missVis[0].mission }
            </Text>
          </View> 
          :
          <View style = {{ marginTop : (wDim.height * 0.015) }}>
            <Text style={{ textAlign : 'center', color : 'black', fontSize : (wDim.height * 0.030), fontWeight : 800 }}>No Mission.</Text>
          </View>
        }
        {
          (missVis[0].vision != '' && missVis[0].vision != null) ?
          <View style = {{ marginBottom : 20 }}>
            <Text style = {{ 
              color      : 'black',
              fontSize   : (wDim.height * 0.040),
              textAlign  : 'center',
              fontWeight : 'bold',
              marginTop  : 15, 
              position   : 'relative', 
              fontWeight : 800
            }}>Vision</Text>
            <View style = {{ alignItems : 'center', marginTop : (wDim.height * 0.005) }}>
              {
                (!playVision) ? 
                <TouchableOpacity onPress = { () => { setPlayVision(!playVision); speakTheEvsu(!playVision, missVis[0].vision); } }>
                  <FontAwesomeIcon icon = { faVolumeMute } size = { sDim.height * 0.04 } color='#710000' />
                </TouchableOpacity>
                :
                <TouchableOpacity onPress = { () => { setPlayVision(!playVision); speakTheEvsu(!playVision, missVis[0].vision) } }>
                  <FontAwesomeIcon icon = { faVolumeUp } size = { sDim.height * 0.04 } color='#710000' />
                </TouchableOpacity>
              }
            </View>
            <Text style = {{
              textAlign    : 'center',
              fontSize     : (wDim.height * 0.025),
              color        : 'black',
              marginTop    : (wDim.height * 0.015),
              fontWeight   : 'bold',
              paddingLeft  : (wDim.width * 0.018),
              paddingRight : (wDim.width * 0.018)
            }}>
              { missVis[0].vision }
            </Text>
          </View>
          :
          <View style = {{ marginTop : (wDim.height * 0.015) }}>
            <Text style={{ textAlign : 'center', color : 'black', fontSize : (wDim.height * 0.030), fontWeight : 800 }}>No Vision.</Text>
          </View>
        }
      </ScrollView>
      <Image
          style  = {{ width : (wDim.width * 0.48), height : (wDim.width * 0.48), alignSelf : 'center', top : (wDim.height * 0.32), opacity : 0.2, position : 'absolute' }}
          source = { require('../assets/images/the-evsu-logo.png') }
        />
    </SafeAreaView>
  );
}

export default Links;
