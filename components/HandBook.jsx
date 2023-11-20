import { FlatList, SafeAreaView, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import HandBookChapterCon from './sub/HandBookChapterCon';

const HandBook = ({ navigation, sDim, wDim }) => {  
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
