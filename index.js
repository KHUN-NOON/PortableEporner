/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import 'react-native-gesture-handler'
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import store, {persistor} from './src/store/store';
import { PersistGate } from 'redux-persist/integration/react';

const Main = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App/>
            </PersistGate>
        </Provider>
    )
}

AppRegistry.registerComponent(appName, () => Main);
