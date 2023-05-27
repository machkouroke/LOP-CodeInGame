import React from 'react';

// Chakra imports
import {
    Box,
    Flex,
    Grid,
    useColorModeValue,
    SimpleGrid,
    Icon,
    useDisclosure,
    Modal,
    ModalOverlay, ModalContent
} from '@chakra-ui/react';

// Custom components

import Competition from '../../../components/card/Competition';
import Card from 'components/card/Card';


import inProgress from "../../../mocks/Competition";
import MiniStatistics from "../../../components/card/MiniStatistics";
import IconBox from "../../../components/icons/IconBox";
import useColorIcon from "../../../hooks/useColorIcon";

import {BsPlusCircleFill} from "react-icons/bs";
import CreateCompetition from "./components/CreateCompetition";

export default function CreatorBoard() {
    const {isOpen, onOpen, onClose} = useDisclosure()


    return (
        <>
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                <ModalOverlay bg='none'

                              backdropFilter='blur(10px) '/>
                <ModalContent bg={useColorModeValue('rgba(51,17,219,0.59)', 'rgba(117,81,255,0.42)')} style={
                    {
                        borderRadius: '30px',
                    }
                } mx={{base: '10px', md: '0px'}}
                >
                    <CreateCompetition/>
                </ModalContent>
            </Modal>

            <Box pt={{base: '180px', md: '80px', xl: '80px'}}>
                {/* Main Fields */}
                <Grid
                    mb='20px'
                    gridTemplateColumns={{xl: 'repeat(3, 1fr)', '2xl': '1fr 0.46fr'}}
                    gap={{base: '20px', xl: '20px'}}
                    display={{base: 'block', xl: 'grid'}}>
                    <Flex flexDirection='column' gridArea={{xl: '1 / 1 / 2 / 3', '2xl': '1 / 1 / 2 / 2'}}>
                        <Flex direction='column'>

                            <SimpleGrid columns={{base: 1, md: 3}} gap='20px'>
                                {
                                    inProgress.map((item, index) => (
                                        <Competition
                                            name={item.name}
                                            author={item.author}
                                            bidders={item.bidders}
                                            image={item.image}
                                            timeleft={item.timeLeft}
                                            download='#'
                                        />))
                                }


                            </SimpleGrid>

                        </Flex>
                    </Flex>
                    <Flex flexDirection='column' gridArea={{xl: '1 / 3 / 2 / 4', '2xl': '1 / 2 / 2 / 3'}}>
                        <Card p='0px'>
                            <MiniStatistics
                                onClick={onOpen}

                                style={{height: "100%"}}

                                startContent={
                                    <IconBox
                                        w='56px'
                                        h='56px'
                                        bg={useColorIcon("#4707ec")}
                                        icon={<Icon w='32px' h='32px' as={BsPlusCircleFill} color={"white"}/>}
                                    />
                                }
                                value='Ajouter un exercice'
                            />
                        </Card>
                    </Flex>
                </Grid>
            </Box>
        </>
    );
}
