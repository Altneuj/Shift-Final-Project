import axios from 'axios';
import { FETCH_USERS, FETCH_NOUN } from './types';

export const fetchUsers = () => {
    let response = axios.get('/api/users');
    return {type: FETCH_USERS, payload: response}
}

export const fetchNoun = () => {
    let response = axios.get('/api/noun');
    return {type: FETCH_NOUN, payload: response}
}