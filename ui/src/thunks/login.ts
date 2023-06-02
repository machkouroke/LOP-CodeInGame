// authActions.js
import {createAsyncThunk} from "@reduxjs/toolkit";
import {BASE_URL} from "../config";
import axios from "axios";

function login(mail: string, password: string): Promise<LoginResponse>
{
   const option = {
        headers: {
            "Content-Type": "application/json",
        }
    }
    const body: LoginRequest  = {
        mail: mail,
        password: password
    }
    const url = `${BASE_URL}/auth/login`
    return axios.post(url, body, option)
        .then(({data}) => {
            return data
        })
}

export const userLogin = createAsyncThunk(
    'auth/login',
    async (credentials: LoginRequest, {rejectWithValue}) => {
        const {mail, password} = credentials
        try {

            const {detail} = await login(mail, password)
            // store user's token in local storage
            localStorage.setItem('userToken', detail.auth_token)
            return detail
        } catch (error: any) {
            if (error.response && error.response.data.detail) {
                return rejectWithValue(error.response.data.detail)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)