import React, { useEffect, useState } from 'react';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { Card, Col, Input, Row, Typography } from 'antd';
import { Link, createPath } from 'react-router-dom';
import millify from 'millify';
import Loader from './Loader';

const CryptoCurrencies = ({ simplified }) => {
    const count = simplified ? 10 : 99

    const { data: cryptosList, isFetching } = useGetCryptosQuery(count)
    const [cryptos, setCryptos] = useState([])

    const [searchCurrency, setSearchCurrency] = useState('')
    
    useEffect(() => {
        const filteredCrypto = cryptosList?.data?.coins.filter(item => item.name.toLowerCase().includes(searchCurrency.toLowerCase()))
        setCryptos(filteredCrypto)
    }, [cryptosList, searchCurrency])

    const handleSearchChange = (e) => {
        setSearchCurrency(e.target.value)
    }

    return (
        isFetching ? <Loader /> :
            <>
                {!simplified &&
                    <div className="search-crypto">
                        <Input
                            placeholder='Search Cryptocurrency'
                            onChange={handleSearchChange}
                        />
                    </div>}
                <Row gutter={[32, 32]} className='crypto-card-container'>
                    {cryptos &&
                        cryptos.length === 0 ?
                        <Typography.Title className='search-not-found' level={3}>Nothing found after searching: <i>{searchCurrency}</i></Typography.Title> :
                        cryptos?.map((currrency) => (
                            <Col className='crypto-card' xs={24} sm={12} lg={6} key={currrency.uuid}>
                                <Link to={`/crypto/${currrency.uuid}`}>
                                    <Card
                                        title={`${currrency.rank}. ${currrency.name}`}
                                        extra={<img className='crypto-image' src={currrency.iconUrl} />}
                                        hoverable
                                    >
                                        <p>Price: {millify(currrency.price)}</p>
                                        <p>Market Cap: {millify(currrency.marketCap)}</p>
                                        <p>Daily Change: {millify(currrency.change)}</p>
                                    </Card>
                                </Link>
                            </Col>
                        ))}
                </Row>
            </>
    );
};

export default CryptoCurrencies;