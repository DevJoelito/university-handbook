import { Text, View, TouchableOpacity, Linking } from 'react-native';
import FastImage from 'react-native-fast-image';

const EvsuLinksContainer = ({ navigation, link, title, sDim, wDim, img }) => {

  return (
    <TouchableOpacity 
      style = {{
        backgroundColor : '#F7EFEF',
        marginBottom    : (sDim.height * 0.015),
        alignItems      : 'center',
        justifyContent  : 'center',
        flexDirection   : 'row',
        marginRight     : (sDim.width * 0.06),
        marginLeft      : (sDim.width * 0.06),
        position        : 'relative'
      }}
      onPress = { () => Linking.openURL(link) }>
      <View style = {{ height : (wDim.height * 0.20), width : '100%' }}>
        <FastImage
            style={{ width: '100%', height : '100%' }}
            source={{ uri : img }}
        />
      </View>
      <View style = {{ position : 'absolute', width : '100%', bottom : 0, backgroundColor : '#F7EFEF' }}>
        <View style = {{ padding : (wDim.width * 0.01), borderRadius : 10 }}>
          <Text style = {{ color : 'black', fontWeight : 'bold', fontSize : (sDim.height * 0.020), flex : 1, flexWrap : 'wrap' }}>
              { title }
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default EvsuLinksContainer;
