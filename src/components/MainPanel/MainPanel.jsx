import React, { useContext, useEffect, useRef } from 'react';
import { Card, CardHeader, CardContent, Typography, Grid, Divider } from '@material-ui/core';

import useStyles from './styles';
import EntryForm from './EntryForm/EntryForm';
import TransactionsList from './TransactionsList/TransactionsList';
import { ExpensesManagerContext } from '../../context/context';
import InfoCard from '../InfoCard'
import FilterCard from './FilterCard/FilterCard'
import { useRenderOnce } from '../../utils/useRenderOnce';

import { API, graphqlOperation  } from 'aws-amplify';
import { listTransactions } from '../../graphql/queries';

const MainPanel = () => {
    const classes = useStyles();
    const { balance } = useContext(ExpensesManagerContext);

    async function fetchTransactions() {
        console.log("Fetching Data");
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
            <CardHeader title="Expenses Manager" subheader="Track your money" />
            <CardContent>
                <Typography align="center" variant="h5">Total Balance ${balance}</Typography>
                <Typography variant="subtitle1" style={{ lineHeight: '1.5em', marginTop: '20px'}}>
                    <InfoCard />
                </Typography>
                <Divider className={classes.divider} />
                <EntryForm />
            </CardContent>
            <CardContent className={classes.CardContent}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TransactionsList title="All" />
                    </Grid>
                </Grid>
                <Divider className={classes.divider} />
                <FilterCard />
            </CardContent>
        </Card>
    )
}

export default MainPanel