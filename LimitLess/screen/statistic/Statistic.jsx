import * as React from 'react';
import {
  SafeAreaView,
  Image,
  FlatList,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  TextInput,
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useState } from 'react';
import { Button } from '@rneui/themed';
import Footer from '../../component/Footer';
import Header from '../../component/Header';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import Pie from 'react-native-pie';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Statistic = props => {
  const { navigation, route } = props;
  // const DATA = [
  //   {
  //     id: '1',
  //     url: require('../../image/workout1.jpg'),
  //     name: 'Arm Workout',
  //     level: 'Beginner',
  //     time: 10,
  //   },
  //   {
  //     id: '2',
  //     url: require('../../image/workout2.jpg'),
  //     name: 'Chest Workout',
  //     level: 'Beginner',
  //     time: 12,
  //   },
  //   {
  //     id: '3',
  //     url: require('../../image/workout3.jpg'),
  //     name: 'Leg Workout',
  //     level: 'Beginner',
  //     time: 20,
  //   },
  //   {
  //     id: '4',
  //     url: require('../../image/workout4.jpg'),
  //     name: 'Push Workout',
  //     level: 'Beginner',
  //     time: 6,
  //   },
  //   {
  //     id: '5',
  //     url: require('../../image/workout5.jpg'),
  //     name: 'Squat Workout',
  //     level: 'Beginner',
  //     time: 8,
  //   },
  // ];
  const ExerciseImages = {
    "barbell-curl.jpg": require('../../assets/exe-thumbnail/barbell-curl.jpg'),
    "barbell-rows.jpg": require('../../assets/exe-thumbnail/barbell-rows.jpg'),
    "bench-press.jpg": require('../../assets/exe-thumbnail/bench-press.jpg'),
    "calves-raise.jpg": require('../../assets/exe-thumbnail/calves-raise.jpg'),
    "db-press.jpg": require('../../assets/exe-thumbnail/db-press.jpg'),
    "close-grip-bench-press.jpg": require('../../assets/exe-thumbnail/close-grip-bench-press.jpg'),
    "hammer-curl.jpg": require('../../assets/exe-thumbnail/hammer-curl.jpg'),
    "lat-pulldown.jpg": require('../../assets/exe-thumbnail/lat-pulldown.jpg'),
    "leg-curl.jpg": require('../../assets/exe-thumbnail/leg-curl.jpg'),
    "leg-extension.jpg": require('../../assets/exe-thumbnail/leg-extension.jpg'),
    "leg-press.jpg": require('../../assets/exe-thumbnail/leg-press.jpg'),
    "push-workout.jpg": require('../../assets/exe-thumbnail/push-workout.jpg'),
    "squat.jpg": require('../../assets/exe-thumbnail/squat.jpg'),
    "triceps-extension.jpg": require('../../assets/exe-thumbnail/triceps-extension.jpg')
}
  let datesWhitelist = [
    {
      start: moment(),
      end: moment().add(6, 'days'), // total 4 days enabled
    },
  ];
  let datesBlacklist = [moment().add(1, 'days')]; // 1 day disabled
  const [oldestDate, setOldestDate] = useState(moment())
  const [statistic, setStatistic] = useState(undefined)
  const [finishedExercises, setFinishedExercises] = useState([])
  const selectedDate = React.useRef(moment())

  const loadStatistics = async (date = undefined) => {
    if (date) {
      console.log('newDate: '+date)
      selectedDate.current =  date
    }
    const user_info = await AsyncStorage.getItem('user_info')
    if (user_info != null) {
      const userId = JSON.parse(user_info).userId
      console.log('selectedDate: ' + selectedDate.current)
      console.log('selectedDate after format: ' + selectedDate.current.format('YYYY-MM-DD'))
      const result = await fetch(`http://limitlessapi.us-east-1.elasticbeanstalk.com/api/statistic/getByDate?userId=${userId}&date=${selectedDate.current.format('YYYY-MM-DD')}`)
        .then(response => response.json()).then(json => json) 
        .catch(error => console.log(error))
      console.log(JSON.stringify(result))
      setStatistic(undefined)
      if (result && !result.error) {
        setOldestDate(moment(result.oldestDate, 'YYYY-MM-DD').toDate())
        setStatistic(result.statisticResponseBody)
        setFinishedExercises([])
        if (result.statisticResponseBody) {
          setFinishedExercises(result.statisticResponseBody.finishedExercises)
        }
      }
      console.log(oldestDate)
      console.log(JSON.stringify(statistic))
    } else {
      //redirect to welcomepage
    }

  }
  useFocusEffect(
    React.useCallback(() => {

      loadStatistics()

      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  )

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.head}>
          <Header></Header>
          <View style={styles.iconBar}>
            <TouchableOpacity style={styles.notificationIcon}>
              <Feather name="more-vertical" size={32}></Feather>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.body}>
          <CalendarStrip
            scrollable
            onDateSelected={loadStatistics}
            selectedDate={selectedDate.current}
            minDate={oldestDate}
            style={{ height: 110, paddingTop: 18, paddingBottom: 10 }}
            calendarColor={'white'}
            highlightDateNumberStyle={{ color: '#461CF0' }}
            highlightDateNameStyle={{ color: '#461CF0' }}
            calendarHeaderStyle={{ color: 'black',fontSize:20 }}
            dateNumberStyle={{ color: 'black',fontSize:20 }}
            dateNameStyle={{ color: 'black',fontSize:10 }}
            iconContainer={{ flex: 0.1 }}
            daySelectionAnimation={{
              type: 'border',
              duration: 200,
              borderWidth: 1,
              borderHighlightColor: 'black',
              backgroundColor: 'black',
            }}
          />
          <View style={styles.statisticRow1}>
            <View style={{ width: 180, alignItems: 'center' }}>
              <Pie
                radius={100}
                innerRadius={80}
                sections={[
                  {
                    percentage:  Math.ceil(((statistic ? statistic.burnedCalories : 0)/3500) * 100) ,
                    color: '#461CF0',
                  },
                ]}
                backgroundColor="#ddd"
              />
              <View style={styles.gauge1}>
                <Text style={styles.gaugeText1}>
                  {statistic ? statistic.burnedCalories : 0}
                </Text>
                <Text style={[styles.gaugeText1, { fontSize: 18 }]}>Cal</Text>
              </View>
            </View>
          </View>

          <View style={styles.statisticRow2}>
            <View style={{ width: 110, alignItems: 'center' }}>
              <Pie
                radius={55}
                innerRadius={37}
                sections={[
                  {
                    percentage: Math.ceil(((statistic ? statistic.finishedExercises.length : 0)/10) * 100)   ,
                    color: '#EBD618',
                  },
                ]}
                backgroundColor="#ddd"
              />
              <View style={styles.gauge}>
                <Text style={styles.gaugeText}>{statistic ? statistic.finishedExercises.length : 0}{'\n'}Exercise</Text>
              </View>
            </View>
            <View style={{ width: 110, alignItems: 'center' }}>
              <Pie
                radius={55}
                innerRadius={37}
                sections={[
                  {
                    percentage: Math.ceil(((statistic ? statistic.minutes : 0)/80) * 100),
                    color: '#F84C4C',
                  },
                ]}
                backgroundColor="#ddd"
              />
              <View style={styles.gauge}>
                <Text style={styles.gaugeText}>{statistic ? statistic.minutes : 0}{'\n'}Minutes</Text>
              </View>
            </View>
            {/* <View style={{ width: 118, alignItems: 'center' }}>
              <Pie
                radius={55}
                innerRadius={37}
                sections={[
                  {
                    percentage: 70,
                    color: '#1287DC',
                  },
                ]}
                backgroundColor="#ddd"
              />
              <View style={styles.gauge}>
                <Text style={styles.gaugeText}>80{'\n'}bpm</Text>
              </View>
            </View> */}
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: 10,
            }}>
            <Text style={{ fontWeight: '700' }}>Finish exercises</Text>
            <Text style={{ color: '#461CF0', fontWeight: '600' }}>See all</Text>
          </View>
          <FlatList
            data={finishedExercises}
            keyExtractor={item => item.statisticId}
            style={{
              //   backgroundColor: 'red',
              width: '100%',
              marginTop: '2%',
              alignSelf: 'center',
            }}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  //   onPress={() => navigation.navigate('Workout Detail', [item])}
                  style={{
                    width: '100%',
                    height: 90,
                    borderRadius: 20,
                    marginTop: 10,
                    marginBottom: 10,
                  }}>
                  <Image
                    source={ExerciseImages[item.thumbnail]}
                    // key={item.id}
                    style={{
                      width: '95%',
                      height: 100,
                      borderRadius: 30,
                      alignSelf: 'center',
                      borderWidth: 1,
                    }}
                  />
                  <View style={{
                    position: 'absolute',
                    left: 30,
                    bottom: 0,
                  }}>
                    <Text style={{ fontSize: 18, fontWeight: 600, color: 'white' }}>{item.name}</Text>
                    <Text style={{ color: 'white' }}>{item.duration} minutes | {item.sets} sets  | {item.reps} reps | {item.caloriesBurn} calories burn</Text>
                  </View>
                </TouchableOpacity>
              )
            }}
          >

          </FlatList>
        </View>

        <View style={styles.foot}>
          <Footer page='Statistic' />
        </View>
      </SafeAreaView>
    </>
  );
};

export default Statistic;

const styles = StyleSheet.create({
  container: {
    marginLeft: '4%',
    marginRight: '4%',
    // backgroundColor:'pink',
    flex: 1,
  },
  head: {
    flex: 0.07,
    // backgroundColor:'red',
    flexDirection: 'row',
  },
  body: {
    flex: 0.86,
    // backgroundColor: 'pink',
  },
  foot: {
    flex: 0.07,
    // backgroundColor: 'blue',
    // paddingBottom: '2%',
  },
  notificationIcon: {
    paddingTop: '4%',
    marginRight: '4%',
  },
  iconBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1,
  },
  gauge: {
    position: 'absolute',
    width: 70,
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gaugeText: {
    backgroundColor: 'transparent',
    color: '#000',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
  statisticRow1: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  statisticRow2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingVertical: 10,
  },
  gauge1: {
    position: 'absolute',
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor:'pink'
  },
  gaugeText1: {
    backgroundColor: 'transparent',
    color: '#000',
    fontSize: 24,
    fontWeight: '600',
  },
});
