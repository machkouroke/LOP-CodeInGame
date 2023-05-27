// Chakra imports
import {Box, Flex, Icon, SimpleGrid, useColorModeValue} from '@chakra-ui/react';
// Assets
// Custom components
import MiniStatistics from 'components/card/MiniStatistics';
import IconBox from 'components/icons/IconBox';
import {MdBarChart, MdNumbers} from 'react-icons/md';

import CreateCompetition from './components/CreateCompetition';
import {TbMilitaryRank} from "react-icons/tb";
import React from "react";
import {BsFillPlayFill} from "react-icons/bs";
import {useHistory} from "react-router-dom";
import { useDispatch } from 'react-redux';
import {next} from "../../../slices/navigation";

export default function UserReports() {
    const history = useHistory();
    const dispatch = useDispatch();
    // Chakra Color Mode
    const brandColor = useColorModeValue('brand.500', 'white');
    const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
    return (
        <Box mt={{base: '130px'}} pt={{base: '130px',  md: '80px', xl: '80px'}}>
            <SimpleGrid columns={{base: 1, md: 2}} gap='20px' mb='20px'>

                <MiniStatistics
                    startContent={
                        <IconBox
                            w='56px'
                            h='56px'
                            bg={boxBg}
                            icon={<Icon w='32px' h='32px'
                                        as={MdBarChart}
                                        color={brandColor}/>}
                        />
                    }
                    name='Expérience'
                    value='642.39 XP'
                />

                <MiniStatistics
                    startContent={
                        <IconBox
                            w='56px'
                            h='56px'
                            bg='linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)'
                            icon={<Icon w='28px' h='28px' as={TbMilitaryRank} color='white'/>}
                        />
                    }
                    name='Classement dans la filière'
                    value='154'
                />


            </SimpleGrid>
            <SimpleGrid columns={{base: 1, md: 2}} gap='20px' mb='20px'>
                 <MiniStatistics
                    startContent={
                        <IconBox
                            w='56px'
                            h='56px'
                            bg={boxBg}
                            icon={<Icon w='32px' h='32px' as={MdNumbers} color={brandColor}/>}
                        />
                    }
                    name='Nombre de parties jouées'
                    value='2935'
                />
                <Flex alignItems={"center"} justifyContent={"center"} width={"100%"}>
                    <MiniStatistics
                        onClick={() => {
                            dispatch(next({currentPath: "/", history: history, nextPath: "/competition"}));
                        }}

                        startContent={
                            <IconBox
                                w='56px'
                                h='56px'
                                bg={boxBg}
                                icon={<Icon w='32px' h='32px' as={BsFillPlayFill} color={brandColor}/>}
                            />
                        }
                        name='Menu des compétitions'
                    />
                </Flex>
                <div></div>


            </SimpleGrid>



        </Box>
    );
}
