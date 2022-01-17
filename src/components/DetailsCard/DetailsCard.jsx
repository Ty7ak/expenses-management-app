import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

import useTransactions from '../../utils/useTransactions';
import useStyles from './styles';

import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const DetailsCard = ({ transactionType }) => {
 
    const classes = useStyles();
    const { typeTotal, pieData } = useTransactions(transactionType);

    return (
        <Card className={classes.detailsCard} raised={true}>
            <Typography
                variant="h4"
                style={{marginTop: "15px"}}
            > {transactionType}s
            </Typography>
            <CardContent>
                <Typography variant="h4">{transactionType === 'Expense'? "-" : "+"}{typeTotal}</Typography>
                <Pie data={pieData} />
            </CardContent>
        </Card>
    )
}

export default DetailsCard
