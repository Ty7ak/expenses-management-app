import React, { useEffect } from 'react';
import { Card, CardHeader, CardContent, Typography } from '@material-ui/core';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';

import { API, graphqlOperation  } from 'aws-amplify';
import { listTransactions } from '../../graphql/queries';

import useTransactions from '../../useTransactions';
import useStyles from './styles';

const DetailsCard = ({ title }) => {

    // async function fetchTransactions() {
    //     console.log("Fetching Data");
    //     const transactions = await API.graphql(graphqlOperation(listTransactions));    
    //     let data = transactions.data.listTransactions.items;
    //     console.log(data);
    //     localStorage.setItem('transactions', JSON.stringify(data));
    // };  
      
    // useEffect(() => {
    //     fetchTransactions();
    // }, []);
    

    const classes = useStyles();
    const { total, chartData } = useTransactions(title);

    return (
        <Card className={title === 'Income' ? classes.income : classes.expense}>
            <CardHeader title={title} />
            <CardContent>
                <Typography variant="h4">${total}</Typography>
                <Doughnut data={chartData} />
            </CardContent>
        </Card>
    )
}

export default DetailsCard
