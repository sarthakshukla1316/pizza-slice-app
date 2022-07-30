import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'

const Feedback = () => {
    return (
        <View className='my-4 bg-white'>
            <Text className='text-center text-2xl text-gray-800 p-4 mb-3 font-bold'>Give Feedback !</Text>

            <View className='flex-col items-center justify-center my-3 space-y-6'>
                        
                <TextInput placeholder='Enter your name' className='h-10 w-72 border border-gray-400 text-lg px-4 py-0' keyboardType='email-address' maxLength={50} />

                <TextInput placeholder='Enter your email' className='h-10 w-72 border border-gray-400 text-lg px-4 py-0' keyboardType='email-address' maxLength={50} />

                <TextInput placeholder='Enter your subject' className='h-10 w-72 border border-gray-400 text-lg px-4 py-0' keyboardType='email-address' maxLength={50} />

                <View>
                <TextInput placeholder='Any comments, questions or suggestions ?' className='h-10 w-72 border border-gray-400 text-lg px-4 py-0' multiline
        numberOfLines={4} keyboardType='numeric' maxLength={50} />
                </View>
                        
            </View>
        </View>
    )
}

export default Feedback