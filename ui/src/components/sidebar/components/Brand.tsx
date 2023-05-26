// Chakra imports
import { Flex, useColorModeValue } from '@chakra-ui/react';

// Custom components
import { MainLogo } from 'components/icons/Icons';
import { HSeparator } from 'components/separator/Separator';

export function SidebarBrand() {
	//   Chakra color mode
	let logoColor = useColorModeValue('navy.700', 'white');

	return (
		<Flex alignItems='center' flexDirection='column'>
			<MainLogo  />
		</Flex>
	);
}

export default SidebarBrand;
