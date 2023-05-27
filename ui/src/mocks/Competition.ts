import Avatar1 from "../assets/img/avatars/avatar1.png";
import Avatar2 from "../assets/img/avatars/avatar2.png";
import Avatar3 from "../assets/img/avatars/avatar3.png";
import Avatar4 from "../assets/img/avatars/avatar4.png";
import Nft1 from "../assets/img/nfts/Nft1.png";
import Nft2 from "../assets/img/nfts/Nft2.png";
import Nft3 from "../assets/img/nfts/Nft3.png";

const inProgress: Competition[] = [
    {
        name: 'Problème des 8 reines',
        author: 'Par Khalfi ',
        bidders: [Avatar1, Avatar2, Avatar3, Avatar4, Avatar1, Avatar1, Avatar1, Avatar1],
        image: Nft1,
        timeLeft: '2d 19h 23m',
        postDate: new Date(),
    },
    {
        name: 'Problème du voyageur de commerce',
        author: 'Par Hafidi ',
        bidders: [Avatar1, Avatar2, Avatar3, Avatar4, Avatar1, Avatar1, Avatar1, Avatar1],
        image: Nft2,
        timeLeft: '2d 19h 23m',
        postDate: new Date(),

    },
    {
        name: 'Fibonacci',
        author: "Ghazdhali",
        bidders: [Avatar1, Avatar2, Avatar3, Avatar4, Avatar1, Avatar1, Avatar1, Avatar1],
        image: Nft3,
        timeLeft: '2d 19h 23m',
        postDate: new Date(),

    }
]

export default inProgress;