// Chakra imports
import {Box, Flex, Icon, SimpleGrid, Text, useColorModeValue} from '@chakra-ui/react';
// Assets
// Custom components
import MiniStatistics from 'components/card/MiniStatistics';
import IconBox from 'components/icons/IconBox';
import {MdBarChart, MdNumbers} from 'react-icons/md';

import {TbMilitaryRank} from "react-icons/tb";
import React from "react";
import {BsFillPlayFill} from "react-icons/bs";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {next} from "../../../slices/navigation";
import {BiPaint} from "react-icons/bi";
import useColorIcon from "../../../hooks/useColorIcon";
import {getUserInfo} from "../../../slices/selector";


export default function MainDashboard() {
    const history = useHistory();
    const user = useSelector(getUserInfo);

    const dispatch = useDispatch();
    // Chakra Color Mode
    const brandColor = useColorModeValue('brand.500', 'white');
    const creatorIconColor = useColorIcon("#a60000");
    const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');

    return (
        <Box mt={{base: '130px'}} pt={{base: '10px', md: '80px', xl: '80px'}} mx={{base: '30px', lg: '180px'}}>
            <SimpleGrid columns={{base: 1, md: 3}} gap='20px' mb='20px'>
                <div></div>
                <Text fontSize={"30px"} fontWeight={"1000"} textAlign={"center"}>
                    Bienvenue {user.fullname}
                </Text>
                <div></div>
            </SimpleGrid>
            {user.role === "teacher" &&
                <SimpleGrid columns={{base: 1, md: 3}} gap='20px' mb='20px'>
                    <div></div>
                    <MiniStatistics
                        onClick={() => {
                            dispatch(next({currentPath: "/", history: history, nextPath: "/dashboard/creator"}));
                        }}

                        startContent={
                            <IconBox
                                w='56px'
                                h='56px'
                                bg={creatorIconColor}
                                icon={<Icon w='32px' h='32px' as={BiPaint} color={"white"}/>}
                            />
                        }
                        value='Menu pour créateur'
                    />
                    <div></div>
                </SimpleGrid>}
            <SimpleGrid columns={{base: 1, md: 2}} gap='20px' mb='20px'>

                <MiniStatistics
                    startContent={
                        <IconBox
                            w='56px'
                            h='56px'
                            bg={useColorIcon("#75f542")}
                            icon={<Icon w='32px' h='32px'
                                        as={MdBarChart}
                                        color={"white"}/>}
                        />
                    }
                    name='Expérience'
                    value={`${user.experience} XP`}
                />

                <MiniStatistics
                    startContent={
                        <IconBox
                            w='56px'
                            h='56px'
                            bg={useColorIcon("#42bff5")}
                            icon={<Icon w='28px' h='28px' as={TbMilitaryRank} color='white'/>}
                        />
                    }
                    name='Classement dans la filière'
                    value={user.rank}
                />


            </SimpleGrid>
            <SimpleGrid columns={{base: 1, md: 2}} gap='20px' mb='20px'>
                <MiniStatistics
                    startContent={
                        <IconBox
                            w='56px'
                            h='56px'
                            bg={useColorIcon("#c842f5")}
                            icon={<Icon w='32px' h='32px' as={MdNumbers} color={brandColor}/>}
                        />
                    }
                    name='Nombre de parties jouées'
                    value={user.nbr_participation}
                />
                <Flex alignItems={"center"} justifyContent={"center"} width={"100%"}>
                    <MiniStatistics
                        onClick={() => {
                            dispatch(next({currentPath: "/dashboard", history: history, nextPath: "/competition"}));
                        }}

                        startContent={
                            <IconBox
                                w='56px'
                                h='56px'
                                bg={useColorIcon("#0dbdbd")}
                                icon={<Icon w='32px' h='32px' as={BsFillPlayFill} color={brandColor}/>}
                            />
                        }
                        value='Accéder aux compétitions'
                    />
                </Flex>
                <div></div>


            </SimpleGrid>


        </Box>
    );
}
