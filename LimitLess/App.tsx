import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Gender from './screen/Gender';
import Levels from './screen/Levels';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
       <Stack.Navigator>
        <Stack.Screen name="Gender" component={Gender}/>
        <Stack.Screen name="Level" component={Levels} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;