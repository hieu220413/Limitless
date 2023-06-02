import * as React from 'react';
import { SafeAreaView, Image, FlatList, StyleSheet, View, Text, TouchableOpacity, ScrollView, StatusBar, TextInput } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useState } from "react";
import { Button } from '@rneui/themed';
import Footer from '../../component/Footer';
import Header from '../../component/Header';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Stack = createNativeStackNavigator();
const Workouts = (props) => {
    var userFullName = 'Anh Khoa';
    const {navigation,route} = props
    const time = ['Morning', 'Afternoon', 'Evening'];
    const DATA = [
        {
            id: '1',
            url: require('../../image/workout1.jpg'),
            name: 'Arm Workout',
            level: 'Beginner',
            time: 10
        },
        {
            id: '2',
            url: require('../../image/workout2.jpg'),
            name: 'Chest Workout',
            level: 'Beginner',
            time: 12
        },
        {
            id: '3',
            url: require('../../image/workout3.jpg'),
            name: 'Leg Workout',
            level: 'Beginner',
            time: 20
        },
        {
            id: '4',
            url: require('../../image/workout4.jpg'),
            name: 'Push Workout',
            level: 'Beginner',
            time: 6
        },
        {
            id: '5',
            url: require('../../image/workout5.jpg'),
            name: 'Squat Workout',
            level: 'Beginner',
            time: 8
        },
    ];

    const levelsDict = {
        'Beginner': false,
        'Intermediate': false,
        'Advanced': false
    }
    const [levels, setLevels] = useState(levelsDict);

    const [isPremiumUser, setIsPremiumUser] = useState(false)
    useFocusEffect(
        React.useCallback(() => {
            // Do something when the screen is focused
            const checkPremium = async () => {
                let userId = ''
                const user_info = await AsyncStorage.getItem('user_info')
                if (user_info != null) {
                    userId = JSON.parse(user_info).userId
                    console.log(userId)
                } else {
                    //redirect to welcomepage
                }
                const checkResult = await fetch(`http://limitless-api.us-east-1.elasticbeanstalk.com/api/subscription/checkActiveSubscription?userId=${userId}`).then(response => response.json()).then(json => json)
                if (checkResult.isPremium) {
                    console.log(checkResult.isPremium)
                    setIsPremiumUser(checkResult.isPremium)
                }
            }
            checkPremium()

            return () => {
                // Do something when the screen is unfocused
                // Useful for cleanup functions
                setIsPremiumUser(false)
            };
        }, [])
    );
    return (
        <>
            <SafeAreaView style={styles.container}>
                <View style={styles.head}>
                    <Header></Header>
                    <View style={styles.iconBar}>
                        <TouchableOpacity style={styles.notificationIcon}>
                            <EvilIcons name='search' size={40}  ></EvilIcons>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.body} >
                    <View style={{ flexDirection: 'row' }}>
                        {Object.keys(levels).map((title) => (
                            <Button
                                key={title}
                                title={title}
                                onPress={() => {
                                    setLevels(levelsDict)
                                    setLevels(prev => ({ ...prev, [title]: true }))
                                    levelPicked = title
                                    console.log(levelPicked)
                                }}
                                titleStyle={!levels[title] ? styles.titleBtn : styles.titleBtnPressed}
                                buttonStyle={!levels[title] ? styles.button : styles.buttonPressed}
                                containerStyle={{
                                    width: '32%',
                                    marginRight: '1.5%',
                                    marginTop: '3%'
                                }}
                            />))}
                    </View>
                    <View style={{ width: '100%', height: '90%', marginTop: '2%', alignSelf: 'center', justifyContent: 'center' }}>
                        <FlatList
                            style={{ width: '100%', alignSelf: 'center' }}
                            showsVerticalScrollIndicator={false}
                            data={DATA}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => (
                                !(item.isPremium == 1) || isPremiumUser ?
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('Workout Detail', [item.workoutId])}
                                        activeOpacity={0.8}
                                        style={{
                                            width: '100%',
                                            height: 120,
                                            borderRadius: 20,
                                            marginTop: '3%'
                                        }}>
                                        <Image
                                            source={ExerciseImages[item.thumbnail]}
                                            key={item.workoutId}
                                            style={{
                                                width: '95%',
                                                height: 120,
                                                borderRadius: 30,
                                                alignSelf: 'center',
                                                borderWidth: 1
                                            }}
                                        />
                                        <View style={{
                                            position: 'absolute',
                                            marginLeft: '8%',
                                            marginTop: '16%'
                                        }}>
                                            <Text style={{ fontSize: 25, fontWeight: 600, color: 'white' }}>{item.name}</Text>
                                            <Text style={{ fontSize: 18, color: 'white' }}>{item.totalExercise} exercise | {levelPicked}</Text>
                                        </View>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity
                                        onPress={handleModal}
                                        activeOpacity={0.8}
                                        style={{
                                            width: '100%',
                                            height: 120,
                                            borderRadius: 20,
                                            marginTop: '3%'
                                        }}>
                                        <Image
                                            source={ExerciseImages[item.thumbnail]}
                                            key={item.workoutId}
                                            style={{
                                                width: '95%',
                                                height: 120,
                                                borderRadius: 30,
                                                alignSelf: 'center',
                                                borderWidth: 1
                                            }}
                                        />
                                        <BlurView
                                            style={{
                                                width: '100%',
                                                height: "100%",
                                                borderRadius: 30,
                                                alignSelf: 'center',
                                                borderWidth: 1,
                                                position: 'absolute'
                                            }}
                                            overlayColor="transparent"
                                            blurType="light"
                                            blurAmount={3}
                                            blurRadius={5}
                                        />
                                        <View style={{
                                            position: 'absolute',
                                            alignSelf: 'center',
                                            borderWidth: 1
                                        }}

                                    />
                                    <View style={{
                                        position: 'absolute',
                                        marginLeft: '7%',
                                        marginTop: '17%'
                                    }}>
                                        <Text style={{ fontSize: 20, fontWeight: 600, color: 'white' }}>{item.name}</Text>
                                        <Text style={{ color: 'white' }}>{item.time} minutes | {item.level}</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
                <View style={styles.foot}>
                    <Footer page='Workouts' />
                </View>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        marginLeft: '4%',
        marginRight: '4%',
        flex: 1
    },
    head: {
        flex: 0.7,
        flexDirection: 'row'
    },
    body: {
        flex: 8
    },
    foot: {
        flex: 0.55,
        paddingBottom: '2%'
    },
    notificationIcon: {
        paddingTop: '4%',
        marginRight: '4%'
    },
    iconBar: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        flex: 1
    },
    button: {
        backgroundColor: '#e3e6e9',
        borderRadius: 45,
        borderWidth: 1,
        borderColor: '#461CF0'
    },
    buttonPressed: {
        backgroundColor: '#461CF0',
        borderRadius: 45,
        borderWidth: 1,
        borderColor: '#461CF0'
    },
    titleBtn: {
        color: "#461CF0",
        fontSize: 14
    },
    titleBtnPressed: {
        color: "white",
        fontSize: 14
    }
})
export default Workouts;