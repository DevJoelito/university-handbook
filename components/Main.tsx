import React from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import EvsuHeader from './sub/EvsuHeader';
import MainOptionsContainer from './sub/MainOptionsContainer';

const Main = ({ sDim, wDim }) => {
  return (
    <SafeAreaView
      style = {{
        flex : 1,
      }}
    >
      <EvsuHeader 
        sDim = { sDim }
        wDim = { wDim } />
      <View style = {{ 
        flex : 1, 
        borderWidth : 1,
        borderColor : 'green',
        display     : 'flex',
        alignItems  : 'center',
        paddingTop  : (sDim.width * 0.03) }} >
        <View style = { styles.subConProps }>
          <MainOptionsContainer 
            sDim = { sDim } 
            wDim = { wDim } />
          <MainOptionsContainer 
            sDim = { sDim } 
            wDim = { wDim } />
        </View>

        <View style = { styles.subConProps }>
          <MainOptionsContainer 
            sDim = { sDim } 
            wDim = { wDim } />
          <MainOptionsContainer 
            sDim = { sDim } 
            wDim = { wDim } />
        </View>

        <View style = { styles.subConProps }>
          <MainOptionsContainer 
            sDim = { sDim } 
            wDim = { wDim } />
          <MainOptionsContainer 
            sDim = { sDim } 
            wDim = { wDim } />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  subConProps : {
    display        : 'flex', 
    flexDirection  : 'row', 
  }
});

export default Main;

