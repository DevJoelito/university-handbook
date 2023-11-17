import { Text, View, TouchableOpacity, Linking } from 'react-native';

const MissVissHymnContainer = ({ navigation, title, sDim, wDim }) => {
  let colorVal = '#7e1416';

  if(title == 'Mission') {
    colorVal = '#0b6376';
  } else if(title == 'Hymn') {
    colorVal = '#a568aa';
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
      }}>
      <View>
        <Text style = {{ color : 'white', fontWeight : 'bold', fontSize : (sDim.height * 0.026) }}>
            { title }
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default MissVissHymnContainer;
