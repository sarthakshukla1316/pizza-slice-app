import { View, Text } from 'react-native'
import React from 'react'
import { SliderBox } from "react-native-image-slider-box";

const Banner = ({ images, title }) => {
    return (
        <View className='my-4'>
            <Text className='text-xl font-bold text-gray-800 mb-2 ml-4'>{title}</Text>
            <SliderBox
                images={images}
                // onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
                // currentImageEmitter={index => console.warn(`current pos is: ${index}`)}
                />
        </View>
  )
}

export default Banner