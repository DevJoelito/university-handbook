import { Text, View, TouchableOpacity, Image } from 'react-native';

const DepartmentCon = ({ navigation, title, sDim, wDim, campId }) => {
  return (
    <TouchableOpacity 
      style = {{
        borderBottomWidth : 1,
        borderTopWidth    : 1,
        marginLeft        : (wDim.width * 0.02),
        marginRight       : (wDim.width * 0.02),
        paddingLeft       : (wDim.width * 0.018),
        paddingRight      : (wDim.width * 0.018),
        paddingTop        : (wDim.height * 0.014),
        paddingBottom     : (wDim.height * 0.014),
        display           : 'flex',
        flexDirection     : 'row',
        alignItems        : 'center',
        marginBottom      : (wDim.height * 0.02)
      }}
      onPress = { () => navigation.navigate('ComponentView', { screen : 'DeptView', campId }) }>
      <View style = {{ marginLeft : (wDim.width * 0.02), marginRight : (wDim.width * 0.04) }}>
        <Image 
            style = {{
                height : (wDim.height * 0.05),
                width  : (wDim.height * 0.05),
            }}
            source = { require('../../assets/images/the-evsu-logo.png') } />
      </View>
      <View>
        <Text style = {{ color : '#2C3E50', fontWeight : 'bold', fontSize : (sDim.height * 0.022), flex : 1, flexWrap : 'wrap'}}>
            { title }
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default DepartmentCon;
