import { TouchableOpacity, Text, View, Image } from 'react-native';

const ProgramOfferedCon = ({ programTitle, sDim, wDim }) => {
  return (
    <TouchableOpacity style = {{ marginBottom : (wDim.height * 0.02) }}>
        <View style = {{
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
            alignItems        : 'center'
        }}>
          <View style = {{
            marginRight : (wDim.width * 0.035)
          }}>
            <Image style = {{
                height : (wDim.height * 0.05),
                width  : (wDim.height * 0.05),
            }}
            source = { require('../../assets/images/the-evsu-logo.png') } />
          </View>
          <View style = {{ width : (wDim.width * 0.75) }}>
            <Text style = {{ color : 'black', fontSize : (wDim.height * 0.025), flex : 1, flexWrap : 'wrap' }}>{ programTitle }</Text>
          </View>
        </View>
    </TouchableOpacity>
  );
}

export default ProgramOfferedCon;
