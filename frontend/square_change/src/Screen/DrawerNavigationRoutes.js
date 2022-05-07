import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from './DrawerScreens/HomeScreen';
import SettingsScreen from './DrawerScreens/SettingsScreen';
import CustomSideBarMenu from './Components/CustomSidebarMenu';
import NavigationsDrawerHeader from './Components/NavigationsDrawerHeader'

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeScreenStack = ({ navigation }) => {
    return (
        <Stack.Navigator initialRouteName="HomeScreen">
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    title: "sQuaRe change",
                    headerLeft: () => (
                        <NavigationsDrawerHeader
                        navigationProps={navigation} />
                    ),
                    headerStyle: {
                    backgroundColor: '#E7EBEF', //Set Header color
                    },
                    headerTintColor: 'black', //Set Header text color
                    headerTitleStyle: {
                        fontWeight: 'bold', //Set Header text style
                    },
                }}
            />

        </Stack.Navigator>
    )
};

const SettingScreenStack = ({ navigation }) => {
    return (
        <Stack.Navigator
        initialRouteName="SettingScreen"
        screenOptions={{
            headerLeft:() => (
                <NavigationsDrawerHeader navigationProps={navigation} />
            ),
            headerStyle: {
                backgroundColor: '#307ecc', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
                fontWeight: 'bold', //Set Header text style
            },
        }}>
            <Stack.Screen
                name="SettingsScreen"
                component={SettingsScreen}
                options={{
                    title: "Settings",
                }}
            />
        </Stack.Navigator>
    );
};

const DrawerNavigatorRoutes = (props) => {
    return (
      <Drawer.Navigator
        drawerContentOptions={{
          activeTintColor: '#cee1f2',
          color: '#cee1f2',
          itemStyle: {marginVertical: 5, color: 'white'},
          labelStyle: {
            color: '#d8d8d8',
          },
        }}
        screenOptions={{headerShown: false}}
        drawerContent={CustomSideBarMenu}>
        <Drawer.Screen
          name="HomeScreenStack"
          options={{drawerLabel: 'Home Screen'}}
          component={HomeScreenStack}
        />
        <Drawer.Screen
          name="SettingScreenStack"
          options={{drawerLabel: 'Setting Screen'}}
          component={SettingScreenStack}
        />
      </Drawer.Navigator>
    );
  };
   
  export default DrawerNavigatorRoutes;
  