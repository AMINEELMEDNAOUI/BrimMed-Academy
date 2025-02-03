import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale, CategoryScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faPen, faAngleDown, faUserCog, faChalkboardTeacher, faUserGraduate,  faList,faClock, faBullhorn, faTh, faCreditCard, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

ChartJS.register(LinearScale, CategoryScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState({
        numberOfStudents: 0,
        numberOfProfs: 0
    });

    useEffect(() => {
        fetchData();
    }, []); 

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/dashboard/stats');
            console.log('Response from API:', response.data);
            const data = response.data;

            // Assurez-vous que les données sont un tableau et non NaN
            if (Array.isArray(data) && data.length >= 2) {
                const numStudents = parseInt(data[0]);
                const numProfs = parseInt(data[1]);

                // Vérifiez si la conversion a réussi
                if (!isNaN(numStudents) && !isNaN(numProfs)) {
                    setDashboardData({
                        numberOfStudents: numStudents,
                        numberOfProfs: numProfs
                    });
                } else {
                    console.error('Invalid data received from API:', response.data);
                    alert('Invalid data received from API');
                }
            } else {
                console.error('Unexpected data format received from API:', response.data);
                alert('Unexpected data format received from API');
            }
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            alert('Error fetching dashboard data');
        }
    };

    // Log data after setting it
    console.log('Dashboard Data:', dashboardData);

    const data = {
        labels: ['Students', 'Teachers'],
        datasets: [
            {
                label: 'Number of People',
                backgroundColor: ['rgba(75,192,192,1)', 'rgba(255,99,132,1)'],
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 1,
                data: [dashboardData.numberOfStudents, dashboardData.numberOfProfs]
            }
        ]
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            title: {
                display: true,
                text: 'Number of Students and Teachers',
                fontSize: 20
            },
            legend: {
                display: true,
                position: 'bottom'
            }
        }
    };

    return (
        <div className="dashboard-container">
            <h2>Admin Dashboard</h2>
            <div className="chart">
                <Bar data={data} options={options} />
            </div>
            <div className="data-summary">
                <p> <FontAwesomeIcon icon={faUserGraduate} className='etudic'/> Students: {dashboardData.numberOfStudents}</p>
                <p> <FontAwesomeIcon icon={faChalkboardTeacher} className='profic'/> Teachers: {dashboardData.numberOfProfs}</p>
            </div>
        </div>
    );
};

export default Dashboard;
