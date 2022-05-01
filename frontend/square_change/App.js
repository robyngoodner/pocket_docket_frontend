import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './src/components/Home/home'
import About from './src/components/About/about';
import Login from './src/components/Login/login';
import Register from './src/components/Register/register';
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
        <Stack.Screen 
          name="Login" 
          component={Login}
          options={{ title: 'login to sQuaRe change'}} />
        <Stack.Screen 
        name="Register" 
        component={Register}
        options={{ title: 'Register for sQuaRe change'}} />
      </Stack.Navigator> 
    </NavigationContainer>
    </>
  );
}

