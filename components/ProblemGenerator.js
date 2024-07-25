// ProblemGenerator.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Image} from 'react-native';


// 四則演算の関数定義
const operations = {
    '+': (x, y) => x + y,
};

const ProblemGenerator = (input) => {
    const [problem, setProblem] = useState('');
    const [answer, setAnswer] = useState('');
    const [ans, setAns] = useState('');


    // ランダムな整数を生成する関数
    const getRandomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    // ランダムな演算子を取得する関数
    const getRandomOperator = () => {
        const operators = ['+'];
        return operators[Math.floor(Math.random() * operators.length)];
    };

    // 問題を生成してセットする関数
    const generateProblem = () => {
        const num1 = getRandomInt(1, 100);
        const num2 = getRandomInt(1, 100);
        const operator = getRandomOperator();

        const problemText = `${num1} ${operator} ${num2}`;
        const result = operations[operator](num1, num2);

        setProblem(problemText);
        setAnswer(result.toString());
    };

    const checkAnswer = () => {
        if(answer == input.input){
            setAns("◯");
            setTimeout(() => setAns(""), 1500);
        } else {
            setAns("×");
            setTimeout(() => setAns(""), 1500);

        }

        setTimeout(()=>{
            generateProblem()
        },2000)
    }

    useEffect(()=>{
        generateProblem();
    },[])

    return (
        <View>
            <View style={{justifyContent: 'center', alignItems: 'center', position: 'relative' , width:'100%',height: '250' , top: '5%', margintop: '10%',}}>
                <View style={styles.border}>
                <Text style={{ fontSize: 70,fontFamily: "RobotoCondensed_700Bold",top:'10%' }}>{problem}</Text>
                </View>
                <Text style={{ fontSize: 170, color: "#DE2E2E", position: 'absolute',fontFamily: "RobotoCondensed_700Bold"}}>{ans}</Text>
            </View>
            <Pressable onPress={checkAnswer} style={styles.checkAnswerbutton}>
              <Image source={require("@/assets/images/send.png")} alt="" style={{width:"70%" ,height:"70%"}} />
          </Pressable>
        </View>
        );
    }
const styles= StyleSheet.create({
    checkAnswerbutton:{
    position: 'absolute',
    top: 380, 
    width: 70,
    height: 70,
    right :1,
    },
    border:{
    borderWidth: 2, 
    borderColor: '#459554', 
    padding: 70, 
    width: 350,
    height:270,
    margin:20,
    borderRadius: 40,
    border:'solid'
    }
})


export default ProblemGenerator;
