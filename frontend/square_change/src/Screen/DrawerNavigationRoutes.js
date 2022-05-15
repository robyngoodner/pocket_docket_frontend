import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from './DrawerScreens/HomeScreen';
import NewListScreen from './DrawerScreens/NewListScreen';
import AllListsScreen from './DrawerScreens/AllListsScreen';
import ListDetailScreen from './DrawerScreens/ListDetailScreen';
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

const NewListScreenStack = ({ navigation }) => {
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
                name="NewList Screen"
                component={NewListScreen}
                options={{
                    title: "New List",
                }}
            />
        </Stack.Navigator>
    );
};

const AllListsScreenStack = ({ navigation }) => {
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
                name="All Lists Screen"
                component={AllListsScreen}
                options={{
                    title: "All Lists",
                }}
            />
        </Stack.Navigator>
    );
};

const ListDetailScreenStack = ({ navigation }) => {
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
                name="List Detail Screen"
                component={ListDetailScreen}
                options={{
                    title: "List Details",
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
          options={{drawerLabel: 'Home'}}
          component={HomeScreenStack}
        />
        <Drawer.Screen
          name="NewListScreenStack"
          options={{drawerLabel: 'New List'}}
          component={NewListScreenStack}
        />
        <Drawer.Screen
          name="AllListsScreenStack"
          options={{drawerLabel: 'All Lists'}}
          component={AllListsScreenStack}
        />
        <Drawer.Screen
          name="ListDetailScreenStack"
          options={{drawerLabel: 'List Detail Screen'}}
          component={ListDetailScreenStack}
        />
        {/* <Drawer.Screen
          name="SettingScreenStack"
          options={{drawerLabel: 'Setting Screen'}}
          component={SettingScreenStack}
        /> */}
      </Drawer.Navigator>
    );
  };
   
  export default DrawerNavigatorRoutes;
  