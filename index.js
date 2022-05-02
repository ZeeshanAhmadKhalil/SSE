import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import persistStore from 'redux-persist/es/persistStore';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import { name as appName } from './app.json';
import store from './Src/Store';

let persistor = persistStore(store);

const AppRedux = () => (
    <Provider {...{ store }}>
        <PersistGate loading={null} persistor={persistor}>
            <PaperProvider>
                <App />
            </PaperProvider>
        </PersistGate>
    </Provider>
);

AppRegistry.registerComponent(appName, () => AppRedux);
