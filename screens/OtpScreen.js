import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, AsyncStorage } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { XIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'
import { FancyAlert } from 'react-native-expo-fancy-alerts';
import { verifyOtp } from '../https/auth'
import { useDispatch, useSelector } from 'react-redux'
import { setAuth } from '../features/authSlice'
import { withInAppNotification } from 'react-native-in-app-notification';
import * as SecureStore from 'expo-secure-store';

const OtpScreen = (props) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);
    const [otp, setOTP] = useState('');
    

    const { email, hash } = useSelector(state => state.auth.otp);

    const handleOtp = async () => {
        if(!otp || !email || !hash) {
            setVisible(true);
            return;
        }

        try {
            const data= await verifyOtp({ email, otp, hash });
            console.log(data, 'data');
            await SecureStore.setItemAsync('accessToken', data.accessToken);
            await SecureStore.setItemAsync('refreshToken', data.refreshToken);

            console.log(await SecureStore.getItemAsync('accessToken'), 'added');
            dispatch(setAuth(data));
            navigation.navigate('Home');
        } catch(err) {
            console.log(err);
        }

    }

    return (
        <SafeAreaView className='flex-1 bg-gray-200'>
            <View className='flex-1 bg-gray-100'>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <XIcon color="green" className='z-50' size={30} />
                </TouchableOpacity>
                <View className='flex-1 flex-col items-center justify-center -mt-32 bg-white relative'>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')} className='absolute top-[14%] left-5 bg-[#00CCBB] rounded-full'>
                        <XIcon color="white" className='z-999' size={36} />
                    </TouchableOpacity>

                    <Image 
                        source={require('../assets/icon.jpg')}
                        className='h-24 w-40 bg-gray-300 p-4 rounded-full'
                    />

                    <Text className={`text-center text-3xl text-gray-600 p-4 font-bold`}>Verify OTP</Text>
                    <Text className='text-center text-[15px] text-gray-500 mb-8 font-bold'>A verification code has been sent on your email.</Text>

                    <View className='flex-col items-center justify-center space-y-6'>

                    <TextInput defaultValue={email} editable={false} placeholder='Enter your email' className='h-10 w-72 border border-gray-400 text-lg px-4 py-0' keyboardType='email-address' maxLength={50} />

                    <TextInput onChangeText={val => setOTP(val)} defaultValue={otp} placeholder='Enter OTP' className='h-10 w-72 border border-gray-400 text-lg px-4 py-0' keyboardType='number-pad' maxLength={14} />

                    <TouchableOpacity
                        onPress={() => handleOtp()}
                        className='bg-[#00CCBB] mx-8 mt-6 p-3 rounded-lg flex-row items-center'
                    >
                        <Text className='flex-1 text-white font-bold text-lg text-center'>Verify OTP</Text>
                    </TouchableOpacity>
                    </View>

                </View>
            </View>

            <FancyAlert
                visible={visible}
                icon={<TouchableOpacity style={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 50,
                    width: '100%',
                  }} className='bg-red-400'><Text className='text-3xl'>X</Text></TouchableOpacity>}
                style={{ backgroundColor: 'white' }}
            >
                <Text style={{ marginTop: -16, marginBottom: 32 }} className='text-xl text-red-600'>All fields are required !!</Text>
                <TouchableOpacity
                     onPress={() => setVisible(false)}
                    className='bg-red-400 mx-4 mb-4 p-3 rounded-lg flex-row items-center'
                >
                    <Text className='flex-1 text-white font-bold text-lg text-center'>OK</Text>
                </TouchableOpacity>
            </FancyAlert>

        </SafeAreaView>
    )
}

export default withInAppNotification(OtpScreen)