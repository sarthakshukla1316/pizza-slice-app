import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import Currency from 'react-currency-formatter'
import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/outline';
import { useDispatch, useSelector } from 'react-redux';
import { addToBasket, removeFromBasket, selectBasketItemsWithId } from '../features/basketSlice';

const DishRow = ({ id, name, description, price, image }) => {
    const [isPressed, setIsPressed] = useState(false);
    const dispatch = useDispatch();
    const items = useSelector(state => selectBasketItemsWithId(state, id));

    const addItemToBasket = () => {
        if(items.length >= 10)
            return;
        dispatch(addToBasket({ id, name, description, price, image }));
    }

    const removeItemFromBasket = () => {
        if(items.length <= 0)
            return;
        dispatch(removeFromBasket({ id }));
    }

    return (
        <>
            <TouchableOpacity onPress={() => setIsPressed(!isPressed)} className={`bg-white border p-4 border-gray-200 ${isPressed && 'border-b-0'}`}>
                <View className='flex-row'>
                    <View className='flex-1 pr-2'>
                        <Text className='text-lg mb-1'>{name}</Text>
                        <Text className='text-gray-400'>{description}</Text>
                        <Text className='text-gray-400 mt-2'>
                            <Currency quantity={price} currency="INR" />
                        </Text>
                    </View>

                    <View>
                        <Image
                            style={{
                                borderWidth: 1,
                                borderColor: '#F3F3F4'
                            }}
                            // source={{ uri: image }}
                            source={image}
                            className='h-20 w-20 bg-gray-300 p-4'
                        />
                    </View>                
                </View>
            </TouchableOpacity>

            {
                isPressed && (
                    <View className='bg-white px-4'>
                        <View className='flex-row items-center space-x-2 pb-3'>
                            <TouchableOpacity
                                disabled={items.length === 0}
                                onPress={removeItemFromBasket}
                            >
                                <MinusCircleIcon color={items.length ? '#00CCBB' : 'gray'} size={32} />
                            </TouchableOpacity>
                            <Text>{items.length}</Text>
                            <TouchableOpacity
                                disabled={items.length === 10}
                                onPress={addItemToBasket}
                            >
                                <PlusCircleIcon color="#00CCBB" size={32} />
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            }
        </>
    )
}

export default DishRow