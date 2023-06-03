import HistoryItem from './HistoryItem';
import {useGetSpecificExercisesQuery, useGetTeachersExercisesQuery} from "../../../../services/competitionService";
import {ThreeLine} from "../../../../components/skeleton/skeleton";
import React from 'react';
import {Alert, AlertDescription, AlertIcon, AlertTitle, Spinner} from "@chakra-ui/react";

export default function UserHistory(props: {
    exercises: ExerciseRelation[];
}) {
    const {data, isLoading, isError, error, isFetching} =
        useGetSpecificExercisesQuery(props.exercises.map(
            (item) => item.exercise_id
        ));

    const exercises = isLoading ? [] : data as Exercise[];
    console.log("exercises", exercises)
    if (isError) {
        return <Alert status='error'>
            <AlertIcon/>
            <AlertDescription>Une Erreur est survenue</AlertDescription>
        </Alert>
    }
    if (isLoading) {
        return (
            <Spinner mt={"5px"} ml={"20px"} size='lg'/>)
    }
    if (exercises.length === 0) {
        return (<Alert status='success'>
            <AlertIcon/>
            Vous n'aviez pas encore participé à une compétition
        </Alert>)
    }
    return (
        <React.Fragment>
            {exercises.map((item, index) => {
                return <HistoryItem name={item.name} author={item.owner_name} date={item.created_at}/>
            })}
        </React.Fragment>

    )

}