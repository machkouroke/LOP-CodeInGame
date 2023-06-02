import AuthLayout from "./layouts/auth";
import DashboardLayout from "./layouts/admin";
import CompetitionLayout from "./layouts/competition";
import MainDashboard from "./views/dahsboard/default";
import CreatorBoard from "./views/dahsboard/creator";
import ExerciseBoard from "./views/dahsboard/competion";
import WaitRoom from "./views/dahsboard/waitroom";
import SignIn from "./views/auth/signIn";
import Register from "./views/auth/register";

const routes: RoutesType[] = [
    {
        name: 'Authentification',
        layout: '',
        path: '/auth',
        fullpath: '/auth',
        component: AuthLayout,
        protected: false,
        roles: []
    },
    {
        name: 'Page de Connexion',
        layout: '/auth',
        path: '/sign-in',
        fullpath: '/auth/sign-in',
        component: SignIn,
        protected: false,
        roles: []
    },
    {
        name: "Page d'incription",
        layout: '/auth',
        path: '/register',
        fullpath: '/auth/register',
        component: Register,
        protected: false,
        roles: []
    },
    {
        name: 'Dashboard',
        layout: '',
        path: '/dashboard',
        fullpath: '/dashboard',
        component: DashboardLayout,
        protected: true,
        roles: []
    },
    {
        name: 'Dashboard Accueil',
        layout: '/dashboard',
        path: '',
        fullpath: '/dashboard',
        component: MainDashboard,
        protected: true,
        roles: []
    },
    {
        name: 'Dashboard Creator',
        layout: '/dashboard',
        path: '/creator',
        fullpath: '/dashboard/creator',
        component: CreatorBoard,
        protected: true,
        roles: ['creator']
    },

    {
        name: 'Compétition',
        layout: '',
        path: '/competition',
        fullpath: '/competition',
        component: CompetitionLayout,
        protected: true,
        roles: []
    },
    {
        name: 'Compétition Accueil',
        layout: '/competition',
        path: '',
        fullpath: '/competition',
        component: ExerciseBoard,
        protected: true,
        roles: []
    },
    {
        name: 'Compétition Salle d\'attente',
        layout: '/competition',
        path: '/waitroom',
        fullpath: '/competition/waitroom',
        component: WaitRoom,
        protected: true,
        roles: []
    },


];

function getRoutes(layout: string): RoutesType[] {
    return routes.filter((route) => route.layout === layout);
}

export default getRoutes;
