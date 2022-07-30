import React from 'react'
import { Image, Text, TouchableOpacity } from 'react-native'

const MenuCard = ({ item }) => {
  return (
    <TouchableOpacity className='relative mr-2 mb-3'>
        <Image
            source={item.image}
            // source={{ uri: val }}
            className='h-24 w-24 rounded-full'
        />
      <Text className='text-gray-600 mt-2 text-center font-bold'>{item.name}</Text>
    </TouchableOpacity>
  )
}

export default MenuCard