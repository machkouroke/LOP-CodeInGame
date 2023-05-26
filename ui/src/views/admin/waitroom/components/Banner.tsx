// Chakra imports
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Link,
    Select,
    Text,
    useColorModeValue
} from '@chakra-ui/react';

// Assets
import banner from 'assets/img/nfts/NftBanner1.png';
import CreateCompetition from "../../default/components/CreateCompetition";
import React from "react";
import Card from "../../../../components/card/Card";

export default function Banner(props: { [x: string]: any }) {
    const {...rest} = props;
    const textColor = useColorModeValue('secondaryGray.900', 'white');
    let mainText = useColorModeValue('white', 'white');

    let navbarFilter = 'none';
    let navbarBackdrop = 'blur(20px)';
    let navbarShadow = 'none';
    let navbarBg = useColorModeValue('rgba(51,17,219,0.59)', 'rgba(117,81,255,0.42)');
    let navbarBorder = 'transparent';
    let secondaryMargin = '0px';
    let paddingX = '15px';
    let gap = '0px';


    const brandStars = useColorModeValue("brand.500", "brand.400");
    // Chakra Color Mode
    return (
        <Card justifyContent='center' alignItems='center' flexDirection='column' w='100%' mb='0px' {...rest}>

            <Box
                color={mainText}
                bg={navbarBg}
                boxShadow={navbarShadow}
                borderColor={navbarBorder}
                filter={navbarFilter}
                backdropFilter={navbarBackdrop}
                borderStyle='solid'
                transitionDelay='0s, 0s, 0s, 0s'
                transitionDuration=' 0.25s, 0.25s, 0.25s, 0s'
                transition-property='box-shadow, background-color, filter, border'
                borderRadius="lg"
                w={{base: '100%', lg: '50%'}}
                p={4}
                mt={4}
                textAlign={{base: 'center'}}
            >
                Veuillez saisir le code privée fournit par votre proffesseur
            </Box>
            <Flex w={{base: '100%', lg: '50%'}} flexDirection={{base: 'column', lg: 'row'}} px="10px">
                <Flex flexDirection='column' mt='28px' width={"100%"}>
                    <FormControl>


                        <Input
                            isRequired={true}
                            variant='auth'
                            fontSize='sm'
                            ms={{base: "0px", md: "0px"}}
                            type='email'
                            placeholder='ABCDE95'
                            mb='24px'
                            fontWeight='500'
                            size='lg'
                        />


                        <Button
                            fontSize='sm'
                            variant='brand'
                            fontWeight='500'
                            w='100%'
                            h='50'
                            mb='24px'>
                            Créer
                        </Button>
                    </FormControl>
                </Flex>
            </Flex>
        </Card>


    );
}
