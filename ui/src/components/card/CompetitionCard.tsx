// Chakra imports
import {AvatarGroup, Avatar, Box, Button, Flex, Icon, Image, Link, Text, useColorModeValue} from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';
// Assets
import {useState} from 'react';
import {IoHeart, IoHeartOutline} from 'react-icons/io5';
import SmoothBox from "../SmoothBox/SmoothBox";

export default function CompetitionCard(props: {
    image: string;
    name: string;
    author: string;
    onClick?: () => void;
    hoverable?: boolean;
    bidders: string[];
    download: string;
    timeleft: string | number;
    to_come?: boolean;
    className?: string;
}) {
    const {
        image,
        name,
        author,
        bidders,
        download,
        timeleft,
        hoverable,
        onClick,
        className
    } = props;
    const [like, setLike] = useState(false);
    const textColor = useColorModeValue('navy.700', 'white');
    const textColorBid = useColorModeValue('brand.500', 'white');
    const hoverColor = useColorModeValue("secondaryGray.300", "whiteAlpha.200");

    return (
        <Card p='20px' _hover={hoverable && {
            background: hoverColor,
            cursor: 'pointer'
        }}
              onClick={onClick}
              className={className}
        >
            <Flex direction={{base: 'column'}} justifyContent={{base: 'space-between'}}>

                <Flex flexDirection='column' justify='space-between' h='100%'>
                    <Flex
                        justify='space-between'
                        direction={{
                            base: 'row',
                            md: 'column',
                            lg: 'row',
                            xl: 'column',
                            '2xl': 'row'
                        }}
                        mb='auto'>
                        <Flex direction='column'>
                            <Text
                                color={textColor}
                                fontSize={{
                                    base: 'xl',
                                    md: 'lg',
                                    lg: 'lg',
                                    xl: 'lg',
                                    '2xl': 'md',
                                    '3xl': 'lg'
                                }}
                                mb='5px'
                                fontWeight='bold'
                                me='14px'>
                                {name}
                            </Text>
                            <Text
                                color='secondaryGray.600'
                                fontSize={{
                                    base: 'sm'
                                }}
                                fontWeight='400'
                                me='14px'>
                                {author}
                            </Text>
                        </Flex>
                        <AvatarGroup
                            max={3}
                            color={textColorBid}
                            size='sm'
                            mt={{
                                base: '0px',
                                md: '10px',
                                lg: '0px',
                                xl: '10px',
                                '2xl': '0px'
                            }}
                            fontSize='12px'>

                            {bidders.length > 0 ? bidders.map((avt, key) => <Avatar key={key} name={"Machkour Oke"}
                                                                                    src={"https://picsum.photos/200"}/>) :
                                <SmoothBox bg={"rgba(44,54,205,0.67)"}>Aucun Participants</SmoothBox>}
                        </AvatarGroup>
                    </Flex>
                    <Flex
                        align={{
                            base: 'center',
                            md: 'start',
                            lg: 'center',
                            xl: 'start',
                            '2xl': 'center'
                        }}
                        justify='space-between'
                        direction={{
                            base: 'row',
                            md: 'column',
                            lg: 'row',
                            xl: 'column',
                            '2xl': 'row'
                        }}
                        mt='25px'>
                        <Text fontWeight='700' fontSize='sm' color={textColorBid}>
                            Posté le <Text fontWeight='100' fontSize='sm'>{timeleft}</Text>
                        </Text>
                        <Link
                            href={download}
                            mt={{
                                base: '0px',
                                md: '10px',
                                lg: '0px',
                                xl: '10px',
                                '2xl': '0px'
                            }}>
                            {props.to_come &&
                                <Button
                                    variant='darkBrand'
                                    color='white'
                                    fontSize='sm'
                                    fontWeight='500'
                                    borderRadius='70px'
                                    px='24px'
                                    py='5px'>
                                    Participer
                                </Button>}
                        </Link>
                    </Flex>
                </Flex>
            </Flex>
        </Card>
    );
}
