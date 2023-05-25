import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Levels from './screen/Levels';
import Gender from './screen/Gender';
import Old from './screen/Old';
import Weight from './screen/Weight';
import Height from './screen/Height';
import Goals from './screen/Goals';
import Login from './screen/Login';
import PremiumSubscribe from './screen/Premium-subscribe';
import FillProfile from './screen/Fill-profile';
import Welcome from './screen/Welcome';
import SettingMenu from './screen/Setting-menu';
import Register from './screen/Register';
import EditProfile from './screen/Edit-profile';
import MainPage from './screen/MainPage';
import Workouts from './screen/Workouts';
import Workout_Detail from './screen/Workout-Detail';
const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Workouts" component={Workouts} />
        <Stack.Screen name="Main" component={MainPage} />
        <Stack.Screen name="Workout Detail" component={Workout_Detail} />
        <Stack.Screen name='Welcome' component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name='Register' component={Register} />
        <Stack.Screen name="Gender" component={Gender} />
        <Stack.Screen name="Old" component={Old} />
        <Stack.Screen name="Weight" component={Weight} />
        <Stack.Screen name="Height" component={Height} />
        <Stack.Screen name="Goals" component={Goals} />
        <Stack.Screen name="Level" component={Levels} />
        <Stack.Screen name='Fill Profile' component={FillProfile} />
        <Stack.Screen name="Setting" component={SettingMenu} />
        <Stack.Screen name="Edit Profile" component={EditProfile} />
        <Stack.Screen name='Premium' component={PremiumSubscribe} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;