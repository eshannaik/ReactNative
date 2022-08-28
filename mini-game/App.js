import { StyleSheet,ImageBackground, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';

import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOver from './screens/gameOverScreen';

export default function App() {
  const [userNumber, setUserNumber] = useState('');
  const [gameIsOver,setGameIsOver] = useState(true);
  const [guessRounds,setGuessRounds] = useState(0);

  function pickedNumberHandler(pickedNumber){
    setUserNumber(pickedNumber)
    setGameIsOver(false);
  }

  function gameOverHandler(numberOfRounds){
    setGameIsOver(true);
    setGuessRounds(numberOfRounds);
  }

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler}/>

  if(userNumber){
    screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler}/>
  }

  if(gameIsOver && userNumber){
    screen = <GameOver onPress={playAgain} userNumber={userNumber} count={guessRounds}/>
  }

  function playAgain(){
    setUserNumber('');
    setGameIsOver('');
    screen = <StartGameScreen onPickNumber={pickedNumberHandler}/>
  }

  return (
    <LinearGradient colors={['#610000','#CDC50A']} style={styles.rootScreen}>
      <ImageBackground
        source={require('./assets/dice.jpg')}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.bgImage}
      >
        <SafeAreaView style={styles.rootScreen}>
          {screen}
        </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex:1,
  },
  bgImage: {
    opacity:0.5,
  }
});
