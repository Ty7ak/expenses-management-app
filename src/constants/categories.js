const incomeColors = ['#123123', '#154731', '#165f40', '#16784f', '#14915f'];
const expenseColors = ['#b50d12', '#bf2f1f', '#c9452c', '#d3583a', '#dc6a48', '#e57c58', '#ee8d68', '#f79d79', '#ffae8a', '#cc474b'];

export const incomeCategories = [
  { type: 'Investments', amount: 0, color: incomeColors[0] },
  { type: 'Gifts', amount: 0, color: incomeColors[1] },
  { type: 'Salary', amount: 0, color: incomeColors[2] },
  { type: 'Savings', amount: 0, color: incomeColors[3] },
  { type: 'Other', amount: 0, color: incomeColors[4] },
];

export const expenseCategories = [
  { type: 'Rent', amount: 0, color: expenseColors[0] },
  { type: 'Car', amount: 0, color: expenseColors[1] },
  { type: 'Clothes', amount: 0, color: expenseColors[2] },
  { type: 'Hobby', amount: 0, color: expenseColors[3] },
  { type: 'Food', amount: 0, color: expenseColors[4] },
  { type: 'Shopping', amount: 0, color: expenseColors[5] },
  { type: 'House', amount: 0, color: expenseColors[6] },
  { type: 'Entertainment', amount: 0, color: expenseColors[7] },
  { type: 'Pets', amount: 0, color: expenseColors[8] },
  { type: 'Other', amount: 0, color: expenseColors[9] },
];

export const resetCategories = () => {
  incomeCategories.forEach((c) => c.amount = 0);
  expenseCategories.forEach((c) => c.amount = 0);
};