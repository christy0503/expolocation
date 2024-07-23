import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, PanResponder,TouchableOpacity,Switch,TextInput,Keyboard,Dimensions,Button,Alert, LogBox} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import MapView, { Marker } from 'react-native-maps';




interface SwipeToggleButtonProps {
  label: string;
}

const SwipeToggleButton: React.FC<SwipeToggleButtonProps> = ({ label }) => {
  const [isOn, setIsOn] = useState(false);
  const [position] = useState(new Animated.ValueXY());

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, { dx: position.x }], { useNativeDriver: false }),
    onPanResponderRelease: (e, gesture) => {
      if (gesture.dx > 25) { // Adjusted threshold for smaller button
        Animated.spring(position.x, {
          toValue: 25,
          useNativeDriver: false,
        }).start(() => {
          setIsOn(true);
        });
      } else {
        Animated.spring(position.x, {
          toValue: 0,
          useNativeDriver: false,
        }).start(() => {
          setIsOn(false);
        });
      }
    },
  });

  // return (
  //   <View style={styles.switchWrapper}>
  //     <Text style={styles.label}>{label}</Text>
  //     <View style={styles.switchContainer}>
  //       <Animated.View
  //         style={[styles.switch, position.getLayout()]}
  //         {...panResponder.panHandlers}
  //       />
  //     </View>
  //   </View>
  // );
};

const fetchCoordinates = async () => {
  return {
    latitude: 35.6895,
    longitude: 139.6917
  };
};

const App: React.FC = () => {
  const [isAlarmOn, setIsAlarmOn] = useState(false);
  const [isNotificationOn, setIsNotificationOn] = useState(false);
  const [selectedSound, setSelectedSound] = useState('');
  const [selectedProblems, setSelectedProblems] = useState(0);
  const toggleAlarmSwitch = () => setIsAlarmOn(previousState => !previousState);
  const toggleNotificationSwitch = () => setIsNotificationOn(previousState => !previousState);
  const distance = () => {
    Alert.alert('固定ボタンが押されました');
  };
  const distance1 = () => {
    Alert.alert('固定ボタンが押されました');
  };const distance3 = () => {
    Alert.alert('固定ボタンが押されました');
  };const distance5 = () => {
    Alert.alert('固定ボタンが押されました');
  };
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

  return (
      <View style={styles.container}>
          <View style={styles.distance}>
        <View style={styles.distanceButton}>
          <Button title="500m" onPress={distance} color="#459554" />
        </View>
        <View style={styles.distanceButton}>
          <Button title="1km" onPress={distance1} color="#459554" />
        </View>
        <View style={styles.distanceButton}>
          <Button title="3km" onPress={distance3} color="#459554" />
        </View>
        <View style={styles.distanceButton}>
          <Button title="5km" onPress={distance5} color="#459554" />
        </View>
      </View>
      <View style={styles.alarmContainer}>
        <Text style={styles.alarmText}>アラーム音の選択</Text>
        <Picker
          selectedValue={selectedSound}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedSound(itemValue)}
        >
          <Picker.Item label="Sound 1" value="sound1" />
          <Picker.Item label="Sound 2" value="sound2" />
          <Picker.Item label="Sound 3" value="sound3" />
        </Picker>
      </View>

      <View style={styles.alarmContainer}>
        <Text style={styles.alarmText}>計算問題数の選択</Text>
        <Picker
          selectedValue={selectedProblems}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedProblems(itemValue)}
        >
          <Picker.Item label="0" value={0} />
          <Picker.Item label="1" value={1} />
          <Picker.Item label="3" value={3} />
          <Picker.Item label="5" value={5} />
        </Picker>
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
        <Text style={styles.alarmText}>おきにいり登録</Text>
        <Switch
          trackColor={{ false: "#ffffff", true: "#4ed164" }}
          thumbColor={isNotificationOn ? "#ffffff" : "#ffffff"}
          ios_backgroundColor="#ffffff"
          onValueChange={toggleNotificationSwitch}
          value={isNotificationOn}
        />
      </View>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"#fff"
  },
  switchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
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
    backgroundColor: '#ddd',
    justifyContent: 'center',
    padding: 3,
  },
  switch: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  pickerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 50,
  },
  picker: {
    // height: 30,
    // width: 100,
    flex: 1, // Picker 组件占据剩余空间
    marginLeft: 10, // 左侧间距
    
  },
  alarmContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#459554',
    borderRadius: 10,
    padding: 10,
    width: '80%',
  },
  alarmText: {
    fontSize: 14,
    marginRight: 'auto',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    width: 'auto',
    height: '35%',
    marginTop: '32%',
  },
  distance:{
    justifyContent: 'center',
    flexDirection: 'row', // 横並びにするための指定

  },
  distanceButton: {
    margin: 10,
  },
});

export default App;
