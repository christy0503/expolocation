import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Switch, Button, Alert,TouchableOpacity } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import MapView, { Circle } from "react-native-maps";
import useStationStore from "@/utils/store";
import * as Location from 'expo-location'; 
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import { Audio } from 'expo-av';
import { router } from "expo-router";



const soundFiles = {
  "sound1.mp3": require('../../assets/sounds/sound1.mp3'),
  "sound2.mp3": require('../../assets/sounds/sound2.mp3'),
  "sound3.mp3": require('../../assets/sounds/sound3.mp3'),
  "sound4.mp3": require('../../assets/sounds/sound4.mp3'),
  "sound5.mp3": require('../../assets/sounds/sound5.mp3'),
};

const AlarmPicker = () => {
  const [selectedSound, setSelectedSound] = useState(null);
  const [sound, setSound] = useState<Audio.Sound | undefined>(undefined);

  const playSound = async (soundFile) => {
    const { sound } = await Audio.Sound.createAsync(soundFiles[soundFile]);
    setSound(sound);
    await sound.playAsync();
  };

  const handleValueChange = async (value) => {
    setSelectedSound(value);
    if (sound) {
      await sound.unloadAsync();
    }
    playSound(value);
  };

  return (
    <View style={styles.alarmContainer}>
      <Text style={styles.alarmText}>アラーム音の選択</Text>
      <RNPickerSelect
        onValueChange={handleValueChange}
        items={[
          { label: "Sound1", value: "sound1.mp3" },
          { label: "Sound2", value: "sound2.mp3" },
          { label: "Sound3", value: "sound3.mp3" },
          { label: "Sound4", value: "sound4.mp3" },
          { label: "上がり激しくなるアラーム音", value: "sound5.mp3" },
        ]}
      />
    </View>
  );
};

const App = () => {
  const [isAlarmOn, setIsAlarmOn] = useState(false);
  const [isNotificationOn, setIsNotificationOn] = useState(false);
  const [selectedSound, setSelectedSound] = useState("");
  const [selectedProblems, setSelectedProblems] = useState(0);
  const { stationInfo } = useStationStore();
  const [circleRadius, setCircleRadius] = useState(0);
  const [region, setRegion] = useState({
    latitude: stationInfo ? stationInfo.y : 37.78825, 
    longitude: stationInfo ? stationInfo.x : -122.4324, 
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [userLocation, setUserLocation] = useState(null);
  const [isTracking, setIsTracking] = useState(true); 

  useEffect(() => {
    if (isTracking) {
      const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission to access location was denied');
          return;
        }
        const location = await Location.getCurrentPositionAsync({});
        setUserLocation(location.coords);
      };

      const interval = setInterval(() => {
        getLocation(); // ユーザ位置情報
        if (userLocation) {
          checkIfInsideCircle(); 
        }
      }, 1000); 

      return () => clearInterval(interval);
    }
  }, [isTracking, userLocation, region, circleRadius]);

  const setRadius = (radius) => {
    Alert.alert(`${radius} メートル`);
    const scaleFactor = 0.00002;
    setCircleRadius(radius);
    setRegion({
      ...region,
      latitudeDelta: radius * scaleFactor,
      longitudeDelta: radius * scaleFactor,
    });
  };

  const checkIfInsideCircle = () => {
    if (!userLocation || !isTracking) return; // 如果沒有用戶位置或檢查已經停止，則返回
    const distance = getDistance(
      { latitude: region.latitude, longitude: region.longitude },
      { latitude: userLocation.latitude, longitude: userLocation.longitude }
    );
    if (distance <= circleRadius) {
      // 停止進一步的檢查
      setIsTracking(false);
      router.push("/problem"); // 導航到 /problem 頁面
    }
  };

  const getDistance = (point1, point2) => {
    const toRad = (value) => value * Math.PI / 180;
    const lat1 = point1.latitude;
    const lon1 = point1.longitude;
    const lat2 = point2.latitude;
    const lon2 = point2.longitude;
    const R = 6371000; // 地球の半径 (米)

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const toggleAlarmSwitch = () => setIsAlarmOn((previousState) => !previousState);
  const toggleNotificationSwitch = () => setIsNotificationOn((previousState) => !previousState);

  const startTracking = () => {
    setIsTracking(true);
    Alert.alert('Started tracking your location.');
  };

  return (
    <View style={styles.container}>
      <View style={styles.distance}>
        <View style={styles.distanceButton}>
          <Button title="500m" onPress={() => setRadius(500)} color="#459554" />
        </View>
        <View style={styles.distanceButton}>
          <Button title="1km" onPress={() => setRadius(1000)} color="#459554" />
        </View>
        <View style={styles.distanceButton}>
          <Button title="3km" onPress={() => setRadius(3000)} color="#459554" />
        </View>
        <View style={styles.distanceButton}>
          <Button title="5km" onPress={() => setRadius(5000)} color="#459554" />
        </View>
      </View>
      <MapView style={styles.map} region={region}>
        {circleRadius > 0 && (
          <Circle
            center={{ latitude: region.latitude, longitude: region.longitude }}
            radius={circleRadius}
            strokeColor="rgba(0,0,255,0.5)"
            fillColor="rgba(0,0,255,0.1)"
          />
        )}
      </MapView>
      <AlarmPicker />
      <View style={styles.alarmContainer}>
        <Text style={styles.alarmText}>計算問題数の選択</Text>
        <RNPickerSelect
          onValueChange={(value) => setSelectedProblems(value)}
          items={[
            { label: "0", value: "0" },
            { label: "1", value: "1" },
            { label: "3", value: "3" },
            { label: "5", value: "5" },
          ]}
        />
      </View>
      <View style={styles.alarmContainer}>
        <Text style={styles.alarmText}>自動アラーム</Text>
        <Switch
          trackColor={{ false: "#ffffff", true: "#4ed164" }}
          thumbColor={isAlarmOn ? "#ffffff" : "#ffffff"}
          ios_backgroundColor="#ffffff"
          onValueChange={toggleAlarmSwitch}
          value={isAlarmOn}
        />
      </View>
      <View style={styles.alarmContainer}>
        <Text style={styles.alarmText}>お気に入り登録</Text>
        <Switch
          trackColor={{ false: "#ffffff", true: "#4ed164" }}
          thumbColor={isNotificationOn ? "#ffffff" : "#ffffff"}
          ios_backgroundColor="#ffffff"
          onValueChange={toggleNotificationSwitch}
          value={isNotificationOn}
        />
      </View>
      <View style={styles.startButton}>
        <TouchableOpacity style={styles.startButtonContent} onPress={startTracking}>
          <Icon name="alarm" size={20} color="#fff" style={styles.icon} />
          <Text style={styles.startButtonText}>START</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  switchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    marginRight: 10,
  },
  switchContainer: {
    width: 50,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#ddd",
    justifyContent: "center",
    padding: 3,
  },
  switch: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  pickerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 50,
  },
  picker: {
    flex: 1,
    marginLeft: 10,
  },
  alarmContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#459554",
    borderRadius: 10,
    padding: 10,
    width: "80%",
  },
  alarmText: {
    fontSize: 14,
    marginRight: "auto",
  },
  map: {
    width: "100%",
    height: "35%",
  },
  distance: {
    justifyContent: "center",
    flexDirection: "row",
  },
  distanceButton: {
    margin: 10,
  },
  startButton: {
    borderRadius: 20,
    backgroundColor: "#459554",
    margin: 10,
    width: 120,
    alignItems: 'center',
  },
  startButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  startButtonText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 5,
  },
  icon: {
    marginRight: 5,
  },
});

export default App;
