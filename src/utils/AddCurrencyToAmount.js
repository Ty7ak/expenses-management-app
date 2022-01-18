import { useContext } from 'react';
import { ExpensesManagerContext } from '../context/context';

const AddCurrencyToAmount = (amount) => {
    const { currency } = useContext(ExpensesManagerContext);
    if ( currency === '$' || currency === '£') {
        return currency + amount;
    } else return amount + currency;
}

export default AddCurrencyToAmount;