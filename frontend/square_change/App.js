// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
// import Home from './src/components/Home/home'
// import About from './src/components/About/about';
// import Login from './src/components/Login/login';
// import Register from './src/components/Register/register';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// const Stack = createNativeStackNavigator();

// export default function App() {
//   return (
//     <>
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen 
//           name="Home" 
//           component={Home}
//           options={{ title: 'sQuaRe change'}}
//           />
//         <Stack.Screen 
//           name="About" 
//           component={About}
//           options={{ title: 'about sQuaRe change'}} />
//         <Stack.Screen 
//           name="Login" 
//           component={Login}
//           options={{ title: 'login to sQuaRe change'}} />
//         <Stack.Screen 
//         name="Register" 
//         component={Register}
//         options={{ title: 'Register for sQuaRe change'}} />
//       </Stack.Navigator> 
//     </NavigationContainer>
//     </>
//   );
// }

// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/
import 'react-native-gesture-handler';
 
// Import React and Component
import React, {useEffect, useCallback, useContext, useState} from 'react';
import {AuthContext, AuthProvider} from './src/api/AuthContext';
import { AxiosProvider } from './src/api/AxiosContext';
import * as Keychain from 'react-native-keychain';
 
// Import Navigators from React Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
 
// Import Screens
import SplashScreen from './src/Screen/SplashScreen';
import LoginScreen from './src/Screen/LoginScreen';
import RegisterScreen from './src/Screen/RegisterScreen';
import DrawerNavigationRoutes from './src/Screen/DrawerNavigationRoutes';
import DonorHome from './src/Screen/DonorHome/donorHome'
 
const Stack = createStackNavigator();
 
const Auth = () => {
  const authContext = useContext(AuthContext);
  const [status, setStatus] = useState('loading');

  const loadJWT = useCallback(async () => {
    try {
      const value = await Keychain.getGenericPassword();
      const jwt = JSON.parse(value.password);

      authContext.setAuthState({
        accessToken: jwt.accessToken || null,
        refreshToken: jwt.refreshToken || null,
        authenticated: jwt.accessToken !== null,
      });
      setStatus('success');
    } catch (error) {
      setStatus('error');
      console.log(`Keychain Error: ${error.message}`);
      authContext.setAuthState({
        accessToken: null,
        refreshToken: null,
        authenticated: false,
      });
    }
  }, []);

  useEffect(() => {
    loadJWT();
  }, [loadJWT]);


  if (authContext?.authState?.authenticated === false) {

  // Stack Navigator for Login and Sign up Screen
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          title: 'Register', //Set Header Title
          headerStyle: {
            backgroundColor: '#307ecc', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
      } else {
        return <DonorHome />
      }
};
 
const App = () => {

  return (
    <AuthProvider>
            <AxiosProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        {/* SplashScreen which will come once for 5 Seconds */}
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          // Hiding header for Splash Screen
          options={{headerShown: false}}
        />
        {/* Auth Navigator: Include Login and Signup */}
        
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{headerShown: false}}
        />
        {/* Navigation Drawer as a landing page */}
        <Stack.Screen
          name="DrawerNavigationRoutes"
          component={DrawerNavigationRoutes}
          // Hiding header for Navigation Drawer
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
            </AxiosProvider>
        </AuthProvider>
  );
};
 
export default App;
