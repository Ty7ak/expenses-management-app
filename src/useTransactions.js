import { useContext } from 'react';
import { ExpensesManagerContext } from './context/context';

import { incomeCategories, expenseCategories, resetCategories } from './constants/categories';
import filterDates from './utils/filterDates';

const useTransactions = (title) => {
  resetCategories();
  const { transactions, filter } = useContext(ExpensesManagerContext);
  const rightTransactions = transactions.filter((t) => t.type === title);
  let total = 0;
  //const total = rightTransactions.reduce((acc, currVal) => acc += currVal.amount, 0);
  const categories = title === 'Income' ? incomeCategories : expenseCategories;

  rightTransactions.forEach((t) => {
    const category = categories.find((c) => c.type === t.category);

    if (category && filterDates(t.date, filter)) {
      category.amount += t.amount;
      total += t.amount;
    } 
  });
  const filteredCategories = categories.filter((sc) => sc.amount > 0);

  const chartData = {
    datasets: [{
      data: filteredCategories.map((c) => c.amount),
      backgroundColor: filteredCategories.map((c) => c.color),
    }],
    labels: filteredCategories.map((c) => c.type),
  };

  return { filteredCategories, total, chartData };
};

export default useTransactions;