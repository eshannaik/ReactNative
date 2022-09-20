import { StyleSheet, Text, TextInput, View, Alert, Dimensions, useWindowDimensions, KeyboardAvoidingView } from "react-native";
import { useState } from "react";

import PrimaryButton from "../components/PrimaryButton";
import Title from '../components/Title';

function StartGameScreen ({onPickNumber}) {
    const [enteredNumber, setEnteredNumber] = useState('');

    // const {width, height} = useWindowDimensions();

    // Stores input
    function numberInputHandler(enteredText){
        setEnteredNumber(enteredText);
    }

    function resetInputHandler(){
        setEnteredNumber('');
    }

    function confirmInputHandler() {
        const chosenNumber = parseInt(enteredNumber)

        if(isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99){
            Alert.alert(
                "Invalid Number!","Number should be between 1 and 99",
                [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}]
            )
            return
        }

        onPickNumber(chosenNumber);
    }

    return (
        <KeyboardAvoidingView>
            <View>
                <View style = {styles.screen}>
                    <Title>
                        Guess My Number
                    </Title>
                </View>

                <View style ={styles.inputContainer}>
                    <Text style ={styles.textInput}>Enter your number</Text>
                    <TextInput 
                        style ={styles.numberInput} 
                        maxLength={2} 
                        keyboardType="number-pad" 
                        autoCorrect={false} 
                        value={enteredNumber}
                        onChangeText={numberInputHandler}
                    />

                    <View style ={styles.buttonContainer}>
                        <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
                        <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
                    </View>

                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

export default StartGameScreen;

const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create ( {
    inputContainer: {
        marginTop: deviceHeight < 410 ? 10:50,
        marginHorizontal: deviceHeight < 410 ? 90:24,
        padding: 10,
        backgroundColor: '#610000',
        borderRadius:10,
    },
    textInput: {
        height: 50,
        fontSize: 22,
        color: '#CDC50A',
        marginVertical: 8,
        fontWeight: 'bold',
        margin: 56,
        textAlign: 'center',
    },
    numberInput: {
        height: 50,
        fontSize: 25,
        color: '#CDC50A',
        marginVertical: 2,
        fontWeight: 'bold',
        margin: 56,
        textAlign: 'center',
        borderBottomWidth: 2,
        borderBottomColor: '#CDC50A',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: 20,
    },
    screen: {
        marginTop:25,
        marginHorizontal: 50,
        fontSize:24,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
})