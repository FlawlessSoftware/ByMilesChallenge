import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {JourneysListScreen, JourneyDetailScreen} from '../screens';
import {MainStackParamList} from './types.ts';

const Stack = createStackNavigator<MainStackParamList>();

export const MainStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Journeys">
      <Stack.Screen name="Journeys" component={JourneysListScreen} />
      <Stack.Screen
        name="JourneyDetail"
        component={JourneyDetailScreen}
        options={{presentation: 'modal'}}
      />
    </Stack.Navigator>
  );
};
