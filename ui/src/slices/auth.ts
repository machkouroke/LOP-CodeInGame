import {createSlice} from "@reduxjs/toolkit";
import {userLogin} from "../thunks/login";

const userToken: string = localStorage.getItem('userToken') || null

interface IAuthState {
    loading: boolean,
    userToken: string | null,
    error: any,
    success: boolean,
}
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
            logout: (state) => {
                localStorage.removeItem('userToken')
                localStorage.removeItem('isManager')
                state.loading = false
                state.userToken = null
                state.error = null
                state.success = false
            },

        },
        extraReducers: {
            // login user
            [userLogin.pending]: (state) => {
                state.loading = true
                state.error = null
            },
            [userLogin.fulfilled]: (state, {payload}) => {
                state.loading = false
                state.error = null
                state.success = true
                state.userToken = payload['auth_token']
            },
            [userLogin.rejected]: (state, {payload}) => {
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