import { StyleSheet, TextInput, View, Button, Image } from "react-native";
import { useState } from "react";

function GoalInput(props){
    const [textState,setTextState] = useState('');

    function goalInputHandler(text){
        setTextState(text)
    }

    function addGoalHandler(){
        props.onAddGoal(textState);
        setTextState('')
    }

    return(
        <View style={styles.inputContainer}>
            <TextInput 
                style={styles.textInput} 
                placeholder='Your course goals' 
                placeholderTextColor="white"
                onChangeText={goalInputHandler}
                value={textState}
            />
            <Button 
                title="Add Goal"
                onPress={addGoalHandler}
            />
        </View>
);
}

export default GoalInput;

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection:'row',
        justifyContent: 'space-between',
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        margin: 2,
        marginRight: 8,
    },
    textInput: {
        width: '70%',
        borderWidth: 1,
        borderColor: '#63666A',
        paddingLeft: 10,
        marginLeft: 10,
    },
})