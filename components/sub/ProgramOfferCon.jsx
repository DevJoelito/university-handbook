import { TouchableOpacity, Text, View } from 'react-native';


const ProgramOfferedCon = ({ programTitle, sDim, wDim }) => {
  return (
    <TouchableOpacity>
        <View style = {{
            backgroundColor : '#f1e8c6',
            width           : (wDim.width * 0.45),
            height          : (wDim.width * 0.45),
            display         : 'flex',
            justifyContent  : 'center',
            padding         : (wDim.width * 0.025)
        }}>
            <Text style = {{ color : 'black', fontSize : (wDim.height * 0.025), textAlign : 'center' }}>{ programTitle }</Text>
        </View>
    </TouchableOpacity>
  );
}

export default ProgramOfferedCon;
