// Chakra imports
import {
    Box,
    Button, Checkbox,
    Flex, FormControl,
    FormLabel,
    Icon,
    Input,
    InputGroup,
    InputRightElement, Select, Spinner,
    Text,
    useColorModeValue
} from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';

// Assets

import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {useAddExerciseMutation} from "../../../../services/competitionService";
import FormBottom from "../../../../components/BoxAlert/FormBottom";
import {ExerciseKind, ProgramingLanguage} from "../../../../types/enum";

export default function CreateExercise(props: { [rest: string]: any }) {
    const {...rest} = props;
    const {register, handleSubmit} = useForm()
    const [addCompetition, {isLoading}] = useAddExerciseMutation()
    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)

    const textColor = useColorModeValue('secondaryGray.900', 'white');


    const brandStars = useColorModeValue("brand.500", "brand.400");
    const submitForm = (data: CompetitionPost) => {
        try {
            addCompetition(data)
                .unwrap()
                .then((res) => {
                    setSuccessMessage(`ID: ${res.detail.exercise_id}`)
                    setErrorMessage(null)
                })
                .catch((e) => {
                    setErrorMessage(e.detail)
                })

        } catch (e: any) {
            setErrorMessage(e.detail)
            setSuccessMessage(null)
        }

    }
    return (
        <Card justifyContent='center' alignItems='center' flexDirection='column' w='100%' mb='0px' {...rest}>
            <Text color={textColor} fontSize='xl' fontWeight='600'>
                Créer une compétition
            </Text>

            <Flex w='100%' flexDirection={{base: 'column', lg: 'row'}} px="10px">
                <Flex flexDirection='column' mt='28px' width={"100%"}>
                    <form onSubmit={handleSubmit(submitForm)}>
                        <FormControl>
                            <FormLabel
                                display='flex'
                                ms='4px'
                                fontSize='sm'
                                fontWeight='500'
                                color={textColor}
                                mb='8px'>
                                Nom du problème<Text color={brandStars}>*</Text>
                            </FormLabel>
                            <Input
                                isRequired={true}
                                variant='auth'
                                fontSize='sm'
                                ms={{base: "0px", md: "0px"}}
                                type='text'
                                placeholder='Maze'
                                mb='24px'
                                fontWeight='500'
                                size='lg'
                                {...register('name')}

                            />
                            <FormLabel
                                ms='4px'
                                fontSize='sm'
                                fontWeight='500'
                                color={textColor}
                                display='flex'>
                                Language de programmation<Text color={brandStars}>*</Text>
                            </FormLabel>
                            <Select
                                fontSize='sm'
                                ms={{base: "0px", md: "0px"}}
                                mb='24px'
                                fontWeight='500'
                                size='lg'
                                {...register('language')}
                            >
                                {
                                    Object.values(ProgramingLanguage).map((value) => {
                                        return <option value={value}>{value}</option>
                                    })}
                            </Select>

                            <FormLabel
                                ms='4px'
                                fontSize='sm'
                                fontWeight='500'
                                color={textColor}
                                display='flex'>
                                Type<Text color={brandStars}>*</Text>
                            </FormLabel>
                            <Select
                                fontSize='sm'
                                ms={{base: "0px", md: "0px"}}
                                mb='24px'
                                fontWeight='500'
                                size='lg'
                                {...register('kind')}
                            >{
                                    Object.values(ExerciseKind).map((value) => {
                                        return <option value={value}>{value}</option>
                                    })}

                            </Select>
                            <FormBottom errorMessage={errorMessage}
                                        successMessage={successMessage}
                                        mainButtonMessage={"Créer"}
                                        isLoading={isLoading}
                            />


                        </FormControl>

                    </form>

                </Flex>
            </Flex>
        </Card>
    );
}
