import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { Grid, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem, IconButton } from '@material-ui/core';
import { Add, Mic } from '@material-ui/icons'
import { ExpensesManagerContext } from '../../../context/context';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { v4 } from 'uuid';

import useStyles from './styles';
import { incomes, expenses } from '../../../categories/categoryTypes';
import parseDate from '../../../utils/parseDate';
import parseVoice from '../../../utils/parseVoice';
import { useRenderOnce } from '../../../utils/useRenderOnce';
import ConfirmSnackbar from '../../ConfirmSnackbar/ConfirmSnackbar';

const todayDate = new Date()

const emptyForm = {
    amount: '',
    category: '',
    type: 'Expense',
    date: parseDate(todayDate),
};

const NewTransactionForm = () => {
    const classes = useStyles();

    const [entryValues, setEntryValues] = useState(emptyForm);
    const { addTransaction } = useContext(ExpensesManagerContext);
    const [open, setOpen] = useState(false);
    const [visible, setVisible] = useState(true);

    const createTransaction = () => {
        if(Number.isNaN(Number(entryValues.amount))) return;
        if(entryValues.category === '') return;
        if(entryValues.amount === '') return;
        if(entryValues.date === '') return;
        const transaction = { ...entryValues, id: v4() };
        setOpen(true);
        addTransaction(transaction);
        setEntryValues(emptyForm);
    }
    
    const selectedCategories = entryValues.type === 'Income' ? incomes : expenses;

    const commands = [
        {
            command: ["Add * in category * for *"],
            callback: (voiceType, voiceCategory, voiceAmount) =>
            setEntryValues({...entryValues, type: parseVoice(voiceType), category: parseVoice(voiceCategory), amount: Number(parseVoice(voiceAmount))}),
        },       
        
        {
            command: ["Change type to *"],
            callback: (voiceType) => setEntryValues({...entryValues, type: parseVoice(voiceType)}),
        },

        {
            command: ["Change category to *"],
            callback: (voiceCategory) => setEntryValues({...entryValues, category: parseVoice(voiceCategory)}),
        },
        {
            command: ["Change amount to *"],
            callback: (voiceAmount) => setEntryValues({...entryValues, amount: Number(parseVoice(voiceAmount))}),
        },

        {
            command: ["Create transaction.", "Add transaction."],
            callback: () => createTransaction(),
        },
    ];
    const {transcript, browserSupportsSpeechRecognition} = useSpeechRecognition({commands});

    const firstRender = useRenderOnce();    
    
    useEffect(() => {
        if (firstRender) {
            if (!browserSupportsSpeechRecognition) {
                setVisible(false);
            }
        }
    }, [firstRender]);

    return (
        <Grid container spacing = {2}>
            <ConfirmSnackbar open={open} setOpen={setOpen} content={"Transaction added successfully."}/>
            <Grid item xs={12}>
                <Typography align="center" variant="subtitle2" gutterBottom>
                   {visible? transcript : "Michrophone feature not supported on this browser!"}
                </Typography>
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
            <Grid item xs={9}>
                <Button className={classes.button} variant="contained" color="primary" endIcon={<Add />} fullWidth onClick={createTransaction}>Create</Button>
            </Grid>
            <Grid item xs={3}>
                <IconButton className={classes.microphoneButton} open={visible} variant="contained" color="primary" onClick={SpeechRecognition.startListening}><Mic /></IconButton>
            </Grid>
        </Grid>
    )
}

export default NewTransactionForm
