import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = 'https://www.alphavantage.co';
const apiKey = '7BN70184CHWM8DDN'   /// alphavantage.co

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: (newsCategory) => (
                // filtrelu hamar petqa grel ` tickers=CRYPTO:BTC  BTC-bitcoin,ETH-ethereum
                { url: `/query?function=NEWS_SENTIMENT&tickers=${newsCategory ? `CRYPTO:${newsCategory}` : 'AAPL'}&apikey=${apiKey}` }
            )
        })
    })
})

export const {
    useGetCryptoNewsQuery
} = cryptoNewsApi