import { ADDEXPENSE, DELETEEXPENSE, UPDATEEXPENSE, SETEXPENSE } from './actionTypes';

export default function expenseReducer (state=[],action){
    switch(action.type){
        case ADDEXPENSE:
            return [action.payload, ...state]

        case SETEXPENSE:
            const inverted = action.payload.reverse();
            return inverted

        case UPDATEEXPENSE:
            const updatableExpenseIndex = state.findIndex(
                (expense) => expense.id === action.payload.id
            );
            const updatableExpense = state[updatableExpenseIndex]
            const updateItem = {...updatableExpense, ...action.payload}
            const updatedExpenses = [...state]
            updatedExpenses[updatableExpenseIndex] = updateItem;
            return updatedExpenses

        case DELETEEXPENSE:
            return (
                state.filter((expense) => expense.id !== action.payload)
            )

        default:
            return state
    }
}