import { FlatList, SafeAreaView, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import HandBookChapterCon from './sub/HandBookChapterCon';
import Tts from 'react-native-tts';

Tts.setDucking(true);
Tts.setDefaultRate(0.25);

const textSpeak = async(text) => {
  let state = await Tts.getInitStatus();

  if(state == 'success') {
    Tts.speak(text);
  }
}

const HandBook = ({ navigation, sDim, wDim }) => {  
  textSpeak('Hello, World');

  return (
    <SafeAreaView>
      <View style = {{ 
        paddingTop   : (sDim.width * 0.04), 
        paddingLeft  : (sDim.width * 0.01), 
        paddingRight : (sDim.width * 0.01) }}>
        <FlatList
          data       = { [{ chap : 'Chapter I' }, { chap : 'Chapter II' }, { chap : 'Chapter III' }, { chap : 'Chapter IV' }, { chap : 'Chapter V' }, { chap : 'Chapter VI' }]}
          renderItem = { ({ item }) => { return (<HandBookChapterCon 
                                                  navigation = { navigation }
                                                  title      = { item.chap }
                                                  sDim       = { sDim }
                                                  wDim       = { wDim } />)} }  
        />
      </View>
    </SafeAreaView>
  );
}

export default HandBook;
