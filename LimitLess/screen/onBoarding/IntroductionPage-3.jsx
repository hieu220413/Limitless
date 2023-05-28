import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Animated } from 'react-native';
import Slide from '../../component/Slide';
import Paginator from '../../component/Paginator';
import OnBoardingItems from '../../component/OnBoardingItems';
import { Button } from '@rneui/themed';

export default function IntroductionPage_3(props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef();
  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
  const totalIndex = Slide.length - 1;
  let index = 0;
  useEffect(() => {
    let slideScroll = setInterval(() => {
      index++;
      if (index <= totalIndex) {
        slidesRef.current.scrollToIndex({ animated: true, index: index });
      } else {
        slidesRef.current.scrollToIndex({ animated: true, index: 0 });
        return (index = 0);
      }
    }, 3000);
    setTimeout(() => { clearInterval(slideScroll); }, 9000);
  }, []);
  return (
    <View style={styles.container}>
      <View style={{ flex: 3 }}>
        <FlatList
          data={Slide}
          renderItem={({ item }) => <OnBoardingItems item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={item => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false },
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>
      <Paginator data={Slide} scrollX={scrollX} />
      <Button
        title="Next"
        onPress={() => props.navigation.navigate('Welcome')}
        titleStyle={{
          color: 'white',
          fontSize: 20,
          fontWeight: 'bold',
        }}
        buttonStyle={{
          backgroundColor: '#461CF0BF',
          borderRadius: 25,
          height: 43,
          borderColor: 'black',
          borderWidth: 1,
        }}
        containerStyle={{
          bottom: 40,
          width: '80%',
          alignSelf: 'center',
          justifyContent: 'center',
          alignContent: 'center',
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
