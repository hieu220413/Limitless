import React, {useState, useEffect} from 'react';
import {NavigationAction} from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const IntroductionPage_1 = (props) => {
  const [animate, setAnimate] = useState(true);
  useEffect(() => {
    closeActivityIndicator();
  }, []);

  const closeActivityIndicator = () => {
    setTimeout(() => {
      setAnimate(false);
      props.navigation.navigate('Intro2');
    }, 3000);
  };

  return (
    <ScrollView style={styles.container}>
      <Ionicons name="barbell-sharp" style={styles.icon} />
      <ActivityIndicator
        style={styles.indicator}
        size= 'large'
        color="rgba(255,255,255,1)"
        animating={animate}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8365D6',
  },
  icon: {
    position: 'absolute',
    color: 'rgba(255,255,255,1)',
    fontSize: 200,
    padding: 117,
    top: '30%',
    transform: [{rotate: '-30deg'}],
    alignSelf:'center'
  },
  indicator: {
    padding: 100,
    bottom: '-250%'
  },
});
export default IntroductionPage_1;
