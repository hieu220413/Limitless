import {StyleSheet, Text, View, Image, useWindowDimensions} from 'react-native';
import React from 'react';


const OnBoardingItems = ({item}) => {
  const {width} = useWindowDimensions();
  return (
    <View style={[styles.container, {width}]}>
      <Image
        source={item.image}
        style={[styles.image, {width, resizeMode: 'stretch'}]}
      />
      <View style={{flex: 0.3}}>
        <Text style={styles.description}>{item.description}</Text>
      </View>
      
    </View>
  );
};

export default OnBoardingItems;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 0.7,
    justifyContent: 'center',
  },
  description: {
    fontWeight: '800',
    fontSize: 28,
    marginBottom: 10,
    paddingHorizontal: 24,
    marginTop: 20,
  },
});
