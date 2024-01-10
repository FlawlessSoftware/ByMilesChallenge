import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface DetailInformationComponentProps {
  label: string;
  value: string;
}

export const DetailInformationComponent: React.FC<
  DetailInformationComponentProps
> = ({label, value}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{`${label}:`}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flexDirection: 'row'},
  label: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  value: {marginLeft: 5},
});
