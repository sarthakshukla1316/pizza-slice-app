import { TailwindProvider } from "tailwindcss-react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import RestrauntScreen from "./screens/RestrauntScreen";
import { store } from './store'
import { Provider } from 'react-redux'
import BasketScreen from "./screens/BasketScreen";
import PreparingOrderScreen from "./screens/PreparingOrderScreen";
import DeliveryScreen from "./screens/DeliveryScreen";
import { useEffect, useState } from "react";
import GetLocation from 'react-native-get-location'
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import { InAppNotificationProvider } from 'react-native-in-app-notification';
import OtpScreen from "./screens/OtpScreen";
import LoginViaPasswordScreen from "./screens/LoginViaPasswordScreen";
import CheckoutScreen from "./screens/CheckoutScreen";
import OrderScreen from "./screens/OrderScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    }).then(location => {
        console.log(location);
        setLatitude(location.latitude);
        setLatitude(location.longitude);
    })
    .catch(error => {
        console.log(error);
    })
  }, []);


  return (
    <NavigationContainer>
      <InAppNotificationProvider>
        <Provider store={store}>
          <TailwindProvider>
            <Stack.Navigator>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Restraunt" component={RestrauntScreen} />
              <Stack.Screen name="Basket" component={BasketScreen} 
                options={{ presentation: 'modal', headerShown: false }}
              />
              <Stack.Screen name="PreparingOrderScreen" component={PreparingOrderScreen} 
                options={{ presentation: 'fullScreenModal', headerShown: false }}
              />
              <Stack.Screen name="Delivery" component={DeliveryScreen} 
                options={{ presentation: 'fullScreenModal', headerShown: false }}
              />
              <Stack.Screen name="Register" component={RegisterScreen}
                options={{ presentation: 'fullScreenModal', headerShown: false }}
              />
              <Stack.Screen name="Login" component={LoginScreen}
                options={{ presentation: 'fullScreenModal', headerShown: false }}
              />
              <Stack.Screen name="OTP" component={OtpScreen}
                options={{ presentation: 'fullScreenModal', headerShown: false }}
              />
              <Stack.Screen name="LoginViaPassword" component={LoginViaPasswordScreen} 
                options={{ presentation: 'fullScreenModal', headerShown: false }}
              />
              <Stack.Screen name="Checkout" component={CheckoutScreen} 
                options={{ presentation: 'fullScreenModal', headerShown: false }}
              />
              <Stack.Screen name="Order" component={OrderScreen} 
                options={{ presentation: 'fullScreenModal', headerShown: false }}
              />
            </Stack.Navigator>
          </TailwindProvider>
        </Provider>
      </InAppNotificationProvider>
    </NavigationContainer>
  );
}