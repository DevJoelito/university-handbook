import React, { useEffect, useCallback, useState } from 'react';
import { TouchableOpacity, Text, View, ScrollView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp';
import { faVolumeDown } from '@fortawesome/free-solid-svg-icons/faVolumeDown';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons/faVolumeUp';
import Tts from 'react-native-tts';
import RenderHtml from 'react-native-render-html';

const ChaptersViewCon = ({ wDim, sDim, title, article, webContent }) => {
    let [down, setDown]   = useState(false);
    let [speak, setSpeak] = useState(false);

    const speakTheEvsu = async (voiceOn, text) => {
        try {
            await Tts.getInitStatus();
          
            if(voiceOn && text.trim() != "") {
                Tts.speak(text);
            } else if (voiceOn && text.trim() == "") {
                Tts.speak('No text');
            } else {
                Tts.stop();
            }
        } catch (e) {}
      }

    return (
        <View style = {{
            shadowColor      : '#000',
            shadowOffset     : { width: 1, height: 1 },
            shadowOpacity    : 3,
            shadowRadius     : 10,
            elevation        : 5,
            paddingBottom    : 10,
            backgroundColor  : '#F2F3F4',
            marginHorizontal : (wDim.width * 0.02),
            marginVertical   : (wDim.height * 0.005),
            padding          : (wDim.height * 0.012),
        }}>
        <View style = {{ display : 'flex', flexDirection : 'row' }}>
            <View style = {{ marginBottom : (wDim.height * 0.009), width : (wDim.width * 0.75) }}>
                <Text style = {{ color : 'black', fontSize : (wDim.height * 0.025), textAlign: 'justify' }}>{ title }</Text>
            </View>
            <View style = {{ marginBottom : (wDim.height * 0.009), width : (wDim.width * 0.15), display : 'flex', flexDirection : 'row', justifyContent : 'space-around', alignItems : 'center' }}>
                <TouchableOpacity onPress = { () => setDown(!down) }>
                {
                    down ? 
                    <FontAwesomeIcon icon={ faChevronUp } size = { sDim.height * 0.020 } color = '#822121' />
                    :
                    <FontAwesomeIcon icon={ faChevronDown } size = { sDim.height * 0.020 } color = '#822121' />
                }
                </TouchableOpacity>
                <TouchableOpacity onPress = { () => { speakTheEvsu(!speak, article); setSpeak(!speak); } }>
                {
                    !speak ? 
                    <FontAwesomeIcon icon={ faVolumeDown } size = { sDim.height * 0.020 } color = '#822121' />
                    :
                    <FontAwesomeIcon icon={ faVolumeUp } size = { sDim.height * 0.020 } color = '#822121' />
                }
                </TouchableOpacity>
            </View>
        </View>
        <View style = {{ display : (down ? 'block' : 'none') }}>
            <RenderHtml
                source = {{ html : (webContent == null 
                            ? '<style type="text/css">* { color : black; }</style><div style="text-align : center;">No content.</div>'
                            : '<style type="text/css">* { color : black; }</style>' + webContent) }}
                contentWidth = { wDim.width * 0.9 }
                baseStyle    = {{ color : 'black' }}
            />
        </View>
        </View>
    )
}

export default ChaptersViewCon;