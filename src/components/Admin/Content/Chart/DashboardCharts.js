import React from 'react';
import { Line } from 'react-chartjs-2'; // For the line chart
import { Bar } from 'react-chartjs-2'; // For the bar chart
import { BsThreeDotsVertical } from "react-icons/bs";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement,
} from 'chart.js';

// Register components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement
);

const DashboardCharts = () => {
    // Sample data for Earnings Breakdown (Line Chart)
    const earningsData = {
        labels: ['Jan', '', 'Mar', '', 'May', '', 'Jul', '', 'Sep', '', 'Nov', ''],
        datasets: [
            {
                label: 'Earnings Breakdown',
                data: [0, 10000, 5000, 15000, 10000, 20000, 15000, 25000, 20000, 30000, 25000, 35000],
                borderColor: 'blue',
                backgroundColor: 'rgba(0, 123, 255, 0.2)',
                fill: true,
                tension: 0.5,
            },
        ],
    };

    // Sample data for Monthly Revenue (Bar Chart)
    const revenueData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
            {
                label: 'Monthly Revenue',
                data: [5000, 10000, 8000, 12000, 15000, 14000],
                backgroundColor: 'blue',
            },
        ],
    };

    return (
        <div className="row mb-4">
            <div className="col-12 col-md-6">
                <div className="card shadow border-0">
                    <div className="card-header">
                        <h5 className="mb-0">Earnings Breakdown</h5>
                        <button className='btn btn-transparent-dark btn-icon'><BsThreeDotsVertical></BsThreeDotsVertical></button>
                    </div>
                    <div className="card-body">
                        <Line data={earningsData} options={{ responsive: true }} />
                    </div>
                </div>
            </div>

            <div className="col-12 col-md-6">
                <div className="card shadow border-0">
                    <div className="card-header">
                        <h5 className="mb-0">Monthly Revenue</h5>
                        <button className='btn btn-transparent-dark btn-icon'><BsThreeDotsVertical></BsThreeDotsVertical></button>
                    </div>
                    <div className="card-body">
                        <Bar data={revenueData} options={{ responsive: true }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardCharts;
