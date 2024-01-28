import { Text, View, TouchableOpacity } from 'react-native';

const MissVissHymnContainer = ({ navigation, title, sDim, mission, vision, wDim }) => {
  return (
    <TouchableOpacity 
      style = {{
        height          : (sDim.height * 0.11),
        borderTopWidth  : 1,
        borderBottomWidth : 1,
        backgroundColor : '#F7EFEF',
        marginBottom    : (sDim.height * 0.015),
        alignItems      : 'center',
        justifyContent  : 'center',
        flexDirection   : 'row',
        marginRight     : (sDim.width * 0.06),
        marginLeft      : (sDim.width * 0.06),
      }}
      onPress = { () => navigation.navigate('ComponentView', { screen : 'MvhView', title, mission, vision }) }>
      <View>
        <Text style = {{ color : 'black', fontWeight : 'bold', fontSize : (sDim.height * 0.020) }}>
            { title }
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default MissVissHymnContainer;
