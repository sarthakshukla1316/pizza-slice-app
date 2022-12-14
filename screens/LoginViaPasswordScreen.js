import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { EyeIcon, EyeOffIcon, XIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'
import { FancyAlert } from 'react-native-expo-fancy-alerts';
import { loginWithPassword } from '../https/auth'
import { useDispatch } from 'react-redux'
import * as SecureStore from 'expo-secure-store';
import { setAuth } from '../features/authSlice'

const LoginScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [visible, setVisible] = useState(false);
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async () => {
        if( !email || !password ) {
            setVisible(true);
            return;
        }

        try {
            const data = await loginWithPassword({ email, password });
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
                
                <View className='flex-1 flex-col items-center justify-center -mt-32 bg-white relative'>
                  <TouchableOpacity onPress={() => navigation.navigate('Home')} className='absolute top-[17%] left-5 bg-[#00CCBB] rounded-full'>
                      <XIcon color="white" className='z-999' size={36} />
                  </TouchableOpacity>
                    <Image 
                        source={require('../assets/icon.jpg')}
                        className='h-24 w-40 bg-gray-300 p-4 rounded-full'
                    />

                    <Text className='text-center text-3xl text-gray-600 p-4 mb-6 font-bold'>Sign In</Text>

                    <View className='flex-col items-center justify-center space-y-6'>
                        
                        <TextInput onChangeText={val => setEmail(val)} defaultValue={email} placeholder='Enter your email' className='h-10 w-72 border border-gray-400 text-lg px-4 py-0' keyboardType='email-address' maxLength={50} />

                        <View className='relative'>
                          <TextInput onChangeText={val => setPassword(val)} defaultValue={password} secureTextEntry={!showPassword && true} placeholder='Enter password' className='h-10 w-72 border border-gray-400 text-lg px-4 py-0' keyboardType='default' autoFocus={true} maxLength={50} />
                          {
                              !showPassword ? <TouchableOpacity onPress={() => setShowPassword(true)} className='absolute top-3 right-4'><EyeIcon color="#696969" size={20} /></TouchableOpacity>
                              : <TouchableOpacity onPress={() => setShowPassword(false)} className='absolute top-3 right-4'><EyeOffIcon color="#696969" size={20} /></TouchableOpacity>
                          }
                          </View>

                        <View className='flex-row items-center justify-center space-x-4'>
                            <Text className='text-[16px] border-b'>Don't have account ?</Text>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Register')}
                                className='bg-[#ea5620] mx-2 px-3 py-1 rounded-lg flex-row items-center'
                            >
                                <Text className='text-white font-bold text-[16px] text-center'>Register</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            onPress={handleSubmit}
                            className='bg-[#00CCBB] mx-8 mt-6 p-3 rounded-lg flex-row items-center'
                        >
                            <Text className='flex-1 text-white font-bold text-lg text-center'>Login</Text>
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

export default LoginScreen