//@flow
import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';

import {
    FB_LOGIN_SUCCESS,
    FB_LOGIN_FAILED
} from './types.js';

export const facebookLogin = () => async dispatch => {
    let token = await AsyncStorage.getItem('fb_token');

    if (token) {
        dispatch({ type: FB_LOGIN_SUCCESS, payload: token })
    } else {
        doFacebookLogin(dispatch);
    }
};

const doFacebookLogin = async (dispatch) => {
    let { type, token } = await Facebook.logInWithReadPermissionsAsync('902479796583439', {
        permissions: ['public_profile'],
        behavior : 'web' 
    });

    if (type === 'cancel') {
        return dispatch({ type: FB_LOGIN_FAILED, payload: 'FB login failed' })
    }

    await AsyncStorage.setItem('fb_token', token);
    dispatch({ type: FB_LOGIN_SUCCESS, payload: token });
};
    
