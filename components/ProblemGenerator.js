import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { router } from "expo-router";


const operations = {
    '+': (x, y) => x + y,
};

const ProblemGenerator = (input) => {
    const [problem, setProblem] = useState('');
    const [answer, setAnswer] = useState('');
    const [ans, setAns] = useState('');
    const [correctCount, setCorrectCount] = useState(0);
    const navigation = useNavigation();

    const getRandomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const getRandomOperator = () => {
        const operators = ['+'];
        return operators[Math.floor(Math.random() * operators.length)];
    };

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
        if (answer === input.input) {
            setAns("◯");
            setCorrectCount((prevCount) => {
                const newCount = prevCount + 1;
                if (newCount >= 3) {
                    router.push("@/app/(screens)/index.tsx");
                }
                return newCount;
            });
            setTimeout(() => setAns(""), 1500);
        } else {
            setAns("×");
            setTimeout(() => setAns(""), 1500);
        }

        setTimeout(() => {
            generateProblem();
        }, 2000);
    };

    useEffect(() => {
        generateProblem();
    }, []);
    return (
        <View>
            <View style={{justifyContent: 'center', alignItems: 'center', position: 'relative' , width:'100%',height: '250' , top: '12%', margintop: '10%',}}>
                <View style={styles.border}>
                <Text style={{ fontSize: 70,fontFamily: "RobotoCondensed_700Bold",top:'10%' , textAlign:'center', top:'20%'}}>{problem}</Text>
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
    top: 405, 
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
