import 'react-native-gesture-handler';
import { Dimensions, Text, View, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Main from './components/Main';
import HandBook from './components/HandBook';
import ProgOffered from './components/ProgOffered';
import OrgChart from './components/OrgChart';
import Map from './components/Map';
import Links from './components/Links';
import MissVissHymn from './components/MissVisHymn';
import Events from './components/Events';
import AboutUs from './components/AboutUs';
import ChaptersView from './components/ChaptersView';
import AppHeaderLogo from './components/sub/AppHeaderLogo';
import { NavigationContainer } from '@react-navigation/native';

const screen = Dimensions.get('screen');
const window = Dimensions.get('window');
const Stack  = createStackNavigator();
const Drawer = createDrawerNavigator();

const MainView = ({ navigation }) => {
  return (
    <Main
      sDim       = { screen }
      wDim       = { window }
      navigation = { navigation }
    />
  );
}

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

const ChaptersViewView = ({ navigation }) => {
  return (
    <ChaptersView
      sDim       = { screen }
      wDim       = { window }
      navigation = { navigation }
    />
  );
}


const ComponentView = ({ route }) => {
  return (
    <Drawer.Navigator 
      backBehavior = 'firstRoute'>
      <Drawer.Screen 
        name      = "MainView"
        component = { MainView } 
        options   = {{ 
          drawerLabel : 'Home',
          headerShown : false,
          backBehavior : 'firstRoute'
        }} />
      <Drawer.Screen 
        name      = "HandBookView"
        component = { HandBookView } 
        options   = {{ 
          headerTitle : () => <AppHeaderLogo 
                                sDim  = { screen }
                                title = 'Handbook' />,  
          headerStyle : {
            backgroundColor : '#710000',
          },
          drawerLabel : 'Handbook'
        }} />
      <Drawer.Screen 
        name      = "ProgOfferedView"
        component = { ProgOfferedView }
        backBehavior = 'firstRoute'
        options   = {{ 
          headerTitle : () => <AppHeaderLogo 
                                sDim  = { screen }
                                title = 'Program Offered' />,  
          headerStyle : {
            backgroundColor : '#710000',
          },
          drawerLabel : 'Program Offered'
        }} />
      <Drawer.Screen 
        name      = "OrgChartView"
        component = { OrgChartView } 
        options   = {{ 
          headerTitle : () => <AppHeaderLogo 
                                sDim  = { screen }
                                title = 'Organizational Chart' />,  
          headerStyle : {
            backgroundColor : '#710000',
          },
          drawerLabel : 'Organizational Chart'
        }} />
      <Drawer.Screen 
        name      = "MapView"
        component = { MapView }
        options   = {{ 
          headerTitle : () => <AppHeaderLogo 
                                sDim  = { screen }
                                title = 'EVSU OC Map' />,  
          headerStyle : {
            backgroundColor : '#710000',
          },
          drawerLabel : 'EVSU OC Map'
        }} />
      <Drawer.Screen 
        name      = "LinkView"
        component = { LinkView }
        options   = {{ 
          headerTitle : () => <AppHeaderLogo 
                                sDim  = { screen }
                                title = 'EVSU OC Links' />,  
          headerStyle : {
            backgroundColor : '#710000',
          }, 
          drawerLabel : 'EVSU OC Links'
        }} />
      <Drawer.Screen 
        name      = "MissVissHymnView"
        component = { MissVissHymnView }
        options   = {{ 
          headerTitle : () => <AppHeaderLogo 
                                sDim  = { screen }
                                title = 'Mission/Vission & Hymn' />,  
          headerStyle : {
            backgroundColor : '#710000',
          }, 
          drawerLabel : 'Mission/Vission & Hymn'
        }} />
      <Drawer.Screen 
        name      = "EventsView"
        component = { EventsView }
        options   = {{ 
          headerTitle : () => <AppHeaderLogo 
                                sDim  = { screen }
                                title = 'Events' />,  
          headerStyle : {
            backgroundColor : '#710000',
          },
          drawerLabel : 'Events'
        }} />
      <Drawer.Screen 
        name      = "AboutUsView"
        component = { AboutUsView }
        options   = {{ 
          headerTitle : () => <AppHeaderLogo 
                                sDim  = { screen }
                                title = 'About Us' />,  
          headerStyle : {
            backgroundColor : '#710000',
          },
          drawerLabel : 'About Us'
        }} />
      <Drawer.Screen 
        name      = "ChaptersView"
        component = { ChaptersViewView }
        options   = {{ 
          headerTitle : () => <AppHeaderLogo 
                                sDim  = { screen }
                                title = { route.params.title } />,  
          headerStyle : {
            backgroundColor : '#710000',
          },
          drawerItemStyle   : { display : 'none' }
        }} />
    </Drawer.Navigator>
  )
}

const SubComponentView = () => {
  return (
    <Drawer.Navigator>

    </Drawer.Navigator>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name      = "ComponentView"
          component = { ComponentView } 
          options   = {{ headerShown : false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
