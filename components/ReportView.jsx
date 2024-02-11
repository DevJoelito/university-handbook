import { useState, useCallback } from 'react';
import { SafeAreaView, Text, View,TextInput, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from 'react-native';

const submitReport = async (data) => {
    try {
        let response = await fetch('https://evsuhandbooksite.000webhostapp.com/sites/evsu_handbook/api/get_handbook.php?send_report=1', {
            method  : "POST",
            headers : {
                Accept         : 'application/json',
                "Content-Type" : "application/json"
            },
            body    : JSON.stringify(data)
        });

        return await response.text();
    } catch(e) {
        return '__error__';
    }
}

const ReportView = ({ wDim, sDim, navigation }) => {
    let [studentId, setStudentId] = useState('');
    let [year, setYear]           = useState('');
    let [course, setCourse]       = useState('');
    let [desc, setDesc]           = useState('');
    let [sending, setSending]     = useState(false);

    const sendData = useCallback(async () => {
        setSending(true);

        let result = await submitReport({ 
            sId     : studentId, 
            yearLvl : year, 
            course, 
            desc 
        });

        setSending(false);

        if(!desc.trim()) {
            Alert.alert('Incomplete Field', 'No description added.', [
                {
                    text    : 'OK', 
                    onPress : () => {
                        setStudentId('');
                        setYear('');
                        setCourse('');
                        setDesc('');
                    }
                }
            ]);
        } else {
            if(result == '__success__') {
                Alert.alert('Report Sent', 'Your report was successfully sent. Thank you.', [
                    {
                        text    : 'OK', 
                        onPress : () => {
                            setStudentId('');
                            setYear('');
                            setCourse('');
                            setDesc('');
                        }
                    }
                ]);
            } else {
                Alert.alert('Error', 'Your report was not sent.', [
                    {
                        text    : 'OK', 
                        onPress : () => {
                            setStudentId('');
                            setYear('');
                            setCourse('');
                            setDesc('');
                        }
                    }
                ]);
            }
        }
    }, [studentId, year, course, desc]);

    return (
        <SafeAreaView style = {{ flex : 1, position : 'relative' }}>
            <ScrollView>
                <View style = {{ position : 'absolute', display : (sending) ? 'block' : 'none', width : '100%', height : '100%', justifyContent : 'center', alignItems : 'center' }}>
                    <ActivityIndicator size="large" color="#900303" />
                </View>
                <View style = {{ padding : (wDim.width * 0.023) }}>
                    <Text style = {{ textAlign : 'center', color : 'black', fontSize : (wDim.height * 0.023) }}>
                        Welcome to our Report Page. Help us enhance your experience by providing details on any issues you've encountered or by sharing your thoughts for improvements.
                    </Text>
                </View>
                <View style = {{ padding : (wDim.width * 0.04) }}>
                    <View style = {{ display : 'flex', flexDirection : 'row', justifyContent : 'center', alignItems : 'center', marginBottom : (wDim.height * 0.04) }}>
                        <View style = {{ width : '35%'}}>
                            <Text style = {{ color : 'black', fontSize : (wDim.height * 0.023) }}>STUDENT ID: (optional)</Text>
                        </View>
                        <View style = {{ width : '65%' }}>
                            <TextInput style = {{ borderWidth : 1, height : (wDim.height * 0.05), color : 'black' }} onChangeText = { setStudentId } value = { studentId }/>
                        </View>
                    </View>
                    <View style = {{ display : 'flex', flexDirection : 'row', justifyContent : 'center', alignItems : 'center', marginBottom : (wDim.height * 0.04) }}>
                        <View style = {{ width : '35%' }}>
                            <Text style = {{ color : 'black', fontSize : (wDim.height * 0.023) }}>YEAR: (optional)</Text>
                        </View>
                        <View style = {{ width : '65%' }}>
                            <TextInput style = {{ borderWidth : 1, height : (wDim.height * 0.05), color : 'black' }} onChangeText = { setYear } value = { year }/>
                        </View>
                    </View>
                    <View style = {{ display : 'flex', flexDirection : 'row', justifyContent : 'center', alignItems : 'center', marginBottom : (wDim.height * 0.04) }}>
                        <View style = {{ width : '35%' }}>
                            <Text style = {{ color : 'black', fontSize : (wDim.height * 0.023) }}>COURSE: (optional)</Text>
                        </View>
                        <View style = {{ width : '65%' }}>
                            <TextInput style = {{ borderWidth : 1, height : (wDim.height * 0.05), color : 'black' }} onChangeText = { setCourse } value = { course }/>
                        </View>
                    </View>
                    <View style = {{ display : 'flex', flexDirection : 'row', justifyContent : 'center', marginBottom : (wDim.height * 0.04) }}>
                        <View style = {{ width : '35%' }}>
                            <Text style = {{ color : 'black', fontSize : (wDim.height * 0.023) }}>Description:</Text>
                        </View>
                        <View style = {{ width : '65%' }}>
                            <TextInput multiline = { true } style = {{ borderWidth : 1, height : (wDim.height * 0.3), color : 'black' }} textAlignVertical = 'top' onChangeText = { setDesc } value = { desc }/>
                        </View>
                    </View>
                    <View style = {{ marginTop : (wDim.height * 0.01), display : 'flex', flexDirection : 'row', justifyContent : 'center', marginBottom : (wDim.height * 0.04) }}>
                        <View style = {{ width : '35%' }}>
                        </View>
                        <View style = {{ width : '65%', display : 'flex', justifyContent : 'space-between', alignItems : 'center', flexDirection : 'row' }}>
                            <TouchableOpacity style = {{ backgroundColor : "#d9d9d9", padding : (wDim.width * 0.02), width : '45%' }} onPress = { sendData }>
                                <Text style = {{ color : 'black', fontSize: (wDim.height * 0.02), textAlign : 'center' }}>Submit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style = {{ backgroundColor : "#d9d9d9", padding : (wDim.width * 0.02), width : '45%' }} onPress = { () => navigation.goBack() }>
                                <Text style = {{ color : 'black', fontSize: (wDim.height * 0.02), textAlign : 'center' }}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default ReportView;
