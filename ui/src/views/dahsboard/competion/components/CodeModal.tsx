// Chakra imports
import {
    Box,
    Button,
    Flex,
    FormControl,
    Input,
    Spinner,
    useColorModeValue
} from '@chakra-ui/react';

// Assets

import React, {useState} from "react";
import Card from "../../../../components/card/Card";
import {useForm} from "react-hook-form";
import {useSubscribeMutation} from "../../../../services/competitionService";
import {useHistory} from "react-router-dom";
import SmoothBox from "../../../../components/SmoothBox/SmoothBox";
import FormBottom from "../../../../components/BoxAlert/FormBottom";

export default function CodeModal(props: { [x: string]: any }) {
    const {...rest} = props;
    const [subscribe, {isLoading}] = useSubscribeMutation()
    const history = useHistory()

    let mainText = useColorModeValue('black', 'white');

    let navbarFilter = 'none';
    let navbarBackdrop = 'blur(20px)';
    let navbarShadow = 'none';
    let navbarBg = useColorModeValue('#f4f7fe', '#1e2647');
    let navbarBorder = 'transparent';
    const {register, handleSubmit} = useForm()
    const [errorMessage, setErrorMessage] = useState(null)


    const submitForm = (data: { exo_id: string }) => {

        subscribe(data.exo_id)
            .unwrap()
            .then(() => {

                setErrorMessage(null)
                history.push('/competition/waitroom', {exercise: data.exo_id})

            })
            .catch((e) => {
                console.log("e", e)
                setErrorMessage(e.data.detail)
            })


    }
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
                w={{base: '100%'}}
                p={4}
                mt={4}
                textAlign={{base: 'center'}}
            >
                Veuillez saisir le code privée fournit par votre proffesseur
            </Box>
            <Flex flexDirection={{base: 'column', lg: 'row'}} px="10px">
                <Flex flexDirection='column' mt='28px' width={"100%"}>
                    <form onSubmit={handleSubmit(submitForm)}>
                        <FormControl>


                            <Input
                                isRequired={true}
                                variant='auth'
                                fontSize='sm'
                                ms={{base: "0px", md: "0px"}}
                                type='text'
                                placeholder='ABCDE95'
                                mb='24px'
                                fontWeight='500'
                                size='lg'
                                {...register("exo_id")}
                            />
                            <FormBottom
                                successMessage={null}
                                errorMessage={errorMessage}
                                isLoading={isLoading}
                                mainButtonMessage={"Rejoindre la compétition"}

                            />

                        </FormControl>

                    </form>
                </Flex>
            </Flex>
        </Card>


    )
        ;
}
