import { useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { WebView } from 'react-native-webview';

const MapCon = ({ mapLink }) => {
  let [loadError, setLoadError] = useState(false);

  return (
    <SafeAreaView style = {{ flex : 1 }}>
        {
          (!loadError) ?
          <WebView
            source           = {{ uri: mapLink }}
            originWhitelist  = {['*']} 
            mixedContentMode = 'compatibility'
            onError          = { () => setLoadError(true) }
            style            = {{ flex : 1 }} />
          :
          <View style = {{ flex : 1, justifyContent : 'center', alignItems : 'center' }}>
            <View>
              <Text style = {{ color : 'black' }}>Unable to load content.</Text>
            </View>
            <View>
              <Text style = {{ color : 'black' }}>Please make sure to be connected to the internet.</Text>
            </View>
            <TouchableOpacity onPress={ () => setLoadError(false) }>
              <Text style = {{ color : '#5dade2', fontWeight : 'bold', textDecorationLine : 'underline' }}>RELOAD</Text>
            </TouchableOpacity>
          </View>
        }
    </SafeAreaView>
  );
}

export default MapCon;
