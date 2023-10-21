import { Text, View, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons/faBookmark';

const HandBookChapterCon = ({ navigation, title, sDim, wDim }) => {
  return (
    <TouchableOpacity 
      style = {{
        height          : (sDim.height * 0.1),
        backgroundColor : '#F7EFEF',
        marginBottom    : (sDim.height * 0.01),
        alignItems      : 'center',
        flexDirection   : 'row'
      }}
      onPress = { () => navigation.navigate('ComponentView', { screen : 'ChaptersView', title }) }>
      <View style = {{ marginLeft : (wDim.width * 0.05), marginRight : (wDim.width * 0.05) }}>
        <FontAwesomeIcon icon={ faBookmark } size = { sDim.height * 0.05 } color = '#710000' />
      </View>
      <View>
        <Text style = {{ color : '#2C3E50', fontWeight : 'bold', fontSize : (sDim.height * 0.028) }}>
            { title }
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default HandBookChapterCon;
