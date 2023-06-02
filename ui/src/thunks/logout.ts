import {createAsyncThunk} from "@reduxjs/toolkit";
import {logout as logoutAction} from "../slices/auth";
import {BASE_URL} from "../config";
import axios from "axios";


function logout(token: string) {
    const option = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }

    const url = `${BASE_URL}/auth/logout`
    return axios.post(url, {}, option)
        .then(({data}) => {
            return data
        })
}
export const userLogout = createAsyncThunk(
    'auth/login',
    async (token: string, {dispatch, rejectWithValue}) => {
        try {
            // configure header's Content-Type as JSON

            const data = await logout(token)
            // store user's token in local storage
            dispatch(logoutAction())
            window.location.reload()
            return data
        } catch (error: any) {
            // return custom error message from API if any
           if (error.response && error.response.data.detail) {
                return rejectWithValue(error.response.data.detail)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)