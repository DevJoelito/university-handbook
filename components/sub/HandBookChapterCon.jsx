import { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons/faBookmark';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp';
import RenderHtml from 'react-native-render-html';

const HandBookChapterCon = ({ navigation, title, sDim, wDim, chapId, content }) => {
  let [down, setDown] = useState(false);

  return (
    <TouchableOpacity 
      style = {{
        backgroundColor : '#f3f3f3',
        marginBottom    : (sDim.height * 0.01),
        flexDirection   : 'row',
        shadowColor     : '#000',
        shadowOffset    : { width: 1, height: 1 },
        shadowOpacity   : 10,
        shadowRadius    : 10,
        elevation       : 2,
      }}
      onPress = { () => navigation.navigate('ComponentView', { screen : 'ChaptersView', title, chapId }) }>
      <View style = {{ display : 'flex', justifyContent : 'center', width : '100%' }}>
        <View style = {{ position : 'relative', height : (sDim.height * 0.06), width : '100%' }}>
          <View>
            <View style = {{
              display       : 'flex',
              flexDirection : 'row',
              alignItems    : 'center'
            }}>
              <View style = {{ marginLeft : (wDim.width * 0.05), marginRight : (wDim.width * 0.05) }}>
                <FontAwesomeIcon icon={ faBookmark } size = { sDim.height * 0.040 } color = '#710000' />
              </View>
              <View style = {{
                display        : 'flex',
                justifyContent : 'center'
              }}>
                <View>
                  <Text style = {{ color : '#2C3E50', fontWeight : 'bold', fontSize : (sDim.height * 0.025) }}>
                      { title }
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <TouchableOpacity onPress = { () => setDown(!down) } style = {{ marginRight : (wDim.width * 0.028), position : 'absolute', right : (wDim.width * 0.008), top : (wDim.height * 0.008), padding : (wDim.height * 0.005) }}>
            {
              down ? 
              <FontAwesomeIcon icon={ faChevronUp } size = { sDim.height * 0.020 } color = '#5d6d7e' />
              :
              <FontAwesomeIcon icon={ faChevronDown } size = { sDim.height * 0.020 } color = '#5d6d7e' />
            }
          </TouchableOpacity>
        </View>
        <View style = {{ paddingTop : (wDim.height * 0.007), paddingBottom : (wDim.height * 0.01), paddingRight : (wDim.width * 0.015), paddingLeft : (wDim.width * 0.05), display : (down ? 'block' : 'none') }}>
          <RenderHtml
            source = {{ html : (content == null 
                        ? '<style type="text/css">* { color : black; }</style><div style="text-align : center;">No content.</div>'
                        : '<style type="text/css">* { color : black; }</style>' + content) }}
            contentWidth = { wDim.width * 0.9 }
            baseStyle    = {{ color : 'black' }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default HandBookChapterCon;
