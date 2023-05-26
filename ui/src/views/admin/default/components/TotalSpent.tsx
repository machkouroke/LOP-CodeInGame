// Chakra imports
import {
    Box,
    Button, Checkbox,
    Flex, FormControl,
    FormLabel,
    Icon,
    Input,
    InputGroup,
    InputRightElement, Select,
    Text,
    useColorModeValue
} from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';
import LineChart from 'components/charts/LineChart';
import {IoCheckmarkCircle} from 'react-icons/io5';
import {MdBarChart, MdOutlineCalendarToday, MdOutlineRemoveRedEye} from 'react-icons/md';
// Assets
import {RiArrowUpSFill, RiEyeCloseLine} from 'react-icons/ri';
import {lineChartDataTotalSpent, lineChartOptionsTotalSpent} from 'variables/charts';
import {NavLink} from "react-router-dom";
import React from "react";

export default function TotalSpent(props: { [x: string]: any }) {
    const {...rest} = props;

    // Chakra Color Mode

    const textColor = useColorModeValue('secondaryGray.900', 'white');
    const textColorSecondary = useColorModeValue('secondaryGray.600', 'white');
    const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
    const iconColor = useColorModeValue('brand.500', 'white');
    const bgButton = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
    const bgHover = useColorModeValue({bg: 'secondaryGray.400'}, {bg: 'whiteAlpha.50'});
    const bgFocus = useColorModeValue({bg: 'secondaryGray.300'}, {bg: 'whiteAlpha.100'});
    const [show, setShow] = React.useState(false);
    const textColorBrand = useColorModeValue("brand.500", "white");

    const handleClick = () => setShow(!show);
    const brandStars = useColorModeValue("brand.500", "brand.400");

    return (
        <Card justifyContent='center' alignItems='center' flexDirection='column' w='100%' mb='0px' {...rest}>
             <Text color={textColor} fontSize='xl' fontWeight='600'>
            Créer une compétition
          </Text>

            <Flex w='100%' flexDirection={{base: 'column', lg: 'row'}} px="10px">
                <Flex flexDirection='column' mt='28px' width={"100%"}>
                    <FormControl>
                        <FormLabel
                            display='flex'
                            ms='4px'
                            fontSize='sm'
                            fontWeight='500'
                            color={textColor}
                            mb='8px'>
                            Nom du problème<Text color={brandStars}>*</Text>
                        </FormLabel>
                        <Input
                            isRequired={true}
                            variant='auth'
                            fontSize='sm'
                            ms={{base: "0px", md: "0px"}}
                            type='email'
                            placeholder='Maze'
                            mb='24px'
                            fontWeight='500'
                            size='lg'
                        />
                        <FormLabel
                            ms='4px'
                            fontSize='sm'
                            fontWeight='500'
                            color={textColor}
                            display='flex'>
                            Language de programmation<Text color={brandStars}>*</Text>
                        </FormLabel>
                        <Select
                            fontSize='sm'
                            ms={{base: "0px", md: "0px"}}
                            mb='24px'
                            fontWeight='500'
                            size='lg'

                        >
                            <option value="volvo">Python</option>
                        </Select>

                        <FormLabel
                            ms='4px'
                            fontSize='sm'
                            fontWeight='500'
                            color={textColor}
                            display='flex'>
                            Nombre de minute<Text color={brandStars}>*</Text>
                        </FormLabel>
                        <Input
                            isRequired={true}
                            fontSize='sm'
                            mb='24px'
                            size='lg'
                            type="number"
                            variant='auth'
                            min={1}
                            max={100}
                            defaultValue={1}
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
