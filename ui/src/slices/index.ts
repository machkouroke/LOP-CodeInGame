import nav from "./navigation";
import auth from "./auth";
import reg from "./registration";
import {authApi} from "../services/authService";
import {competitionApi} from "../services/competitionService";


export default {

    navigation: nav,
    authentication: auth,
    registration: reg,
    [authApi.reducerPath]: authApi.reducer,
    [competitionApi.reducerPath]: competitionApi.reducer,
};