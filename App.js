import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './src/views/screens/LoginScreen';
import HomeScreen from './src/views/screens/HomePage'
import SignScreen from './src/views/screens/sign'
import ScannerScreen from './src/views/screens/ScannerScreen'
import VendreSim from './src/views/screens/vendreSim'
import VendreRecharge from './src/views/screens/vendreRecharge'
import ContratScreen from './src/views/screens/contart'
import Menuuu from './src/views/screens/menuu'
import StockPdv from './src/views/screens/stock'
import { configureStore } from "@reduxjs/toolkit";
import {  useSelector } from "react-redux";
//import store from "./state/Store"
import authReducer  from './state/authSlice';
import { Provider } from "react-redux";
const store = configureStore({
  reducer: {
    auth: authReducer ,
  },
});


const Stack = createNativeStackNavigator();
const App = () => {
  const [initialRouteName, setInitialRouteName] = React.useState('LoginScreen');
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const token = useSelector((state) => state.auth.token);

  React.useEffect(() => {
    setTimeout(() => {
     // authUser();
    }, 2000);
  }, []);
/*
  const authUser = async () => {
    try {
      let userData = await AsyncStorage.getItem('userData');
      if (userData) {
        userData = JSON.parse(userData);
        if (userData.loggedIn) {
          setInitialRouteName('HomeScreen');
        } else {
          setInitialRouteName('LoginScreen');
        }
      } 
    } catch (error) {
      setInitialRouteName('LoginScreen');
    }
  };
*/


  return (
    <NavigationContainer>
      
        <>
          <Stack.Navigator
            initialRouteName={initialRouteName}
            screenOptions={{headerShown: false}}>
              {token ? (
            <Stack.Screen name="Menuuu" component={Menuuu} />
            
            ) : (
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
             )}
        
            <Stack.Screen name="Accueil" component={HomeScreen} />
            <Stack.Screen name="SignScreen" component={SignScreen} />
            <Stack.Screen name="Vendre carte SIM" component={VendreSim} />
            <Stack.Screen name="ContratScreen" component={ContratScreen} />
            <Stack.Screen name="Vendre Carte De Recharge" component={VendreRecharge} /> 
            <Stack.Screen name="ScannerScreen" component={ScannerScreen} />
            <Stack.Screen name="Stock" component={StockPdv} />
          </Stack.Navigator>
        </>
      
    </NavigationContainer>
  );
  
};

export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};