import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const options = {
//     method: 'GET',
//     headers: {
//         'X-RapidAPI-Key': 'ca21ce2670msh4de79a6d4251bf1p12c43ejsnca1bcc945989',
//         'X-RapidAPI-Host': 'coinpaprika1.p.rapidapi.com'
//     }
// };

const baseUrl = 'https://coinpaprika1.p.rapidapi.com'

export const cryptoExchangesApi = createApi({
    reducerPath: 'cryptoExchangesApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', 'ca21ce2670msh4de79a6d4251bf1p12c43ejsnca1bcc945989')
            headers.set('X-RapidAPI-Host', 'coinpaprika1.p.rapidapi.com')
            return headers
        }
    }),
    endpoints: (builder) => ({
        getCryptoExchanges: builder.query({
            query: () => ({url : `/exchanges`})
        })
    })
})

export const {
    useGetCryptoExchangesQuery
} = cryptoExchangesApi