import React, {useEffect, useState} from 'react';
import {format} from 'date-fns';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ListRenderItem,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import JourneysApiService from '../../services/JourneysApiService';
import {ApiResponse, Day, Journey} from '../../types/JourneyTypes';
import {CalendarDayComponent} from '../../components';
import {formatCurrency} from '../../utils';
import {MainStackParamList} from '../../navigation/types.ts';

const {width: screenWidth} = Dimensions.get('window'); // Get the screen width
const numColumns = 3; // Number of columns for the grid
const cardPadding = 20; // Total padding for the day card
const itemSpacing = 10; // Spacing between items and from the card sides
const calendarDaySize = 100; // Size of the calendar day component
const calendarDayPadding = 10; // Padding for the calendar day component
const journeyButtonWidth =
  (screenWidth -
    calendarDayPadding * 2 -
    cardPadding -
    itemSpacing * (numColumns + 1) -
    calendarDaySize) /
  numColumns;

export const JourneysListScreen: React.FC = () => {
  const [data, setData] = useState<ApiResponse>({days: {}, top: 0, bottom: 0});
  const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();
  useEffect(() => {
    const fetchData = async () => {
      const journeys = await JourneysApiService.getJourneys();
      setData(journeys);
    };

    void fetchData();
  }, []);

  const onJourneyPress = (journey: Journey) => {
    navigation.navigate('JourneyDetail', {journey});
  };

  const renderJourney = ({item: journey}: {item: Journey}) => {
    // Parse the start_date to get the Date object
    const startDate = new Date(journey.start_date);
    // Format the Date object to a time string
    const journeyTime = format(startDate, 'HH:mm');

    return (
      <View style={styles.journeyItemContainer}>
        <TouchableOpacity
          style={styles.journeyItem}
          onPress={() => onJourneyPress(journey)}>
          <Text style={styles.distanceLabel}>{journey.distance} miles</Text>
          <View style={styles.timeTag}>
            <Text style={styles.timeTagText}>{journeyTime}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderDay: ListRenderItem<Day> = ({item: day}) => (
    <View style={styles.dayCard}>
      <View style={styles.contentWrapper}>
        <View>
          <CalendarDayComponent date={day.date} size={calendarDaySize} />
          <Text style={styles.costLabel}>
            {`Total Cost:\n${formatCurrency(day.total_cost)}`}
          </Text>
        </View>
        <View style={styles.rightContentWrapper}>
          <FlatList<Journey>
            data={day.items}
            renderItem={renderJourney}
            keyExtractor={item => item.id.toString()}
            numColumns={3} // Set the number of columns for the grid
          />
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList<Day>
        showsVerticalScrollIndicator={false}
        data={data?.days ? Object.values(data.days) : []}
        renderItem={renderDay}
        keyExtractor={day => day?.unix.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  dayCard: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'grey',
    margin: 5,
    padding: 10,
  },
  journeyItem: {
    width: journeyButtonWidth,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 8,
    padding: 10,
    marginRight: itemSpacing,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  journeyItemContainer: {
    marginBottom: 10,
    alignItems: 'center',
  },
  timeTag: {
    position: 'absolute',
    top: 0,
    left: 0,
    borderTopLeftRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: 'black',
    padding: 5,
  },
  timeTagText: {
    color: 'white',
    fontSize: 9,
  },
  distanceLabel: {marginTop: 15, fontSize: 12, textAlign: 'center'},
  costLabel: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  contentWrapper: {flexDirection: 'row'},
  rightContentWrapper: {marginLeft: 10},
});
