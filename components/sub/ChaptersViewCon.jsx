import React, { useState, useRef } from 'react';
import { TextInput, TouchableOpacity, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Tts from 'react-native-tts';
import { WebView } from 'react-native-webview';

const ChaptersViewCon = ({ wDim, sDim, navigation, chapName, chapContent, chapWebContent }) => {
    let [speak, setSpeak] = useState(false);
    let signal = useRef();
    let css = '<meta name="viewport" content="width=device-width, initial-scale=1"/>';
    let js = `<script>window.addEventListener("message", ({ data }) => { let back = false; if(data == 'back') back = true; window.find(string, false, back); })</script>`;

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
        <SafeAreaView style = {{ flex : 1 }}>
            <View style = {{
                flex : 1,
                paddingBottom    : 10,
                marginVertical   : (wDim.height * 0.005),
                padding          : (wDim.height * 0.012),
            }}>
                <View style = {{ display : 'flex', flexDirection : 'row' }}>
                    <View style = {{ marginBottom : (wDim.height * 0.009), width : (wDim.width * 0.75) }}>
                        <Text style = {{ color : 'black', fontSize : (wDim.height * 0.025), textAlign: 'justify' }}>{ chapName  }</Text>
                    </View>
                    <View style = {{
                        display        : 'flex',
                        flexDirection  : 'row',
                        alignItems     : 'center',
                        justifyContent : 'center'
                    }}>
                        <Text style = {{ color : 'black' }}>Find: </Text>
                        <TextInput 
                        style = {{
                            borderWidth  : 0.7,
                            height       : 35,
                            borderWidth  : 0.5,
                            borderRadius : 0.5,
                            width        : (wDim.width * 0.7),
                            borderRadius : 0.5,
                            fontSize     : 15,
                            marginBottom : (wDim.height * 0.01), 
                            color        : 'black',
                            fontFamily   : 'Times New Roman'
                        }} />
                        <TouchableOpacity style = {{ display : 'flex', justifyContent : 'center', alignItems : 'center', paddingLeft : (wDim.width * 0.02), paddingRight : (wDim.width * 0.02) }} >
                            {/* <FontAwesomeIcon icon={ faSearch } size = { sDim.height * 0.030 } color = '#710000' /> */}
                        </TouchableOpacity>
                        <View style = {{ 
                        display        : 'flex',
                        flexDirection  : 'row',
                        justifyContent : 'center',
                        alignItems     : 'center'
                        }}>
                        </View>
                    </View>
                </View>
                <View style = {{
                    borderWidth : 1,
                    flex : 1,
                    backgroundColor : 'transparent'
                }}>
                    <WebView
                        ref = { signal }
                        source           = {{ html : css + chapWebContent + js }}
                        originWhitelist  = {['*']} 
                        mixedContentMode = 'compatibility'
                        style            = {{ flex : 1, backgroundColor : 'transparent' }} />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default ChaptersViewCon;