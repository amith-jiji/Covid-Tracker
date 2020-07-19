import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';

import { fetchDailyData } from '../../api';

import styles from './Chart.module.css';

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchMyAPI = async () => {
            const initialDailyData = await fetchDailyData();

            setDailyData(initialDailyData);
        };

        fetchMyAPI();
    },[]);

    const lineChart = (
        dailyData.length
            ? (
                <Line
                    data={{
                        labels: dailyData.map(({ date }) => date),
                        datasets: [{
                            data: dailyData.map(({ confirmed }) => confirmed),
                            label: 'Infected',
                            borderColor: '#3333ff',
                            fill: true,
                        }, {
                            data: dailyData.map(({ deaths }) => deaths),
                            label: 'Deaths',
                            borderColor: 'red',
                            backgroundColor: 'rgba(255, 0, 0, 0.5)',
                            fill: true,
                        },
                        ],
                    }}
                    options={{
                        legend: {
                            labels: {
                                fontColor: '#C5CAE9'
                            }
                        },
                        scales: {
                            xAxes: [
                                {
                                    gridLines: {
                                        color: "#455a64"
                                    },
                                    ticks: {
                                        fontColor: "#C5CAE9",
                                        fontSize: 12
                                    }
                                }],
                            yAxes: [
                                {
                                    gridLines: {
                                        color: "#455a64"
                                    },
                                    ticks: {
                                        fontColor: "#C5CAE9",
                                        fontSize: 12
                                    }
                                }]
                        }
                    }}
                />
            ) : null
    );

    const barChart = (
        confirmed ? (
            <Bar
                data={{
                    labels: ['Infected', 'Recovered', 'Deaths'],
                    datasets: [
                        {
                            label: 'People',
                            backgroundColor: ['rgba(0, 0, 255,0.8)', 'rgba(0, 255, 0,0.8)', 'rgba(255, 0, 0,0.8)'],
                            data: [confirmed.value, recovered.value, deaths.value],
                        },
                    ],
                }}
                options={{
                    legend: { display: false },
                    title: { display: true, text: `Current state in ${country}`, fontColor: '#C5CAE9', fontSize: 14 },
                    scales: {
                        xAxes: [
                            {
                                gridLines: {
                                    color: "#455a64"
                                },
                                ticks: {
                                    fontColor: "#C5CAE9",
                                    fontSize: 12
                                }
                            }],
                        yAxes: [
                            {
                                gridLines: {
                                    color: "#455a64"
                                },
                                ticks: {
                                    fontColor: "#C5CAE9",
                                    fontSize: 12
                                }
                            }]
                    }
                }}
            />
        ) : null
    );

    return (
        <div className={styles.container}>
            {country ? barChart : lineChart}
        </div>
    );
};

export default Chart;