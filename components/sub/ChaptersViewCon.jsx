import React, { useState, useRef } from 'react';
import { TextInput, TouchableOpacity, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Tts from 'react-native-tts';
import { WebView } from 'react-native-webview';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons/faVolumeUp';
import { faVolumeDown } from '@fortawesome/free-solid-svg-icons/faVolumeDown';

const speakTheArticle = async (voiceOn, text) => {
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

const ChaptersViewCon = ({ wDim, sDim, navigation, chapName, chapContent, chapWebContent }) => {
    let [speak, setSpeak] = useState(false);
    let [findWord, setFindWord] = useState('');
    let signal = useRef();
    let css = '<meta name="viewport" content="width=device-width, initial-scale=1"/>';
    let js = `<script>document.addEventListener("message", ({ data }) => { let tData = JSON.parse(data); let back = false; if(tData.dir == 'back') back = true; window.find(tData.word, false, back); })</script>`;



    return (
        <SafeAreaView style = {{ flex : 1 }}>
            <View style = {{
                flex : 1,
                paddingBottom    : 10,
                marginVertical   : (wDim.height * 0.005),
                padding          : (wDim.height * 0.012),
            }}>
                <View style = {{ display : 'flex', flexDirection : 'column', justifyContent : 'center' }}>
                    <View style = {{ marginBottom : (wDim.height * 0.009), width : (wDim.width * 0.75) }}>
                        <Text style = {{ color : 'black', fontSize : (wDim.height * 0.025), textAlign: 'justify' }}>{ chapName  }</Text>
                    </View>
                    <View style = {{
                        display        : 'flex',
                        flexDirection  : 'row',
                        alignItems     : 'center',
                        justifyContent : 'center'
                    }}>
                        <TextInput 
                            style = {{
                                borderWidth  : 0.7,
                                height       : 40,
                                borderWidth  : 0.5,
                                borderRadius : 0.5,
                                flexGrow : 9,
                                borderRadius : 0.5,
                                fontSize     : 15,
                                marginBottom : (wDim.height * 0.01), 
                                color        : 'black'
                            }} 
                            placeholder = 'Find'
                            onChangeText = { setFindWord }/>
                        <View style = {{ flexDirection : 'row', display : 'flex', justifyContent : 'space-around', alignItems : 'center', flexGrow : 1 }}>
                            <TouchableOpacity onPress = { () => signal.current.postMessage(JSON.stringify({ dir: 'back', word: findWord})) }>
                                <FontAwesomeIcon icon={ faArrowLeft } size = { sDim.height * 0.030 } color = '#710000' />
                            </TouchableOpacity>
                            <TouchableOpacity onPress = { () => signal.current.postMessage(JSON.stringify({ dir: 'forward', word: findWord})) }>
                                <FontAwesomeIcon icon={ faArrowRight } size = { sDim.height * 0.030 } color = '#710000' />
                            </TouchableOpacity>
                            <TouchableOpacity onPress = { () => { setSpeak(!speak); speakTheArticle(!speak, chapContent) } }>
                                <FontAwesomeIcon icon={ speak ? faVolumeUp : faVolumeDown } size = { sDim.height * 0.030 } color = '#710000' />
                            </TouchableOpacity>
                        </View>
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