import { Text, View, TouchableOpacity, Linking } from 'react-native';
import { WebView } from 'react-native-webview';

const EvsuLinksContainer = ({ navigation, link, title, sDim, wDim }) => {
  let colorVal = '#7e1416';
  let url      = 'https://apps.evsu.edu.ph';

  if(title == 'EVSU STUDENT PORTAL') {
    colorVal = '#0b6376';
    url      = 'https://apps.evsu.edu.ph/students/login';
  } else if(title == 'EVSU ONLINE ADMISSION') {
    colorVal = '#a568aa';
    url      = 'https://apps.evsu.edu.ph/admissions';
  } else if(title == 'EVSU OC FACEBOOK PAGE') {
    colorVal = '#0b7622';
    url      = 'https://www.facebook.com/myEVSU.ormoc';
  }

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
        backgroundColor : colorVal,
        position        : 'relative'
      }}
      onPress = { () => Linking.openURL(url) }>
        <View style = {{ flex : 1, height : '100%', width : '100%', position : 'absolute', zIndex : 1 }}>
          <WebView
            source           = {{ uri: url }}
            originWhitelist  = {['*']} 
            mixedContentMode = 'compatibility'
            style            = {{ flex : 1 }} />
        </View>
      <View style = {{ zIndex : 2, backgroundColor : colorVal }}>
        <View style = {{ padding : (wDim.width * 0.01), borderRadius : 10 }}>
          <Text style = {{ color : 'black', fontWeight : 'bold', fontSize : (sDim.height * 0.026) }}>
              { title }
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default EvsuLinksContainer;
