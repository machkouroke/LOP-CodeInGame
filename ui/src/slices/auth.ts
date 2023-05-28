import {createSlice} from "@reduxjs/toolkit";
import {userLogin} from "../thunks/login";

const userToken: string = localStorage.getItem('userToken') || null



const initialState: IAuthState = {
    loading: false,
    userToken,
    error: null,
    success: false,
}
const auth = createSlice(
    {
        name: 'auth',
        initialState,
        reducers: {
            logout: (state: IAuthState) => {
                localStorage.removeItem('userToken')
                state.loading = false
                state.userToken = null
                state.error = null
                state.success = false
            },

        },
        extraReducers: {
            // @ts-ignore

            [userLogin.pending]: (state: IAuthState) => {
                state.loading = true
                state.error = null
            },
            // @ts-ignore

            [userLogin.fulfilled]: (state: IAuthState, {payload}) => {
                state.loading = false
                state.error = null
                state.success = true
                state.userToken = payload['auth_token']
            },
            // @ts-ignore

            [userLogin.rejected]: (state: IAuthState, {payload}) => {
                state.loading = false
                state.success = false
                state.error = payload
            },
            // register user reducer...
        }
    }
)

export const {logout} = auth.actions
export default auth.reducer;