import React, { useContext, useState } from 'react';
import { Card, CardHeader, CardContent, Typography, Grid, Divider, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import DetailsCard from '../DetailsCard/DetailsCard';
import useFilteredTransactions from '../../utils/useFilteredTransactions';
import AddCurrencyToAmount from '../../utils/AddCurrencyToAmount';
import { ExpensesManagerContext } from '../../context/context';

import useStyles from './styles';


const ChartPanel = () => {
    const classes = useStyles();

    const { filteredTotal } = useFilteredTransactions();

    const { currency, updateCurrency } = useContext(ExpensesManagerContext);

    const handleChange = (event) => {
        updateCurrency(event.target.value);        
    }

    return (
            <Card style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <CardHeader title="Details" />
                <Grid container spacing={0} justifyContent="center" alignItems="center">
                    <Grid item xs={4}>
                    </Grid>
                    <Grid item xs={4}>                
                        <Typography align="center" variant="h4">Balance: {AddCurrencyToAmount(filteredTotal)}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl margin='dense'> 
                            <Select style={{color: "#000000", backgroundColor: "#ffffff"}} variant="outlined" onChange={handleChange} value={currency}>
                                <MenuItem value={'£'}>£</MenuItem>
                                <MenuItem value={'PLN'}>PLN</MenuItem>
                                <MenuItem value={'$'}>$</MenuItem>
                                <MenuItem value={'€'}>€</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container spacing = {0}>
                    <Grid item xs={6}>
                        <CardContent>
                            <Divider className={classes.divider} />
                            <DetailsCard transactionType="Income" />
                        </CardContent>
                    </Grid>
                    <Grid item xs={6}>
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