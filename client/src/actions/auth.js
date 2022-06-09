import { AUTH } from '../constants/actionTypes';

import * as api from '../api/index.js';

export const singin = (formData, navigate) => async (dispatch) => {
    try {
        //log in del usuario

        navigate('/')
    } catch (error) {
        console.log(error)
    }
}

export const singup = (formData, navigate) => async (dispatch) => {
    try {
        //sing up del usuario

        navigate('/')
    } catch (error) {
        console.log(error)
    }
}