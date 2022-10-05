import { Text } from 'react-native';
import { useSelector } from 'react-redux';
import ExpenseOutput from '../components/ExpenseOutput';
import { getDateMinusDate } from '../util/date';
import { getExpense } from '../util/http';
import { useEffect, useState } from 'react';
import { set_expense } from '../redux/actions';
import { useDispatch } from 'react-redux';
import LoadingOverlay from '../UI/LoadingOverlay';
import ErrorOverlay from '../UI/ErrorOverlay';

function RecentExpenses(){
    const expenseR = useSelector(state => state.expense_reducer)
    const dispatch = useDispatch();
    const [fetchingData,setFetchingData] = useState(true)
    const [error,setError] = useState();
    // console.log(expenseR)

    useEffect(() => {
        async function fetchExpense(){
            setFetchingData(false)
            try {
                const expenses = await getExpense();
                dispatch(set_expense(expenses))
            } catch (error) {
                setError('Could not fetch expenses !')
            }      
        }
        
        fetchExpense()
    },[])

    const RecentExpenses = expenseR.filter((expense)=>{
        const today = new Date();
        const date7DaysAgo = getDateMinusDate(today,7)
        return expense.date > date7DaysAgo;
    })

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
        <ExpenseOutput expenses={RecentExpenses} expensesPeriod="Last 7 Days" />
    )
}

export default RecentExpenses;