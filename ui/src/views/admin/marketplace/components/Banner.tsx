// Chakra imports
import {
    Button,
    Flex,
    Modal, ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text, useColorModeValue,
    useDisclosure
} from '@chakra-ui/react';

// Assets
import banner from 'assets/img/nfts/NftBanner1.png';
import {useHistory} from "react-router-dom";
import CodeModal from "./CodeModal";

export default function Banner() {
    const history = useHistory();
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
                    <CodeModal/>
                </ModalContent>
            </Modal>
            <Flex
                direction='column'
                bgImage={banner}
                bgSize='cover'
                py={{base: '30px', md: '56px'}}
                px={{base: '30px', md: '64px'}}
                borderRadius='30px'>
                <Text
                    fontSize={{base: '24px', md: '34px'}}
                    color='white'
                    mb='14px'
                    maxW={{
                        base: '100%',
                        md: '64%',
                        lg: '46%',
                        xl: '70%',
                        '2xl': '50%',
                        '3xl': '42%'
                    }}
                    fontWeight='700'
                    lineHeight={{base: '32px', md: '42px'}}>
                    Fais vous une place sur le leaderboard en remportant le maximum de compétition
                </Text>
                <Text
                    fontSize='md'
                    color='#E3DAFF'
                    maxW={{
                        base: '100%',
                        md: '64%',
                        lg: '40%',
                        xl: '56%',
                        '2xl': '46%',
                        '3xl': '34%'
                    }}
                    fontWeight='500'
                    mb='40px'
                    lineHeight='28px'>
                    Rejoignez l'une des compétitions programmé ou entrez simplement le code fournit par votre professeur
                </Text>
                <Flex align='center'>
                    <Button
                        onClick={onOpen}
                        bg='white'
                        color='black'
                        _hover={{bg: 'whiteAlpha.900'}}
                        _active={{bg: 'white'}}
                        _focus={{bg: 'white'}}
                        fontWeight='500'
                        fontSize='14px'
                        py='20px'
                        px='27'
                        me='38px'>
                        Entrer un code de compétition
                    </Button>

                </Flex>
            </Flex>
        </>

    );
}
