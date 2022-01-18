import { createTransaction as createTransactionMutation, deleteTransaction as deleteTransactionMutation } from '../graphql/mutations';
import { API } from 'aws-amplify';

const contextRedcuer = (state, action) => {
    let transactions;

    async function createTransaction(transaction) {
        try {
            await API.graphql({ query: createTransactionMutation, variables: { input: transaction } });
        } catch (error) {
            console.error('Failed to add the transaction:', error);
        }
      }
    
    async function deleteTransaction(id) {
        try {
            await API.graphql({ query: deleteTransactionMutation, variables: { input: { id } }});
        } catch (error) {
            console.error('Failed to delete the transaction:', error);
        }
    }

    switch (action.type) {
        case 'DELETE_TRANSACTION':
            transactions = state.filter((t) => t.id !== action.payload)
            localStorage.setItem('transactions', JSON.stringify(transactions));
            deleteTransaction(action.payload);
            return transactions;

        case 'ADD_TRANSACTION':
            transactions = [action.payload, ...state]
            localStorage.setItem('transactions', JSON.stringify(transactions));

            createTransaction(action.payload);
            return transactions;

        default:
            return state;
    }
}

export default contextRedcuer;