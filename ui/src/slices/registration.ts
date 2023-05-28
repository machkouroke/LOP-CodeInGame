import {createSlice} from "@reduxjs/toolkit";
import {registerUser} from "../thunks/register";

const userToken = localStorage.getItem('userToken') || null
const initialState: IAuthState = {
    loading: false,
    userToken,
    error: null,
    success: false,
}

const register = createSlice(
    {
        name: 'register',
        initialState: initialState,
        reducers: {},
        extraReducers: {
            // @ts-ignore

            [registerUser.pending]: (state: IAuthState) => {
                state.loading = true
                state.error = null
            },
            // @ts-ignore
            [registerUser.fulfilled]: (state: IAuthState) => {
                state.loading = false
                state.success = true // registration successful
            },
            // @ts-ignore
            [registerUser.rejected]: (state: IAuthState, {payload}) => {
                state.loading = false
                state.error = payload
            },
        }

    }
)


export default register.reducer;