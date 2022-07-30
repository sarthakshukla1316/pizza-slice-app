import { View, Image, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AdjustmentsIcon, ChevronDownIcon, SearchIcon, UserIcon } from 'react-native-heroicons/outline';
import Categories from '../components/Categories';
import MenuList from '../components/MenuList';
import FeaturedRow from '../components/FeaturedRow';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../https/auth';
import { setAuth } from '../features/authSlice';
import * as SecureStore from 'expo-secure-store';
import Banner from '../components/Banner';
import Feedback from '../components/Feedback';

const HomeScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    const { user } = useSelector(state => state.auth || {});
    console.log(user, 'user');

    const logoutUser = async () => {
        const data = await logout();
        console.log(await SecureStore.getItemAsync('accessToken'), 'removed');
        await SecureStore.setItemAsync('accessToken', '');
        dispatch(setAuth(data));
    }

    return (
        <SafeAreaView className='bg-white pt-3'>
            {/* Header */}
            <View className='flex-row pb-3 items-center mx-4 space-x-2'>
                <Image 
                    source={{
                        uri: 'https://links.papareact.com/wru'
                    }}
                    className='h-7 w-7 bg-gray-300 p-4 rounded-full'
                />

                <View className='flex-1'>
                    <Text className='font-bold text-gray-400 text-xs'>Deliver Now!</Text>
                    <Text className='font-bold text-xl'>Current Location <ChevronDownIcon size={20} color="#00CCBB" />
                    </Text>
                </View>

                {/* <UserIcon size={30} color="#00CCBB" /> */}
                {
                    !user ? (
                        <>
                            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                                <Text className='text-lg text-gray-800 mr-2 font-bold'>Register</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                <Text className='text-lg text-gray-800 font-bold'>Login</Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <>
                            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                                <Text className='text-lg text-[#457c2f] mr-2 font-bold'>{user.name}</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity onPress={() => logoutUser()}>
                                <Text className='text-lg text-[#ee6347] font-bold'>Logout</Text>
                            </TouchableOpacity>
                        </>
                    )
                }
                
            </View>

            {/* Search section */}
            <View className='flex-row items-center space-x-2 pb-2 mx-4'>
                <View className='flex-row flex-1 space-x-2 bg-gray-200 p-3'>
                    <SearchIcon color='gray' size={20} />
                    <TextInput onChangeText={newText => setSearch(newText)} placeholder='Restraunts and cuisines' keyboardType='default' />
                </View>

                <AdjustmentsIcon color='#00CCBB' />
            </View>




            {/* Body */}
            <ScrollView className='bg-gray-100' contentContainerStyle={{ paddingBottom: 100, }}>
                {/* Categories */}

                <Categories />

                <FeaturedRow
                    id="123"
                    i="7"
                    j="13"
                    search={search}
                    title="Weekly Specials"
                    description="Get 40% off, flat deals & much more"
                    featuredCategory="featured"
                />

                {/* Banner section */}
                <Banner images = {images1} title="Check this out !" />

                {/* Menu items list */}

                <MenuList />

                <Banner images={images2} title="Free Delivery and crazy discounts" />


                {/* Featured rows */}

                <FeaturedRow
                    id="123"
                    i="0"
                    j="7"
                    search={search}
                    title="Recommended for you!"
                    description="Get 40% off, flat deals & much more"
                    featuredCategory="featured"
                />
                <FeaturedRow
                    id="123456"
                    i="14"
                    j="18" search={search}
                    title="Quick checkout munchies"
                    description="Paid placements from our partners"
                    featuredCategory="featured"
                />
                <FeaturedRow
                    id="1234"
                    i="8"
                    j="13" search={search}
                    title="Value for money"
                    description="Choose from various delicious dishes"
                    featuredCategory="featured"
                />

                <Feedback />
                
            </ScrollView>

        </SafeAreaView>
    )
}

const images1 = [require('../assets/banner1.png'),require('../assets/banner2.jpg'),require('../assets/banner3.webp')];
const images2 = [require('../assets/banner_del.jpg'),require('../assets/banner_ice.jpg')];

export default HomeScreen