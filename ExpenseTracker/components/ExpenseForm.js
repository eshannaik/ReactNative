import { useState } from "react";
import { View, Text , TextInput , StyleSheet, Alert } from "react-native";
import Input from "./Input";
import Button from "../UI/Button";

function ExpenseForm({onCancel, onSubmit, submitButtonHandler, defaultValue}){
    const [inputValue,setInputValue] = useState({
        amount: defaultValue ? defaultValue.amount.toString() : '',
        date: defaultValue ? defaultValue.date.toISOString().slice(0,10) : '',
        description: defaultValue ? defaultValue.description : ''
    });

    function inputChangedHandler(inputIdentifier, enteredValue){
        setInputValue((curInputValues) => {
            return{
                ...curInputValues,
                [inputIdentifier]: enteredValue
            }
        })
    }

    function submitHandler(){
        const expenseData = {
            amount: +inputValue.amount,   // make string to int using +
            date: new Date(inputValue.date),
            description: inputValue.description
        };

        const amountValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateValid = expenseData.date.toString() !== 'Invalid Date';
        const descriptionValid = expenseData.description.trim().length > 0;

        if(!amountValid){
            Alert.alert('Invalid input',"Please check your amount input");
            return;
        }

        if(!dateValid){
            Alert.alert('Invalid input',"Please check your date input");
            return;
        }

        if(!descriptionValid){
            Alert.alert('Invalid input',"Please check your description input");
            return;
        }

        onSubmit(expenseData)
    }

    return(
        <View style={styles.form}>
            <Text style = {styles.title}> Your Expense </Text>
            <Input 
                label = "Amount"
                textConfig={{
                    type : 'decimal-pad',
                    onChangeText : inputChangedHandler.bind(this, 'amount'),
                    value: inputValue.amount
                }}
            />
            <Input 
                label = "Date"
                textConfig={{
                    placeholder : 'YYYY-MM-DD',
                    maxLength : 10,
                    onChangeText : inputChangedHandler.bind(this, 'date'),
                    value: inputValue.date
                }}
            />
            <Input 
                label = "Description"
                textConfig={{
                    multiline: true,
                    onChangeText : inputChangedHandler.bind(this, 'description'),
                    value: inputValue.description
                }}
            />
            <View style={styles.buttons}>
                <Button mode="flat" style={styles.button} onPress={onCancel}>Cancel</Button>
                <Button style={styles.button} onPress={submitHandler}> {submitButtonHandler} </Button>
            </View>
        </View>
    )
}

export default ExpenseForm;

const styles = StyleSheet.create({
    form : {
        marginTop : 40
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 24,
        textAlign: 'center'
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8
    }
})