import React, { useContext } from 'react';
import { List as MUIList, ListItem, ListItemAvatar, ListItemText, Avatar, ListItemSecondaryAction, IconButton, Slide, Typography } from '@material-ui/core';
import { Delete, MoneyOff } from '@material-ui/icons';

import { incomes, expenses } from '../../../categories/categoryTypes';
import { ExpensesManagerContext } from '../../../context/context';
import useFilteredTransactions from '../../../utils/useFilteredTransactions';
import useStyles from './styles';
import AddCurrencyToAmount from '../../../utils/AddCurrencyToAmount';


const TransactionsList = () => {
    const classes = useStyles();
    const { deleteTransaction } = useContext(ExpensesManagerContext);
    
    const { filteredTransactions } = useFilteredTransactions();

    const getIcon = (transaction) => {
        let icon;
        const transactionType = transaction.type;
        if (transactionType === "Income") {
            incomes.forEach(income => {
                if(transaction.category === income.type) {
                    icon = income.icon;
                    return;
                }
            });            
        } else if (transactionType === "Expense") {
            expenses.forEach(expense => {
                if(transaction.category === expense.type) {
                    icon = expense.icon;
                    return;
                }
            });
        }
        return icon;
    }

    const getTransactionColor = (transaction) => {
        let color;
        if (transaction.type === "Income") {
            color = "#007808";
        } else {
            color = "#ff0008"
        };
        return color;
    }
    

    // KOLORY NA CZERWONO NIE DZIALAJA + DODAJ WARTOSC

    return (
        <MUIList dense={false} className={classes.list}>
            {filteredTransactions.reverse().map((transaction) => (
                <Slide direction="down" in mountOnEnter unmountOnExit key={transaction.id}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar className={transaction.type === 'Income' ? classes.avatarIncome : classes.avatarExpense}>
                                {getIcon(transaction)}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={transaction.category}
                                      secondary={<Typography variant="subtitle2" style={{ color: getTransactionColor(transaction) }}>{AddCurrencyToAmount(transaction.amount)} - {transaction.date}</Typography>}
                        />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" onClick={() => deleteTransaction(transaction.id)}>
                                <Delete />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                </Slide>
            ))}            
        </MUIList>
    )
}

export default TransactionsList
