/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {MainStackNavigator} from './navigation/MainStackNavigator.tsx';
import {SafeAreaProvider} from 'react-native-safe-area-context';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <MainStackNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
