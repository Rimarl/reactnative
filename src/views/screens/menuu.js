import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import { Animated, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch , useSelector } from "react-redux";
import { setLogout  } from "../../../state/authSlice";
import { LinearGradient } from 'expo-linear-gradient';

// Tab ICons...
import logo from '../../../assets/logo2.png';
import HomeScreen from './HomePage'
import StockPdv from './stock'
import VendreSim from './vendreSim'
import VendreRecharge from './vendreRecharge'
import { MaterialIcons ,Ionicons } from '@expo/vector-icons';
// Menu
import menu from '../../../assets/menu.png';
import close from '../../../assets/close.png';
export default function Menuuu({navigation}) {
  const pdv = useSelector((state) => state.auth.pdv);
  const isAgree=pdv.DetailDealerId;
  const [currentTab, setCurrentTab] = useState("Accueil");
  // To get the curretn Status of menu ...
  const [showMenu, setShowMenu] = useState(false);
  
  // Animated Properties...

  const offsetValue = useRef(new Animated.Value(0)).current;
  // Scale Intially must be One...
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;

 
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#6EAC40' , '#ffffff']} style={{ flex: 1, width: '100%'}} >
      <View style={{ justifyContent: 'flex-start', padding: 15 }}>
        
        <Image source={logo} style={{
          width: 180,
          height: 70,
          borderRadius: 0,
          marginTop: 40
        }}></Image>

        <Text style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: 'white',
          marginTop: 20
        }}>{pdv.gerant}</Text>

        <TouchableOpacity>
          <Text style={{
            marginTop: 6,
            color: 'white'
          }}>{pdv.MSISDN}</Text>
        </TouchableOpacity>

        <View style={{ flexGrow: 1, marginTop: 50 }}>
          {
            // Tab Bar Buttons....
          }

          {TabButton(currentTab, setCurrentTab, "Accueil", "home",navigation)}
          {isAgree === 2 && TabButton(currentTab, setCurrentTab, "Vendre carte SIM", "sim-card",navigation)}
          {TabButton(currentTab, setCurrentTab, "Vendre Carte De Recharge", "credit-card",navigation)}
          {TabButton(currentTab, setCurrentTab, "Stock", "table-view",navigation)}

        </View>

        <View>
          {TabButton(currentTab, setCurrentTab, "Déconnexion", "logout",navigation)}
        </View>
        
      </View>
</LinearGradient>
      {
        // Over lay View...
      }

      <Animated.View style={{
        flexGrow: 1,
        backgroundColor: 'white',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        //paddingHorizontal: 15,
        paddingVertical: 20,
        borderRadius: showMenu ? 15 : 0,
        // Transforming View...
        transform: [
          { scale: scaleValue },
          { translateX: offsetValue }
        ]
      }}>

        {
          // Menu Button...
        }

        <Animated.View style={{
          transform: [{
            translateY: closeButtonOffset
          }]
        }}>
          <TouchableOpacity onPress={() => {
            // Do Actions Here....
            // Scaling the view...
            Animated.timing(scaleValue, {
              toValue: showMenu ? 1 : 0.88,
              duration: 300,
              useNativeDriver: true
            })
              .start()

            Animated.timing(offsetValue, {
              // YOur Random Value...
              toValue: showMenu ? 0 : 237,
              duration: 300,
              useNativeDriver: true
            })
              .start()

            Animated.timing(closeButtonOffset, {
              // YOur Random Value...
              toValue: !showMenu ? -30 : 0,
              duration: 300,
              useNativeDriver: true
            })
              .start()

            setShowMenu(!showMenu);
          }}>

          <Image source={showMenu ? close : menu} style={{
              width: 20,
              height: 20,
              tintColor: 'black',
              marginTop: 40,
              marginLeft: 20,
              marginBottom: 20,

            }}></Image>

          </TouchableOpacity>

         {currentTab==='Accueil' && <HomeScreen navigation={navigation} />}
         {currentTab==='Vendre carte SIM' && <VendreSim navigation={navigation}/>}
         {currentTab==='Vendre Carte De Recharge' && <VendreRecharge navigation={navigation}/>}
         {currentTab==='Stock' && <StockPdv/>}
          

          

          
        </Animated.View>

      </Animated.View>
  
    </SafeAreaView>
  );
}

// For multiple Buttons...
const TabButton = (currentTab, setCurrentTab, title, image,navigation) => {
    const dispatch = useDispatch();
  return (

    <TouchableOpacity onPress={() => {
      if (title == "Déconnexion") {
    dispatch(setLogout());
    //navigation.navigate('LoginScreen');
      } else{
        setCurrentTab(title);
        
      }
    }}> 
      <View style={{
        flexDirection: "row",
        alignItems: 'center',
        paddingVertical: 8,
        backgroundColor: currentTab == title ? 'white' : 'transparent',
        paddingLeft: 13,
        paddingRight: 35,
        borderRadius: 8,
        marginTop: 15
      }}>

        <MaterialIcons   name={image}  style={{
        fontSize: 24,
        width: 25, height: 25,
        color: currentTab == title ? "#6EAC40" : "black"
        }}></MaterialIcons  >

        <Text style={{
          fontSize: 15,
          fontWeight: 'bold',
          paddingLeft: 15,
          color: currentTab == title ? "#6EAC40" : "white"
        }}>{title}</Text>

      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   // backgroundColor: '#7FB2DF',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});