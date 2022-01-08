import React from 'react';
import { Card, CardHeader, CardContent, Typography, Grid, Divider } from '@material-ui/core';

import useStyles from './styles';
import EntryForm from './EntryForm/EntryForm';
import TransactionsList from './TransactionsList/TransactionsList';

const MainPanel = () => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardHeader title="Expenses Manager" subheader="Track your money" />
            <CardContent>
                <Typography align="center" variant="h5">Total Balance $100</Typography>
                <Typography variant="subtitle1" style={{ lineHeight: '1.5em', marginTop: '20px'}}>
                    {/* InfoCard */}
                    Try saying: Add income for $100 in category Salary for Monday
                </Typography>
                <Divider />
                <EntryForm />
            </CardContent>
            <CardContent className={classes.CardContent}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TransactionsList />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default MainPanel