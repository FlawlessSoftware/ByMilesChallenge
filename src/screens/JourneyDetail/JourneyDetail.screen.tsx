import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import MapView, {Marker} from 'react-native-maps';
import {format} from 'date-fns';

import {MainStackParamList} from '../../navigation/types.ts';
import {DetailInformationComponent} from './components';
import {formatCurrency} from '../../utils';

export const JourneyDetailScreen: React.FC = () => {
  const mapRef = React.useRef<MapView>(null);
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.fitToSuppliedMarkers(['start', 'end'], {
        edgePadding: {top: 100, right: 100, bottom: 100, left: 100},
        animated: true,
      });
    }
  }, []);

  const route = useRoute<RouteProp<MainStackParamList, 'JourneyDetail'>>();
  const journey = route.params.journey;
  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: journey.location.coordinates[1],
          longitude: journey.location.coordinates[0],
          latitudeDelta: 0.1,
          longitudeDelta: 0.05,
        }}>
        <Marker
          identifier={'start'}
          coordinate={{
            latitude: journey.start.coordinates[1],
            longitude: journey.start.coordinates[0],
          }}
          title={journey.start.longName}
        />
        <Marker
          identifier={'end'}
          coordinate={{
            latitude: journey.end.coordinates[1],
            longitude: journey.end.coordinates[0],
          }}
          title={journey.end.longName}
        />
      </MapView>
      <View style={styles.informationWrapper}>
        <DetailInformationComponent
          label="Start Location"
          value={journey.start.longName}
        />
        <DetailInformationComponent
          label="End Location"
          value={journey.end.longName}
        />
        <DetailInformationComponent
          label="Start Time"
          value={format(journey.start_date, 'HH:mm')}
        />
        <DetailInformationComponent
          label="End Time"
          value={format(journey.end_date, 'HH:mm')}
        />
        <DetailInformationComponent
          label="Distance"
          value={`${journey.distance} miles`}
        />
        <DetailInformationComponent
          label="Average Speed"
          value={`${journey.avg_speed_mph} miles`}
        />
        <DetailInformationComponent
          label="Max Speed"
          value={`${journey.max_speed_mph} miles`}
        />
        <DetailInformationComponent
          label="Per Mile rate"
          value={`${journey.per_mile_rate} £ per mile`}
        />
      </View>
      <Text style={styles.costLabel}>{formatCurrency(journey.cost)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {width: '100%', height: 300},
  informationWrapper: {padding: 10},
  costLabel: {fontSize: 51, fontWeight: 'bold', alignSelf: 'center'},
});
