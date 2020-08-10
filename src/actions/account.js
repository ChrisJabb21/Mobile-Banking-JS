import { BASE_API_URL } from '../utils/constants';
import { getErrors } from './errors';
import { SET_ACCOUNT, UPDATE_ACCOUNT} from '../utils/constants';
import {get, patch, post } from '../utils/api';

//Action creater
export const setAccount = (accountDetails) => ({
    type: SET_ACCOUNT,
    accountDetails
});

export const updateAccountBalance = (amountToChange,operation) => ({
    type: UPDATE_ACCOUNT,
    amountToChange,
    operation
});

export const initiateGetAccntDetails = () => {
    return async (dispatch) => {
        try{
            const account = await get(`${BASE_API_URL}/account`);
            return dispatch(setAccount(account.data));
        } catch (error) {
            error.response && dispatch(getErrors(error.response.data));
        } 
    };
};


export const initiateAddAccntDetails = (account_no) => {
    return async (dispatch) => {
        try{
             return await post(`${BASE_API_URL}/account`, {
                 account_no
            });

        } catch (error) {
            error.response && dispatch(getErrors(error.response.data));
        } 
    };
};

export const initiateUpdateAccntDetails = (account_no) => {
    return async (dispatch ) => {
        try{
            const account = await patch(`${BASE_API_URL}/account`, {
                account_no
            });
            dispatch(setAccount(account.data));
        } catch (error) {
            error.response && dispatch(getErrors(error.response.data));
        }
    };
};