import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getExpense } from '../util/http';
import { set_expense } from '../redux/actions';
import { useDispatch } from 'react-redux';
import ExpenseOutput from '../components/ExpenseOutput';
import LoadingOverlay from '../UI/LoadingOverlay';
import ErrorOverlay from '../UI/ErrorOverlay';

function AllExpenses(){
    const expenseR = useSelector(state => state.expense_reducer)
    const dispatch = useDispatch();
    const [fetchingData,setFetchingData] = useState(true)
    const [error,setError] = useState();

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
        <ExpenseOutput expenses={expenseR} expensesPeriod="Total"/>
    )
}

export default AllExpenses;