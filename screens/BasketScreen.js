import { useNavigation } from '@react-navigation/native'
import React, { useMemo, useState } from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import { XCircleIcon } from 'react-native-heroicons/outline';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromBasket, selectBasketItems, selectBasketTotal } from '../features/basketSlice';
import { selectRestraunt } from '../features/restrauntSlice';
import Currency from 'react-currency-formatter'
import { sendOrderOtp } from '../https/order';
import * as SecureStore from 'expo-secure-store';
import { withInAppNotification } from 'react-native-in-app-notification';

const BasketScreen = (props) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const restraunt = useSelector(selectRestraunt);
    const items = useSelector(selectBasketItems);
    const basketTotal = useSelector(selectBasketTotal);
    const [phone, setPhone] = useState('');

    const [groupedItemsInBasket, setgroupedItemsInBasket] = useState([]);

    useMemo(() => {
        const groupedItems = items.reduce((results, item) => {
            (results[item.id] = results[item.id] || []).push(item);
            return results;
        }, {});

        setgroupedItemsInBasket(groupedItems);
    }, [items]);

    const handleCheckout = async () => {
        try {
            const accessToken = await SecureStore.getItemAsync('accessToken');
            if(!accessToken) {
                props.showNotification({
                    message: 'Please Sign In to order !!',
                    additionalProps: { type: 'error' },
                });
                return;
            }
            if(!phone) {
                props.showNotification({
                    message: 'Please enter phone number !!',
                    additionalProps: { type: 'error' },
                });
                return;
            }
            const data = await sendOrderOtp({ phone, accessToken });
            console.log(data, 'order otp');

            navigation.navigate('Checkout', {
                phone, orders: groupedItemsInBasket, order_id: data.order_id, price: basketTotal <= 300 ? basketTotal+40 : basketTotal
            });
        } catch(err) {
            console.log(err?.response?.data?.message);
        }
    }

    return (
        <SafeAreaView className='flex-1 bg-white'>
            <View className='flex-1 bg-gray-100'>
                <View className='p-5 border-b border-[#00CCBB] bg-white shadow-xs'>
                    <View>
                        <Text className='text-lg font-bold text-center'>Basket</Text>
                        <Text className='text-center text-gray-400'>{restraunt.title}</Text>
                    </View>

                    <TouchableOpacity
                        onPress={navigation.goBack}
                        className='rounded-full bg-gray-100 absolute top-3 right-5'
                    >
                        <XCircleIcon color="#00CCBB" height={50} width={50} />
                    </TouchableOpacity>
                </View>

                {
                    basketTotal > 0 ? (
                        <View className='flex-row items-center space-x-4 px-4 py-3 bg-white my-5'>
                            <Image 
                                source={{ uri: 'https://links.papareact.com/wru' }}
                                className='h-7 w-7 bg-gray-300 p-4 rounded-full'
                            />
                            <Text className='flex-1'>Deliver in 40-45 min</Text>
                            <TouchableOpacity>
                                <Text className='text-[#00CCBB]'>Change</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View className=''>
                            <Text className='text-3xl font-semibold text-center mt-16 text-gray-700'>Empty Basket</Text>
                            <Text className='text-lg font-semibold text-center mt-4 text-gray-500'>You probably haven't ordered any food yet. To order a food, go to the home page.</Text>
                        </View>
                    )
                }

                <ScrollView className='divide-y divide-gray-200'>
                    {
                        Object.entries(groupedItemsInBasket).map(([key, items]) => (
                            <View key={key} className='flex-row items-center space-x-3 bg-white py-2 px-5'>
                                <Text className='text-[#00CCBB]'>{items.length} x</Text>
                                <Image 
                                    source={{ uri: items[0]?.image }}
                                    // source={items[0].image}
                                    className='h-12 w-12 rounded-full'
                                />
                                <Text className='flex-1'>{items[0]?.name}</Text>
                                <Text className='text-gray-600'>
                                    <Currency quantity={items[0].price} currency="INR" />
                                </Text>

                                <TouchableOpacity>
                                    <Text
                                        className='text-[#00CCBB] text-xs'
                                        onPress={() => dispatch(removeFromBasket({ id: key }))}
                                    >
                                        Remove
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            
                        ))
                    }
                </ScrollView>

                {
                    basketTotal > 0 ? (
                        <View className='p-5 bg-white mt-5 space-y-4'>
                            <View className='flex-row justify-between'>
                                <Text className='text-gray-400'>SubTotal</Text>
                                <Text className='text-gray-400'>
                                    <Currency quantity={basketTotal} currency="INR" />
                                </Text>
                            </View>

                            <View className='flex-row justify-between'>
                                <Text className='text-gray-400'>Delivery Fee</Text>
                                <View className='mr-2'>
                                    <Text className={`text-gray-400 ${basketTotal > 300 && 'line-through text-red-500'}`}>
                                        <Currency quantity={40} currency="INR" />
                                    </Text>
                                    {basketTotal > 300 && <Text className='text-green-600'>FREE</Text>}
                                </View>
                            </View>

                            <View className='flex-row justify-between items-center'>
                                <Text className='text-lg text-gray-700'>Order Total</Text>
                                <Text className='font-bold text-lg text-gray-800'>
                                    <Currency quantity={basketTotal <= 300 ? basketTotal + 40 : basketTotal} currency="INR" />
                                </Text>
                            </View>

                            <View className=''>
                                <Text className='text-[17px] mt-4 text-green-700'>Enter phone number to receive order verification otp</Text>
                                <TextInput onChangeText={val => setPhone(val)} defaultValue={phone} placeholder='Enter your phone number' className='h-10 w-72 border mt-3 border-gray-400 text-lg px-4 py-0' keyboardType='phone-pad' maxLength={10} />
                            </View>

                            <TouchableOpacity onPress={() => handleCheckout()} className='rounded-lg bg-[#00CCBB] p-3'>
                                <Text className='text-center text-white text-lg font-bold'>Proceed to Checkout</Text>
                            </TouchableOpacity>
                            
                        </View>
                    ) : (
                        <ScrollView className='-mt-16 ml-16'>
                            <Image
                                source={require('../assets/empty-cart.png')}
                                className='h-56 w-56'
                            />
                            <TouchableOpacity onPress={() => navigation.navigate('Home')} className='rounded-lg bg-[#00CCBB] p-3 mt-8 mr-16'>
                                <Text className='text-center text-white text-lg font-bold'>Add Items</Text>
                            </TouchableOpacity> 
                        </ScrollView>
                    )
                }
            </View>
        </SafeAreaView>
    )
}

export default withInAppNotification(BasketScreen)