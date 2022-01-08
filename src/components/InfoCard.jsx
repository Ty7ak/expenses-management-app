import React from 'react'

const isIncome = Math.round(Math.random)

const InfoCard = () => {
    return (
        <div style={{ textAlign: 'center', padding: '0 10%' }}>
            Try saying: <br />
            Add {isIncome ? 'Income ' : 'Expense '}
            for 100
            in category {isIncome ? 'Salary ' : 'Pets'}
            for next Monday
        </div>
    )
}

export default InfoCard
