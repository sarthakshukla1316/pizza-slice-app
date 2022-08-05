import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { ArrowRightIcon } from 'react-native-heroicons/outline'
import RestrauntCard from './RestrauntCard'

const RestrauntsRow = ({ restraunts, search, title, description }) => {
  if(restraunts?.length === 0)
    return null;
  return (
    <View>

      <View className='mt-4 flex-row items-center justify-between px-4'>
        <Text className='font-bold text-lg'>{title}</Text>
        <ArrowRightIcon color="#00CCBB" />
      </View>
      <Text className='text-xs text-gray-500 px-4'>{description}</Text>

      <ScrollView
        horizontal
        contentContainerStyle={{
            paddingHorizontal: 15,
        }}
        showsHorizontalScrollIndicator={false}
        className='pt-4'
      >

        {/* Restraunt card */}

        {
          !search ? restraunts?.map(restraunt => (
              <RestrauntCard key={restraunt.id}
              id={restraunt.id} imgUrl={restraunt.image} title={restraunt.name} rating={restraunt.rating} genre={restraunt.taste} address={restraunt.address} short_description="Specially filled with organo" dishes={{}} long={20} lat={40}
          />
          )) : restraunts?.filter(restraunt => restraunt.name.toLowerCase().includes(search.toLowerCase())).map(restraunt => (
            <RestrauntCard key={restraunt.id}
            id={restraunt.id} imgUrl={restraunt.image} title={restraunt.name} rating={restraunt.rating} genre={restraunt.taste} address={restraunt.address} short_description="Specially filled with organo" dishes={{}} long={20} lat={40}
        />
        ))
        }

      </ScrollView>
    </View>
  )
}

export default RestrauntsRow