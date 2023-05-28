import nav from "./navigation";
import auth from "./auth";
import reg from "./registration";
import {authApi} from "../services/authService";


export default {

    navigation: nav,
    authentication: auth,
    registration: reg,
    [authApi.reducerPath]: authApi.reducer,
};