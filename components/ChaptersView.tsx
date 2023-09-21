import { ScrollView, TouchableOpacity, SafeAreaView, Text, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons/faVolumeUp';
import Tts from 'react-native-tts';

Tts.setDucking(true);
Tts.setDefaultRate(0.25);

const textSpeak = async(text) => {
  let state = await Tts.getInitStatus();

  if(state == 'success') {
    Tts.speak(text);
  }
}

const Links = ({ navigation, sDim, wDim }) => {
  return (
    <SafeAreaView style = {{flex : 1, backgroundColor: '#F7EFEF' }}>
        <View style = {{ 
          backgroundColor : 'white',
          height          : (sDim.height * 0.05),
          paddingRight    : (sDim.width * 0.03),
          alignItems      : 'flex-end',
          justifyContent  : 'center'
         }}>
          <TouchableOpacity
            onPress = { () => textSpeak('SAMPLE TEXT UWU') }>
            <FontAwesomeIcon icon = { faVolumeUp } size = { sDim.height * 0.04 } color='#710000' />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style = {{ 
            marginLeft   : (sDim.width * 0.04), 
            marginRight  : (sDim.width * 0.04),
            marginTop    : (sDim.width * 0.05), 
            marginBottom : (sDim.width * 0.05)
          }}>
            <Text style = {{ color : '#2C3E50', textAlign : 'center' }}>SAMPLE TEXT UWU</Text>
          </View>
        </ScrollView>
    </SafeAreaView>
  );
}

export default Links;
