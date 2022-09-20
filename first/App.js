import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { useState } from 'react';
import Modal from 'react-native-modal';
import { StatusBar } from 'react-native';

import GoalItem from './component/GoalItem';
import Top  from './component/Header';
import GoalInput from './component/GoalInput';

// Flatlist is scrollview with lazy loading
export default function App() {
  const[modalV,setModalV] = useState(false);
  const [goalState,setGoalState] = useState([]);

  function addGoalHandler(textState){
      setGoalState(currentCourseGoals => [
          ...currentCourseGoals, 
          {text: textState, id: Math.random().toString()},
      ])
  }

  function handleClear(){
    setModalV(false)
    // console.log({modalV})
    setGoalState([])
  }

  function deleteGoalHandler(id){
    setGoalState(currentGoalState => {
      return currentGoalState.filter((goal) => goal.id !== id);
    })
  }

  function startAddGoalHandler(){
    setModalV(true);
    // console.log({modalV})
  }

  return (
    <>
    <StatusBar styles="black" />
      <View style={styles.appcontainer}>
        <View style = {styles.buttonContainer}>
          <Button 
            title='Add New Goal'
            onPress={startAddGoalHandler}
          />
        </View>

        <Modal isVisible={modalV} animationIn="fadeIn" style={styles.modalContainer}> 
          <Top />

          <GoalInput onAddGoal={addGoalHandler}/>

          <View style={styles.goalsContainer}>
            <Text style={styles.text}>List of Goals</Text>

            <FlatList data={goalState} renderItem={ (itemData) => {
              return(
                <GoalItem 
                  text={itemData.item.text} 
                  id = {itemData.item.id}
                  onDeleteItem={deleteGoalHandler}/>
              );
              }} 
              keyExtractor={(item, index) => {
                return item.id;
              }}
            />
              
            <Button title="Clear all Goals" onPress={handleClear}/>
          
          </View>
        </Modal>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appcontainer: {
    flex: 1,
    padding: 5,
  },

  buttonContainer: {
    marginTop: 400,
    flexDirection:'row',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  
  text:{
    textAlign: 'center',
    marginTop:25,
    fontSize: 18,
    color: 'white',
  },
  
  goalsContainer: {
    flex:3,
  },

  modalContainer: {
    backgroundColor: 'black'
  }
});
