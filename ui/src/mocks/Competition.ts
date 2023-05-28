import Avatar1 from "../assets/img/avatars/avatar1.png";
import Avatar2 from "../assets/img/avatars/avatar2.png";
import Avatar3 from "../assets/img/avatars/avatar3.png";
import Avatar4 from "../assets/img/avatars/avatar4.png";
import Nft1 from "../assets/img/nfts/Nft1.png";
import Nft2 from "../assets/img/nfts/Nft2.png";
import Nft3 from "../assets/img/nfts/Nft3.png";

const inProgress: Competition[] = [
    {
        id: '1',
        name: 'Problème des 8 reines',
        owner_name: 'Par Khalfi ',
        participators: [],
        image: Nft1,
        start: new Date(),
        end: new Date(),
        created_at: new Date(),
        Type: 'exercice',
    },
    {
        id: '2',
        name: 'Problème du voyageur de commerce',
        owner_name: 'Par Hafidi ',
        participators: [Avatar1, Avatar2, Avatar3, Avatar4, Avatar1, Avatar1, Avatar1, Avatar1],
        image: Nft2,
        start: new Date(),
        end: new Date(),
        created_at: new Date(),
        Type: 'exercice',
    },
      {
        id: '3',
        name: 'Fibonacci',
        owner_name: "Par Ghazdhali",
        participators: [Avatar1, Avatar2, Avatar3, Avatar4, Avatar1, Avatar1, Avatar1, Avatar1],
        image: Nft2,
        start: new Date(),
        end: new Date(),
        created_at: new Date(),
        Type: 'exercice',
    }

]

export default inProgress;