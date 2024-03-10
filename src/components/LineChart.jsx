import { Col, Row, Typography } from 'antd';
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
} from 'chart.js'

const { Title } = Typography

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
)

const LineChart = ({ coinHistory, coinPrice, coinName }) => {
    const coinHistoryPrice = []
    const coinHistoryTimestamp = []

    for (let i = 0; i < coinHistory?.data.history.length; i+=1) {
        coinHistoryPrice.push(coinHistory.data.history[i].price);
        coinHistoryTimestamp.push(new Date(coinHistory.data.history[i].timestamp).toLocaleDateString())
    }

    const data = {
        labels: coinHistoryTimestamp,
        datasets: [
            {
                label: 'Price in USD',
                data: coinHistoryPrice,
                fill: false,
                backgroundColor: '#0071bd',
                borderColor: '#0071bd',
            }
        ]
    }

    const options = {
        scales: {
            y: {
                ticks: {
                    beginAtZero: true
                }
            }
        }
    }

    return (
        <>
            <Row className='chart-header'>
                <Title level={2} className='chart-title'>{coinName} Price Chart</Title>
                <Col className='price-container'>
                    <Title level={5} className='price-change'>{coinHistory?.data.change}%</Title>
                    <Title level={5} className='current-price'>{coinName} Price: $ {coinPrice}</Title>
                </Col>
            </Row>
            <Line data={data} options={options} />
        </>
    );
};

export default LineChart;