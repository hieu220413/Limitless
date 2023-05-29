import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StyleSheet, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import IntroductionPage_1 from './screen/onBoarding/IntroductionPage-1';
import IntroductionPage_2 from './screen/onBoarding/IntroductionPage-2';
import IntroductionPage_3 from './screen/onBoarding/IntroductionPage-3';
import Levels from './screen/accountSetup/Levels';
import Gender from './screen/accountSetup/Gender';
import Old from './screen/accountSetup/Old';
import Weight from './screen/accountSetup/Weight';
import Height from './screen/accountSetup/Height';
import Goals from './screen/accountSetup/Goals';
import Login from './screen/signIn_Up/Login';
import Welcome from './screen/signIn_Up/Welcome';
import Register from './screen/signIn_Up/Register';
import PremiumSubscribe from './screen/profileSetting/Premium-subscribe';
import FillProfile from './screen/profileSetting/Fill-profile';
import SettingMenu from './screen/profileSetting/Setting-menu';
import EditProfile from './screen/profileSetting/Edit-profile';
import MainPage from './screen/MainPage';
import Workouts from './screen/workout/Workouts';
import Workout_Detail from './screen/workout/Workout-Detail';
import ForgotPassword from './screen/forgotPassword/ForgotPassword';
import VerifyOTP from './screen/forgotPassword/VerifyOTP';
import NewPassword from './screen/forgotPassword/NewPassword';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
import Exercise from './screen/workout/Exercise';
import Statistic from './screen/statistic/Statistic';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Statistic">
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Exercise" component={Exercise} />
        <Stack.Screen name="Intro1" component={IntroductionPage_1} />
        <Stack.Screen name="Intro2" component={IntroductionPage_2} />
        <Stack.Screen name="Intro3" component={IntroductionPage_3} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Gender" component={Gender} />
        <Stack.Screen name="Old" component={Old} />
        <Stack.Screen name="Weight" component={Weight} />
        <Stack.Screen name="Height" component={Height} />
        <Stack.Screen name="Goals" component={Goals} />
        <Stack.Screen name="Level" component={Levels} />
        <Stack.Screen name="Workouts" component={Workouts} />
        <Stack.Screen name="Main" component={MainPage} />
        <Stack.Screen name="Workout Detail" component={Workout_Detail} />
        <Stack.Screen name="Fill Profile" component={FillProfile} />
        <Stack.Screen name="Setting" component={SettingMenu} />
        <Stack.Screen name="Edit Profile" component={EditProfile} />
        <Stack.Screen name="Premium" component={PremiumSubscribe} />
        <Stack.Screen name="Statistic" component={Statistic} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
