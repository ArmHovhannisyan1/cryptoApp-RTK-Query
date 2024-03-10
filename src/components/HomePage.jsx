import { Col, Row, Statistic, Typography } from 'antd';
import React, { useEffect } from 'react';
import { useGetCryptosQuery } from '../services/cryptoApi';
import millify from 'millify';  ///  Մեծ թվերը դարձնումա ,հեշտ կարդացվող տվեր, օր ՝ 1,000,000,000 կլինի 1B
import { CryptoCurrencies, News } from '../components';
import { Link } from 'react-router-dom';
import Loader from './Loader';

const { Title } = Typography

const HomePage = () => {
    const { data, isFetching, error } = useGetCryptosQuery(10);
    const stats = data?.data?.stats

    if (error) {
        console.error('Error fetching data:', error);
        return <h1>Error fetching data. Please try again later.</h1>;
    }

    return (
        isFetching ? <Loader/> :
        <>
            <Title level={2} className='heading'>Global Crypto Store</Title>
            <Row>
                <Col span={12}><Statistic title='Total Cryptocurrencies' value={stats.total} /></Col>
                <Col span={12}><Statistic title='Total Exchanges' value={millify(stats.totalExchanges)} /></Col>
                <Col span={12}><Statistic title='Total Market Cap' value={millify(stats.totalMarketCap)} /></Col>
                <Col span={12}><Statistic title='Total 24th Volume' value={millify(stats.total24hVolume)} /></Col>
                <Col span={12}><Statistic title='Total Markets' value={millify(stats.totalMarkets)} /></Col>
            </Row>
            <div className="home-heading-container">
                <Title level={2} className='home-title'>Top 10 Cryptocurrencies in the world</Title>
                <Title level={3} className='show-more'><Link to='/cryptocurrencies'>Show More</Link></Title>
            </div>
            <CryptoCurrencies simplified /> { /* Երբ որ HomePage-ում ենք simplified-ը true-ա,իսկ CryptoCurrencies,News componentnerum undefined */}
            <div className="home-heading-container">
                <Title level={2} className='home-title'>Latest Crypto News</Title>
                <Title level={3} className='show-more'><Link to='/news'>Show More</Link></Title>
            </div>
            <News simplified />
        </>
    );
};

export default HomePage;