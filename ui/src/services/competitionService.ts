
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {BASE_URL} from "../config";


export const competitionApi = createApi({
    reducerPath: 'competitionApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}`,
        prepareHeaders: (headers, {getState}) => {
            // @ts-ignore
            const token = getState().authentication.userToken
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    endpoints: (builder) => ({
        addCompetition: builder.mutation({
            query: (data: CompetitionPost) => ({
                url: '/exos/add',
                method: 'POST',
                body: data,
            }),
        }),
        getTeachersCompetitions: builder.query({
            query: (data: string) => ({
                url: `/users/own_exos`,
            })
        })
    })
})

export const {useAddCompetitionMutation} = competitionApi