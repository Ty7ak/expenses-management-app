import React from 'react';
import { Card, CardHeader, CardContent, Typography, Grid, Divider, Select, MenuItem, FormControl, InputLabel, Box } from '@material-ui/core';
import DetailsCard from '../DetailsCard/DetailsCard';
import useFilteredTransactions from '../../utils/useFilteredTransactions';
import AddCurrencyToAmount from '../../utils/AddCurrencyToAmount';

import useStyles from './styles';


const ChartPanel = () => {
    const classes = useStyles();

    const { filteredTotal } = useFilteredTransactions();

    return (
            <Card style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <CardHeader title="Details" />
                <Box sx={{ m: 0.4 }}/>
                <Grid container spacing={0} justifyContent="center" alignItems="center">
                    <Grid item sm={4}>
                    </Grid>
                    <Grid item sm={4} xs={8}>                
                        <Typography align="center" variant="h5">Balance: {AddCurrencyToAmount(filteredTotal)}</Typography>
                    </Grid>
                    <Grid item sm={4} xs={4}>
                    </Grid>
                </Grid>
                <Grid container spacing = {0}>
                    <Grid item sm={6} xs={12}>
                        <CardContent>
                            <Divider className={classes.divider} />
                            <DetailsCard transactionType="Income" />
                        </CardContent>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <CardContent>
                            <Divider className={classes.divider} />
                            <DetailsCard transactionType="Expense" />
                        </CardContent>
                    </Grid>
                </Grid>
            </Card>

    )
}

export default ChartPanel;