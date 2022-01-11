import React, { useState, useContext } from 'react';
import { TextField, Grid, Button } from '@material-ui/core';

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

    const { updateFilter } = useContext(ExpensesManagerContext);

    const filterTransactions = () => {
        updateFilter(formData);
    }

    return (    
        <Grid container spacing = {2}>
 
            <Grid item xs={6}>
                <TextField fullWidth label="From" type="date" InputLabelProps={{ shrink: true }} value={formData.dateFrom} onChange={(e) => setFormData({ ...formData, dateFrom: formatDate(e.target.value) })} />
            </Grid>

            <Grid item xs={6}>
                <TextField fullWidth label="To" type="date" InputLabelProps={{ shrink: true }} value={formData.dateTo} onChange={(e) => setFormData({ ...formData, dateTo: formatDate(e.target.value) })} />
            </Grid>

            <Button className={classes.button} variant="outlined" color="primary" fullWidth onClick={filterTransactions}>Filter</Button>

        </Grid>
    )
}

export default EntryForm
