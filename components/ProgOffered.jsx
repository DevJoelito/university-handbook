import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import ProgramOfferedCon  from './sub/ProgramOfferCon';

const ProgramOffered = ({ navigation, sDim, wDim }) => {
  return (
    <SafeAreaView>

      <ScrollView>
        <View style = {{
          padding        : (wDim.width * 0.030),
          display        : 'flex',
          flexDirection  : 'row',
          justifyContent : 'space-between'
        }}>
          <ProgramOfferedCon
            programTitle = "BS Information Technology"
            wDim         = { wDim }
            sDim         = { sDim }
          />
          <ProgramOfferedCon
            programTitle = "BS Electrical Engineering"
            wDim         = { wDim }
            sDim         = { sDim }
          />
        </View>
        <View style = {{
          padding        : (wDim.width * 0.030),
          display        : 'flex',
          flexDirection  : 'row',
          justifyContent : 'space-between'
        }}>
          <ProgramOfferedCon
            programTitle = "BS Mechanical Engineering"
            wDim         = { wDim }
            sDim         = { sDim }
          />
          <ProgramOfferedCon
            programTitle = "BS Civil Engineering"
            wDim         = { wDim }
            sDim         = { sDim }
          />
        </View>
        <View style = {{
          padding        : (wDim.width * 0.030),
          display        : 'flex',
          flexDirection  : 'row',
          justifyContent : 'space-between'
        }}>
          <ProgramOfferedCon
            programTitle = "BS Architecture"
            wDim         = { wDim }
            sDim         = { sDim }
          />
          <ProgramOfferedCon
            programTitle = "BS Interior Design"
            wDim         = { wDim }
            sDim         = { sDim }
          />
        </View>
        <View style = {{
          padding        : (wDim.width * 0.030),
          display        : 'flex',
          flexDirection  : 'row',
          justifyContent : 'space-between'
        }}>
          <ProgramOfferedCon
            programTitle = "BS Economics"
            wDim         = { wDim }
            sDim         = { sDim }
          />
          <ProgramOfferedCon
            programTitle = "BS Accountancy"
            wDim         = { wDim }
            sDim         = { sDim }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ProgramOffered;
