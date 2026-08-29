import TransactionTable from '@/Component/UI/TransactionTable';
import { transaction } from '@/lib/api/action/payment';
import React from 'react';

const TransactionPage = async() => {
    const transactions = await transaction()
    console.log(transactions);
    return (
        <div>
            <TransactionTable transactions={transactions}></TransactionTable>
        </div>
    );
};

export default TransactionPage;