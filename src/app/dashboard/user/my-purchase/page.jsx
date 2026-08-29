import PaymentTable from '@/Component/UI/PaymentTable';
import { getPaymentDetailById } from '@/lib/api/recipes';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

const MyPurchasePage = async() => {
    const userSession = await auth.api.getSession({
        headers: await headers()
       }) 

       const user = userSession?.user
    const purchases = await getPaymentDetailById(user?.id)
    // console.log(res);
    return (    
        <div>   
            <PaymentTable purchases={purchases}></PaymentTable>
              
        </div>
    );
};

export default MyPurchasePage;  