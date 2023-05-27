import {

    useColorModeValue,

    Modal,
    ModalOverlay, ModalContent
} from '@chakra-ui/react';
import React from "react";

export default function ChakraModal(props: {
    isOpen: boolean,
    onClose: () => void,
    children: React.ReactNode
}) {
    const {
        children, onClose, isOpen
    } = props;
    return (<Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg='none'

                      backdropFilter='blur(10px) '/>
        <ModalContent bg={useColorModeValue('rgba(51,17,219,0.59)', 'rgba(117,81,255,0.42)')} style={
            {
                borderRadius: '30px',
            }
        } mx={{base: '10px', md: '0px'}}
        >
            {children}
        </ModalContent>
    </Modal>)
}