import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface CalendarDayComponentProps {
  date: string;
  size?: number;
}

export const CalendarDayComponent: React.FC<CalendarDayComponentProps> = ({
  date,
  size,
}) => {
  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = dateObj.toLocaleString('default', {month: 'long'});
  const year = dateObj.getFullYear();

  return (
    <View style={[styles.card, {width: size, height: size}]}>
      <View style={styles.monthSection}>
        <Text style={styles.monthText}>{month.toUpperCase()}</Text>
      </View>
      <View style={styles.daySection}>
        <Text style={styles.dayText}>{day}</Text>
      </View>
      <View style={styles.yearSection}>
        <Text style={styles.yearText}>{year}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#D32F2F',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthSection: {
    backgroundColor: '#2979FF',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    padding: 2,
    width: '100%',
    alignItems: 'center',
  },
  monthText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  daySection: {
    marginVertical: 5,
  },
  dayText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 24,
  },
  yearSection: {
    paddingBottom: 5,
  },
  yearText: {
    color: '#FFF',
    fontSize: 16,
  },
});
