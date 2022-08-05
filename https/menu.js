import api from './api';


export const fetchItems = async () => {
    const { data } = await api.get('http://192.168.207.154:5000/api/fetch-items');
    return data;
}



export const fetchRestraunts = async () => {
    const { data } = await api.get('http://192.168.207.154:5000/api/fetch-restraunts');
    return data;
}