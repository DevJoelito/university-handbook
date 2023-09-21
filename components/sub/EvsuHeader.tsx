import { Text, View, Image, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons/faBell';

const EvsuHeader = ({ sDim, wDim }) => {
  return (
    <View>
      <View>
        <View style = {{
          backgroundColor : '#710000',
          height          : (wDim.height * 0.07),
          marginTop       : (wDim.height * 0.01),
          marginBottom    : (wDim.height * 0.01),
          paddingRight    : (wDim.width * 0.02),
          position        : 'relative'
        }}>
          <View style = {{
            position : 'absolute',
            top      : (wDim.height * 0.01) * -1, 
            left     : (wDim.width * 0.02)
        }}>
            <Image 
              style = {{
                height : (wDim.height * 0.09),
                width  : (wDim.height * 0.09),
              }}
              source = { require('../../src/images/the-evsu-logo.png') } />
          </View>
          <View style = {{ 
            position : 'absolute', 
            top : (wDim.height * 0.024), 
            left : (wDim.height * 0.108) }}>
            <Image 
              style = {{
                height : (wDim.height * 0.021),
                width  : (wDim.width * 0.6),
                resizeMode : 'stretch'
              }}
              source = { require('../../src/images/main-text.png') } />
          </View>
          <View style= {{ 
            position : 'absolute', 
            top : (wDim.height * 0.015), 
            right : (wDim.width * 0.02) }}>
              <TouchableOpacity>
                <FontAwesomeIcon 
                  size  = { (sDim.height * 0.035) }
                  icon  = { faBell } />
              </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

export default EvsuHeader;
