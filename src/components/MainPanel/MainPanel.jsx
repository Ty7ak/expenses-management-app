import React, { useContext, useEffect, useRef } from 'react';
import { Card, CardHeader, CardContent, Typography, Grid, Divider } from '@material-ui/core';

import useStyles from './styles';
import NewTransactionForm from './NewTransactionForm/NewTransactionForm';
import TransactionsList from './TransactionsList/TransactionsList';
import FilterCard from './FilterCard/FilterCard'
import { useRenderOnce } from '../../utils/useRenderOnce';
import useFilteredTransactions from '../../utils/useFilteredTransactions';

import { API, graphqlOperation  } from 'aws-amplify';
import { listTransactions } from '../../graphql/queries';

const MainPanel = () => {
    const classes = useStyles();
    const { filteredTotal } = useFilteredTransactions();

    async function fetchTransactions() {
        const transactions = await API.graphql(graphqlOperation(listTransactions));    
        let data = transactions.data.listTransactions.items;
        localStorage.setItem('transactions', JSON.stringify(data));
    };
    
    const firstRender = useRenderOnce();    
    
    useEffect(() => {
        if (firstRender) {
            fetchTransactions();
        }
    }, [firstRender]);

    return (
            <Card className={classes.root}>
                <CardHeader title="Expenses Manager" />
                <Grid container spacing = {0}>
                    <Grid item xs={6}>
                        <CardContent>
                            <Divider className={classes.divider} />
                            <Typography align="center" variant="h6">Total: {filteredTotal}</Typography>
                            <TransactionsList />
                            <Divider className={classes.divider} />
                        </CardContent>
                    </Grid>
                    <Grid item container xs={6} justifyContent='space-between'>
                        <Grid item xs={12} alignItems="center">
                        <CardContent className={classes.CardContent}>
                            <Divider className={classes.divider} />
                            <Typography align="center" variant="h6">Add transaction</Typography>
                            <NewTransactionForm />
                            </CardContent>
                        </Grid> 
                        <Grid item xs={12}>     
                        <CardContent className={classes.CardContent}>                          
                            <Typography align="center" variant="h6">Filter transactions</Typography>
                            <FilterCard />
                            </CardContent>
                        </Grid>
                    </Grid>
                </Grid>
            </Card>

    )
}

export default MainPanel