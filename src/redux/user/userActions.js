import axios from 'axios';
import { toast } from 'react-toastify';
import * as apiUrls from '../helper/common';

export function SignUpAction(data) {
    console.log(data);
    return dispatch => {
        // dispatch(ShowLoader(true));
        let request = {
            method: 'POST',
            url: `${apiUrls.apiBaseUrl}${apiUrls.userSignUp}`,
            headers: { 'Content-Type': 'application/json' },
            data: data
        };
        return axios(request).then((data) => {
            // dispatch(ShowLoader(false));
            // dispatch(ShowAlert({ Class: "alert-success", Message: data.data.ResponseText, Timeout: 1500 }));
            // dispatch(profileInfo())
            console.log(data);
            toast.success(data.data.message, { autoClose: 4000 });
            return data;
        }).catch((error) => {
            console.log(error.response.data.message, { autoClose: 4000 });
            toast.error(error.response.data.message, { autoClose: 4000 });
        });
    }
}

export function SignInAction(data) {
    console.log(data);
    return dispatch => {
        // dispatch(ShowLoader(true));
        let request = {
            method: 'POST',
            url: `${apiUrls.apiBaseUrl}${apiUrls.userSignIn}`,
            headers: { 'Content-Type': 'application/json' },
            data: data
        };
        return axios(request).then((data) => {
            // dispatch(ShowLoader(false));
            // dispatch(ShowAlert({ Class: "alert-success", Message: data.data.ResponseText, Timeout: 1500 }));
            // dispatch(profileInfo())
            console.log(data);
            toast.success(data.data.message, { autoClose: 4000 });
            return data;
        }).catch((error) => {
            console.log(error.response.data.message);
            toast.error(error.response.data.message, { autoClose: 4000 });
        });
    }
}

export function getUserProfileAction(prodileId) {
    return dispatch => {
        // dispatch(ShowLoader(true));
        let request = {
            method: 'GET',
            url: `${apiUrls.apiBaseUrl}${apiUrls.userProfile}${prodileId}`,
            headers: { 'Content-Type': 'application/json' },
        };
        return axios(request).then((data) => {
            // dispatch(ShowLoader(false));
            return data;
        }).catch((error) => {
            console.log(error.response.data.message);
            toast.error(error.response.data.message, { autoClose: 4000 });
        });
    }
}

export function requestQuoteAction() {
    return dispatch => {
        // dispatch(ShowLoader(true));
        let request = {
            method: 'POST',
            url: `${apiUrls.apiBaseUrl}${apiUrls.quotes}`,
            headers: { 'Content-Type': 'application/json' },
        };
        return axios(request).then((data) => {
            // dispatch(ShowLoader(false));
            console.log(data);
            toast.success(data.data.message, { autoClose: 4000 });
            return data;
        }).catch((error) => {
            console.log(error.response.data.message);
            toast.error(error.response.data.message, { autoClose: 4000 });
        });
    }
}