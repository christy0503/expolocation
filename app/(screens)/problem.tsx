import React, { useState } from 'react';
import { View, StyleSheet,Text, Pressable, Image,TouchableOpacity } from 'react-native';
import ProblemGenerator from '../../components/ProblemGenerator';
import { useFonts, RobotoCondensed_700Bold } from '@expo-google-fonts/roboto-condensed';
import Button from '@/components/button';

function App() {
  const [input, setInput] = useState("0"); // 現在の入力値
  const [result, setResult] = useState(0); // 計算結果

  let [fontsLoaded] = useFonts({
    RobotoCondensed_700Bold
  })

  if(!fontsLoaded){
    return null;
  }

  // 数字のボタンがクリックされた時の処理
  const handleNumberClick = (value:any) => {
    setInput((prevInput) => (prevInput === "0" ? value : prevInput + value));
  };

  const handleOperatorClick = (parameter:any) => {
    if (input !== "0") {
      setInput((prevInput) => prevInput + parameter);
    }
  };

  // バックスペースのボタンがクリックされた時の処理
  const handleBackspace = () => {
    setInput((prevInput) => prevInput.slice(0, prevInput.length - 1));
  };


  return (
    <View style={styles.mainContainer}>
      <View style={styles.problemcontainer}>
      </View>
        <ProblemGenerator input={input} />
          <View style={styles.formcontainer}>
          <Text style={styles.textcontainer}>{input}</Text>
          </View>
      <View style={styles.squarecontainer}>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => handleNumberClick('1')}>
          <Text style={styles.number}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNumberClick('2')}>
          <Text style={styles.number}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity  onPress={() => handleNumberClick('3')}>
          <Text style={styles.number}>3</Text>
        </TouchableOpacity>
          </View>
        <View style={styles.container}>
        <TouchableOpacity onPress={() => handleNumberClick('4')}>
          <Text style={styles.number}>4</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNumberClick('5')}>
          <Text style={styles.number}>5</Text>
        </TouchableOpacity>
        <TouchableOpacity  onPress={() => handleNumberClick('6')}>
          <Text style={styles.number}>6</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.container}>
        <TouchableOpacity onPress={() => handleNumberClick('7')}>
          <Text style={styles.number}>7</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNumberClick('8')}>
          <Text style={styles.number}>8</Text>
        </TouchableOpacity>
        <TouchableOpacity  onPress={() => handleNumberClick('9')}>
          <Text style={styles.number}>9</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.container}>
        <TouchableOpacity onPress={() => handleNumberClick('')}>
          <Text style={styles.number}>      </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNumberClick('0')}>
          <Text style={styles.number}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleBackspace}>
              <Image source={require("@/assets/images/backspeace.png")} alt="" />
        </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  number:{
    fontSize:32,
    marginVertical: 10,
    color:'#fff',
    fontFamily:"RobotoCondensed_700Bold",
    paddingBottom: 20,

  },
  mainContainer: {
    width: "100%",
    backgroundColor: "#FFF",
  },
  problemcontainer:{
    width: '38%',
    height:'5.5%',
    backgroundColor:'#459554',
    top:68,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
  },
  formcontainer: {
    height: 50,
    top: 442,
    width: '70%',
    paddingLeft:10,
    left:20,
    justifyContent:"center",
    borderColor: "#459554",
    borderWidth: 2,
    borderRadius: 15,
    position:'absolute',
  },
  textcontainer:{
    fontSize:20,
    left:10,
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    // marginVertical: 20,
    top: 10,
    alignItems: 'center',
    fontFamily:"RobotoCondensed_700Bold",
  },
  squarecontainer:{
    width:'100%',
    height:'90%',
    top:130,
    padding: 20, 
    backgroundColor:'#459554',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  }
});

export default App;
