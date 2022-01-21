import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { Grid, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { Add } from '@material-ui/icons'
import { ExpensesManagerContext } from '../../../context/context';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { v4 } from 'uuid';

import useStyles from './styles';
import { incomes, expenses } from '../../../categories/categoryTypes';
import parseDate from '../../../utils/parseDate';
import ConfirmSnackbar from '../../ConfirmSnackbar/ConfirmSnackbar';

import { useSpeechContext } from '@speechly/react-client';

const todayDate = new Date()

const emptyForm = {
    amount: 0,
    category: '',
    type: 'Expense',
    date: parseDate(todayDate),
};

const NewTransactionForm = () => {
    const classes = useStyles();

    const [entryValues, setEntryValues] = useState(emptyForm);
    const { addTransaction } = useContext(ExpensesManagerContext);
    const { segment } = useSpeechContext();
    const [open, setOpen] = useState(false);

    const createTransaction = () => {
        if(Number.isNaN(Number(entryValues.amount))) return;
        const transaction = { ...entryValues, amount: entryValues.amount, id: v4() };
        setOpen(true);
        addTransaction(transaction);
        setEntryValues(emptyForm);
    }

    useEffect(() => {
        if(segment) {
            if(segment.intent.intent === 'add_expense') {
                setEntryValues({ ...entryValues, type: 'Expense' });
            } else if(segment.intent.intent === 'add_income') {
                setEntryValues({ ...entryValues, type: 'Income' })
            } 

            segment.entities.forEach((e) => {
                const category = `${e.value.charAt(0)}${e.value.slice(1).toLowerCase()}`
                switch (e.type) {
                    case 'amount':
                        setEntryValues({ ...entryValues, amount: Number(e.value)})
                        break;
                    case 'category':
                        if(incomes.map((iC) => iC.type).includes(category)) {
                            setEntryValues({ ...entryValues, type: 'Income', category })
                        } else if(expenses.map((iC) => iC.type).includes(category)) {
                            setEntryValues({ ...entryValues, type: 'Expense', category })
                        }
        
                        break;
                    case 'date':
                        setEntryValues({ ...entryValues, date: e.value})
                        break;
                    default:
                        break;
                }
                
            });
            
            if(segment.isFinal && entryValues.amount && entryValues.category && entryValues.type && entryValues.date) {
                createTransaction();
            }
        }
    }, [segment]);
    
    const selectedCategories = entryValues.type === 'Income' ? incomes : expenses;

    const commands = [
        {
            command: ["Type *"],
            callback: (voiceType) => setEntryValues({...entryValues, type: voiceType}),
        },
    ];
    const {transcript, browserSupportsSpeechRecognition} = useSpeechRecognition({commands});

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesnt support</span>
    }

    return (
        <Grid container spacing = {2}>
            <ConfirmSnackbar open={open} setOpen={setOpen} content={"Transaction added successfully."}/>
            <Grid item xs={12}>
                <Typography align="center" variant="subtitle2" gutterBottom>
                    Transcript: {transcript}
                </Typography>
                <Button onClick={SpeechRecognition.startListening}>Start</Button>
            </Grid>

            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Type</InputLabel>                    
                    <Select value={entryValues.type} onChange={(e) => setEntryValues({ ...entryValues, type: e.target.value })}>
                        <MenuItem value="Income">Income</MenuItem>
                        <MenuItem value="Expense">Expense</MenuItem>
                    </Select>
                </FormControl>
            </Grid>

            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select value={entryValues.category} onChange={(e) => setEntryValues({ ...entryValues, category: e.target.value })}>
                        {selectedCategories.map((c) => <MenuItem key={c.type} value={c.type}>{c.type}</MenuItem>)}
                    </Select>
                </FormControl>
            </Grid>

            <Grid item xs={6}>
                <TextField style={{}}type="number" label="Amount" fullWidth value={entryValues.amount} onChange={(e) => setEntryValues({ ...entryValues, amount: Number(e.target.value) })} />
            </Grid>

            <Grid item xs={6}>
                <TextField fullWidth label="Date" type="date" value={entryValues.date} onChange={(e) => setEntryValues({ ...entryValues, date: parseDate(e.target.value) })} />
            </Grid>

            <Button className={classes.button} variant="contained" color="primary" endIcon={<Add />} fullWidth onClick={createTransaction}>Create</Button>

        </Grid>
    )
}

export default NewTransactionForm
