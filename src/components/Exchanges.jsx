import React from 'react';
import { useGetCryptoExchangesQuery } from '../services/cryptoExchangesApi';
import { Col, Collapse, Row } from 'antd';
import HTMLReactParser from 'html-react-parser';
import millify from 'millify';
import Loader from './Loader';

const Exchanges = () => {
    const { data: cryptosExchanges, isFetching } = useGetCryptoExchangesQuery()

    const sortedExchanges = cryptosExchanges?.slice().sort((a, b) => {
        if (a.reported_rank === null && b.reported_rank === null) {
            return 0; 
        } else if (a.reported_rank === null) {
            return -1;
        } else if (b.reported_rank === null) {
            return 1; 
        } else {
            return a.reported_rank - b.reported_rank;
        }
    });
    const filteredExchanges = sortedExchanges?.filter(exchange => exchange.reported_rank !== null);

    const items = filteredExchanges?.map((exchange) => (
        {
            key: exchange.id,
            label: (
                <>
                    <p>{exchange.reported_rank}. {exchange.name}</p>
                    <p>{millify(exchange.quotes.USD.reported_volume_24h)}</p>
                    <p>{millify(exchange.markets)}</p>
                    <p>{millify(parseInt(exchange.sessions_per_month || 0))}</p>
                </>
            ),
            children: <p>{HTMLReactParser(exchange.description || '')}</p>,
            showArrow: false
        }
    ))
    return (
        isFetching ? <Loader/> :
            <>
                <Row>
                    <Col span={6}>Exchanges</Col>
                    <Col span={6}>24h Trade Volume</Col>
                    <Col span={6}>Markets</Col>
                    <Col span={6}>SSP (Sessions Per Month)</Col>
                </Row>
                <Row>
                    <Col span={24} >
                        <Collapse items={items} />
                    </Col>
                </Row>
            </>
    );
};

export default Exchanges;
