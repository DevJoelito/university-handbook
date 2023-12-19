import React, { useEffect, useState, useCallback } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, Text, View, RefreshControl } from 'react-native';
import HandBookChapterCon from './sub/HandBookChapterCon';
import * as RNFS from 'react-native-fs';

const ArticleView = ({ navigation, sDim, wDim }) => {  
  return (
    <SafeAreaView style = {{ flex : 1 }}>
      <View style = {{ 
        paddingTop   : (sDim.width * 0.04), 
        paddingLeft  : (sDim.width * 0.01), 
        paddingRight : (sDim.width * 0.01),
        flex         : 1 }}>
        {
          (!chapterNames.length) ? 
          <View style = {{
            flex           : 1,
            justifyContent : 'center', 
            alignItems     : 'center'
          }}>
            <ActivityIndicator size="large" color="#900303" />
          </View> 
          :
          (chapterNames[0].chap === 0) ? 
          <View>
            <Text style = {{ textAlign : 'center', color : 'black', fontWeight : 'bold', fontSize: 18 }}>Something went wrong.</Text>
          </View> 
          : 
          ((chapterNames[0].chap == 'no_chapters')) ? 
          <View>
            <Text style = {{ textAlign : 'center', color : 'black', fontWeight : 'bold', fontSize: 18 }}>No chapter found.</Text>
          </View>
          :
          <FlatList
            data       = { chapterNames }
            renderItem = { ({ item }) => { return (<HandBookChapterCon 
                                                    navigation = { navigation }
                                                    title      = { item.chap_name }
                                                    chapId     = { item.chap }
                                                    sDim       = { sDim }
                                                    wDim       = { wDim } />)} }
            refreshControl = { <RefreshControl refreshing = { refresh } onRefresh = { refreshList } /> }
          />
          
        }
      </View>
    </SafeAreaView>
  );
}

export default ArticleView;
