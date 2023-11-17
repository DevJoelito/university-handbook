import { Text, View, TouchableOpacity } from 'react-native';


const Events = ({ navigation }) => {
  return (
    <View>
      <TouchableOpacity onPress = { () => navigation.navigate('MainView') }>
        <Text style = {{ color : 'black' }}>Events</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Events;
