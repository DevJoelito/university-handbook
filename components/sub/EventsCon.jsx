import { Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp';
import FastImage from 'react-native-fast-image';

const EventsCon = ({ wDim, sDim, item }) => {
    let [down, setDown] = useState(false);
    let [show, setShow] = useState(false);

    return (
        <View style = {{ marginBottom : (wDim.height * 0.02) }}>
            <View style = {{ width : '100%', backgroundColor : 'white', borderRadius : 5 }}>
                <View style = {{ height : (wDim.height * 0.20) }}>
                    <FastImage
                        style={{ width: '100%', height : '100%' }}
                        source={{ uri: item.event_img }}
                    />
                </View>
                <View>
                    <View style = {{ display : 'flex', flexDirection : 'row', justifyContent : 'space-between', alignItems : 'center', padding : (wDim.width * 0.015) }}>
                    <Text style = {{ 
                        color      : 'black', 
                        fontSize   : (wDim.height * 0.025), 
                        fontWeight : 'bold' }}>{ item.name }</Text>
                    <View style = {{ display : 'flex', justifyContent : 'center', alignItems : 'center', flexDirection : 'row' }}>
                        <Text style = {{ 
                        color      : 'black', 
                        fontSize   : (wDim.height * 0.02),
                        marginTop  : 'auto' }}>{ item.date_start }</Text> 
                        <TouchableOpacity style = {{ display : 'flex', justifyContent : 'center', alignItems : 'center', paddingLeft : (wDim.width * 0.02), paddingRight : (wDim.width * 0.02) }} onPress = { () => {setDown(!down); setShow(!show)} }> 
                        {
                            (down) ?
                            <FontAwesomeIcon icon={ faChevronUp } size = { sDim.height * 0.022 } color = 'black' />
                            :
                            <FontAwesomeIcon icon={ faChevronDown } size = { sDim.height * 0.022 } color = 'black' />
                        }
                        </TouchableOpacity>
                    </View>
                    </View>
                    <View style = {{ display : ((show) ? "block" : "none"), padding : (wDim.width * 0.03) }}>
                    <Text style = {{ color : 'black' }}>{ item.description }</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default EventsCon;
