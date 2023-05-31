import React, {useEffect, useState} from "react";
import {NavLink, useHistory} from "react-router-dom";
// Chakra imports
import {
    Box,
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Icon,
    Input,
    InputGroup,
    InputRightElement, Spinner,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import {HSeparator} from "components/separator/Separator";
import DefaultAuth from "layouts/auth/Default";
// Assets
import illustration from "assets/img/auth/auth.png";
import {FcGoogle} from "react-icons/fc";
import {MdOutlineRemoveRedEye} from "react-icons/md";
import {RiEyeCloseLine} from "react-icons/ri";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {userLogin} from "../../../thunks/login";
import {registerUser} from "../../../thunks/register";

function Register() {
    const dispatch = useDispatch()
    // Chakra color mode
    const textColor = useColorModeValue("navy.700", "white");
    const textColorSecondary = "gray.400";
    const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
    const textColorBrand = useColorModeValue("brand.500", "white");
    const brandStars = useColorModeValue("brand.500", "brand.400");
    const googleBg = useColorModeValue("secondaryGray.300", "whiteAlpha.200");
    const googleText = useColorModeValue("navy.700", "white");
    const googleHover = useColorModeValue(
        {bg: "gray.200"},
        {bg: "whiteAlpha.300"}
    );
    const googleActive = useColorModeValue(
        {bg: "secondaryGray.300"},
        {bg: "whiteAlpha.200"}
    );
    const {
        loading,
        userToken,
        error,
        success
    } = useSelector((state: { registration: IAuthState }) => {

        return {
            loading: state.registration.loading,
            error: state.registration.error,
            userToken: state.registration.userToken,
            success: state.registration.success
        };
    });
    const [credentials, setCredentials] = useState<LoginRequest>()
    const history = useHistory()

    useEffect(() => {
        console.log(success)
        if (success) {
        // @ts-ignore

            dispatch(userLogin(credentials))
            history.push('/user')
        }
        // redirect authenticated user to profile screen
        if (userToken) {
            history.push('/user')
        }
    }, [history, userToken, success])
    const {register, handleSubmit} = useForm()
    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);
    const submitForm = (data: User) => {
        // @ts-ignore
        dispatch(registerUser(data))
        setCredentials({
            mail: data.mail,
            password: data.password
        })
    }
    return (
        <DefaultAuth illustrationBackground={illustration} image={illustration}>
            <Flex
                maxW={{base: "100%", md: "max-content"}}
                w='100%'
                mx={{base: "auto", lg: "0px"}}
                me='auto'
                h='100%'
                alignItems='start'
                justifyContent='center'
                mb={{base: "30px", md: "60px"}}
                px={{base: "25px", md: "0px"}}
                mt={{base: "40px", md: "14vh"}}
                flexDirection='column'>
                <Box me='auto'>
                    <Heading color={textColor} fontSize='36px' mb='10px'>
                        Créer un compte
                    </Heading>
                    <Text
                        mb='36px'
                        ms='4px'
                        color={textColorSecondary}
                        fontWeight='400'
                        fontSize='md'>
                        Entrez vos informations pour continuer
                    </Text>
                </Box>
                <Flex
                    zIndex='2'
                    direction='column'
                    w={{base: "100%", md: "420px"}}
                    maxW='100%'
                    background='transparent'
                    borderRadius='15px'
                    mx={{base: "auto", lg: "unset"}}
                    me='auto'
                    mb={{base: "20px", md: "auto"}}>
                    <Button
                        fontSize='sm'
                        me='0px'
                        mb='26px'
                        py='15px'
                        h='50px'
                        borderRadius='16px'
                        bg={googleBg}
                        color={googleText}
                        fontWeight='500'
                        _hover={googleHover}
                        _active={googleActive}
                        _focus={googleActive}>
                        <Icon as={FcGoogle} w='20px' h='20px' me='10px'/>
                        Connexion avec Google
                    </Button>
                    <Flex align='center' mb='25px'>
                        <HSeparator/>
                        <Text color='gray.400' mx='14px'>
                            ou
                        </Text>
                        <HSeparator/>
                    </Flex>
                    <form onSubmit={handleSubmit(submitForm)}>
                        <FormControl>
                            <Flex>
                                <FormControl>
                                    <FormLabel
                                        display='flex'
                                        ms='4px'
                                        fontSize='sm'
                                        fontWeight='500'
                                        color={textColor}
                                        mb='8px'>
                                        Nom<Text color={brandStars}>*</Text>
                                    </FormLabel>
                                    <Input
                                        isRequired={true}
                                        variant='auth'
                                        fontSize='sm'
                                        ms={{base: "0px", md: "0px"}}
                                        type='text'
                                        placeholder='Votre nom'
                                        mb='24px'
                                        fontWeight='500'
                                        size='lg'
                                        {...register('name')}
                                    />
                                </FormControl>
                                <FormControl ml={'10px'}>
                                    <FormLabel
                                        display='flex'
                                        ms='4px'
                                        fontSize='sm'
                                        fontWeight='500'
                                        color={textColor}
                                        mb='8px'>
                                        Prénom<Text color={brandStars}>*</Text>
                                    </FormLabel>
                                    <Input
                                        isRequired={true}
                                        variant='auth'
                                        fontSize='sm'
                                        ms={{base: "0px", md: "0px"}}
                                        type='text'
                                        placeholder='Votre prénom'
                                        mb='24px'
                                        fontWeight='500'
                                        size='lg'
                                        {...register('surname')}
                                    />
                                </FormControl>
                            </Flex>
                            <FormControl>
                                <FormLabel
                                    display='flex'
                                    ms='4px'
                                    fontSize='sm'
                                    fontWeight='500'
                                    color={textColor}
                                    mb='8px'>
                                    Email<Text color={brandStars}>*</Text>
                                </FormLabel>
                                <Input
                                    isRequired={true}
                                    variant='auth'
                                    fontSize='sm'
                                    ms={{base: "0px", md: "0px"}}
                                    type='text'
                                    placeholder='Votre adresse e-mail'
                                    mb='24px'
                                    fontWeight='500'
                                    size='lg'
                                    {...register('mail')}
                                />
                            </FormControl>

                            <FormLabel
                                ms='4px'
                                fontSize='sm'
                                fontWeight='500'
                                color={textColor}
                                display='flex'>
                                Mot de passe<Text color={brandStars}>*</Text>
                            </FormLabel>
                            <InputGroup size='md'>
                                <Input
                                    isRequired={true}
                                    fontSize='sm'
                                    placeholder='Min. 8 characters'
                                    mb='24px'
                                    size='lg'
                                    type={show ? "text" : "password"}
                                    variant='auth'
                                    {...register('password')}
                                />
                                <InputRightElement display='flex' alignItems='center' mt='4px'>
                                    <Icon
                                        color={textColorSecondary}
                                        _hover={{cursor: "pointer"}}
                                        as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                                        onClick={handleClick}
                                    />
                                </InputRightElement>
                            </InputGroup>
                            <Flex alignContent={"center"}>
                                <Button
                                    _hover={
                                        {
                                            bg: "brandScheme.500",
                                            color: "white"
                                        }
                                    }
                                    type={"submit"}
                                    fontSize='sm'
                                    variant='brand'
                                    fontWeight='500'
                                    w='100%'
                                    h='50'
                                    mb='24px'>
                                    Créer un compte
                                </Button>
                                {loading &&
                                    <Spinner mt={"5px"} ml={"20px"} size='lg'
                                    />}

                            </Flex>

                        </FormControl>

                    </form>
                    <Flex
                        flexDirection='column'
                        justifyContent='center'
                        alignItems='start'
                        maxW='100%'
                        mt='0px'>
                        <Text color={textColorDetails} fontWeight='400' fontSize='14px'>
                            Vous aviez déja un compte ?
                            <NavLink to='/auth/sign-up'>
                                <Text
                                    color={textColorBrand}
                                    as='span'
                                    ms='5px'
                                    fontWeight='500'>Connectez-vous
                                </Text>
                            </NavLink>
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
        </DefaultAuth>
    );
}

export default Register;
