import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = 'https://coinranking1.p.rapidapi.com'
export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', 'ca21ce2670msh4de79a6d4251bf1p12c43ejsnca1bcc945989');
            headers.set('X-RapidAPI-Host', 'coinranking1.p.rapidapi.com');
            return headers
        }
    }),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: (count) => ({ url: `/coins?limit=${count}` }),
            // timeout: 1000
        }),
        getCryptoDetails: builder.query({
            query: (coinId) => ({ url: `/coin/${coinId}` }),
        }),
        getCryptoHistory: builder.query({
            query: ({ coinId, timePeriod }) => ({ url: `/coin/${coinId}/history/?timePeriod=${timePeriod}` }),
        })
    })
})

export const {
    useGetCryptosQuery,
    useGetCryptoDetailsQuery,
    useGetCryptoHistoryQuery,
} = cryptoApi