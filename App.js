import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, StatusBar } from 'react-native';
import Gallery from './src/screens/Gallery';
import ImageDetail from './src/screens/ImageDetail';
import { colors } from './src/colors/Colors';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View style={{flex:1}}>
      <StatusBar 
        animated={true}
        barStyle= "light-content"
        backgroundColor={colors.darkGreen}
      />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='gallery'
            component={Gallery}
            options={{headerShown:false}}
          />
          <Stack.Screen
            name='details'
            component={ImageDetail}
            options={{headerShown:false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}