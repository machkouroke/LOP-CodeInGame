import { Icon } from '@chakra-ui/react';
import { MdHome,MdOutlineShoppingCart } from 'react-icons/md';
import { GrCode} from 'react-icons/gr';

// Admin Imports
import MainDashboard from 'views/admin/default';
import NFTMarketplace from 'views/admin/marketplace';

const routes = [
	{
		name: 'Mon profil',
		layout: '/admin',
		path: '/default',
		icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
		component: MainDashboard
	},
	{
		name: 'Compétition',
		layout: '/admin',
		path: '/nft-marketplace',
		icon: <Icon as={GrCode} width='20px' height='20px' color='inherit' />,
		component: NFTMarketplace,
		secondary: true
	},


];

export default routes;
