import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { XIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'
import { FancyAlert } from 'react-native-expo-fancy-alerts';
import { login } from '../https/auth'
import { useDispatch } from 'react-redux'
import { setOtp } from '../features/authSlice'

const LoginScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [visible, setVisible] = useState(false);

    const handleSubmit = async () => {
        if( !email ) {
            setVisible(true);
            return;
        }

        try {
            const data = await login({ email });
            console.log(data, 'data');
            dispatch(setOtp({ email: data.email, hash: data.hash }));
            navigation.navigate('OTP');
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
                            <Text className='flex-1 text-white font-bold text-lg text-center'>Request for OTP</Text>
                        </TouchableOpacity>

                        <Text className='text-center text-gray-700 text-xl font-bold'>OR</Text>

                        <TouchableOpacity
                            onPress={() => navigation.navigate('LoginViaPassword')}
                            className='bg-[#f05d5d] mx-8 mt-2 p-3 rounded-lg flex-row items-center'
                        >
                            <Text className='flex-1 text-white font-bold text-lg text-center'>Switch to Password</Text>
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