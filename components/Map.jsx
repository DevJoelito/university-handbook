import { useState } from 'react';
import { View, SafeAreaView, Modal, Image, TouchableOpacity } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { WebView } from 'react-native-webview';

const image = [
  {
    url   : '',
    props : {
      source : require('../assets/images/evsu-map-w-legend.png')
    }
  }
]

const Map = ({sDim, wDim}) => {
  const [viewMap, setViewMap] = useState(false);

  return (
    <SafeAreaView style = {{flex : 1, backgroundColor: '#F7EFEF' }}>
      <View style = {{
          flex        : 1,
          borderWidth : 2,
        }}>
        <WebView
              source           = {{ uri: 'https://www.google.com/maps/d/u/0/embed?mid=1m0uZz4Z8_aof_zdP5vgoJVVzsTlPxwA&ehbc=2E312F&noprof=1&fbclid=IwAR235YI4t9pNNbDH6MvGDr0V4qZsAxNJtWm9ksLLwut3ntJ5UqQVsOO2pVc&ll=11.01095377420635%2C124.60534020766627&z=18' }}
              originWhitelist  = {['*']} 
              mixedContentMode = 'compatibility'
              style            = {{ flex : 1 }} />
      </View>
    </SafeAreaView>
  );
}

export default Map;
