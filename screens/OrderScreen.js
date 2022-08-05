import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { XIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'
import {TableView} from "react-native-responsive-table"
import { fetchOrders } from '../https/order'
import * as SecureStore from 'expo-secure-store';
import moment from 'moment'

const OrderScreen = () => {
    const navigation = useNavigation();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accessToken = await SecureStore.getItemAsync('accessToken');
                const data = await fetchOrders({ accessToken });
                // console.log(data, 'orders');
                setOrders(data);
            } catch(err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);

    let array = [];
    orders?.map(order => {
        let x = {
            orders: order._id,
            phone: order.phone,
            address: order.address,
            price: order.price,
            payment: order.paymentType,
            time: moment(order.createdAt).format(' h:mm a , MMM Do YYYY')
        }
        array.push(x);
    })

    return (
        <SafeAreaView className='flex-1 bg-gray-200'>
            <View className='flex-1 bg-gray-100'>
                
                <View className='flex-1 flex-col items-center justify-center -mt-32 bg-white relative'>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')} className='absolute top-[17%] left-5 bg-[#00CCBB] rounded-full'>
                        <XIcon color="white" className='z-999' size={36} />
                    </TouchableOpacity>

                    <Text className='text-center text-3xl text-gray-600 p-4 -mt-12 mb-6 font-bold'>Orders</Text>

                    <View className=''>
                        <TableView
                            headers={headers}
                            rows={array}
                        />
                    </View>
                </View>
            </View>

        </SafeAreaView>
    )
}

const headers = [
    {
        name:"Orders",
        reference_key:"orders",
    },
    {
        name:"Phone",
        reference_key:"phone",
    },
    {
        name:"Address",
        reference_key:"address",
    },{
        name:"Price",
        reference_key:"price",
    },{
        name:"Payment",
        reference_key:"payment",
    },{
        name:"Time",
        reference_key:"time",
    }
]

export default OrderScreen