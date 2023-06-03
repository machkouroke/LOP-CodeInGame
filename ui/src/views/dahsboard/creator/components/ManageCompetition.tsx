// Chakra imports
import {
    Flex,

    Text,
    useColorModeValue, useToast
} from '@chakra-ui/react';
import Modal from "../../../../components/Modal/Modal";

// Custom components
import Card from 'components/card/Card';

// Assets

import React from "react";

import DateSelector from "./DateSelector";
import WaitView from "./WaitView";
import SmoothBox from "../../../../components/SmoothBox/SmoothBox";
import {CopyIcon} from "@chakra-ui/icons";

export default function ManageExercise(props: {
    isOpenManage: boolean,
    selected: Exercise | null,
    onCloseManage: () => void,
    isFetching: boolean
}) {

    const {
        isOpenManage,
        selected,
        onCloseManage,
        isFetching, ...rest
    } = props;

    const textColor = useColorModeValue('secondaryGray.900', 'white');
    const toast = useToast()


    return (
        <Modal isOpen={isOpenManage} onClose={onCloseManage} size={selected?.status !== "Not Scheduled" && "4xl"}>

            <Card justifyContent='center' alignItems='center' flexDirection='column' w='100%' mb='0px' {...rest}>
                <Text color={textColor} fontSize='xl' fontWeight='600' mb={'10px'}>
                    {selected?.name}
                </Text>
                <SmoothBox w={"100%"} bg={"#2831a0"}>

                    <b>Code Exercice</b> <Text>
                    <Flex alignItems={"center"}>
                        {selected?.id}
                        <CopyIcon
                            ml={"10px"}
                            cursor={"pointer"}
                            onClick={() => {
                                navigator.clipboard.writeText(selected?.id || "").then(r =>
                                    toast({
                                        position: "top",
                                        title: "Code copié",
                                        status: "success",
                                    })
                                )
                            }}
                        ></CopyIcon>
                    </Flex>
                </Text>

                </SmoothBox>

                <Flex w='100%' flexDirection={{base: 'column', lg: 'row'}} px="10px">
                    <Flex flexDirection='column' mt='28px' width={"100%"}>
                        {selected?.status !== "Not Scheduled" &&
                            <WaitView
                                exercise={selected}
                                modalIsOpen={isOpenManage}
                                onClose={onCloseManage}
                            />}

                        {selected?.status === "Not Scheduled" &&
                            <DateSelector exercise={selected}
                                          onClose={onCloseManage}
                            />}


                    </Flex>
                </Flex>
            </Card>
        </Modal>

    );
}
