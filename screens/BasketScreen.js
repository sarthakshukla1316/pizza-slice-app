import { useNavigation } from '@react-navigation/native'
import React, { useMemo, useState } from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { XCircleIcon } from 'react-native-heroicons/outline';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromBasket, selectBasketItems, selectBasketTotal } from '../features/basketSlice';
import { selectRestraunt } from '../features/restrauntSlice';
import Currency from 'react-currency-formatter'
import { StripeProvider } from '@stripe/stripe-react-native';
import PaymentCard from '../components/PaymentCard';
import { order } from '../https/order';


const BasketScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const restraunt = useSelector(selectRestraunt);
    const items = useSelector(selectBasketItems);
    const basketTotal = useSelector(selectBasketTotal);

    const [groupedItemsInBasket, setgroupedItemsInBasket] = useState([]);
    const [cardDetails, setCardDetails] = useState({});

    useMemo(() => {
        const groupedItems = items.reduce((results, item) => {
            (results[item.id] = results[item.id] || []).push(item);
            return results;
        }, {});

        setgroupedItemsInBasket(groupedItems);
    }, [items]);

    const handleCheckout = async () => {
        try {
            const { data } = await order();
            console.log(data, 'order');
        } catch(err) {
            console.log(err);
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

                <ScrollView className='divide-y divide-gray-200'>
                    {
                        Object.entries(groupedItemsInBasket).map(([key, items]) => (
                            <View key={key} className='flex-row items-center space-x-3 bg-white py-2 px-5'>
                                <Text className='text-[#00CCBB]'>{items.length} x</Text>
                                <Image 
                                    // source={{ uri: items[0]?.image }}
                                    source={items[0].image}
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

                <View className='p-5 bg-white mt-5 space-y-4'>
                    <View className='flex-row justify-between'>
                        <Text className='text-gray-400'>SubTotal</Text>
                        <Text className='text-gray-400'>
                            <Currency quantity={basketTotal} currency="INR" />
                        </Text>
                    </View>

                    <View className='flex-row justify-between'>
                        <Text className='text-gray-400'>Delivery Fee</Text>
                        <Text className='text-gray-400'>
                            <Currency quantity={40} currency="INR" />
                        </Text>
                    </View>

                    <View className='flex-row justify-between'>
                        <Text className='text-lg text-gray-700'>Order Total</Text>
                        <Text className='font-extrabold'>
                            <Currency quantity={basketTotal <= 300 ? basketTotal + 40 : basketTotal} currency="INR" />
                        </Text>
                    </View>

                    {
                        basketTotal > 0 ? 
                        <TouchableOpacity onPress={() => navigation.navigate('PreparingOrderScreen')} className='rounded-lg bg-[#00CCBB] p-3'>
                            <Text className='text-center text-white text-lg font-bold'>Place Order</Text>
                        </TouchableOpacity> 
                        : 
                        <TouchableOpacity disabled={true} style={{ opacity: 0.3 }} className='rounded-lg bg-[#00CCBB] p-3'>
                            <Text className='text-center text-white text-lg font-bold'>Place Order</Text>
                        </TouchableOpacity>
                    }

                    <StripeProvider
                        publishableKey={'pk_test_51JJdXiSFC2ysPpAcbFr2KjooBXuMHHzexqTBU93DDd4xncUSMMVJzuWkr4gjtSYWulK7n2qlFZ1EH1LGbiX10kox00YIBvtTgq'}
                        merchantIdentifier="merchant.identifier"
                    >
                        <PaymentCard setCardDetails={setCardDetails} />
                    </StripeProvider>

                    <TouchableOpacity onPress={() => handleCheckout()} className='rounded-lg bg-[#00CCBB] p-3'>
                        <Text className='text-center text-white text-lg font-bold'>Checkout</Text>
                    </TouchableOpacity> 
                    
                </View>
            </View>
        </SafeAreaView>
    )
}

export default BasketScreen