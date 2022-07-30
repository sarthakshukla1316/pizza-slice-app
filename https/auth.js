import axios from "axios";

export const sendOtp = async (body) => {
    const { data } = await axios.post('http://192.168.96.154:5000/api/send-otp', body);
    return data;
}

export const verifyOtp = async (body) => {
    const { data } = await axios.post('http://192.168.96.154:5000/api/verify-otp', body);
    return data;
}

export const login = async (body) => {
    const { data } = await axios.post('http://192.168.96.154:5000/api/login', body);
    return data;
}

export const loginWithPassword = async (body) => {
    const { data } = await axios.post('http://192.168.96.154:5000/api/login-via-password', body);
    return data;
}

export const logout = async () => {
    const { data } = await axios.post('http://192.168.96.154:5000/api/logout');
    return data;
}