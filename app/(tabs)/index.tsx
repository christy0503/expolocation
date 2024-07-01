import React, { useState } from 'react';
import { Image, StyleSheet, TextInput, Button, Alert, TouchableOpacity, View, ScrollView, FlatList, ActivityIndicator, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { api } from '@/utils/axios';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const [address, setAddress] = useState();
  const [loaded, setLoaded] = useState(true);
  const [text, setText] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const getAddressData = async (stationName) => {
    try {
      setLoaded(false);
      const encoded = encodeURIComponent(stationName);
      console.log(`Fetching data for station: ${stationName}, encoded: ${encoded}`);
      const res = await api.get(`/json?method=getStations&name=${encoded}`);
      console.log('API response:', res);
      if (res.data.results && res.data.results.length > 0) {
        setAddress(res.data.results[0].address);
      } else {
        setAddress('No results found');
      }
      setLoaded(true);
    } catch (error) {
      console.error('Error fetching station data:', error);
      setAddress('Error fetching data');
      setLoaded(true);
    }
  };

  const getSuggestions = async (query) => {
    try {
      const encoded = encodeURIComponent(query);
      const res = await api.get(`/json?method=getStationSuggestions&name=${encoded}`);
      console.log('Suggestions response:', res);
      if (res.data.suggestions) {
        setSuggestions(res.data.suggestions);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    }
  };

  const handleSearchChange = (text) => {
    setText(text); // Update text state instead of search state
    if (text.trim() !== '') {
      getSuggestions(text);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionPress = (suggestion) => {
    setSearch(suggestion);
    setSuggestions([]);
    getAddressData(suggestion);
  };

  const handleSearch = () => {
    if (text.trim() !== '') {
      getAddressData(text); // Use text state directly
    }
  };

  const handlePress = () => {
    Alert.alert('入力されたテキスト', text);
  };

  const handleFixedButtonPress = () => {
    Alert.alert('固定ボタンが押されました');
  };

  const handleIconPress = () => {
    Alert.alert('アイコンが押されました', text);
  };

  return (
    <View style={{ flex: 1 }}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#ffffff', dark: '#1D3D47' }}
        headerImage={
          <Image
            style={styles.reactLogo}
          />
        }>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">
            <Image
              source={require('@/assets/images/logo1.png')}
              style={styles.logo}
            />
          </ThemedText>
        </ThemedView>
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps="handled"
        >
          <ThemedView style={styles.stepContainer}>
            <View style={styles.inputContainer}>
              <TouchableOpacity onPress={handleIconPress} style={styles.iconButton}>
                <View style={styles.iconCircle}>
                  <Icon name="search" size={20} color="#ffffff" />
                </View>
              </TouchableOpacity>
              <TextInput
                style={styles.input}
                placeholder="駅名を入力"
                value={text} // Bind to text state
                placeholderTextColor="#c0c0c0"
                onChangeText={handleSearchChange}
              />
              <Button title="Search" onPress={handleSearch} />
            </View>
            {!loaded ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <ThemedText>{address}</ThemedText>
            )}
            <FlatList
              data={suggestions}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleSuggestionPress(item)}>
                  <Text style={styles.suggestion}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <ThemedText>入力したテキスト: {text}</ThemedText>
          </ThemedView>
        </ScrollView>
      </ParallaxScrollView>
      <TouchableOpacity style={styles.fixedButton} onPress={handleFixedButtonPress}>
        <ThemedText style={styles.buttonText}>♡</ThemedText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flexGrow: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#459554',
    borderWidth: 1,
    borderRadius: 40,
    paddingHorizontal: 8,
    width: '100%',
    marginBottom: 8,
    shadowColor: '#c0c0c0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  input: {
    flex: 1,
    height: 40,
  },
  iconButton: {
    padding: 8,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#459554', // Background color of the circle
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#459554', // Border color of the circle
    borderWidth: 1,
  },
  fixedButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#ffffff',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#c0c0c0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    color: '#F99FAF',
    fontSize: 26,
  },
  suggestion: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
