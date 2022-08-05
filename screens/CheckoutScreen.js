import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { XIcon } from 'react-native-heroicons/outline'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import CheckBox from 'react-native-check-box'
import RNPickerSelect from 'react-native-picker-select';
// import { StripeProvider } from '@stripe/stripe-react-native';
// import PaymentCard from '../components/PaymentCard';
// import { CardFieldInput } from '@stripe/stripe-react-native';
import { checkout } from '../https/order'
import { emptyBasket } from '../features/basketSlice'
import * as SecureStore from 'expo-secure-store';
import { withInAppNotification } from 'react-native-in-app-notification';

const CheckoutScreen = (props) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [address, setAddress] = useState('');
    const [otp, setOtp] = useState('');
    const [sendEmail, setSendEmail] = useState(false);
    const [paymentType, setPaymentType] = useState('cod');
    const [card, setCard] = useState('');
    const [cvc, setCvc] = useState('');
    const [expiry_month, setExpiry_month] = useState('');
    const [expiry_year, setExpiry_year] = useState('');
    const [showCard, setShowCard] = useState(false);

    const { params: { phone, orders, order_id, price }} = useRoute();
    console.log(orders, 'cart')

    const handlePaymentType = (value) => {
        setPaymentType(value);
        if(value === 'cod')
            setShowCard(false);
        else if(value === 'card')
            setShowCard(true);
    }

    const handleCheckout = async () => {
        try {
            const accessToken = await SecureStore.getItemAsync('accessToken');
            if(!address || !otp || (paymentType === 'card' && !card && !cvc && !expiry_month && !expiry_year) || !accessToken) {
                props.showNotification({
                    message: 'All fields are required !!',
                    additionalProps: { type: 'error' },
                });
                return;
            }
            if(paymentType === 'cod') {
                const data = await checkout({ items: orders, otp, address, order_id, price, paymentType, sendEmail, accessToken });
                console.log(data, 'checkout');
            } else if(paymentType === 'card') {
                const data = await checkout({ items: orders, otp, address, order_id, price, paymentType, sendEmail, card, cvc, expiry_month, expiry_year, accessToken });
                console.log(data, 'checkout');
            }
            dispatch(emptyBasket());
            navigation.navigate('PreparingOrderScreen');
        } catch(err) {
            console.log(err);
        }
    }


    return (
        <SafeAreaView className='flex-1 bg-gray-200'>
            <View className='flex-1 bg-gray-100'>
                <View className='flex-1 flex-col items-center justify-center -mt-32 bg-white relative'>
                    <TouchableOpacity onPress={navigation.goBack} className='absolute top-[14%] left-5 bg-[#00CCBB] rounded-full'>
                        <XIcon color="white" className='z-999' size={36} />
                    </TouchableOpacity>

                    <Text className={`text-center text-3xl text-gray-600 mt-4 p-4 mb-6 font-bold`}>Checkout</Text>

                            <View className='flex-col items-center justify-center space-y-6'>
                                <TextInput defaultValue={phone} editable={false} placeholder='Enter your mobile number' className='h-10 w-72 border border-gray-400 text-lg px-4 py-0' keyboardType='phone-pad' maxLength={10} />

                                <TextInput onChangeText={(val) => setAddress(val)} defaultValue={address} placeholder='Enter address' className='h-10 w-72 border border-gray-400 text-lg px-4 py-0' keyboardType='default' autoFocus={true} maxLength={50} />
                                
                                <TextInput onChangeText={(val) => setOtp(val)} defaultValue={otp} placeholder='Enter OTP' className='h-10 w-72 border border-gray-400 text-lg px-4 py-0' keyboardType='number-pad' autoFocus={true} maxLength={50} />

                                <View className='ml-1 w-[288px] border border-gray-500'>
                                    <RNPickerSelect
                                        placeholder={{}}
                                        onValueChange={(value) => handlePaymentType(value)}
                                        items={showpaymentOptions}
                                    />
                                </View>

                                {
                                    showCard ? (
                                        <View className='space-y-4 ml-2'>
                                            <View className='flex-row justify-between flex-wrap'>
                                                <TextInput onChangeText={(val) => setCard(val)} defaultValue={card} placeholder='Card number' className='h-10 w-44 mr-2 border border-gray-400 text-lg px-2 py-0' keyboardType='number-pad' autoFocus={true} maxLength={16} />
                                                <TextInput onChangeText={(val) => setCvc(val)} defaultValue={cvc} placeholder='CVC number' className='h-10 w-26 border border-gray-400 text-lg px-2 py-0' keyboardType='number-pad' autoFocus={true} maxLength={3} />
                                            </View>

                                            <View className='flex-row justify-between flex-wrap'>
                                                <TextInput onChangeText={(val) => setExpiry_month(val)} defaultValue={expiry_month} placeholder='Expiry month' className='h-10 w-44 mr-2 border border-gray-400 text-lg px-2 py-0' keyboardType='number-pad' autoFocus={true} maxLength={2} />

                                                <TextInput onChangeText={(val) => setExpiry_year(val)} defaultValue={expiry_year} placeholder='Expiry year' className='h-10 w-26 border border-gray-400 text-lg px-2 py-0' keyboardType='number-pad' autoFocus={true} maxLength={4} />
                                            </View>
                                        </View>
                                    ) : <Text></Text>
                                }

                                <View className='flex-row items-center -ml-3'>
                                    <CheckBox
                                        onClick={() => setSendEmail(!sendEmail)}
                                        isChecked={sendEmail}
                                    />
                                    <Text className='text-[17px] ml-4 text-green-700'>Do you want to receive order {'\n'} email confirmation?</Text>
                                </View>

                                <TouchableOpacity
                                    onPress={() => handleCheckout()}
                                    className='bg-[#00CCBB] mx-8 mt-6 p-3 rounded-lg flex-row items-center'
                                >
                                    <Text className='flex-1 text-white font-bold text-lg text-center'>Place Order</Text>
                                </TouchableOpacity>
                            </View>

                </View>
            </View>

        </SafeAreaView>
    )
}

const showpaymentOptions = [
    { label: 'Cash on Delivery', value: 'cod' },
    { label: 'Card', value: 'card' },
];

export default withInAppNotification(CheckoutScreen)