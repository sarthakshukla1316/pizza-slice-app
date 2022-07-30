import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import MenuCard from './MenuCard';
import { useState } from 'react';


const MenuList = () => {
    const [index, setIndex] = useState(12);
      return (
          <View className='my-4'>
              <Text className='text-xl pl-4 text-gray-800 font-bold'>Eat what makes you happy</Text>
              <View className='flex-row flex-wrap my-4 space-x-3 mx-4 items-center justify-between'>

                {
                  items.slice(0,index).map(item => (
                      <MenuCard key={items.id} item={item}
                      />
                  ))
                }

              </View>
              {index < 30 && <TouchableOpacity onPress={() => setIndex(Math.min(index+6, 30))}>
                <Text className='text-[17px] font-semibold -mt-2 underline text-center'>See more</Text>
              </TouchableOpacity>}
          </View>
      )
}


const items = [{
    "id": "5eee66a5a27a66807cf2bea5",
    "name": "Burger",
    "image": require("../assets/burger.jpg"),
    "price": 80,
    "size": "medium"
  },{
    "id": "5eee6692a27a66807cf2bea4",
    "name": "Pizza",
    "image": require("../assets/piz2.jpg"),
    "price": 200,
    "size": "small"
  },{
    "id": "5eee66c4a27a66807cf2bea6",
    "name": "French Fries",
    "image": require("../assets/fries.jpg"),
    "price": 180,
    "size": "large"
  },{
    "id": "5eee66cfa27a66807cf2bea7",
    "name": "Chowmein",
    "image": require("../assets/chowmein.jpg"),
    "price": 280,
    "size": "small"
  },{
    "id": "5eee66eea27a66807cf2bea8",
    "name": "Cutlet",
    "image": require("../assets/cutlet.jpg"),
    "price": 160,
    "size": "large"
  },{ 
    "id": "5eee6717a27a66807cf2bea9",
    "name": "Dabeli",
    "image": require("../assets/dabeli.jpg"),
    "price": 80,
    "size": "medium"
  },{ 
      "id": "5eee6717a27a66807cf2bea10",
      "name": "Dosa",
      "image": require("../assets/dosa.jpg"),
      "price": 140,
      "size": "large"
    },{ 
      "id": "5eee6717a27a66807cf2bea11",
      "name": "Fried Rice",
      "image": require("../assets/friedrice.jpg"),
      "price": 280,
      "size": "medium"
    },{ 
      "id": "5eee6717a27a66807cf2bea12",
      "name": "Idli",
      "image": require("../assets/idli.jpg"),
      "price": 220,
      "size": "large"
    },{ 
      "id": "5eee6717a27a66807cf2bea13",
      "name": "Macroni",
      "image": require("../assets/macroni.jpg"),
      "price": 140,
      "size": "medium"
    },{ 
      "id": "5eee6717a27a66807cf2bea14",
      "name": "Noodles",
      "image": require("../assets/noodles.jpg"),
      "price": 100,
      "size": "small"
    },{ 
      "id": "5eee6717a27a66807cf2bea15",
      "name": "Panner Roll",
      "image": require("../assets/paneerroll.jpg"),
      "price": 130,
      "size": "large"
    },{ 
      "id": "5eee6717a27a66807cf2bea16",
      "name": "Paneer Tikka",
      "image": require("../assets/paneertikka.jpg"),
      "price": 200,
      "size": "medium"
    },{ 
      "id": "5eee6717a27a66807cf2bea17",
      "name": "Pasta",
      "image": require("../assets/pasta.jpg"),
      "price": 160,
      "size": "large"
    },{ 
      "id": "5eee6717a27a66807cf2bea18",
      "name": "Pav Bhaji",
      "image": require("../assets/pavbhaji.jpg"),
      "price": 170,
      "size": "large"
    },{ 
      "id": "5eee6717a27a66807cf2bea19",
      "name": "Sandwitch",
      "image": require("../assets/sandwitch.jpg"),
      "price": 50,
      "size": "small"
    },{ 
      "id": "5eee67rgehehe6807cf2bea19",
      "name": "Chocolate shake",
      "image": require("../assets/chcshake.jpg"),
      "price": 80,
      "size": "medium"
    },{ 
      "id": "5eee6252bjbkbca7cf2bea19",
      "name": "Special Cofee",
      "image": require("../assets/spcofeee.jpg"),
      "price": 60,
      "size": "medium"
    },{ 
      "id": "5eee6717a235nju3533nsg19",
      "name": "Special shake",
      "image": require("../assets/spshake.jpg"),
      "price": 50,
      "size": "small"
    },{ 
      "id": "5eee67125huhou2h52nde2bea19",
      "name": "Ras Malai",
      "image": require("../assets/rashmalai.jpg"),
      "price": 120,
      "size": "small"
    },{ 
      "id": "5e2525efwwegwg6717ewfcf2bea19",
      "name": "Rasogola",
      "image": require("../assets/rasogola.jpg"),
      "price": 200,
      "size": "medium"
    },{ 
      "id": "32858h2u35bhdf66807cf2bea19",
      "name": "Patties",
      "image": require("../assets/patties.jpg"),
      "price": 70,
      "size": "small"
    },{ 
      "id": "325jihuo25352nd07cf2bea19",
      "name": "Orange juice",
      "image": require("../assets/orgjuice.jpg"),
      "price": 90,
      "size": "medium"
    },{ 
      "id": "25hugui2gy5v2807cf2bea19",
      "name": "Mango juice",
      "image": require("../assets/mgjuice.jpg"),
      "price": 50,
      "size": "small"
    },{ 
      "id": "5eee6717a27a66807cf2bea19",
      "name": "Panner masala",
      "image": require("../assets/paneerbuttermasala.jpg"),
      "price": 300,
      "size": "medium"
    },{ 
      "id": "235uuig2523566807cf2bea19",
      "name": "Kadai paneer",
      "image": require("../assets/kadaipaneer.jpg"),
      "price": 280,
      "size": "medium"
    },{ 
      "id": "25hubui253527a66807cf2bea19",
      "name": "Special Dinner",
      "image": require("../assets/dinner.jpg"),
      "price": 250,
      "size": "small"
    },{ 
      "id": "5235uuegf7a27a66807cf2bea19",
      "name": "Starter Mega",
      "image": require("../assets/starter.jpg"),
      "price": 400,
      "size": "small"
    },{ 
      "id": "37y72g3r7253a66807cf2bea19",
      "name": "Breads",
      "image": require("../assets/naan.jpg"),
      "price": 30,
      "size": "medium"
    },{ 
      "id": "5eee6717a27a66807cf2bea20",
      "name": "Spring Roll",
      "image": require('../assets/spring-roll.jpg'),
      "price": 180,
      "size": "medium"
}]


export default MenuList