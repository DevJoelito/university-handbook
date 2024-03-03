import React from 'react';
import { SafeAreaView, View } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { WebView } from 'react-native-webview';

const ProgInfoView = ({ content, wDim, sDim }) => {
  return (
    <SafeAreaView style = {{ flex : 1 }}>
      <View style = {{ flex : 1 }}>
            <WebView source={{ html: (content == null ? '<meta name="viewport" content="width=device-width, initial-scale=1"/><style type="text/css">* { color : black; }</style><div style="text-align : center;">No content.</div>' : '<meta name="viewport" content="width=device-width, initial-scale=1"/><style type="text/css">* { color : black; }</style>' + content) }} style = {{ width: '100%', color : 'black' }} originWhitelist={['*']} />
            {/* <RenderHtml
                source = {{ html : (content == null ? '<style type="text/css">* { color : black; }</style><div style="text-align : center;">No content.</div>' : '<style type="text/css">* { color : black; }</style>' + content) }}
                contentWidth = { wDim.width * 0.9 }
                baseStyle    = {{ color : 'black' }}
            /> */}
      </View>
    </SafeAreaView>
  );
}

export default ProgInfoView;
