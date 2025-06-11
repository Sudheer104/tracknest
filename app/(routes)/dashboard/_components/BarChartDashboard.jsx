import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function BarChartDashboard({ budgetList }) {
  return (
        <div className='border rounded-lg p-5 '>
          <h2 className='font-bold text-lg'>Activity</h2>
          <BarChart
        width={500}
        height={300}
        data={budgetList}
        margin={{
          top:7
        }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalSpend" stackId="a" fill="#9400D3" />
          <Bar dataKey="amount" stackId="a" fill="#00FF00" />
        </BarChart>
        </div>
  );
}

export default BarChartDashboard;
