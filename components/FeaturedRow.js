import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { ArrowRightIcon } from 'react-native-heroicons/outline'
import RestrauntCard from './RestrauntCard'
import foods from '../menus';

const FeaturedRow = ({ id, i, j, search, title, description }) => {
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
          !search ? foods.slice(i,j).map(food => (
              <RestrauntCard key={food.id}
              id={food.id} imgUrl={food.image} title={food.name} rating={4.5} genre="Japanese" address="124 Main Street" short_description="Specially filled with organo" dishes={{}} long={20} lat={40}
          />
          )) : foods.slice(i,j).filter(food => food.name.toLowerCase().includes(search.toLowerCase())).map(food => (
            <RestrauntCard key={food.id}
            id={food.id} imgUrl={food.image} title={food.name} rating={4.5} genre="Japanese" address="124 Main Street" short_description="Specially filled with organo" dishes={{}} long={20} lat={40}
        />
        ))
        }

      </ScrollView>
    </View>
  )
}

export default FeaturedRow