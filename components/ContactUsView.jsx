import { Text, View } from 'react-native';

const ContactUsView = ({ wDim, sDim, navigation }) => {
    return (
        <View style = {{ flex : 1, padding : (wDim.width * 0.05) }}>
            <View style = {{ flex : 1,  backgroundColor : '#d9d9d9', padding : (wDim.width * 0.04), justifyContent : 'space-between' }}>
                <View>
                    <View style = {{ marginTop : (wDim.height * 0.03) }}>
                        <Text style = {{ color : 'black', fontWeight : 'bold', textAlign : 'center', fontSize : (wDim.height * 0.02) }}>Thank you for using our app!</Text>
                    </View>
                    <View style = {{ marginTop : (wDim.height * 0.03) }}>
                        <Text style = {{ color : 'black', fontWeight : 'bold', textAlign : 'center', fontSize : (wDim.height * 0.02) }}>Contact Us at:</Text>
                    </View>
                    <View style = {{ marginTop : (wDim.height * 0.05) }}>
                        <Text style = {{ color : 'black', fontWeight : 'bold', fontSize : (wDim.height * 0.02) }}>ALBERN NATHANIEL BARBAC</Text>
                        <Text style = {{ color : 'black', fontWeight : 'bold', fontSize : (wDim.height * 0.02) }}>Programmer</Text>
                        <Text style = {{ color : 'blue', fontWeight : 'bold', fontSize : (wDim.height * 0.02) }}>albernnathanielbarbac@evsu.edu.ph</Text>
                    </View>
                    <View style = {{ marginTop : (wDim.height * 0.05) }}>
                        <Text style = {{ color : 'black', fontWeight : 'bold', fontSize : (wDim.height * 0.02) }}>CHRISTINE VILLANUEVA</Text>
                        <Text style = {{ color : 'black', fontWeight : 'bold', fontSize : (wDim.height * 0.02) }}>Technical Writer</Text>
                        <Text style = {{ color : 'blue', fontWeight : 'bold', fontSize : (wDim.height * 0.02) }}>christinevillanueva@evsu.edu.ph</Text>
                    </View>
                    <View style = {{ marginTop : (wDim.height * 0.05) }}>
                        <Text style = {{ color : 'black', fontWeight : 'bold', fontSize : (wDim.height * 0.02) }}>PAULO REY CAMPOS</Text>
                        <Text style = {{ color : 'black', fontWeight : 'bold', fontSize : (wDim.height * 0.02) }}>Project Manager</Text>
                        <Text style = {{ color : 'blue', fontWeight : 'bold', fontSize : (wDim.height * 0.02) }}>pauloreycampos@evsu.edu.ph</Text>
                    </View>
                </View>
                <View style = {{ display : 'flex', flexDirection : 'row' }}>

                </View>
            </View>
        </View>
    );
}

export default ContactUsView;
