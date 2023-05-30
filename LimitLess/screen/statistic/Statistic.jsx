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
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useState} from 'react';
import {Button} from '@rneui/themed';
import Footer from '../../component/Footer';
import Header from '../../component/Header';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import Pie from 'react-native-pie';

const Statistic = props => {
  const {navigation, route} = props;
  const DATA = [
    {
      id: '1',
      url: require('../../image/workout1.jpg'),
      name: 'Arm Workout',
      level: 'Beginner',
      time: 10,
    },
    {
      id: '2',
      url: require('../../image/workout2.jpg'),
      name: 'Chest Workout',
      level: 'Beginner',
      time: 12,
    },
    {
      id: '3',
      url: require('../../image/workout3.jpg'),
      name: 'Leg Workout',
      level: 'Beginner',
      time: 20,
    },
    {
      id: '4',
      url: require('../../image/workout4.jpg'),
      name: 'Push Workout',
      level: 'Beginner',
      time: 6,
    },
    {
      id: '5',
      url: require('../../image/workout5.jpg'),
      name: 'Squat Workout',
      level: 'Beginner',
      time: 8,
    },
  ];
  let datesWhitelist = [
    {
      start: moment(),
      end: moment().add(6, 'days'), // total 4 days enabled
    },
  ];
  let datesBlacklist = [moment().add(1, 'days')]; // 1 day disabled

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
            style={{height: 90, paddingTop: 18, paddingBottom: 10}}
            calendarColor={'white'}
            highlightDateNumberStyle={{color: '#461CF0'}}
            highlightDateNameStyle={{color: '#461CF0'}}
            calendarHeaderStyle={{color: 'black'}}
            dateNumberStyle={{color: 'black'}}
            dateNameStyle={{color: 'black'}}
            iconContainer={{flex: 0.1}}
            daySelectionAnimation={{
              type: 'border',
              duration: 200,
              borderWidth: 1,
              borderHighlightColor: 'black',
              backgroundColor: 'black',
            }}
          />
          <View style={styles.statisticRow1}>
            <View style={{width: 180, alignItems: 'center'}}>
              <Pie
                radius={100}
                innerRadius={80}
                sections={[
                  {
                    percentage: 75,
                    color: '#461CF0',
                  },
                ]}
                backgroundColor="#ddd"
              />
              <View style={styles.gauge1}>
                <Text style={styles.gaugeText1}>
                  950{'\n'} <Text style={{fontSize: 18}}>Cal</Text>
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.statisticRow2}>
            <View style={{width: 118, alignItems: 'center'}}>
              <Pie
                radius={55}
                innerRadius={37}
                sections={[
                  {
                    percentage: 90,
                    color: '#EBD618',
                  },
                ]}
                backgroundColor="#ddd"
              />
              <View style={styles.gauge}>
                <Text style={styles.gaugeText}>87{'\n'}Workout</Text>
              </View>
            </View>
            <View style={{width: 118, alignItems: 'center'}}>
              <Pie
                radius={55}
                innerRadius={37}
                sections={[
                  {
                    percentage: 55,
                    color: '#F84C4C',
                  },
                ]}
                backgroundColor="#ddd"
              />
              <View style={styles.gauge}>
                <Text style={styles.gaugeText}>55{'\n'}Minutes</Text>
              </View>
            </View>
            <View style={{width: 118, alignItems: 'center'}}>
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
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: 10,
            }}>
            <Text style={{fontWeight: '700'}}>Finish workout</Text>
            <Text style={{color: '#461CF0', fontWeight: '600'}}>See all</Text>
          </View>
          <View
            style={{
              //   backgroundColor: 'red',
              flexGrow: 1,
              width: '100%',
              marginTop: '2%',
              alignSelf: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              //   onPress={() => navigation.navigate('Workout Detail', [item])}
              style={{
                width: '100%',
                flexGrow: 1,
                borderRadius: 20,
                marginTop: 10,
                marginBottom: 10,
              }}>
              <Image
                // source={require('../../image/workout1.png')}
                // key={item.id}
                style={{
                  width: '95%',
                  flexGrow: 1,
                  borderRadius: 30,
                  alignSelf: 'center',
                  borderWidth: 1,
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.foot}>
          <Footer page='Statistic'/>
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
