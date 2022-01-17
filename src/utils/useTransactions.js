import { useContext } from 'react';
import { ExpensesManagerContext } from '../context/context';

import { incomes, expenses, resetAmounts } from '../categories/categoryTypes';
import filterDates from './filterDates';

const useTransactions = (title) => {
  resetAmounts();
  const { transactions, filter } = useContext(ExpensesManagerContext);
  let filteredTransactions = [];
  const rightTransactions = transactions.filter((t) => t.type === title);
  let typeTotal = 0;
  const categories = title === 'Income' ? incomes : expenses;

    rightTransactions.forEach((t) => {
      const category = categories.find((c) => c.type === t.category);
  
      if (category && filterDates(t.date, filter)) {
        category.amount += t.amount;
        typeTotal += t.amount;
      } 
    });

  const filteredCategories = categories.filter((sc) => sc.amount > 0);
  const pieData = {
    datasets: [{
      data: filteredCategories.map((c) => c.amount),
      backgroundColor: filteredCategories.map((c) => c.chartColorValue),
    }],
    labels: filteredCategories.map((c) => c.type),
  };

  return { filteredCategories, typeTotal, pieData };
};

export default useTransactions;