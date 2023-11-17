import { Text, View, TouchableOpacity, Linking } from 'react-native';

const EvsuLinksContainer = ({ navigation, title, sDim, wDim }) => {
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
      }}
      onPress = { () => Linking.openURL(url) }>
      <View>
        <Text style = {{ color : 'white', fontWeight : 'bold', fontSize : (sDim.height * 0.026) }}>
            { title }
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default EvsuLinksContainer;
