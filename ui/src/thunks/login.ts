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

            const data = await login(mail, password)
            console.log(data)
            // store user's token in local storage
            localStorage.setItem('userToken', data["auth_token"])
            return data
        } catch (error: any) {

            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)