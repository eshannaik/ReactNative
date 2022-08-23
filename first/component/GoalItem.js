import { StyleSheet, Text, Pressable } from "react-native";

function GoalItem(props){
    return(
        <Pressable android_ripple={{color:'white'}} onPress={props.onDeleteItem.bind(this,  props.id)}>
            <Text style = {styles.goalItem}>{props.text}</Text>
        </Pressable>

        // {/* for scrollView */}
        //   {/* {goalState.map((goals) => 
        //     // IOS will have a view tag here and the style will go into this
        //     // For the color of the text tag will remain in the text tag
        //     <Text style = {styles.goalItem} key={goals}>{goals}</Text>
        //   )} */}
    );
}

export default GoalItem;

const styles = StyleSheet.create({
    goalItem: {
        margin: 10,
        padding: 5,
        borderRadius: 5,
        backgroundColor: 'grey',
        color: 'white',
    }
})