import 'react-native-gesture-handler';
import { Dimensions, Text, View, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Main from './components/Main';
import HandBook from './components/HandBook';
import DeptView from './components/DeptView';
import ProgOfferedView from './components/ProgOfferedView';
import CampusView from './components/CampusView';
import Map from './components/Map';
import Links from './components/Links';
import MissVissHymn from './components/MissVisHymn';
import Events from './components/Events';
import AboutUs from './components/AboutUs';
import ChaptersView from './components/ChaptersView';
import MvhView from './components/MvhView';
import MapCon from './components/MapCon'
import ReportView from './components/ReportView';
import ContactUsView from './components/ContactUsView';
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

const CampusesView = ({ navigation }) => {
  return (
    <CampusView 
      sDim       = { screen }
      wDim       = { window }
      navigation = { navigation }
    />
  );
}

const DepartmentView = ({ navigation, route }) => {
  return (
    <DeptView 
      sDim       = { screen }
      wDim       = { window }
      navigation = { navigation }
      campId     = { route.params.campId }
    />
  );
}

const ProgramOfferedView = ({ navigation, route }) => {
  return (
    <ProgOfferedView 
      sDim       = { screen }
      wDim       = { window }
      navigation = { navigation }
      deptId     = { route.params.deptId }
      deptImg    = { route.params.deptImg }
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

const ChaptersViewView = ({ navigation, route }) => {
  return (
    <ChaptersView
      sDim        = { screen }
      wDim        = { window }
      chapterName = { route.params.title }
      chapterId   = { route.params.chapId }
      navigation  = { navigation }
    />
  );
}

const MvhComp = ({ navigation, route }) => {
  return (
    <MvhView
      sDim       = { screen }
      wDim       = { window }
      mission    = { route.params.mission }
      vision     = { route.params.vision }
      navigation = { navigation }
    />
  );
}

const MapViewCon = ({ route }) => {
  return (
    <MapCon
      sDim     = { screen }
      wDim     = { window }
      mapTitle = { route.params.title }
      mapLink  = { route.params.link }
    />
  );
}

const ReportViewView = ({ navigation }) => {
  return (
    <ReportView
      sDim       = { screen }
      wDim       = { window }
      navigation = { navigation }
    />
  );
}

const ContactUsViewView = ({ navigation }) => {
  return (
    <ContactUsView
      sDim       = { screen }
      wDim       = { window }
      navigation = { navigation }
    />
  );
}

const ComponentView = ({ route }) => {
  return (
    <Drawer.Navigator 
      backBehavior = 'firstRoute'
      screenOptions      = {{ 
        drawerItemStyle : {
          opacity          : 0.9,
          fontWeight       : 'bold',
          borderRadius     : 0,
          marginHorizontal : (window.height * 0.002),
          marginVertical   : (window.height * 0.001),
          color            : 'white'
        },
        drawerLabelStyle : {
          color      : 'white',
          fontFamily : 'Times New Roman',
          fontSize   : (window.height * 0.024) 
        },
        drawerStyle : {
          margin          : 0,
          backgroundColor : '#710000'
        }
       }}>
      <Drawer.Screen 
        name      = "MainView"
        component = { MainView } 
        options   = {{ 
          drawerLabel : 'Home',
          headerShown : false,
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
        name      = "CampusesView"
        component = { CampusesView }
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
          name      = "ReportView"
          component = { ReportViewView }
          options   = {{ 
            headerTitle : () => <AppHeaderLogo 
                                sDim  = { screen }
                                title = 'Report' />,  
          headerStyle : {
            backgroundColor : '#710000',
          },
          drawerLabel : 'Report'
        }} />
        <Drawer.Screen 
          name      = "ContactUsView"
          component = { ContactUsViewView }
          options   = {{ 
            headerTitle : () => <AppHeaderLogo 
                                sDim  = { screen }
                                title = 'Report' />,  
          headerStyle : {
            backgroundColor : '#710000',
          },
          drawerLabel : 'Contact Us'
        }} />
      <Drawer.Screen 
        name      = "AboutUsView"
        component = { AboutUsView }
        options   = {{ 
          headerTitle : () => <AppHeaderLogo 
                                sDim  = { screen }
                                title = 'About' />,  
          headerStyle : {
            backgroundColor : '#710000',
          },
          drawerItemStyle   : { display : 'none' }
        }} />
      <Drawer.Screen 
        name          = "ChaptersView"
        component     = { ChaptersViewView }
        initialParams = {{ title : route.params == undefined ? '' : route.params.title, chapId : route.params == undefined ? '' : route.params.chapId }}
        options       = {{ 
          headerTitle : () => <AppHeaderLogo 
                                sDim  = { screen }
                                title = { route.params == undefined ? '' : route.params.title } />,  
          headerStyle : {
            backgroundColor : '#710000',
          },
          drawerItemStyle   : { display : 'none' }
        }} />
        <Drawer.Screen 
          name          = "ProgOfferedView"
          component     = { ProgramOfferedView }
          initialParams = {{ deptId : route.params == undefined ? '' : route.params.deptId,
                             deptImg : route.params == undefined ? '' : route.params.deptImg }}
          options       = {{ 
            headerTitle : () => <AppHeaderLogo 
                                  sDim  = { screen }
                                  title = 'Program Offered' />,  
            headerStyle : {
              backgroundColor : '#710000',
            },
            drawerItemStyle   : { display : 'none' }
          }} />
        <Drawer.Screen 
          name      = "DeptView"
          component = { DepartmentView }
          initialParams = {{ campId : route.params == undefined ? '' : route.params.campId }}
          options   = {{ 
            headerTitle : () => <AppHeaderLogo 
                                  sDim  = { screen }
                                  title = 'Program Offered' />,  
            headerStyle : {
              backgroundColor : '#710000',
            },
            drawerLabel : 'Program Offered',
            drawerItemStyle   : { display : 'none' }
        }} />
        <Drawer.Screen 
          name          = "MvhView"
          component     = { MvhComp }
          initialParams = {{ 
                              mission: route.params == undefined ? '' : route.params.mission, 
                              vision : route.params == undefined ? '' : route.params.vision 
                            }}
          options       = {{ 
            headerTitle : () => <AppHeaderLogo 
                                  sDim  = { screen }
                                  title = { route.params == undefined ? '' : route.params.title } />,
            headerStyle : {
              backgroundColor : '#710000',
            },
            drawerItemStyle   : { display : 'none' }
        }} />
          <Drawer.Screen 
            name          = "MapWebView"
            component     = { MapViewCon }
            initialParams = {{ title : route.params == undefined ? '' : route.params.title, link : route.params == undefined ? '' : route.params.link }}
            options       = {{ 
              headerTitle : () => <AppHeaderLogo 
                                    sDim  = { screen }
                                    title = { route.params == undefined ? '' : route.params.title } />,  
              headerStyle : {
                backgroundColor : '#710000',
              },
              drawerItemStyle   : { display : 'none' }
          }} />
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
