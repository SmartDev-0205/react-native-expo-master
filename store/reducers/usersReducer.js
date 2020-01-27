import * as actionTypes from '../actions/actionTypes'
import jwt from 'expo-jwt';
import { AsyncStorage } from 'react-native';
import config from '../../global/config';

const validCredentials = async () => {
    const authorizationToken = await AsyncStorage.getItem('jwtToken');
    if (authorizationToken === null)
        return false;
    try {
        jwt.decode(authorizationToken, config.secretKey);
        return true;
    } catch(err) {
        return false;
    }
}

const initialState = {
    isAuthenticated: validCredentials(),
    authenticatedUsername: validCredentials() === false ? '' : '',
    testData: 'old uset test data',
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_SUCCESSFUL:
            return {
                ...state,
                isAuthenticated: true,
                authenticatedUsername: action.authenticatedUsername,
            }
        case actionTypes.LOGOUT_USER: {
            return {
                ...state,
                isAuthenticated: false,
                authenticatedUsername: ''
            }
        }
        case actionTypes.USER_TEST: {
            return {
                ...state,
                testData: action.testData,
            }
        }
        default:
            return state;
    }
};

export default usersReducer;
