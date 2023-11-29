import { Text, View, TouchableOpacity, Image } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons/faBookmark';

const DepartmentCon = ({ navigation, title, sDim, wDim, deptId }) => {
  return (
    <TouchableOpacity 
      style = {{
        height          : (sDim.height * 0.1),
        backgroundColor : '#F7EFEF',
        marginBottom    : (sDim.height * 0.01),
        alignItems      : 'center',
        flexDirection   : 'row'
      }}
      onPress = { () => navigation.navigate('ComponentView', { screen : 'ProgOfferedView', deptId }) }>
      <View style = {{ marginLeft : (wDim.width * 0.02), marginRight : (wDim.width * 0.04) }}>
        <Image 
            style = {{
                height : (wDim.height * 0.08),
                width  : (wDim.height * 0.08),
            }}
            source = { require('../../assets/images/the-evsu-logo.png') } />
      </View>
      <View>
        <Text style = {{ color : '#2C3E50', fontWeight : 'bold', fontSize : (sDim.height * 0.024) }}>
            { title }
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default DepartmentCon;
