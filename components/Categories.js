import { ScrollView } from 'react-native'
import React from 'react'
import CategoryCard from './CategoryCard'

const Categories = () => {
  return (
    <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
            paddingHorizontal: 15,
            paddingTop: 10,
        }}
    >
        {/* Category card */}

        <CategoryCard imgUrl={require('../assets/fries.jpg')} title="Starter" 
        />
        <CategoryCard imgUrl={require('../assets/dinner.jpg')} title="Main Course" 
        />
        <CategoryCard imgUrl={require('../assets/rabri.jpg')} title="Sweet" 
        />
        <CategoryCard imgUrl={require('../assets/orgjuice.jpg')} title="Beverages" 
        />
        <CategoryCard imgUrl={require('../assets/friedrice.jpg')} title="Chips" 
        />
        <CategoryCard imgUrl={require('../assets/naan.jpg')} title="Breads" 
        />

    </ScrollView>
  )
}

export default Categories