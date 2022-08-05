import { View, Image, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AdjustmentsIcon, ChevronDownIcon, SearchIcon, ShoppingCartIcon } from 'react-native-heroicons/outline';
import Categories from '../components/Categories';
import MenuList from '../components/MenuList';
import FeaturedRow from '../components/FeaturedRow';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../https/auth';
import { setAuth } from '../features/authSlice';
import * as SecureStore from 'expo-secure-store';
import Banner from '../components/Banner';
import Feedback from '../components/Feedback';
import { fetchItems, fetchRestraunts } from '../https/menu';
import RestrauntsRow from '../components/RestrauntsRow';
import useLoadingWithRefresh from '../hooks/useLoadingWithRefresh';
import axios from 'axios';

const HomeScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const [items, setItems] = useState([]);
    const [restraunts, setRestraunts] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchItems();
                setItems(data);
            } catch(err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchRestraunts();
                setRestraunts(data);
            } catch(err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);
    
    useEffect(() => {
        const callFn = async () => {
            const refreshToken = await SecureStore.getItemAsync('refreshToken');
            console.log(refreshToken, 'refresh token');
            console.log(await SecureStore.getItemAsync('accessToken'), 'access token');
            if(!refreshToken) {
                return;
            }
      
            const { data } = await axios.post('http://192.168.207.154:5000/api/refresh', { refreshTokenFromCookie: refreshToken });
            console.log(data);
            await SecureStore.setItemAsync('accessToken', data.accessToken);
            await SecureStore.setItemAsync('refreshToken', data.refreshToken);
            dispatch(setAuth(data));
        }
        callFn();
    }, [])
    

    const { user } = useSelector(state => state.auth || {});
    console.log(user, 'user');

    const logoutUser = async () => {
        const refreshTokenOrg = await SecureStore.getItemAsync("refreshToken");
        const accessTokenOrg = await SecureStore.getItemAsync("refreshToken");

        const data = await logout({ accessTokenOrg, refreshTokenOrg });
        console.log(await SecureStore.getItemAsync('accessToken'), 'removed');
        await SecureStore.setItemAsync('accessToken', '');
        await SecureStore.setItemAsync('refreshToken', '');
        dispatch(setAuth(data));
    }
    

    // const { loading } = useLoadingWithRefresh();

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
                    <Text className='font-bold text-[18px]'>Current Location <ChevronDownIcon size={20} color="#00CCBB" />
                    </Text>
                </View>

                {/* <UserIcon size={30} color="#00CCBB" /> */}
                {
                    !user ? (
                        <>
                            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                                <Text className='text-[17px] text-gray-800 mr-2 font-bold'>Register</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                <Text className='text-[17px] text-gray-800 font-bold'>Login</Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <>
                            <TouchableOpacity onPress={() => navigation.navigate('Order')}>
                                <Text className='text-[17px] text-[#457c2f] mr-2 font-bold'>Orders</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity onPress={() => logoutUser()}>
                                <Text className='text-[17px] text-[#ee6347] font-bold'>Logout</Text>
                            </TouchableOpacity>
                        </>
                    )
                }

                <TouchableOpacity onPress={() => navigation.navigate('Basket')}>
                    <ShoppingCartIcon size={20} color="#00CCBB" />
                </TouchableOpacity>
                
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
                    i="4"
                    j="11"
                    items={items}
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
                    j="12"
                    items={items}
                    search={search}
                    title="Recommended for you!"
                    description="Get 40% off, flat deals & much more"
                    featuredCategory="featured"
                />
                <FeaturedRow
                    id="123456"
                    i="13"
                    j="27" items={items} search={search}
                    title="Quick checkout munchies"
                    description="Paid placements from our partners"
                    featuredCategory="featured"
                />
                
                <RestrauntsRow restraunts={restraunts} search={search}
                    title="Promoted Restraunts"
                    description="Paid placements from our partners"
                    featuredCategory="featured" />

                <FeaturedRow
                    id="1234"
                    i="28"
                    j="42" items={items} search={search}
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