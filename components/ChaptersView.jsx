import React, { useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity, SafeAreaView, Text, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons/faVolumeUp';
import Tts from 'react-native-tts';

// Tts.setDucking(true);
// Tts.setDefaultRate(0.25);

// const textSpeak = async(text, speak) => {
//   let state = await Tts.getInitStatus();

//   if(state == 'success' && speak) {
//     Tts.speak(text);
//   } else {
//     Tts.stop();
//   }
// }
 
const Links = ({ navigation, sDim, wDim }) => {
  // const [speak, setSpeak] = useState(false);
  // let speak = true; 

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
            onPress = { () => {
              // speak = !speak;
              // textSpeak('Sample Text UWU', speak);
            } }>
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
            <Text style = {{ color : '#2C3E50', textAlign : 'center' }}>CHAPTERS ARE TO BE ADDED</Text>
          </View>
        </ScrollView>
    </SafeAreaView>
  );
}

export default Links;
