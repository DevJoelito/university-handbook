import React from 'react';
import { Text, SafeAreaView, View, TouchableOpacity } from 'react-native';

const MainOptionsContainer = ({ sDim, wDim }) => {
  return (
    <TouchableOpacity>
        <View style = {{
            width         : (wDim.width * 0.46),
            height        : (wDim.width * 0.44),
            margin        : (wDim.width * 0.013),
            shadowColor   : 'white',
            shadowOpacity : 0.3,
            elevation     : 4
        }}>
            <Text>Hello, World</Text>
        </View>
    </TouchableOpacity>
  );
}

export default MainOptionsContainer;
