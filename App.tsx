import 'react-native-gesture-handler';
import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Main from './components/Main';
import HandBook from './components/HandBook';
import ProgOffered from './components/ProgOffered';
import OrgChart from './components/OrgChart';
import Map from './components/Map';
import Links from './components/Links';
import MissVissHymn from './components/MissVissHymn';
import Events from './components/Events';
import AboutUs from './components/AboutUs';
import { NavigationContainer } from '@react-navigation/native';

const screen = Dimensions.get('screen');
const window = Dimensions.get('window');
const Stack  = createStackNavigator();
const Drawer = createDrawerNavigator();

const HandBookView = ({ navigation }) => {
  return (
    <HandBook 
      sDim       = { screen }
      wDim       = { window }
      navigation = { navigation }
    />
  );
}

const ProgOfferedView = ({ navigation }) => {
  return (
    <ProgOffered 
      sDim       = { screen }
      wDim       = { window }
      navigation = { navigation }
    />
  );
}

const OrgChartView = ({ navigation }) => {
  return (
    <OrgChart 
      sDim       = { screen }
      wDim       = { window }
      navigation = { navigation }
    />
  );
}

const MapView = ({ navigation }) => {
  return (
    <Map 
      sDim       = { screen }
      wDim       = { window }
      navigation = { navigation }
    />
  );
}

const LinkView = ({ navigation }) => {
  return (
    <Links
      sDim       = { screen }
      wDim       = { window }
      navigation = { navigation }
    />
  );
}

const MissVissHymnView = ({ navigation }) => {
  return (
    <MissVissHymn 
      sDim       = { screen }
      wDim       = { window }
      navigation = { navigation }
    />
  );
}

const EventsView = ({ navigation }) => {
  return (
    <Events 
      sDim       = { screen }
      wDim       = { window }
      navigation = { navigation }
    />
  );
}

const AboutUsView = ({ navigation }) => {
  return (
    <AboutUs 
      sDim       = { screen }
      wDim       = { window }
      navigation = { navigation }
    />
  );
}

const MainView = ({ navigation }) => {
  return (
    <Main
      sDim       = { screen }
      wDim       = { window }
      navigation = { navigation }
    />
  );
}

const ComponentView = () => {
  return (
    <Drawer.Navigator 
      backBehavior = 'history'>
      <Drawer.Screen 
        name      = "HandBookView"
        component = { HandBookView } 
        options   = {{ headerTitle : 'Hand Book' }} />
      <Drawer.Screen 
        name      = "ProgOfferedView"
        component = { ProgOfferedView }
        options   = {{ headerTitle : 'Program Offered' }} />
      <Drawer.Screen 
        name      = "OrgChartView"
        component = { OrgChartView } 
        options   = {{ headerTitle : 'Organizational Chart' }} />
      <Drawer.Screen 
        name      = "MapView"
        component = { MapView }
        options   = {{ headerTitle : 'EVSU OC Map' }} />
      <Drawer.Screen 
        name      = "LinkView"
        component = { LinkView }
        options   = {{ headerTitle : 'EVSU OC Links' }} />
      <Drawer.Screen 
        name      = "MissVissHymnView"
        component = { MissVissHymnView }
        options   = {{ headerTitle : 'Missing/Vissions & Hymns' }} />
      <Drawer.Screen 
        name      = "EventsView"
        component = { EventsView }
        options   = {{ headerTitle : 'Events' }} />
      <Drawer.Screen 
        name      = "AboutUsView"
        component = { AboutUsView }
        options   = {{ headerTitle : 'About Us' }} />
    </Drawer.Navigator>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name      = "MainView" 
          component = { MainView } 
          options   = {{ headerShown : false }} />
        <Stack.Screen 
          name      = "ComponentView"
          component = { ComponentView } 
          options   = {{ headerShown : false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
