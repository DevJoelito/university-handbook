import { useState } from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';

const ProgramOfferedCon = ({ programTitle, programDesc, sDim, wDim }) => {
  let [tapped, setTapped] = useState(false);

  return (
    <TouchableOpacity style = {{ marginBottom : (wDim.height * 0.02) }} onPress = { () => setTapped(!tapped) }>
        <View style = {{ 
          borderBottomWidth : 1,
          marginLeft        : (wDim.width * 0.02),
          marginRight       : (wDim.width * 0.02), }}>
          <View style = {{
              borderTopWidth    : 1,
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
              <Text style = {{ color : 'black', fontWeight : 700, fontSize : (wDim.height * 0.026), flex : 1, flexWrap : 'wrap' }}>{ programTitle }</Text>
            </View>
          </View>
          <View style = {{ display : (tapped ? 'block' : 'none'), marginLeft : (wDim.height * 0.075), marginBottom : (wDim.height * 0.02) }}>
            <View>
              <Text style = {{ color : 'black', fontSize : 16, fontWeight : 700, fontStyle : 'italic' }}>Program Description:</Text>
            </View>
            <View style = {{ marginTop : (wDim.height * 0.01) }}>
              <Text style = {{ color : 'black', fontSize : 15 }}>{ programDesc }</Text>
            </View>
          </View>
        </View>
    </TouchableOpacity>
  );
}

export default ProgramOfferedCon;
