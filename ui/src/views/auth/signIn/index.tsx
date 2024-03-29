import React, {useEffect} from "react";
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
import SmoothBox from "../../../components/SmoothBox/SmoothBox";
import FormBottom from "../../../components/BoxAlert/FormBottom";

function SignIn() {
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
    } = useSelector((state: { authentication: IAuthState }) => {

        return {
            loading: state.authentication.loading,
            error: state.authentication.error,
            userToken: state.authentication.userToken,
            success: state.authentication.success
        };
    });
    const history = useHistory()

    useEffect(() => {
        if (userToken) {
            history.push('/dashboard')
        }
    }, [history, userToken])
    const {register, handleSubmit} = useForm()
    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);
    const submitForm = (data: LoginRequest) => {
        // @ts-ignore
        dispatch(userLogin(data))
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
                        Connexion
                    </Heading>
                    <Text
                        mb='36px'
                        ms='4px'
                        color={textColorSecondary}
                        fontWeight='400'
                        fontSize='md'>
                        Entrer vos identifiants pour vous connecter
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
                                type='email'
                                placeholder='mail@gmail.com'
                                mb='24px'
                                fontWeight='500'
                                size='lg'
                                {...register('mail')}
                            />
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
                            <Flex justifyContent='space-between' align='center' mb='24px'>
                                <FormControl display='flex' alignItems='center'>
                                    <Checkbox
                                        id='remember-login'
                                        colorScheme='brandScheme'
                                        me='10px'
                                    />
                                    <FormLabel
                                        htmlFor='remember-login'
                                        mb='0'
                                        fontWeight='normal'
                                        color={textColor}
                                        fontSize='sm'>
                                        Restez connecté
                                    </FormLabel>
                                </FormControl>
                                <NavLink to='/auth/forgot-password'>
                                    <Text
                                        color={textColorBrand}
                                        fontSize='sm'
                                        w='124px'
                                        fontWeight='500'>
                                        Mot de passe oublié ?
                                    </Text>
                                </NavLink>
                            </Flex>
                           <FormBottom errorMessage={error}
                                         successMessage={null}
                                         mainButtonMessage={"Connexion"}
                                         isLoading={loading}
                             />

                        </FormControl>

                    </form>
                    <Flex
                        flexDirection='column'
                        justifyContent='center'
                        alignItems='start'
                        maxW='100%'
                        mt='0px'>
                        <Text color={textColorDetails} fontWeight='400' fontSize='14px'>
                            Vous n'avez pas de compte ?
                            <NavLink to='/auth/register'>
                                <Text
                                    color={textColorBrand}
                                    as='span'
                                    ms='5px'
                                    fontWeight='500'>Créer un compte
                                </Text>
                            </NavLink>
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
        </DefaultAuth>
    );
}

export default SignIn;
