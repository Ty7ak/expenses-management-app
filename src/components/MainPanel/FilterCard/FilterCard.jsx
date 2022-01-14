import React, { useState, useContext } from 'react';
import { TextField, Grid, Button } from '@material-ui/core';

import ConfirmSnackbar from '../../Snackbar/Snackbar';
import useStyles from './styles';
import formatDate from '../../../utils/formatDate';
import { ExpensesManagerContext } from '../../../context/context';

const initialState = {
    dateFrom: '',
    dateTo: '',
};

const EntryForm = () => {
    const classes = useStyles();
    const [formData, setFormData] = useState(initialState);
    const [open, setOpen] = useState(false);
    const { updateFilter, clearFilter } = useContext(ExpensesManagerContext);

    const filterTransactions = () => {
        setOpen(true);
        updateFilter(formData);
    }

    const clearTransactionsFilter = () => {
        setOpen(true);
        clearFilter();
        setFormData(initialState);
        
    }

    return (    
        <Grid container spacing = {2} justifyContent="center">
            <ConfirmSnackbar open={open} setOpen={setOpen} content={"Filter applied successfully."} /> 
            <Grid item xs={6}>
                <TextField fullWidth label="From" type="date" InputLabelProps={{ shrink: true }} value={formData.dateFrom} onChange={(e) => setFormData({ ...formData, dateFrom: formatDate(e.target.value) })} />
            </Grid>

            <Grid item xs={6}>
                <TextField fullWidth label="To" type="date" InputLabelProps={{ shrink: true }} value={formData.dateTo} onChange={(e) => setFormData({ ...formData, dateTo: formatDate(e.target.value) })} />
            </Grid>
            <Grid item xs={9}>
                <Button className={classes.button} variant="outlined" color="primary" fullWidth onClick={filterTransactions}>Filter</Button>
            </Grid>
            <Grid item xs={3}>
                <Button className={classes.button} variant="outlined" color="secondary" fullWidth onClick={clearTransactionsFilter}>Clear</Button>
            </Grid>

        </Grid>
    )
}

export default EntryForm
