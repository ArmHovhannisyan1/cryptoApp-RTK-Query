import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../services/cryptoApi';
import { Col, Row, Select, Typography } from 'antd';
import millify from 'millify';
import {
    MoneyCollectOutlined,
    FundOutlined,
    NumberOutlined,
    ThunderboltOutlined,
    DollarCircleOutlined,
    TrophyOutlined,
    StopOutlined,
    CheckOutlined,
    ExclamationCircleOutlined,
} from '@ant-design/icons'
import LineChart from './LineChart';
import Loader from './Loader';

const { Title, Text } = Typography

const CryptoDetails = () => {
    const [timePeriod, setTimePeriod] = useState('24h')
    const { coinId } = useParams()
    const { data: cryptoDetails, isFetching } = useGetCryptoDetailsQuery(coinId)
    const { data: coinHistory } = useGetCryptoHistoryQuery({ coinId, timePeriod })
    const detail = cryptoDetails?.data?.coin

    const stats = [
        { title: 'Price to USD', value: `$ ${detail?.price && millify(detail?.price)}`, icon: <DollarCircleOutlined /> },
        { title: 'Rank', value: detail?.rank, icon: <NumberOutlined /> },
        { title: '24h Volume', value: `$ ${detail?.['24hVolume'] && millify(detail?.['24hVolume'])}`, icon: <ThunderboltOutlined /> },
        { title: 'Market Cap', value: `$ ${detail?.marketCap && millify(detail?.marketCap)}`, icon: <DollarCircleOutlined /> },
        { title: 'All-time-high(daily avg.)', value: `$ ${detail?.allTimeHigh?.price && millify(detail?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
    ];

    const genericStats = [
        { title: 'Number Of Markets', value: detail?.numberOfMarkets, icon: <FundOutlined /> },
        { title: 'Number Of Exchanges', value: detail?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
        { title: 'Aprroved Supply', value: detail?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
        { title: 'Total Supply', value: `$ ${detail?.supply?.total && millify(detail?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
        { title: 'Circulating Supply', value: `$ ${detail?.supply?.circulating && millify(detail?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
    ];

    const time = ['1h', '3h', '12h', '24h', '7d', '30d', '3m', '1y', '3y', '5y'] // Allowed values: 3h 24h 7d 30d 3m 1y 3y 5y
    return (
        isFetching ? <Loader/> :
            <Col className='coin-detail-container'>
                <Col className='coin-heading-container'>
                    <Title level={3} className='coin-name'>
                        {detail.name} Price
                    </Title>
                    <p>{detail.name} live price in US dollars.View value statistics, market cap and </p>
                </Col>
                <Select
                    defaultValue='24h'
                    className='select-timeperiod'
                    placeholder='Select Time Period'
                    onChange={(value) => setTimePeriod(value)}
                >
                    {time.map((date) => <Select.Option key={date}>{date}</Select.Option>)}
                </Select>
                <LineChart
                    coinHistory={coinHistory}
                    coinPrice={millify(detail.price)}
                    coinName={detail.name}
                />
                <Col className='stats-container'>
                    <Col className='coin-value-statistics'>
                        <Col className='coin-value-statistics-heading'>
                            <Title level={3} className='coin-detailes'>
                                {detail.name} Value statistics
                            </Title>
                            <p>
                                An overview showing the stats of {detail.name}
                            </p>
                        </Col>
                        {stats.map(({ title, value, icon }, i) => (
                            <Col className='coin-stats' key={i}>
                                <Col className='coin-stats-name'>
                                    <Text>{icon}</Text>
                                    <Text>{title}</Text>
                                </Col>
                                <Text className='stats'>{value}</Text>
                            </Col>
                        ))}
                    </Col>
                    <Col className='other-stats-info'>
                        <Col className='coin-value-statistics-heading'>
                            <Title level={3} className='coin-detailes'>
                                Other statistics
                            </Title>
                            <p>
                                An overview showing the stats of cryptocurrencies
                            </p>
                        </Col>
                        {genericStats.map(({ title, value, icon }, i) => (
                            <Col className='coin-stats' key={i}>
                                <Col className='coin-stats-name'>
                                    <Text>{icon}</Text>
                                    <Text>{title}</Text>
                                </Col>
                                <Text className='stats'>{value}</Text>
                            </Col>
                        ))}
                    </Col>
                </Col>
                <Col className='coin-desc-link'>
                    <Col className='coin-links'>
                        <Title level={3} className='coin-details-heading'>
                            {detail.name} Links
                        </Title>
                        {detail.links.map((link, i) => (
                            <Row className='coin-link' key={i}>
                                <Title level={5} className='link-name'>
                                    {link.type}
                                </Title>
                                <a href={link.url}>
                                    {link.name}
                                </a>
                            </Row>
                        ))}
                    </Col>
                </Col>
            </Col>
    );
};

export default CryptoDetails;