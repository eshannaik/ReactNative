import { useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { GlobalStyles } from '../constants/style';
import IconButton from '../UI/IconButton';
import { useDispatch } from 'react-redux';
import { add_expense , delete_expense , update_expense } from '../redux/actions';
import ExpenseForm from '../components/ExpenseForm';
import { useSelector } from 'react-redux';
import { storeExpense, updateExpense, deleteTheExpense } from '../util/http';
import { useState } from 'react';
import LoadingOverlay from '../UI/LoadingOverlay';
import ErrorOverlay from '../UI/ErrorOverlay';

function ManageExpenses({route, navigation }){
    // check if the params is there, it will prevent crashing of the app if param is not there (?)
    const editedExpenseId = route.params?.expenseId; 
    const isEditting = !!editedExpenseId; // used to convert into boolean (!!)
    const dispatch = useDispatch();

    const expenseR = useSelector(state => state.expense_reducer)
    const selectedExpense = expenseR.find(expense => expense.id === editedExpenseId)

    const [fetchingData,setFetchingData] = useState(false)
    const [error,setError] = useState();

    async function deleteExpense(){
        setFetchingData(true)
        try{
            dispatch(delete_expense({id: editedExpenseId}))
            await deleteTheExpense(editedExpenseId)
        }catch (error) {
            setError('Could not delete expenses !')
            setFetchingData(false)
        } 
        
        navigation.goBack()
    }

    function cancelHandler() {
        navigation.goBack()
    }

    async function confirmHandler(expenseData) {
        setFetchingData(true)
        try{
            if(isEditting){
                dispatch(update_expense({
                    id: editedExpenseId,
                    amount: expenseData.amount,
                    date:  expenseData.date,
                    description: expenseData.description
                }));
                await updateExpense(editedExpenseId,expenseData)
            } else {
                const id = await storeExpense(expenseData)
                dispatch(add_expense({
                    id:id,
                    amount: expenseData.amount,
                    date:  expenseData.date,
                    description: expenseData.description
                }));
            }
        }catch (error) {
            setError(isEditting ? 'Could not update expenses !' : 'Could not add expenses !')
            setFetchingData(false)
        } 
        
        navigation.goBack();
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditting ? 'Edit Expense' : 'Add Expense'
        })
    }, [navigation, isEditting])

    function errorHandler(){
        setError(null);
    }

    if(error && !fetchingData){
        return <ErrorOverlay message={error} onConfirm={errorHandler} />
    }

    if(fetchingData){
        return <LoadingOverlay />
    }
   
    return(
        <View style={styles.container}>
            <ExpenseForm 
                submitButtonHandler={isEditting ? 'Update': 'Add'} 
                onCancel={cancelHandler} 
                onSubmit={confirmHandler} 
                defaultValue={selectedExpense}
            />
            {isEditting && (
            <View style={styles.deleteContainer}>
                <IconButton 
                    icon="trash" 
                    size={36} 
                    color={GlobalStyles.colors.error500} 
                    onPress={deleteExpense}
                />
            </View>
            )}
        </View>
    )
}

export default ManageExpenses;

const styles = StyleSheet.create({
    container: {
        flex:1,
        padding:24,
        backgroundColor: GlobalStyles.colors.primary800
    },
    deleteContainer: {
        marginTop: 16,
        padding: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'
    }
})