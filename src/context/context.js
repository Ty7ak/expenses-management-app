import React, { useReducer, createContext, useState, useEffect, useContext } from 'react';
import { API, graphqlOperation  } from 'aws-amplify';
import { listTransactions } from '../graphql/queries';

import formatDate from '../utils/formatDate';
import contextReducer from './contextReducer';

const initialState = JSON.parse(localStorage.getItem('transactions')) || [];

// async function fetchTransactions() {
//     console.log("Fetching Data");
//     const transactions = await API.graphql(graphqlOperation(listTransactions));    
//     let data = transactions.data.listTransactions.items;
//     console.log(data);
//     localStorage.setItem('transactions', JSON.stringify(data));
// };

const dateFrom = formatDate(new Date(1, 1, 1));
const dateTo = formatDate(new Date(9999, 1, 1));
const initialFilterState = {
    dateFrom,
    dateTo
}

export const ExpensesManagerContext =  createContext(
    initialState
);

export const Provider = ({ children }) => {

    // fetchTransactions();

    const [transactions, dispatch] = useReducer(contextReducer, initialState);
    const [filter, setFilter] = useState(initialFilterState);

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

    const balance = transactions.reduce((acc, currVal) => (currVal.type === 'Expense' ? acc - currVal.amount : acc + currVal.amount), 0);

    return (
        <ExpensesManagerContext.Provider value={{ 
            deleteTransaction,
            addTransaction,
            updateFilter,
            transactions,
            balance,
            filter
         }}>
            {children}
        </ExpensesManagerContext.Provider>
    )
}