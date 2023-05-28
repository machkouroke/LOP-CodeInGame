// Chakra imports
import {
    Flex,

    Text,
    useColorModeValue
} from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';

// Assets

import React from "react";

import DateSelector from "./DateSelector";
import WaitView from "./WaitView";

export default function ManageCompetition(props: { competition: Competition }) {

    const {competition, ...rest} = props;

    const textColor = useColorModeValue('secondaryGray.900', 'white');



    return (
        <Card justifyContent='center'  alignItems='center' flexDirection='column' w='100%' mb='0px' {...rest}>
            <Text color={textColor} fontSize='xl' fontWeight='600'>
                {competition.name}
            </Text>

            <Flex w='100%' flexDirection={{base: 'column', lg: 'row'}} px="10px">
                <Flex flexDirection='column' mt='28px' width={"100%"}>
                        {false && <WaitView/>}

                        {true && <DateSelector />}



                </Flex>
            </Flex>
        </Card>
    );
}
