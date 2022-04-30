import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '../Home/home'
import { About } from '../About/about'

const Stack = createNativeStackNavigator();

const MyStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                name="Home"
                component={Home}
                options={{title: 'Welcome'}}
                />
                <Stack.Screen
                name="About"
                component={About}
                options={{title: 'About'}}
                />
            </Stack.Navigator>

        </NavigationContainer>
    )

}