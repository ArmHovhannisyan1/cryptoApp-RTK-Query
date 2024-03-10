import React, { useState } from 'react';
import { useGetCryptoNewsQuery } from '../services/crptoNewsApi';
import { Card, Col, Row, Select, Typography } from 'antd';
import moment from 'moment';
import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from './Loader';

const { Title, Text } = Typography

const News = ({ simplified }) => {
    const [newsCategory, setNewsCategory] = useState()
    const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery(newsCategory)
    const { data: cryptosList } = useGetCryptosQuery(99)

    const sliceRange = simplified ? [0, 6] : [0, 12];

    const handleSelectChange = (value) => {
        setNewsCategory(value);
    };

    return (
        isFetching ? <Loader /> :
            <>
                {!simplified &&
                    <Select
                        showSearch
                        className='select-news'
                        placeholder='Select a Crypto'
                        optionFilterProp='children'
                        onChange={handleSelectChange}
                        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        {cryptosList?.data?.coins.map((coin) => (
                            <Select.Option key={coin.uuid} value={coin.symbol}>{coin.name}</Select.Option>
                        ))}
                    </Select>
                }
                <Row gutter={[24, 24]}>
                    {cryptoNews.feed.slice(...sliceRange).map((news, i) => (
                        <Col xs={24} sm={12} lg={8} key={i} >
                            <Card hoverable className='news-card'>
                                <a href={news.url}>
                                    <div className="news-image-container">
                                        <Title className='news-title' level={4}>{news.title.length > 25 ? news.title.substring(0, 25) + '...' : news.title}</Title>
                                        <img className='img' src={news.banner_image} alt="" />
                                    </div>
                                    <p className='news-summary'>
                                        {news.summary.length > 150 ? news.summary.substring(0, 150) + '...' : news.summary}
                                    </p>
                                    <div className="provider-container">
                                        <div>
                                            <Text className='provider-name'>{news.source}</Text>
                                        </div>
                                        <Text>{moment(news.time_published).startOf('ss').fromNow()}</Text>
                                    </div>
                                </a>
                            </Card>
                        </Col>
                    ))}
                </Row >
            </>
    );
};

export default News;