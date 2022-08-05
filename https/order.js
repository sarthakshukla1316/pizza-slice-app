import api from './api';


export const sendOrderOtp = async ({ accessToken, ...body }) => {
    console.log(accessToken, 'token api');
    const config = {
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${accessToken}`,
        }
    }
    console.log(body, 'bodt sent');
    const { data } = await api.post('http://192.168.207.154:5000/api/send-order-otp', body, config);
    return data;
}


export const checkout = async ({ accessToken, ...body }) => {
    console.log(accessToken, 'token api');
    const config = {
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${accessToken}`,
        }
    }
    const { data } = await api.post('http://192.168.207.154:5000/api/checkout', body, config);
    return data;
}



export const fetchOrders = async ({ accessToken }) => {
    const config = {
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${accessToken}`,
        }
    }
    const { data } = await api.get('http://192.168.207.154:5000/api/fetch-orders', config);
    return data;
}
