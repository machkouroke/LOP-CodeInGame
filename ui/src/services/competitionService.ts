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
        getAllExercises: builder.query({
            query: (kind: string | null) => ({
                url: '',
                params: {
                    kind: kind
                }
            }),
            providesTags: (result = [], error, arg) => {
                return [
                    'Exercise',
                    ...result.map((exercise: Exercise) => ({type: 'Exercise', id: exercise.id})),
                ]
            }
        }),
        getSpecificExercises: builder.query({
            query: (exercise_list: String[]) => ({
                url: ``,
                method: 'OPTIONS',
                body: {
                    data: exercise_list
                }
            }),
             providesTags: (result = [], error, arg) => {
                return [
                    'Exercise',
                    ...result.map((exercise: Exercise) => ({type: 'Exercise', id: exercise.id})),
                ]
            }
        })
        ,
        deleteExercise: builder.mutation({
            query: (exercice_id: string) => ({
                url: `/${exercice_id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Exercise'],

        }),
        getTeachersExercises: builder.query({
            query: (user_id: string) => ({
                url: `/${user_id}/users?kind=${ExerciseRelationKind.CREATOR}`,
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
                url: `/${exercise_id}`,
            })
        }),
        startExercises: builder.mutation({
            query: (data: CompetitionSchedule) => ({
                url: `/${data.id}/start`,
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
    useStartExercisesMutation,
    useDeleteExerciseMutation,
    useGetAllExercisesQuery,
    useGetSpecificExercisesQuery

} = exerciseApi