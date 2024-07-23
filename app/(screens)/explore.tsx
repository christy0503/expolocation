import React, { useState } from "react";
import { View, Text, StyleSheet, Switch, Button, Alert } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import MapView, { Marker } from "react-native-maps";
import useStationStore from "@/utils/store";

const App: React.FC = () => {
  const [isAlarmOn, setIsAlarmOn] = useState(false);
  const [isNotificationOn, setIsNotificationOn] = useState(false);
  const [selectedSound, setSelectedSound] = useState("");
  const [selectedProblems, setSelectedProblems] = useState(0);
  const { stationInfo } = useStationStore();
  const toggleAlarmSwitch = () =>
    setIsAlarmOn((previousState) => !previousState);
  const toggleNotificationSwitch = () =>
    setIsNotificationOn((previousState) => !previousState);
  const distance = () => {
    Alert.alert("固定ボタンが押されました");
  };
  const distance1 = () => {
    Alert.alert("固定ボタンが押されました");
  };
  const distance3 = () => {
    Alert.alert("固定ボタンが押されました");
  };
  const distance5 = () => {
    Alert.alert("固定ボタンが押されました");
  };
  const region = {
    latitude: stationInfo ? stationInfo.y : 37.78825, // 初期値
    longitude: stationInfo ? stationInfo.x : -122.4324, // 初期値
    latitudeDelta: 0.00422,
    longitudeDelta: 0.00421,
  };

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
      <MapView style={styles.map} region={region}></MapView>
      <View style={styles.alarmContainer}>
        <Text style={styles.alarmText}>アラーム音の選択</Text>
        <RNPickerSelect
          onValueChange={(value) => setSelectedSound(value)}
          items={[
            { label: "Sound1", value: "sound1" },
            { label: "Sound2", value: "sound2" },
            { label: "Sound3", value: "sound3" },
          ]}
        />
      </View>
      <View style={styles.alarmContainer}>
        <Text style={styles.alarmText}>計算問題数の選択</Text>
        <RNPickerSelect
          onValueChange={(value) => setSelectedProblems(value)}
          items={[
            { label: "1", value: "1" },
            { label: "2", value: "" },
            { label: "3", value: "3" },
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
        <Text style={styles.alarmText}>おきにいり登録</Text>
        <Switch
          trackColor={{ false: "#ffffff", true: "#4ed164" }}
          thumbColor={isNotificationOn ? "#ffffff" : "#ffffff"}
          ios_backgroundColor="#ffffff"
          onValueChange={toggleNotificationSwitch}
          value={isNotificationOn}
        />
      </View>
      {/* <Button title="PRESS ME!!!!!" onPress={setL}></Button> */}
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
    // height: 30,
    // width: 100,
    flex: 1, // Picker 组件占据剩余空间
    marginLeft: 10, // 左侧间距
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
    flexDirection: "row", // 横並びにするための指定
  },
  distanceButton: {
    margin: 10,
  },
});

export default App;
