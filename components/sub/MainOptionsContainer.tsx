import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Text, SafeAreaView, StyleSheet, View, TouchableOpacity } from 'react-native';

const MainOptionsContainer = ({ navigation, navTitle, sDim, wDim, icon, title }) => {
  return (
    <TouchableOpacity onPress = { () => navigation.navigate('ComponentView', { screen : navTitle }) }>
        <View style = {{
            width           : (wDim.width * 0.46),
            height          : (wDim.width * 0.32),
            margin          : (wDim.width * 0.013),
            display         : 'flex',
            alignItems      : 'center',
            justifyContent  : 'center',
            backgroundColor : '#F2F3F4',
            borderWidth     : 1,
            borderColor     : 'green',
            padding         : 3
        }}>
          <View style = {{ marginBottom : 10 }}>
            <FontAwesomeIcon icon={ icon } size = { (wDim.width * 0.18) } />
          </View>
          <View>
            <Text style = { style.textStyle }>
                { title }
            </Text>
          </View>
        </View>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  textStyle : {
    color      : '#2C3E50', 
    textAlign  : 'center', 
    fontFamily : 'times new roman',
  }
})

export default MainOptionsContainer;
