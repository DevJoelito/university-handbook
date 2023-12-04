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

const MvhView = ({ navigation, sDim, wDim, titleName }) => {
  let [play, setPlay]               = useState(false);
  let [playMission, setPlayMission] = useState(false);
  let [playVision, setPlayVision]   = useState(false);
  let mission                       = "Develop a Strong Technologically and Professionally Competent Productive Human Resource Imbued with Positive Values Needed to Propel Sustainable Development.";
  let vision                        = "A Leading State University in Technological and Professional Education."; 

  if(!playSong(play) && play) {
    setPlay(false);
  }

  const resetPlayFigure = useCallback(() => {
    setPlayMission(false);
    setPlayVision(false);
  });

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
      <Text style = {{ 
        color      : 'black',
        fontSize   : (wDim.height * 0.050),
        textAlign  : 'center',
        fontWeight : 'bold',
        marginTop  : 8, 
        position   : 'relative'
      }}>{ titleName }</Text>
      {
        (titleName == 'EVSU Hymn') ? 
          <View style = {{ marginTop : 15, marginBottom : 15, display : 'flex', alignItems : 'center' }}>
            {
              (!play) ?
              <TouchableOpacity onPress = { () => setPlay(!play) }>
                <FontAwesomeIcon icon = { faPlay } size = { sDim.height * 0.04 } color='#710000' />
              </TouchableOpacity>
              :
              <TouchableOpacity onPress = { () => setPlay(!play)}>
                <FontAwesomeIcon icon = { faPause } size = { sDim.height * 0.04 } color='#710000' />
              </TouchableOpacity>
            }
          </View>
          :
          <View></View>
      }
      <ScrollView>
        {
          titleName == 'Mission' ?
          <View>
            <View style = {{ alignItems : 'center', marginTop : (wDim.height * 0.015) }}>
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
          titleName == 'Vision' ?
          <View>
            <View style = {{ alignItems : 'center', marginTop : (wDim.height * 0.015) }}>
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
          <View>
            <View>
              <Text style = {{
                textAlign    : 'center',
                fontSize     : (wDim.height * 0.022),
                color        : 'black',
                fontWeight   : 'bold',
                paddingLeft  : (wDim.width * 0.018),
                paddingRight  : (wDim.width * 0.018)
              }}>
                Lyrics: BELINDA C. LORA
              </Text>
            </View>
            <View>
              <Text style = {{
                textAlign    : 'center',
                fontSize     : (wDim.height * 0.022),
                color        : 'black',
                marginTop    : 8,
                fontWeight   : 'bold',
                paddingLeft  : (wDim.width * 0.018),
                paddingRight  : (wDim.width * 0.018)
              }}>
                Music and Arrangment: BIATO C. AMBE, JR.
              </Text>
            </View>
            <View>
              <View>
                <Text style = {{
                  textAlign    : 'center',
                  fontSize     : (wDim.height * 0.025),
                  color        : 'black',
                  marginTop    : 20,
                  fontWeight   : 'bold',
                  paddingLeft  : (wDim.width * 0.018),
                  paddingRight  : (wDim.width * 0.018)
                }}>
                  There’s a dawn of a new day breaking
                </Text>
              </View>
              <View>
                <Text style = {{
                  textAlign    : 'center',
                  fontSize     : (wDim.height * 0.025),
                  color        : 'black',
                  fontWeight   : 'bold',
                  paddingLeft  : (wDim.width * 0.018),
                  paddingRight  : (wDim.width * 0.018)
                }}>
                  There’s a ray of light reaching
                </Text>
              </View>
              <View>
                <Text style = {{
                  textAlign    : 'center',
                  fontSize     : (wDim.height * 0.025),
                  color        : 'black',
                  fontWeight   : 'bold',
                  paddingLeft  : (wDim.width * 0.018),
                  paddingRight  : (wDim.width * 0.018)
                }}>
                  Every corner of the land
                </Text>
              </View>
              <View>
                <Text style = {{
                  textAlign    : 'center',
                  fontSize     : (wDim.height * 0.025),
                  color        : 'black',
                  fontWeight   : 'bold',
                  paddingLeft  : (wDim.width * 0.018),
                  paddingRight  : (wDim.width * 0.018)
                }}>
                  It’s radiance keeps on spreading
                </Text>
              </View>
              <View>
                <Text style = {{
                  textAlign    : 'center',
                  fontSize     : (wDim.height * 0.025),
                  color        : 'black',
                  fontWeight   : 'bold',
                  paddingLeft  : (wDim.width * 0.018),
                  paddingRight  : (wDim.width * 0.018)
                }}>
                  Bringing hope and strength and life
                </Text>
              </View>
              <View>
                <Text style = {{
                  textAlign    : 'center',
                  fontSize     : (wDim.height * 0.025),
                  color        : 'black',
                  marginTop    : 20,
                  fontWeight   : 'bold',
                  paddingLeft  : (wDim.width * 0.018),
                  paddingRight  : (wDim.width * 0.018)
                }}>
                  There’s a flame that keeps on burning
                </Text>
              </View>
              <View>
                <Text style = {{
                  textAlign    : 'center',
                  fontSize     : (wDim.height * 0.025),
                  color        : 'black',
                  fontWeight   : 'bold',
                  paddingLeft  : (wDim.width * 0.018),
                  paddingRight  : (wDim.width * 0.018)
                }}>
                  There’s a flame that keeps on burning
                </Text>
              </View>
              <View>
                <Text style = {{
                  textAlign    : 'center',
                  fontSize     : (wDim.height * 0.025),
                  color        : 'black',
                  fontWeight   : 'bold',
                  paddingLeft  : (wDim.width * 0.018),
                  paddingRight  : (wDim.width * 0.018)
                }}>
                  Touching the mind, the heart and the soul
                </Text>
              </View>
              <View>
                <Text style = {{
                  textAlign    : 'center',
                  fontSize     : (wDim.height * 0.025),
                  color        : 'black',
                  fontWeight   : 'bold',
                  paddingLeft  : (wDim.width * 0.018),
                  paddingRight  : (wDim.width * 0.018)
                }}>
                  Sending Knowledge truth, love, and wisdom
                </Text>
              </View>
              <View>
                <Text style = {{
                  textAlign    : 'center',
                  fontSize     : (wDim.height * 0.025),
                  color        : 'black',
                  fontWeight   : 'bold',
                  paddingLeft  : (wDim.width * 0.018),
                  paddingRight  : (wDim.width * 0.018)
                }}>
                  abundant blessings from GOD above
                </Text>
              </View>
              <View>
                <Text style = {{
                  textAlign    : 'center',
                  fontSize     : (wDim.height * 0.028),
                  color        : 'black',
                  marginTop    : 20,
                  fontWeight   : 'bold',
                  paddingLeft  : (wDim.width * 0.018),
                  paddingRight  : (wDim.width * 0.018)
                }}>
                  Refrain
                </Text>
              </View>
              <View>
                <Text style = {{
                  textAlign    : 'center',
                  fontSize     : (wDim.height * 0.025),
                  color        : 'black',
                  marginTop    : 20,
                  fontWeight   : 'bold',
                  paddingLeft  : (wDim.width * 0.018),
                  paddingRight  : (wDim.width * 0.018)
                }}>
                  Beloved Eastern Visayas State University
                </Text>
              </View>
              <View>
                <Text style = {{
                  textAlign    : 'center',
                  fontSize     : (wDim.height * 0.025),
                  color        : 'black',
                  fontWeight   : 'bold',
                  paddingLeft  : (wDim.width * 0.018),
                  paddingRight  : (wDim.width * 0.018)
                }}>
                  Your blessed flame shall forever burn in our hearts
                </Text>
              </View>
              <View>
                <Text style = {{
                  textAlign    : 'center',
                  fontSize     : (wDim.height * 0.025),
                  color        : 'black',
                  fontWeight   : 'bold',
                  paddingLeft  : (wDim.width * 0.018),
                  paddingRight  : (wDim.width * 0.018)
                }}>
                  We give you outmost commitment and dedication
                </Text>
              </View>
              <View>
                <Text style = {{
                  textAlign    : 'center',
                  fontSize     : (wDim.height * 0.025),
                  color        : 'black',
                  fontWeight   : 'bold',
                  paddingLeft  : (wDim.width * 0.018),
                  paddingRight  : (wDim.width * 0.018)
                }}>
                  You shall shine with pride throughout the nation
                </Text>
              </View>
              <View>
                <Text style = {{
                  textAlign    : 'center',
                  fontSize     : (wDim.height * 0.028),
                  color        : 'black',
                  marginTop    : 20,
                  fontWeight   : 'bold',
                  paddingLeft  : (wDim.width * 0.018),
                  paddingRight  : (wDim.width * 0.018)
                }}>
                  Coda
                </Text>
              </View>
              <View>
                <Text style = {{
                  textAlign    : 'center',
                  fontSize     : (wDim.height * 0.025),
                  color        : 'black',
                  marginTop    : 20,
                  fontWeight   : 'bold',
                  paddingLeft  : (wDim.width * 0.018),
                  paddingRight  : (wDim.width * 0.018)
                }}>
                  Shine with gladsome light
                </Text>
              </View>
              <View>
                <Text style = {{
                  textAlign    : 'center',
                  fontSize     : (wDim.height * 0.025),
                  color        : 'black',
                  fontWeight   : 'bold',
                  paddingLeft  : (wDim.width * 0.018),
                  paddingRight  : (wDim.width * 0.018)
                }}>
                  Oh alma mater dear
                </Text>
              </View>
              <View>
                <Text style = {{
                  textAlign    : 'center',
                  fontSize     : (wDim.height * 0.025),
                  color        : 'black',
                  fontWeight   : 'bold',
                  paddingLeft  : (wDim.width * 0.018),
                  paddingRight  : (wDim.width * 0.018)
                }}>
                  Lead our steps to path of excellence
                </Text>
              </View>
              <View>
                <Text style = {{
                  textAlign    : 'center',
                  fontSize     : (wDim.height * 0.025),
                  color        : 'black',
                  fontWeight   : 'bold',
                  paddingLeft  : (wDim.width * 0.018),
                  paddingRight  : (wDim.width * 0.018),
                  marginBottom : 20
                }}>
                  Success, fulfillment and glory awaits.
                </Text>
              </View>
            </View>
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
