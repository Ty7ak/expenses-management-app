import React, { useReducer, createContext, useState, useEffect, useContext } from 'react';

import parseDate from '../utils/parseDate';
import contextReducer from './contextReducer';

const initialState = JSON.parse(localStorage.getItem('transactions')) || [];

let initialCurrency = localStorage.getItem('currency');

if ( initialCurrency === null) {
    initialCurrency = "$";
}

const dateFrom = parseDate(new Date(1, 1, 1));
const dateTo = parseDate(new Date(9999, 1, 1));
const initialFilterState = {
    dateFrom,
    dateTo
}

export const ExpensesManagerContext =  createContext(
    initialState
);

export const Provider = ({ children }) => {

    const [transactions, dispatch] = useReducer(contextReducer, initialState);
    const [filter, setFilter] = useState(initialFilterState);
    const [currency, setCurrency] = useState(initialCurrency);

    // Action Creators
    const deleteTransaction = (id) => {
        dispatch({ type: 'DELETE_TRANSACTION', payload: id });
    }

    const addTransaction = (transaction) => {
        dispatch({ type: 'ADD_TRANSACTION', payload: transaction });
    }

    const updateFilter = (newFilter) => {
        setFilter(newFilter);
    }

    const clearFilter = () => {
        setFilter(initialFilterState);
    }

    const updateCurrency = (currency) => {
        setCurrency(currency);
        localStorage.setItem('currency', currency);
    }

    const totalBalance = transactions.reduce((acc, currVal) => (currVal.type === 'Expense' ? acc - currVal.amount : acc + currVal.amount), 0);

    return (
        <ExpensesManagerContext.Provider value={{ 
            deleteTransaction,
            addTransaction,
            updateFilter,
            clearFilter,
            updateCurrency,
            transactions,
            totalBalance,
            filter,
            currency
         }}>
            {children}
        </ExpensesManagerContext.Provider>
    )
}