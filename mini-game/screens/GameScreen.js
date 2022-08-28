import {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Alert, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import PrimaryButton from '../components/PrimaryButton';
import Title from '../components/Title';
import NumberContainer from '../components/NumberContainer';

function generateRandomBetween(min,max,exclude){
    const randomNumber = Math.floor(Math.random() * (max-min)) + min;

    if(randomNumber === exclude){
        return generateRandomBetween(min,max,exclude)
    }
    else{
        return randomNumber;
    }
}

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen ({userNumber,onGameOver}) {
    const initialGuess = generateRandomBetween(1,100,userNumber)
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [guessRounds,setGuessRounds] = useState([initialGuess]);

    useEffect(() => {
        if(currentGuess === userNumber){
            onGameOver(guessRounds.length);
        }
    }, [currentGuess,userNumber,onGameOver]); // if any of these variables change this useEffect will be executed

    function nextGuessHandler(direction) {
        if(direction === 'lower' && currentGuess < userNumber || (direction === 'greater' && currentGuess > userNumber)){
            Alert.alert('"Dont Lie!','You know that this is wrong ...',[
                {text: 'Sorry!', style: 'cancel'}
            ])
            return;
        }

        if(direction === 'lower'){
            maxBoundary = currentGuess;
        }else{
            minBoundary = currentGuess+1; 
        }
        const newRndNumber = generateRandomBetween(minBoundary,maxBoundary,currentGuess);
        setCurrentGuess(newRndNumber);
        setGuessRounds(prevGuessRounds => [newRndNumber,...prevGuessRounds]);
    }

    return(
        <View style = {styles.screen}>
            <Title>
                Opponent's Guess
            </Title>

            <NumberContainer>
                {currentGuess}
            </NumberContainer>

            <View>
                <Text style = {styles.textInput}>Higher or Lower</Text>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this,'lower')}>
                        <Ionicons name="md-remove" size={18}/>
                    </PrimaryButton>
                    <PrimaryButton onPress={nextGuessHandler.bind(this,'greater')}>
                        <Ionicons name="md-add" size={18}/>
                    </PrimaryButton>
                </View>
            </View>

            <View>
                <FlatList 
                    style={styles.log}
                    data={guessRounds} 
                    renderItem= {(itemData) => <Text style={styles.textContainer}>{itemData.index +1} {'=>'} Opponent Guess:{itemData.item}</Text>} 
                    keyExtractor={(item) => item}
                />
            </View>
        </View>
    )
}

export default GameScreen;

const styles = StyleSheet.create ({
    screen: {
        padding: 15,
        marginHorizontal: 24,
        fontSize:24,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        // borderWidth: 2,
        // backgroundColor: '#610000',
        borderRadius:10,
    },
    title: {
        marginTop:60,
        fontSize:24,
        fontWeight: 'bold',
        color: '#CDC50A',
        textAlign: 'center',
        borderWidth: 2,
        borderColor:'#ddb52f',
        padding:15,
    },
    buttonContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    textInput: {
        height: 50,
        fontSize: 18,
        color: '#CDC50A',
        marginVertical: 8,
        fontWeight: 'bold',
        margin: 56,
        textAlign: 'center',
    },
    log: {
        marginTop: 30,
        margin: 10,
        padding: 5,
        borderRadius: 5,
        backgroundColor: 'grey',
        color: 'white',
    },
    textContainer:{
        fontSize:14,
        fontWeight: 'bold',
        padding:5,
        textAlign: 'center'
    }
})