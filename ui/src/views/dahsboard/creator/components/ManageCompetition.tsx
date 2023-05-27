// Chakra imports
import {
    Box,
    Button, Checkbox,
    Flex, FormControl,
    FormLabel,
    Icon,
    Input,
    InputGroup,
    InputRightElement, Select,
    Text,
    useColorModeValue
} from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';
import LineChart from 'components/charts/LineChart';
import {IoCheckmarkCircle} from 'react-icons/io5';
import {MdBarChart, MdOutlineCalendarToday, MdOutlineRemoveRedEye} from 'react-icons/md';
// Assets

import React from "react";
import CountDown from "../../../../components/CountDown/CountDown";

export default function ManageCompetition(props: { competition: Competition}) {

    const {competition, ...rest} = props;


    const textColor = useColorModeValue('secondaryGray.900', 'white');


    const brandStars = useColorModeValue("brand.500", "brand.400");

    return (
        <Card justifyContent='center' alignItems='center' flexDirection='column' w='100%' mb='0px' {...rest}>
            <Text color={textColor} fontSize='xl' fontWeight='600'>
                {competition.name}
            </Text>

            <Flex w='100%' flexDirection={{base: 'column', lg: 'row'}} px="10px">
                <Flex flexDirection='column' mt='28px' width={"100%"}>
                    <FormControl>
                        {/*<CountDown countdownData={new Date()} name={"Début"} />*/}
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
                                    placeholder='Maze'
                                    mb='24px'
                                    mr={'24px'}
                                    fontWeight='500'
                                    size='lg'
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

                                    fontWeight='500'
                                    size='lg'
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
                                />
                            </Flex>
                        </div>

                        <Button
                            fontSize='sm'
                            variant='brand'
                            fontWeight='500'
                            bg={"#d54910"}
                            w='100%'
                            h='50'
                            mb='24px'>
                            Lancer la compétition
                        </Button>

                    </FormControl>
                </Flex>
            </Flex>
        </Card>
    );
}
