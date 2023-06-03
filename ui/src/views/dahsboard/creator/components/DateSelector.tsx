import {Button, Flex, FormLabel, Input, Spinner, Text, useColorModeValue} from "@chakra-ui/react";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import moment from "moment";

import {useDeleteExerciseMutation, useStartExercisesMutation} from "../../../../services/competitionService";
import FormBottom from "../../../../components/BoxAlert/FormBottom";

export default function DateSelector(props: {
    exercise: Exercise,
    onClose: () => void,
}) {
    const {exercise, onClose} = props;
    const textColor = useColorModeValue('secondaryGray.900', 'white');
    const brandStars = useColorModeValue("brand.500", "brand.400");
    const {register, handleSubmit} = useForm()
    const [startExercise, {isLoading: isLoadingStart}] = useStartExercisesMutation()
    const [deleteExercise, {isLoading: isLoadingDeletion}] = useDeleteExerciseMutation()
    const startDate = exercise.start ? moment(exercise.start) : moment()
    const endDate = exercise.end ? moment(exercise.end) : moment()
    const deleteButtonColor = useColorModeValue("red.500", "red.500")

    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)
    const submitForm = (data: CompetitionSchedule) => {
        // @ts-ignore
        const startDate = moment(data.startDate + "T" + data.startTime, "YYYY-MM-DDTHH:mm:ss")
        const endDate = moment(data.endDate + "T" + data.endTime, "YYYY-MM-DDTHH:mm:ss")


        if (startDate.isBefore(moment())) {
            setErrorMessage("La date de départ ne doit pas être avant l'heure actuelle, veuillez commencer au moins 1 minutes après l'heure actuelle")
            return
        }
        if (startDate.isAfter(endDate)) {
            setErrorMessage("La date de fin doit être après la date de départ")
            return
        } else if (startDate.isSame(endDate)) {
            setErrorMessage("La date de fin ne peut pas être la même que la date de départ")
            return
        }
        setErrorMessage(null)

        try {
            const competitionSchedule: CompetitionSchedule = {
                startDate: startDate.add(5, "minutes").format("YYYY-MM-DDTHH:mm:ss"),
                endDate: endDate.add(5, "minutes").format("YYYY-MM-DDTHH:mm:ss"),
                id: exercise.id
            }
            console.log(competitionSchedule)
            startExercise(competitionSchedule)
                .unwrap()
                .then(() => {
                    setSuccessMessage(`Compétition démarrée avec succès, veuillez 
                    patienter quelque instants pour voir la salle de compétition`)
                    setErrorMessage(null)
                })
                .catch((e) => {

                    console.log(e)
                    setErrorMessage(e.detail)
                })

        } catch (e: any) {
            console.log(e)
            setErrorMessage(e.detail)
            setSuccessMessage(null)
        }

    }
    const deleteExerciseHandler = () => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cette compétition ?") === true) {

            deleteExercise(exercise.id)
                .unwrap()
                .then(() => {
                    setSuccessMessage("Exercice supprimé avec succès")
                    setErrorMessage(null)
                    onClose()
                })
                .catch((e) => {
                    console.log(e)
                    setErrorMessage(e.detail)
                })
        }
    }
    return (
        <form onSubmit={handleSubmit(submitForm)}>
            <div>
                <FormLabel
                    display='flex'
                    ms='4px'
                    fontSize='sm'
                    fontWeight='500'
                    color={textColor}
                    mb='8px'>
                    Date de départ<Text color={brandStars}>*</Text>
                </FormLabel>
                <Flex>
                    <Input
                        isRequired={true}

                        variant='auth'
                        fontSize='sm'
                        ms={{base: "0px", md: "0px"}}
                        type='date'
                        mb='24px'
                        mr={'24px'}
                        fontWeight='500'
                        size='lg'
                        defaultValue={startDate.format("YYYY-MM-DD")}
                        {...register('startDate')}
                    />
                    <Input
                        isRequired={true}

                        variant='auth'
                        fontSize='sm'
                        ms={{base: "0px", md: "0px"}}
                        type='time'
                        placeholder='Maze'
                        mb='24px'
                        ml={'24px'}
                        fontWeight='500'
                        size='lg'
                        defaultValue={startDate.format("HH:mm")}
                        {...register('startTime')}
                    />
                </Flex>


                <FormLabel
                    display='flex'
                    ms='4px'
                    fontSize='sm'
                    fontWeight='500'
                    color={textColor}
                    mb='8px'>
                    Date de Fin<Text color={brandStars}>*</Text>
                </FormLabel>
                <Flex>
                    <Input
                        isRequired={true}
                        variant='auth'
                        fontSize='sm'
                        ms={{base: "0px", md: "0px"}}
                        type='date'
                        placeholder='Maze'
                        mb='24px'
                        mr={'24px'}
                        defaultValue={endDate.format("YYYY-MM-DD")}
                        fontWeight='500'
                        size='lg'
                        {...register('endDate')}


                    />
                    <Input
                        isRequired={true}
                        variant='auth'
                        fontSize='sm'
                        ms={{base: "0px", md: "0px"}}
                        type='time'
                        placeholder='Maze'
                        mb='24px'
                        ml={'24px'}
                        {...register('endTime')}
                        defaultValue={endDate.format("HH:mm")}
                        fontWeight='500'
                        size='lg'
                    />
                </Flex>
            </div>

            <FormBottom
                errorMessage={errorMessage}
                successMessage={successMessage}
                isLoading={isLoadingStart || isLoadingDeletion}
                mainButtonMessage={"Lancer la compétition (5 minutes de délai)"}

            />
            <Button
                bg={deleteButtonColor}

                type={"submit"}
                disabled={isLoadingStart || isLoadingDeletion || successMessage !== null}
                fontSize='sm'
                variant='brand'
                fontWeight='500'
                w='100%'
                h='50'
                onClick={deleteExerciseHandler}
                mb='24px'>
                {
                    isLoadingDeletion ? <Spinner mt={"5px"} ml={"20px"} size='lg'
                    /> : "Supprimer exercice\n"
                }
            </Button>

        </form>
    )
}