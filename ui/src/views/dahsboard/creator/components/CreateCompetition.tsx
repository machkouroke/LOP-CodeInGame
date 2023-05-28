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
import {registerUser} from "../../../../thunks/register";
import {useAddCompetitionMutation} from "../../../../services/competitionService";
import SmoothBox from "../../../../components/SmoothBox/SmoothBox";

export default function CreateCompetition(props: { [rest: string]: any }) {
    const {...rest} = props;
    const {register, handleSubmit} = useForm()
    const [addCompetition, {isLoading}] = useAddCompetitionMutation()
    const [errorMessage, setErrorMessage] = useState(null)
    const [sucessMessage, setSucessMessage] = useState(null)

    const textColor = useColorModeValue('secondaryGray.900', 'white');


    const brandStars = useColorModeValue("brand.500", "brand.400");
    const submitForm = (data: CompetitionPost) => {
        console.log(data)
        try {
            addCompetition(data)
                .unwrap()
                .then((res) => {
                    console.log(res)
                    setSucessMessage(  `ID: ${res.id_exercice}`)
                    setErrorMessage(null)
                })
                .catch((e) => {
                    setErrorMessage(e)
                })

        } catch (e) {
            setErrorMessage(e)
            setSucessMessage(null)
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
                                {...register('langage')}


                            >
                                <option value="Python">Python</option>
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
                                {...register('Type')}
                            >
                                <option value="Salle Privé">Salle Privé</option>

                                <option value="Exercice">Exercice</option>
                                <option value="Compétition">Compétition</option>
                            </Select>
                              {errorMessage &&
                                    <SmoothBox
                                        bg='#2c36cd'
                                        mb={"10px"}

                                        textAlign={"center"}

                                        color='white'>
                                        {errorMessage}
                                    </SmoothBox>
                                }
                                  {sucessMessage &&
                                    <SmoothBox
                                        bg='#2c36cd'
                                        mb={"10px"}

                                        textAlign={"center"}

                                        color='white'>
                                        {sucessMessage}
                                    </SmoothBox>
                                }
                            <Flex alignContent={"center"}>
                                <Button
                                    type={"submit"}
                                    fontSize='sm'
                                    variant='brand'
                                    fontWeight='500'
                                    w='100%'
                                    h='50'
                                    mb='24px'>
                                    Créer
                                </Button>
                                {isLoading &&
                                    <Spinner mt={"5px"} ml={"20px"} size='lg'
                                    />}
                            </Flex>

                        </FormControl>

                    </form>

                </Flex>
            </Flex>
        </Card>
    );
}
