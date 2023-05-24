import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Levels from './screen/Levels';
import Gender from './screen/Gender';
import Old from './screen/Old';
import Weight from './screen/Weight';
import Height from './screen/Height';
import Goals from './screen/Goals';
import MainPage from './screen/MainPage';



const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator  screenOptions={{headerShown: false}}>
        <Stack.Screen name="Main" component={MainPage} options={({ route, navigation }) => ({})} />
        <Stack.Screen name="Gender" component={Gender} options={({ route, navigation }) => ({})} />
        <Stack.Screen name="Old" component={Old} options={({ route, navigation }) => ({})} />
        <Stack.Screen name="Weight" component={Weight} options={({ route, navigation }) => ({})} />
        <Stack.Screen name="Height" component={Height} options={({ route, navigation }) => ({})} />
        <Stack.Screen name="Goals" component={Goals} options={({ route, navigation }) => ({})} />
        <Stack.Screen name="Level" component={Levels} options={({ route, navigation }) => ({})} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;