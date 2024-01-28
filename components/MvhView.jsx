import { useEffect, useState, useCallback } from 'react';
import { Text, View, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';
import SoundPlayer from 'react-native-sound-player'
import { faPlay } from '@fortawesome/free-solid-svg-icons/faPlay';
import { faPause } from '@fortawesome/free-solid-svg-icons/faPause';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons/faVolumeUp';
import Tts from 'react-native-tts';
import { faVolumeMute } from '@fortawesome/free-solid-svg-icons/faVolumeMute';

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

const MvhView = ({ navigation, sDim, wDim, mission, vision }) => {
  let [play, setPlay]               = useState(false);
  let [playMission, setPlayMission] = useState(false);
  let [playVision, setPlayVision]   = useState(false);

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
          (mission != null && mission != '') ?
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
                <TouchableOpacity onPress = { () => { setPlayMission(!playMission); speakTheEvsu(!playMission, mission); } }>
                  <FontAwesomeIcon icon = { faVolumeMute } size = { sDim.height * 0.04 } color='#710000' />
                </TouchableOpacity>
                :
                <TouchableOpacity onPress = { () => { setPlayMission(!playMission); speakTheEvsu(!playMission, mission); } }>
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
              { mission }
            </Text>
          </View> 
          :
          <View style = {{ marginTop : (wDim.height * 0.015) }}>
            <Text style={{ textAlign : 'center', color : 'black', fontSize : (wDim.height * 0.030), fontWeight : 800 }}>No Mission.</Text>
          </View>
        }
        {
          (vision != '' && vision != null) ?
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
                <TouchableOpacity onPress = { () => { setPlayVision(!playVision); speakTheEvsu(!playVision, vision); } }>
                  <FontAwesomeIcon icon = { faVolumeMute } size = { sDim.height * 0.04 } color='#710000' />
                </TouchableOpacity>
                :
                <TouchableOpacity onPress = { () => { setPlayVision(!playVision); speakTheEvsu(!playVision, vision) } }>
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
              { vision }
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

export default MvhView;
