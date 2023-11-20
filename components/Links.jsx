import { FlatList, SafeAreaView, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import HandBookChapterCon from './sub/EvsuLinksContainer';

const Links = ({ navigation, sDim, wDim }) => {  
  return (
    <SafeAreaView>
      <View style = {{ 
        paddingTop   : (sDim.width * 0.04), 
        paddingLeft  : (sDim.width * 0.01), 
        paddingRight : (sDim.width * 0.01) }}>
        <FlatList
          data       = { [{ chap : 'EVSU INFORMATION SYSTEM' }, { chap : 'EVSU STUDENT PORTAL' }, { chap : 'EVSU ONLINE ADMISSION' }, { chap : 'EVSU OC FACEBOOK PAGE' }]}
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

export default Links;
