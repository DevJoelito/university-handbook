import { Text, View, TouchableOpacity, Linking } from 'react-native';

const EvsuLinksContainer = ({ navigation, link, title, sDim, wDim }) => {
  return (
    <TouchableOpacity 
      style = {{
        height          : (sDim.height * 0.15),
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
      <View style = {{ position : 'absolute', width : '100%', bottom : 0 }}>
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
