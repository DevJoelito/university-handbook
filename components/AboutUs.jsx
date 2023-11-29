import { Text, View, SafeAreaView, ScrollView } from 'react-native';

const AboutUs = ({ sDim, wDim }) => {
  return (
    <SafeAreaView>
      <ScrollView>
        <Text style = {{ 
          color      : 'black',
          fontSize   : (wDim.height * 0.035),
          textAlign  : 'center',
          fontWeight : 'bold',
          marginTop  : 8, 
          position   : 'relative'
        }}>About Us</Text>
        <View style = {{ marginTop : 20 }}>
          <Text style = {{
                textAlign    : 'center',
                fontSize     : (wDim.height * 0.025),
                color        : 'black',
                marginTop    : 4,
                fontWeight   : 'bold',
                paddingLeft  : (wDim.width * 0.05),
                paddingRight  : (wDim.width * 0.05)
              }}>
                Welcome to the "On-the-Go Guide: EVSU Ormoc Mobile Handbook"! Simplifying your EVSU Ormoc experience, our app provides real-time updates and interactive maps. We're dedicated to making university life seamless for you. 
          </Text>
        </View>
        <View style = {{ marginTop : 20 }}>
          <Text style = {{
                textAlign    : 'center',
                fontSize     : (wDim.height * 0.025),
                color        : 'black',
                marginTop    : 4,
                fontWeight   : 'bold',
                paddingLeft  : (wDim.width * 0.05),
                paddingRight  : (wDim.width * 0.05)
              }}>
                Contact Us: Questions or suggestions? Reach out at [albernnathaniel.barbac@evsu.edu.ph]. Thanks for choosing us — your companion for a smoother university journey.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default AboutUs;
