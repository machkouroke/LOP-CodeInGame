import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {BASE_URL} from "../config";
import {ExerciseRelationKind} from "../types/enum";


export const exerciseApi = createApi({
    reducerPath: 'exerciseApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/exercises`,
        prepareHeaders: (headers, {getState}) => {
            // @ts-ignore
            const token = getState().authentication.userToken
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    tagTypes: ['Exercise'],
    endpoints: (builder) => ({
        addExercise: builder.mutation({
            query: (data: CompetitionPost) => ({
                url: '',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Exercise'],

        }),
        getTeachersExercises: builder.query({
            query: (user_id: string) => ({
                url: `/${user_id}/users?kind=${ExerciseRelationKind.SUBSCRIBER}`,
            }),
            providesTags: (result = [], error, arg) => {
                return [
                    'Exercise',
                    ...result.map((exercise: Exercise) => ({type: 'Exercise', id: exercise.id})),
                ]
            }
        }),

        subscribe: builder.mutation({
            query: (exercise_id: string) => ({
                url: `/${exercise_id}/subscribe`,
                method: 'PATCH',
            })
        }),
        getExercises: builder.query({
            query: (exercise_id: string) => ({
                url: `/exercises/${exercise_id}`,
            })
        }),
        startExercises: builder.mutation({
            query: (data: CompetitionSchedule) => ({
                url: `/exercises/${data.id}/start`,
                method: 'PATCH',
                body: {
                    start: data.startDate,
                    end: data.endDate,
                },
            }),
            invalidatesTags: (result, error, arg) => [{type: 'Exercise', id: arg.id}],

        })

    })
})

export const {
    useAddExerciseMutation,
    useGetTeachersExercisesQuery,
    useSubscribeMutation,
    useGetExercisesQuery,
    useStartExercisesMutation
} = exerciseApi