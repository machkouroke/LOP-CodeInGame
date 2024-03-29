import {useDispatch, useSelector} from 'react-redux';
import {Box, Flex, Link, useColorModeValue} from '@chakra-ui/react';
import {useState, useEffect} from 'react';
import AdminNavbarLinks from 'components/navbar/NavbarLinksAdmin';
import {ChevronLeftIcon, ChevronRightIcon} from "@chakra-ui/icons";
import {home, previous} from "../../slices/navigation";
import {useHistory} from "react-router-dom";
import MainLogo from "../icons/MainLogo";


export default function AdminNavbar(props: {
    secondary: boolean;
    message: string | boolean;
    brandText: string;
    logoText: string;
    fixed: boolean;
    onOpen: (...args: any[]) => any;
}) {
    const [scrolled, setScrolled] = useState(false);
    const cursorHover = {
        color: '#0b1437',
        cursor: 'pointer',
        background: useColorModeValue('dark', 'white'),
        borderRadius: '20%'
    }
    const dispatch = useDispatch();
    const history = useHistory();
    const {hasPrevious} = useSelector((state: any) => state.navigation);

    useEffect(() => {
        window.addEventListener('scroll', changeNavbar);

        return () => {
            window.removeEventListener('scroll', changeNavbar);
        };
    });

    const {secondary, brandText} = props;

    // Here are all the props that may change depending on navbar's type or state.(secondary, variant, scrolled)
    let mainText = useColorModeValue('navy.700', 'white');
    let navbarPosition = 'fixed' as const;
    let navbarFilter = 'none';
    let navbarBackdrop = 'blur(20px)';
    let navbarShadow = 'none';
    let navbarBg = useColorModeValue('rgba(244, 247, 254, 0.2)', 'rgba(11,20,55,0.5)');
    let navbarBorder = 'transparent';
    let secondaryMargin = '0px';
    let paddingX = '15px';
    let gap = '0px';
    const changeNavbar = () => {
        if (window.scrollY > 1) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    return (
        <Box
            position={navbarPosition}
            boxShadow={navbarShadow}
            bg={navbarBg}
            borderColor={navbarBorder}
            filter={navbarFilter}
            backdropFilter={navbarBackdrop}
            backgroundPosition='center'
            backgroundSize='cover'
            borderRadius='16px'
            borderWidth='1.5px'
            borderStyle='solid'
            transitionDelay='0s, 0s, 0s, 0s'
            transitionDuration=' 0.25s, 0.25s, 0.25s, 0s'
            transition-property='box-shadow, background-color, filter, border'
            transitionTimingFunction='linear, linear, linear, linear'
            alignItems={{xl: 'center'}}
            display={secondary ? 'block' : 'flex'}
            minH='75px'
            justifyContent={{xl: 'center'}}
            lineHeight='25.6px'
            mx='auto'
            mt={secondaryMargin}
            pb='8px'
            right={{base: '12px', md: '30px', lg: '30px', xl: '30px'}}
            left={{base: '12px', md: '30px', lg: '30px', xl: '30px'}}
            px={{
                sm: paddingX,
                md: '10px'
            }}
            ps={{
                xl: '12px'
            }}
            pt='8px'
            top={{base: '12px', md: '16px', xl: '18px'}}
            w={{
                base: 'calc(100vw - 6%)',
                md: 'calc(100vw - 8%)',
                lg: 'calc(100vw - 6%)',
                xl: 'calc(100vw - 350px)',
                '2xl': 'calc(100vw - 365px)'
            }}>
            <Flex
                w='100%'
                flexDirection={{
                    sm: 'column',
                    md: 'row'
                }}
                alignItems={{base: 'center'}}
                mb={gap}>
                <Flex alignContent={"center"}>
                    {hasPrevious &&
                        <ChevronLeftIcon boxSize={10} _hover={cursorHover}
                                         onClick={() => dispatch(previous({history: history}))}/>}


                    <Box ml={'8px'} mb={{sm: '8px', md: '0px'}} width={'100%'} textAlign={{base: "center", xl: "start"}}
                         alignItems={"center"}>
                        <Link
                            color={mainText}
                            href='/'
                            onClick={(e) => {
                                e.preventDefault()
                                dispatch(home({history: history}))
                            }}
                            bg='inherit'
                            alignItems={'center'}
                            borderRadius='inherit'
                            fontWeight='bold'
                            fontSize='34px'
                            _hover={{color: {mainText}}}
                            _active={{
                                bg: 'inherit',
                                transform: 'none',
                                borderColor: 'transparent'
                            }}
                            _focus={{
                                boxShadow: 'none'
                            }}>

                            <MainLogo mr={"10px"} borderRadius={"10px"}/>
                            {brandText}
                        </Link>
                    </Box>
                </Flex>

                <Box ms='auto' w={{sm: '100%', md: 'unset'}}>
                    <AdminNavbarLinks
                        onOpen={props.onOpen}
                        secondary={props.secondary}
                        fixed={props.fixed}
                    />
                </Box>
            </Flex>
        </Box>
    );
}
