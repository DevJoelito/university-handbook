import { Text, View, Image } from 'react-native';

const AppHeaderLogo = ({ sDim, title }) => {
  return (
    <View style = {{ 
      flex           : 1, 
      width          : (sDim.width * 0.80), 
      position       : 'relative', 
      justifyContent : 'center' }}>
      <View style = {{ 
        position : 'absolute', 
        left     : ((sDim.width * 0.06) * -1) }}>
        <Text style = {{
          fontSize   : (sDim.width * 0.055),
          fontWeight : 'bold',
          color      : '#F4F6F6',
          fontFamily : 'times new roman'
        }}>
          { title }
        </Text>
      </View>
      <View style = {{ 
        position : 'absolute', 
        right    : (sDim.width * 0.011) }}>
        <Image
          style  = {{ width : (sDim.width * 0.125), height : (sDim.width * 0.125) }}
          source = { require('../../src/images/the-evsu-logo.png') }
        />
      </View>
    </View>
  )
}

export default AppHeaderLogo;
