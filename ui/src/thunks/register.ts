import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from "axios";
import {BASE_URL} from "../config";

function register(user_data: {
    name: string;
    surname: string;
    mail: string;
    password: string;
}) {
    const option = {
        headers: {
            "Content-Type": "application/json",
        }
    }
    const body = {
        name: user_data.name,
        surname: user_data.surname,
        mail: user_data.mail,
        password: user_data.password,
        role: "student"
    }
    const url = `${BASE_URL}/auth/register`
    return axios.post(url, body, option)
        .then(({data}) => {
            return data
        })


}

export const registerUser = createAsyncThunk(
    'auth/register',
    async (user_data: User, {rejectWithValue}) => {
        const {name, surname, mail, password} = user_data
        try {
            console.log("registering user")
            await register({name: name, surname: surname, mail: mail, password: password})
        } catch (error: any) {
            // return custom error message from backend if present
            if (error.response && error.response.data.detail) {
                return rejectWithValue(error.response.data.detail)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)