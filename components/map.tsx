import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import MapView, { Marker,Circle } from 'react-native-maps';

// 例としてのAPIコール関数（実際のAPIエンドポイントに置き換えてください）
const fetchCoordinates = async () => {
  return {
    latitude: 35.6895,
    longitude: 139.6917
  };
};

const App = () => {
  const [region, setRegion] = useState({
    latitude: 37.78825, // 初期値
    longitude: -122.4324, // 初期値
    latitudeDelta: 0.00422,
    longitudeDelta: 0.00421
  });

  const setL = () =>{
    setRegion({
      latitude:35.63246781969533, 
      longitude: 139.88031655987018,
      latitudeDelta: region.latitudeDelta,
      longitudeDelta: region.longitudeDelta
    })
  }

  useEffect(() => {
    const getCoordinates = async () => {
      try {
        const coords = await fetchCoordinates();
        setRegion({
          ...region,
          latitude: coords.latitude,
          longitude: coords.longitude
        });
      } catch (error) {
        console.error('Error fetching coordinates:', error);
      }
    };

    getCoordinates();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
      >
      </MapView>
      <Button title='PRESS ME!!!!!' onPress={setL}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default App;
