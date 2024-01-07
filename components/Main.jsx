import { StyleSheet, SafeAreaView, ScrollView, View, Platform, TouchableOpacity, Text } from 'react-native';
import EvsuHeader from './sub/EvsuHeader';
import MainOptionsContainer from './sub/MainOptionsContainer';
import { 
  faBookOpen, 
  faChalkboardTeacher, 
  faMap,      
  faGlobe,             
  faGraduationCap, 
  faBook, 
  faInfo } from '@fortawesome/free-solid-svg-icons';
import { create } from 'react-test-renderer';

const Main = ({ navigation, sDim, wDim }) => {
  return (
    <SafeAreaView style = {{ flex : 1, zIndex : 1 }}>
      <EvsuHeader
        navigation = { navigation } 
        sDim       = { sDim }
        wDim       = { wDim } />
      <ScrollView>
        <View style = {{ 
          display    : 'flex',
          alignItems : 'center',
          paddingTop : (sDim.width * 0.03) }} >
          <View style = { styles.subConProps }>
            <MainOptionsContainer 
              navigation = { navigation }
              sDim       = { sDim } 
              wDim       = { wDim }
              icon       = { faBookOpen }
              title      = 'Handbook'
              navTitle   = 'HandBookView' />
            <MainOptionsContainer
              navigation = { navigation } 
              sDim       = { sDim } 
              wDim       = { wDim } 
              icon       = { faChalkboardTeacher }
              title      = 'Program Offered'
              navTitle   = 'DeptView' />
          </View>

          <View style = { styles.subConProps }>
            <MainOptionsContainer
              navigation = { navigation } 
              sDim       = { sDim } 
              wDim       = { wDim } 
              icon       = { faGlobe }
              title      = 'EVSU OC Links'
              navTitle   = 'LinkView' />
            <MainOptionsContainer 
              navigation = { navigation }
              sDim       = { sDim } 
              wDim       = { wDim } 
              icon       = { faMap } 
              title      = 'EVSU OC Map'
              navTitle   = 'MapView' />
          </View>

          <View style = { styles.subConProps }>
            <MainOptionsContainer 
              navigation = { navigation }
              sDim       = { sDim } 
              wDim       = { wDim } 
              icon       = { faBook } 
              title      = 'Events'
              navTitle   = 'EventsView' />
            <MainOptionsContainer 
              navigation = { navigation } 
              sDim       = { sDim } 
              wDim       = { wDim } 
              icon       = { faGraduationCap } 
              title      = 'Mission/Vission & Hymn'
              navTitle   = 'MissVissHymnView' />
          </View>

          <View style = { styles.subConProps }>
            <MainOptionsContainer
              navigation = { navigation } 
              sDim       = { sDim } 
              wDim       = { wDim } 
              icon       = { faInfo }
              title      = 'About Us'
              navTitle   = 'AboutUsView' />
          </View>
        </View>
      </ScrollView>
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

