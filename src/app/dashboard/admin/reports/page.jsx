import ReportTable from '@/Component/UI/ReportTable';
import { getReport } from '@/lib/api/recipes';
import React from 'react';

const ReportsPage = async() => {
    const reports = await getReport()
    console.log(reports);
    return (
        <div>
            <ReportTable reports={reports}></ReportTable>
        </div>
    );
};

export default ReportsPage;