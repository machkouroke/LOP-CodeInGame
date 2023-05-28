import nav from "./navigation";
import auth from "./auth";
import {authApi} from "../services/authService";


export default {

    navigation: nav,
    authentication: auth,
    [authApi.reducerPath]: authApi.reducer,
};