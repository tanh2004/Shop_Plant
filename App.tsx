import React from 'react';
import { SafeAreaView, StatusBar, Text, View } from 'react-native';
import AppNavigation from './src/navigations/AppNavigation';
import {persistor, store} from './src/redux/Store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar />
        <AppNavigation />
      </SafeAreaView>
      </PersistGate>
    </Provider>


  );
}
export default App;