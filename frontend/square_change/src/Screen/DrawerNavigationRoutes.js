import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from './DrawerScreens/HomeScreen';
import NewListScreen from './DrawerScreens/NewListScreen';
import AllListsScreen from './DrawerScreens/AllListsScreen';
import ListDetailScreen from './DrawerScreens/ListDetailScreen';
import EditListDetailScreen from './DrawerScreens/EditListDetailScreen';
import EditItemScreen from './DrawerScreens/EditItemScreen'
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
                    title: "Pocket Docket",
                    headerLeft: () => (
                        <NavigationsDrawerHeader
                        navigationProps={navigation} />
                    ),
                    headerStyle: {
                    backgroundColor: '#DDE0DD', //Set Header color
                    },
                    headerTintColor: '#00050a', //Set Header text color
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
                backgroundColor: '#DDE0DD', //Set Header color
            },
            headerTintColor: '#00050a', //Set Header text color
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
                backgroundColor: '#DDE0DD', //Set Header color
            },
            headerTintColor: '#00050a', //Set Header text color
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
                backgroundColor: '#DDE0DD', //Set Header color
            },
            headerTintColor: '#00050a', //Set Header text color
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
                backgroundColor: '#DDE0DD', //Set Header color
            },
            headerTintColor: '#DDE0DD', //Set Header text color
            headerTitleStyle: {
                fontWeight: 'bold', //Set Header text style
            },
        }}>
            <Stack.Screen
                name="List Detail Screen"
                component={ListDetailScreen}
                options={{
                    title: "To-do list",
                }}
            />
        </Stack.Navigator>
    );
};

// const EditListDetailScreenStack = ({ navigation }) => {
//     return (
//         <Stack.Navigator
//         initialRouteName="SettingScreen"
//         screenOptions={{
//             headerLeft:() => (
//                 <NavigationsDrawerHeader navigationProps={navigation} />
//             ),
//             headerStyle: {
//                 backgroundColor: '#DDE0DD', //Set Header color
//             },
//             headerTintColor: '#DDE0DD', //Set Header text color
//             headerTitleStyle: {
//                 fontWeight: 'bold', //Set Header text style
//             },
//         }}>
//             <Stack.Screen
//                 name="Edit List Detail Screen"
//                 component={EditListDetailScreen}
//                 options={{
//                     title: "Edit List Details",
//                 }}
//             />
//         </Stack.Navigator>
//     );
// };

// const EditItemScreenStack = ({ navigation }) => {
//     return (
//         <Stack.Navigator
//         initialRouteName="SettingScreen"
//         screenOptions={{
//             headerLeft:() => (
//                 <NavigationsDrawerHeader navigationProps={navigation} />
//             ),
//             headerStyle: {
//                 backgroundColor: '#DDE0DD', //Set Header color
//             },
//             headerTintColor: '#DDE0DD', //Set Header text color
//             headerTitleStyle: {
//                 fontWeight: 'bold', //Set Header text style
//             },
//         }}>
//             <Stack.Screen
//                 name="Edit Item Screen"
//                 component={EditItemScreen}
//                 options={{
//                     title: "Edit Item",
//                 }}
//             />
//         </Stack.Navigator>
//     );
// };

const DrawerNavigatorRoutes = (props) => {
    return (
      <Drawer.Navigator
        screenOptions={{
          activeTintColor: '#cee1f2',
          color: '#cee1f2',
          itemStyle: {marginVertical: 5, color: 'white'},
          labelStyle: {
            color: '#d8d8d8',
          },
          headerShown: false
        }}
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
          name="EditListDetailScreenStack"
          options={{drawerLabel: 'Edit List Detail Screen'}}
          component={EditListDetailScreenStack}
        />
        <Drawer.Screen
          name="EditItemScreenStack"
          options={{drawerLabel: 'Edit Item Screen'}}
          component={EditItemScreenStack}
        /> */}
        {/* <Drawer.Screen
          name="SettingScreenStack"
          options={{drawerLabel: 'Setting Screen'}}
          component={SettingScreenStack}
        /> */}
      </Drawer.Navigator>
    );
  };
   
  export default DrawerNavigatorRoutes;
  