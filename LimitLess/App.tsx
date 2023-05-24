import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Gender from './screen/Gender';
import Levels from './screen/Levels';
import {View, Text, StyleSheet} from 'react-native';
import Screen1 from './screen/onboarding/Screen1';
import Screen2 from './screen/onboarding/Screen2';
import OnBoarding from './screen/onboarding/OnBoarding';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <>
      <View style={styles.container}>
        {/* <Screen1 /> */}
        {/* <Screen2 /> */}
        <OnBoarding />
      </View>
      {/* <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Gender" component={Gender} />
          <Stack.Screen name="Level" component={Levels} />
        </Stack.Navigator>
      </NavigationContainer> */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
