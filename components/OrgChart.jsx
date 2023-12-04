import { useState } from 'react';
import { View, SafeAreaView, Modal, Image, TouchableOpacity, ScrollView } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

const image = [
  {
    url   : '',
    props : {
      source : require('../assets/images/cs_dept.png')
    }
  }, 
  {
    url   : '',
    props : {
      source : require('../assets/images/edu_dept.png')
    }
  },
  {
    url   : '',
    props : {
      source : require('../assets/images/it_dept.png')
    }
  },
  {
    url   : '',
    props : {
      source : require('../assets/images/it_ee_dept.png')
    }
  }
]

const OrgChart = ({sDim, wDim}) => {
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
      <ScrollView>
        <View style = {{
            flex           : 1,
            alignItems     : 'center',
            justifyContent : 'center'
          }}>
          <TouchableOpacity style = {{   }} onPress = {() => setViewMap(!viewMap)}>
            <Image 
              style = {{ 
                borderWidth  : 2,
                borderColor  : "#900303",
                borderRadius : 5,
                width        : (sDim.width * 0.8), 
                height       : (sDim.height * 0.75),
                marginTop    : (wDim.height * 0.02)
              }}
              source     = {require('../assets/images/cs_dept.png')}
              resizeMode = 'stretch'
            />
          </TouchableOpacity>
          <TouchableOpacity onPress = {() => setViewMap(!viewMap)}>
            <Image 
              style = {{ 
                borderWidth  : 2,
                borderColor  : "#900303",
                borderRadius : 5,
                width        : (sDim.width * 0.8), 
                height       : (sDim.height * 0.75),
                marginTop    : (wDim.height * 0.02)
              }}
              source     = {require('../assets/images/edu_dept.png')}
              resizeMode = 'stretch'
            />
          </TouchableOpacity>
          <TouchableOpacity onPress = {() => setViewMap(!viewMap)}>
            <Image 
              style = {{ 
                borderWidth  : 2,
                borderColor  : "#900303",
                borderRadius : 5,
                width        : (sDim.width * 0.8), 
                height       : (sDim.height * 0.75),
                marginTop    : (wDim.height * 0.02)
              }}
              source     = {require('../assets/images/it_dept.png')}
              resizeMode = 'stretch'
            />
          </TouchableOpacity>
          <TouchableOpacity onPress = {() => setViewMap(!viewMap)}>
            <Image 
              style = {{ 
                borderWidth  : 2,
                borderColor  : "#900303",
                borderRadius : 5,
                width        : (sDim.width * 0.8), 
                height       : (sDim.height * 0.75), 
                marginTop    : (wDim.height * 0.02),
                marginBottom : (wDim.height * 0.02),
              }}
              source     = {require('../assets/images/it_ee_dept.png')}
              resizeMode = 'stretch'
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default OrgChart;
