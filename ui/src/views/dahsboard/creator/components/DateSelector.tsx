import {Box, Button, Flex, FormLabel, Input, Text, useColorModeValue} from "@chakra-ui/react";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import moment from "moment";
import SmoothBox from "../../../../components/SmoothBox/SmoothBox";
import {globalStyles} from "../../../../theme/styles";
import {useAddCompetitionMutation, useStartCompetitionMutation} from "../../../../services/competitionService";
import FormBottom from "../../../../components/BoxAlert/FormBottom";

export default function DateSelector(props: { competition: Exercise }) {
    const {competition, ...rest} = props;
    const textColor = useColorModeValue('secondaryGray.900', 'white');
    const brandStars = useColorModeValue("brand.500", "brand.400");
    const {register, handleSubmit} = useForm()
    const [startCompetition, {isLoading}] = useStartCompetitionMutation()
    const startDate = competition.start ? moment(competition.start) : moment()
    const endDate = competition.end ? moment(competition.end) : moment()

    const [errorMessage, setErrorMessage] = useState(null)
    const [sucessMessage, setSucessMessage] = useState(null)
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
                id: competition.id
            }
            startCompetition(competitionSchedule)
                .unwrap()
                .then((res) => {
                    setSucessMessage(`Compétition démarrée avec succès, veuillez patienter quelque instants pour voir la salle de compétition`)
                    setErrorMessage(null)
                })
                .catch((e) => {
                    setErrorMessage(e)
                })

        } catch (e: any) {
            setErrorMessage(e)
            setSucessMessage(null)
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
                successMessage={sucessMessage}
                isLoading={isLoading}
                mainButtonMessage={"Lancer la compétition"}
            />


        </form>
    )
}