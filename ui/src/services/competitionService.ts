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
    tagTypes: ['Competition'],
    endpoints: (builder) => ({
        addCompetition: builder.mutation({
            query: (data: CompetitionPost) => ({
                url: '/exos/add',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Competition'],

        }),
        getTeachersCompetitions: builder.query({
            query: () => ({
                url: `/users/own_exos`,
            }),
            providesTags: (result = [], error, arg) => {
                return [
                    'Competition',
                    ...result.map((competition: Competition) => ({type: 'Competition', id: competition.id})),
                ]
            }
        }),

        participate: builder.mutation({
            query: (exo_id: string) => ({
                url: `/users/participate`,
                method: 'POST',
                body: {exo_id},
            })
        }),
        getCompetitions: builder.query({
            query: (competition_id: string) => ({
                url: `/exos/${competition_id}`,
            })
        }),
        startCompetition: builder.mutation({
            query: (data: CompetitionSchedule) => ({
                url: `/exos/${data.id}/start`,
                method: 'PATCH',
                body: {
                    start: data.startDate,
                    end: data.endDate,
                },
            }),
            invalidatesTags: (result, error, arg) => [{type: 'Competition', id: arg.id}],

        })

    })
})

export const {
    useAddCompetitionMutation,
    useGetTeachersCompetitionsQuery,
    useParticipateMutation,
    useGetCompetitionsQuery,
    useStartCompetitionMutation
} = competitionApi