import { useState } from 'react';
import { View, SafeAreaView, Modal, Image, TouchableOpacity } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

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
      <Modal 
        visible        = {viewMap} 
        transparent    = {true}
        onRequestClose = {() => setViewMap(!viewMap)}  
      >
        <ImageViewer imageUrls = {image} />
      </Modal>
      <View style = {{
          flex           : 1,
          alignItems     : 'center',
          justifyContent : 'center'
        }}>
        <TouchableOpacity onPress = {() => setViewMap(!viewMap)}>
          <Image 
            style      = {{ 
              borderWidth  : 2,
              borderColor  : "#900303",
              borderRadius : 5,
              width        : (sDim.width * 0.8), 
              height       : (sDim.height * 0.75), 
            }}
            source     = {require('../assets/images/evsu-map.png')}
            resizeMode = 'stretch'
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default Map;
