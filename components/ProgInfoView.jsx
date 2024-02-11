import React from 'react';
import { SafeAreaView, View } from 'react-native';
import RenderHtml from 'react-native-render-html';

const ProgInfoView = ({ content, wDim, sDim }) => {
  return (
    <SafeAreaView style = {{ flex : 1 }}>
      <View style = {{ flex : 1 }}>
            <RenderHtml
                source = {{ html : (content == null 
                            ? '<style type="text/css">* { color : black; }</style><div style="text-align : center;">No content.</div>'
                            : '<style type="text/css">* { color : black; }</style>' + content) }}
                contentWidth = { wDim.width * 0.9 }
                baseStyle    = {{ color : 'black' }}
            />
      </View>
    </SafeAreaView>
  );
}

export default ProgInfoView;
