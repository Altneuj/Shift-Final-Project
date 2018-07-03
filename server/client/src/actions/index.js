import axios from 'axios';
import { SUBMIT_USER } from './types';

export const submitUser = (state) => {
    let response = axios.post('/api/login', state);
    return {type: SUBMIT_USER, payload: response}
}