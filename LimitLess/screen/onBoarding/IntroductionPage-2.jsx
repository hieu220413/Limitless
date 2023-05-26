import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  SectionList,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const IntroductionPage_2 = (props) => {
  const image = require('../assets/image/gym.png');
  useEffect(() => {
    setTimeout(() => {
      props.navigation.navigate('Intro3');
    }, 2000);
  }, []);
  return (
    <>
      <ImageBackground
        resizeMode="cover"
        style={styles.background}
        source={image}>
        <Text style={styles.text1}>Welcome to{'\n'}Limitless</Text>
        <View style={styles.outline}>
          <Ionicons name="barbell-sharp" style={styles.icon} />
        </View>
        <Text style={styles.text2}>The best fitness app in this century</Text>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  text1: {
    top: 180,
    color: 'white',
    fontSize: 42,
    left: 10,
    fontWeight: 'bold',
  },
  text2: {
    top: 150,
    color: 'white',
    fontSize: 20,
    left: 10,
    fontWeight: 'bold',
  },
  icon: {
    color: 'rgba(255,255,255,1)',
    fontSize: 50,
    left: 2,
    transform: [{rotate: '-30deg'}],
  },
  outline: {
    top: 90,
    left: 260,
    bottom: 84,
    width: 80,
    height: 80,
    backgroundColor: '#8365D6',
    borderWidth: 10,
    borderColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default IntroductionPage_2;
