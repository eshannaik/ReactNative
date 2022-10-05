import { configureStore } from '@reduxjs/toolkit';
import expenseReducer from './reducer';

const initState = []

export const store = configureStore({
    reducer:{
        expense_reducer:expenseReducer
    },
    initState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
});