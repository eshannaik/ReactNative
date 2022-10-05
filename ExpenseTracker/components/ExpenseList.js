import { FlatList, View, Text } from 'react-native';
// import {  } from 'react-native-gesture-handler';
import ExpenseItem from './ExpenseItem';

function renderExpenseItem (itemData){
    return <ExpenseItem id={itemData.item.id} description={itemData.item.description} date={itemData.item.date} amount={itemData.item.amount}/>
}

function ExpenseList ({expenses}) {
    return (
        <View>
            <FlatList 
                data = {expenses}
                keyExtractor = {(item) => item.id}
                renderItem = {renderExpenseItem}
            />
        </View>
    )
}

export default ExpenseList;