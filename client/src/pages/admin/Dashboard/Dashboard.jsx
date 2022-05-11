import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import dashboardApi from "../../../api/dashboard"

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)


const Dashboard = () => {
    const [userData, setUserData] = useState([])
    const getData = async () => {
        try {
            const response = await dashboardApi.getDashboard();
            console.log(response);
            setUserData(response.data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getData();
    }, [])
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'New users Line Chart',
            },
        },
    };

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    const data = {
        labels,
        datasets: [
            {
                label: 'New users',
                data: userData,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };
    console.log(data)
    return (
        <>  
            <Line options={options} data={data} />
        </>
    )
}

export default Dashboard