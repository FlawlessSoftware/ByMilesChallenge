import React from 'react';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import {JourneysListScreen} from './JourneysList.screen.tsx';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import JourneysApiService from '../../services/JourneysApiService';
import {mockApiResponse} from '../../../__mocks__/JourneysApiService.ts';

const mockNavigate = jest.fn();
jest.mock('../../services/JourneysApiService');
jest.mock(
  '@react-navigation/stack/lib/commonjs/views/GestureHandlerNative',
  () => {
    const RN = require('react-native');
    return {
      PanGestureHandler: RN.View,
      GestureHandlerRootView: RN.View,
    };
  },
);
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNavigate, // Mock navigate function
    }),
  };
});

const Stack = createStackNavigator();

const component = (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="JourneysList" component={JourneysListScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

describe('JourneysListScreen Tests', () => {
  it('fetches journeys and renders them correctly', async () => {
    (JourneysApiService.getJourneys as jest.Mock).mockResolvedValueOnce(
      mockApiResponse,
    );

    const {getByText} = render(component);

    await waitFor(() => {
      expect(getByText('60 miles')).toBeTruthy();
    });
  });

  it('it navigates to the journey detail screen passing the right object', async () => {
    (JourneysApiService.getJourneys as jest.Mock).mockResolvedValueOnce(
      mockApiResponse,
    );

    const {getByText} = render(component);

    await waitFor(() => {
      const journeyItem = getByText('60 miles');
      fireEvent.press(journeyItem);
      expect(mockNavigate).toHaveBeenCalledWith('JourneyDetail', {
        journey: mockApiResponse.days['2021-01-01'].items[0],
      });
    });
  });
});
