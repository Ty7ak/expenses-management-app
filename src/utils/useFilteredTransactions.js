import { useContext } from 'react';
import { ExpensesManagerContext } from '../context/context';

import { incomeCategories, expenseCategories, resetCategories } from '../constants/categories';
import filterDates from './filterDates';

const useFilteredTransactions = () => {
    resetCategories();
    const { transactions, filter } = useContext(ExpensesManagerContext);
    let filteredTransactions = [];
    let filteredTotal = 0;

    transactions.forEach((t) => {
        if(filterDates(t.date, filter)) {
            filteredTransactions = [t, ...filteredTransactions];
            if(t.type === "Income") {
                filteredTotal += t.amount;
            } else {
                filteredTotal -= t.amount;
            }
  }
})

  return { filteredTotal, filteredTransactions };
};

export default useFilteredTransactions;