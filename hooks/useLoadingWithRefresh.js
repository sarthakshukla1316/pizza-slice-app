import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
import { setAuth } from '../features/authSlice';

const useLoadingWithRefresh = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
      (async () => {
          try {
            const refreshToken = await SecureStore.getItemAsync('refreshToken');
            const accessToken = await SecureStore.getItemAsync('accessToken');
            console.log(refreshToken, 'refresh');
            console.log(accessToken, 'access');

            if(!refreshToken) {
                setLoading(false);
                return { loading };
            }

            const { data } = await axios.post('http://192.168.207.154:5000/api/refresh', { refreshTokenFromCookie: refreshToken });
            console.log(data);
            await SecureStore.setItemAsync('accessToken', data.accessToken);
            await SecureStore.setItemAsync('refreshToken', data.refreshToken);
            dispatch(setAuth(data));
            setLoading(false);

          } catch(err) {
            setLoading(false);
          }

      })();
    }, [])

    return { loading };
}

export default useLoadingWithRefresh