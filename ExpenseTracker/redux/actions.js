import { ADDEXPENSE, DELETEEXPENSE, UPDATEEXPENSE, SETEXPENSE } from './actionTypes';

export const add_expense = ({id,amount,date,description}) => {
    return{
        type: ADDEXPENSE,
        payload: {id,amount,date,description},
    }
}

export const delete_expense = ({id}) => {
    return{
        type: DELETEEXPENSE,
        payload: id,
    }
}

export const update_expense = ({id,amount,date,description}) => {
    return{
        type: UPDATEEXPENSE,
        payload: {id,amount,date,description},
    }
}

export const set_expense = (expense) => {
    return{
        type: SETEXPENSE,
        payload: expense
    }
}