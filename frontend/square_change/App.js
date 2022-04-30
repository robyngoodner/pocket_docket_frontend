import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './components/Home/home'
import About from './components/About/about'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={Home}
          options={{ title: 'sQuaRe change'}}
          />
        <Stack.Screen 
          name="About" 
          component={About}
          options={{ title: 'about sQuaRe change'}} />
      </Stack.Navigator> 
    </NavigationContainer>
    </>
  );
}

