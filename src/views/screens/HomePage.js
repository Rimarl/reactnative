import React, { useEffect, useRef } from 'react';
import { View, Image, ScrollView, Dimensions, StyleSheet,Text } from 'react-native';
import Swiper from 'react-native-swiper';
import im1 from '../../../assets/10.jpg';
import im2 from '../../../assets/11.jpg';
import im3 from '../../../assets/12.jpg';
import im4 from '../../../assets/13.jpg';
import im5 from '../../../assets/14.jpg';
import im6 from '../../../assets/15.jpg';

import imm1 from '../../../assets/1.jpg';
import imm2 from '../../../assets/2.jpg';
import imm3 from '../../../assets/3.jpg';
import imm4 from '../../../assets/4.jpg';
import imm5 from '../../../assets/5.jpg';
import imm6 from '../../../assets/6.jpg';

const HomePage = () => {
  const swiperRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      if (swiperRef.current && swiperRef.current.scrollBy) {
        swiperRef.current.scrollBy(1);
      }
    }, 3000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const images = [im1, im2, im3, im4, im5, im6];

  return (
    <ScrollView showsVerticalScrollIndicator={true} automaticallyAdjustKeyboardInsets={true}>
      <View style={styles.container}>
    <Swiper
      ref={swiperRef}
      autoplay
      autoplayTimeout={3}
      loop
      style={{ height: 200 }}
    >
      {images.map((image, index) => (
        <View key={index} style={{ flex: 1 }}>
          <Image
            source={image}
            style={{ width: '100%', height: '100%' }}
            resizeMode="contain"
          />
        </View>
      ))}
    </Swiper>
    <Text style={{ paddingBottom: 10, paddingTop: 15, fontSize: 20, fontWeight: 'bold',textAlign: 'center', }}>Profitez de nos offres exclusives sur les cartes SIM et les cartes de recharge et ne manquez pas nos dernières promotions.</Text>
    <View style={ { flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image source={imm6}  />
      <Image source={imm2}  />
      <Image source={imm3}  />

      <Image source={imm1}style={{marginBottom:50}}  />
    </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  carouselItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  carouselImage: {
    flex: 1,
    borderRadius: 10,
    resizeMode: 'cover',
    width: '100%',
  },
});

export default HomePage;
