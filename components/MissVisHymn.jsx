import { FlatList, SafeAreaView, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MissVisHymnContainer from './sub/MissVisHymnContainer';

const Links = ({ navigation, sDim, wDim }) => {  

  return (
    <SafeAreaView>
      <View style = {{ 
        paddingTop   : (sDim.width * 0.04), 
        paddingLeft  : (sDim.width * 0.01), 
        paddingRight : (sDim.width * 0.01) }}>
        <FlatList
          data       = { [{ chap : 'Vision' }, { chap : 'Mission' }, { chap : 'Hymn' }]}
          renderItem = { ({ item }) => { return (<MissVisHymnContainer 
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
