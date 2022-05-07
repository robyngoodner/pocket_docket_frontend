import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {AuthProvider} from './src/api/AuthContext';
import {AxiosProvider} from './src/api/AxiosContext';

import App from './index'
import React from 'react';

const Root = () => {
    return (
        <AuthProvider>
            <AxiosProvider>
                <App />
            </AxiosProvider>
        </AuthProvider>
    );
};

AppRegistry.registerComponent(appName, () => Root);