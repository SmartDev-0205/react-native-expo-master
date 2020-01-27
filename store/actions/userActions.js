import * as actionTypes from './actionTypes'
import jwt from 'expo-jwt';
import { AsyncStorage } from 'react-native';
import config from '../../global/config';

const options = data => {
    return {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify(data)
    };
};

export const checkUserUniqueness = ({ field, value }) => {
    return dispatch => {
        return fetch(config.apiServer + '/api/users/validate', options({ field, value }))
    }
}

export const userSignupRequest = (userSignupDetails) => {
    return dispatch => {
        return fetch(config.apiServer + '/api/users/signup', options(userSignupDetails))
    }
}

export const userLoginRequest = (userLoginDetails) => {
    return dispatch => {
        return fetch(config.apiServer + '/api/users/login', options(userLoginDetails))
        .then(res => res.json())
        .then(res => {
            if (res.success) {
                const token = res.token;
                delete res.token;
                AsyncStorage.setItem('jwtToken', token);
                dispatch({ type: actionTypes.LOGIN_SUCCESSFUL, authorizationToken: token, authenticatedUsername: jwt.decode(token, config.secretKey).username });
            }
            return res;
        })
    }   
}

export const userLogoutRequest = () => {
    return dispatch => {
        AsyncStorage.removeItem('BasicMERNStackAppMyArticles');
        AsyncStorage.removeItem('jwtToken');
        dispatch({ type: actionTypes.LOGOUT_USER });
    }
}

export const testUser = (testData) => {
    return dispatch =>{
        dispatch({type: actionTypes.USER_TEST, testData: testData});
    }
}