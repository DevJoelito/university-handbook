import { Text, View, SafeAreaView, ScrollView, Image } from 'react-native';

const MvhView = ({ navigation, sDim, wDim, titleName }) => {
  console.log(titleName);

  return (
    <SafeAreaView style = {{ flex : 1 }}>
      <Text style = {{ 
        color      : 'black',
        fontSize   : (wDim.height * 0.050),
        textAlign  : 'center',
        fontWeight : 'bold',
        marginTop  : 8, 
        position   : 'relative'
      }}>{ titleName }</Text>
      <ScrollView>
        {
          titleName == 'Mission' ?
          <View>
            <Text style = {{
              textAlign    : 'center',
              fontSize     : (wDim.height * 0.025),
              color        : 'black',
              marginTop    : 20,
              fontWeight   : 'bold',
              paddingLeft  : 10,
              paddingRight : 10
            }}>
              Develop a Strong Technologically and Professionally Competent Productive Human Resource Imbued with Positive Values Needed to Propel Sustainable Development.
            </Text>
          </View> 
          :
          titleName == 'Vision' ?
          <View>
            <Text style = {{
              textAlign    : 'center',
              fontSize     : (wDim.height * 0.025),
              color        : 'black',
              marginTop    : 20,
              fontWeight   : 'bold',
              paddingLeft  : 10,
              paddingRight : 10
            }}>
              A Leading State University in Technological and Professional Education.
            </Text>
          </View>
          :
          <View>
            <View>
              <Text style = {{
                textAlign    : 'center',
                fontSize     : (wDim.height * 0.022),
                color        : 'black',
                marginTop    : 15,
                fontWeight   : 'bold',
                paddingLeft  : 10,
                paddingRight : 10
              }}>
                Lyrics: BELINDA C. LORA
              </Text>
            </View>
            <View>
              <Text style = {{
                textAlign    : 'center',
                fontSize     : (wDim.height * 0.022),
                color        : 'black',
                marginTop    : 8,
                fontWeight   : 'bold',
                paddingLeft  : 10,
                paddingRight : 10
              }}>
                Music and Arrangment: BIATO C. AMBE, JR.
              </Text>
            </View>
            <View>
              <View>
                <Text style = {{
                  textAlign    : 'center',
                  fontSize     : (wDim.height * 0.025),
                  color        : 'black',
                  marginTop    : 20,
                  fontWeight   : 'bold',
                  paddingLeft  : 10,
                  paddingRight : 10
                }}>
                  There’s a dawn of a new day breaking
                </Text>
              </View>
              <View>
                <Text style = {{
                  textAlign    : 'center',
                  fontSize     : (wDim.height * 0.025),
                  color        : 'black',
                  fontWeight   : 'bold',
                  paddingLeft  : 10,
                  paddingRight : 10
                }}>
                  There’s a ray of light reaching
                </Text>
              </View>
              <View>
                <Text style = {{
                  textAlign    : 'center',
                  fontSize     : (wDim.height * 0.025),
                  color        : 'black',
                  fontWeight   : 'bold',
                  paddingLeft  : 10,
                  paddingRight : 10
                }}>
                  Every corner of the land
                </Text>
              </View>
              <View>
                <Text style = {{
                  textAlign    : 'center',
                  fontSize     : (wDim.height * 0.025),
                  color        : 'black',
                  fontWeight   : 'bold',
                  paddingLeft  : 10,
                  paddingRight : 10
                }}>
                  It’s radiance keeps on spreading
                </Text>
              </View>
              <View>
                <Text style = {{
                  textAlign    : 'center',
                  fontSize     : (wDim.height * 0.025),
                  color        : 'black',
                  fontWeight   : 'bold',
                  paddingLeft  : 10,
                  paddingRight : 10
                }}>
                  Bringing hope and strength and life
                </Text>
              </View>
              <View>
                <Text style = {{
                  textAlign    : 'center',
                  fontSize     : (wDim.height * 0.025),
                  color        : 'black',
                  marginTop    : 20,
                  fontWeight   : 'bold',
                  paddingLeft  : 10,
                  paddingRight : 10
                }}>
                  There’s a flame that keeps on burning
                </Text>
              </View>
              <View>
                <Text style = {{
                  textAlign    : 'center',
                  fontSize     : (wDim.height * 0.025),
                  color        : 'black',
                  fontWeight   : 'bold',
                  paddingLeft  : 10,
                  paddingRight : 10
                }}>
                  There’s a flame that keeps on burning
                </Text>
              </View>
              <View>
                <Text style = {{
                  textAlign    : 'center',
                  fontSize     : (wDim.height * 0.025),
                  color        : 'black',
                  fontWeight   : 'bold',
                  paddingLeft  : 10,
                  paddingRight : 10
                }}>
                  Touching the mind, the heart and the soul
                </Text>
              </View>
              <View>
                <Text style = {{
                  textAlign    : 'center',
                  fontSize     : (wDim.height * 0.025),
                  color        : 'black',
                  fontWeight   : 'bold',
                  paddingLeft  : 10,
                  paddingRight : 10
                }}>
                  Sending Knowledge truth, love, and wisdom
                </Text>
              </View>
              <View>
                <Text style = {{
                  textAlign    : 'center',
                  fontSize     : (wDim.height * 0.025),
                  color        : 'black',
                  fontWeight   : 'bold',
                  paddingLeft  : 10,
                  paddingRight : 10
                }}>
                  abundant blessings from GOD above
                </Text>
              </View>
              <View>
                <Text style = {{
                  textAlign    : 'center',
                  fontSize     : (wDim.height * 0.028),
                  color        : 'black',
                  marginTop    : 20,
                  fontWeight   : 'bold',
                  paddingLeft  : 10,
                  paddingRight : 10
                }}>
                  Refrain
                </Text>
              </View>
              <View>
                <Text style = {{
                  textAlign    : 'center',
                  fontSize     : (wDim.height * 0.025),
                  color        : 'black',
                  marginTop    : 20,
                  fontWeight   : 'bold',
                  paddingLeft  : 10,
                  paddingRight : 10
                }}>
                  Beloved Eastern Visayas State University
                </Text>
              </View>
              <View>
                <Text style = {{
                  textAlign    : 'center',
                  fontSize     : (wDim.height * 0.025),
                  color        : 'black',
                  fontWeight   : 'bold',
                  paddingLeft  : 10,
                  paddingRight : 10
                }}>
                  Your blessed flame shall forever burn in our hearts
                </Text>
              </View>
              <View>
                <Text style = {{
                  textAlign    : 'center',
                  fontSize     : (wDim.height * 0.025),
                  color        : 'black',
                  fontWeight   : 'bold',
                  paddingLeft  : 10,
                  paddingRight : 10
                }}>
                  We give you outmost commitment and dedication
                </Text>
              </View>
              <View>
                <Text style = {{
                  textAlign    : 'center',
                  fontSize     : (wDim.height * 0.025),
                  color        : 'black',
                  fontWeight   : 'bold',
                  paddingLeft  : 10,
                  paddingRight : 10
                }}>
                  You shall shine with pride throughout the nation
                </Text>
              </View>
              <View>
                <Text style = {{
                  textAlign    : 'center',
                  fontSize     : (wDim.height * 0.028),
                  color        : 'black',
                  marginTop    : 20,
                  fontWeight   : 'bold',
                  paddingLeft  : 10,
                  paddingRight : 10
                }}>
                  Coda
                </Text>
              </View>
              <View>
                <Text style = {{
                  textAlign    : 'center',
                  fontSize     : (wDim.height * 0.025),
                  color        : 'black',
                  marginTop    : 20,
                  fontWeight   : 'bold',
                  paddingLeft  : 10,
                  paddingRight : 10
                }}>
                  Shine with gladsome light
                </Text>
              </View>
              <View>
                <Text style = {{
                  textAlign    : 'center',
                  fontSize     : (wDim.height * 0.025),
                  color        : 'black',
                  fontWeight   : 'bold',
                  paddingLeft  : 10,
                  paddingRight : 10
                }}>
                  Oh alma mater dear
                </Text>
              </View>
              <View>
                <Text style = {{
                  textAlign    : 'center',
                  fontSize     : (wDim.height * 0.025),
                  color        : 'black',
                  fontWeight   : 'bold',
                  paddingLeft  : 10,
                  paddingRight : 10
                }}>
                  Lead our steps to path of excellence
                </Text>
              </View>
              <View>
                <Text style = {{
                  textAlign    : 'center',
                  fontSize     : (wDim.height * 0.025),
                  color        : 'black',
                  fontWeight   : 'bold',
                  paddingLeft  : 10,
                  paddingRight : 10
                }}>
                  Success, fulfillment and glory awaits.
                </Text>
              </View>
            </View>
          </View>
        }
      </ScrollView>
      <Image
          style  = {{ width : (wDim.width * 0.48), height : (wDim.width * 0.48), alignSelf : 'center', top : (wDim.height * 0.32), opacity : 0.2, position : 'absolute' }}
          source = { require('../assets/images/the-evsu-logo.png') }
        />
    </SafeAreaView>
  );
}

export default MvhView;
