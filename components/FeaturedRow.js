import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { ArrowRightIcon } from 'react-native-heroicons/outline'
import RestrauntCard from './RestrauntCard'

const FeaturedRow = ({ id, i, j, items, search, title, description }) => {
  if(items?.length === 0)
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
          !search ? items?.slice(i,j).map(item => (
              <RestrauntCard key={item.id}
              id={item.id} imgUrl={item.image} title={item.name} rating={4.5} genre="Japanese" address="124 Main Street" short_description="Specially filled with organo" dishes={{}} long={20} lat={40}
          />
          )) : items?.slice(i,j).filter(item => item.name.toLowerCase().includes(search.toLowerCase())).map(item => (
            <RestrauntCard key={item.id}
            id={item.id} imgUrl={item.image} title={item.name} rating={4.5} genre="Japanese" address="124 Main Street" short_description="Specially filled with organo" dishes={{}} long={20} lat={40}
        />
        ))
        }

      </ScrollView>
    </View>
  )
}

export default FeaturedRow