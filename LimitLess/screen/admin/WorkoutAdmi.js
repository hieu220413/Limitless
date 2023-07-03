import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, Image, FlatList, StyleSheet, View, Text, TouchableOpacity, ScrollView, StatusBar, TextInput, Alert } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { Button } from '@rneui/themed';
import Header from '../../component/Header';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ReactNativeModal } from 'react-native-modal';
import Icon from 'react-native-vector-icons/AntDesign';
import { BlurView } from '@react-native-community/blur';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FAB } from 'react-native-paper';

const Stack = createNativeStackNavigator();
const WorkoutsAdmin = (props) => {
    const { navigation, route } = props
    const levelsDict = {
        'Beginner': false,
        'Intermediate': false,
        'Advanced': false
    }
    const [levels, setLevels] = useState(levelsDict);
    const [workouts, setWorkouts] = useState({});
    const [levelPicked, setLevelPicked] = useState('');

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
    const showConfirmDialog = () => {
        return Alert.alert(
            "Are your sure?",
            "Are you sure you want to remove this workout?",
            [
                // The "Yes" button
                {
                    text: "Yes",
                    onPress: () => {

                    },
                },
                // The "No" button
                // Does nothing but dismiss the dialog when tapped
                {
                    text: "No",
                },
            ]
        );
    };
    const fetchWorkouts = async (level) => {
        workoutsResponseBody = await fetch(`http://limitless-api.us-east-1.elasticbeanstalk.com/workout/fetchByLevel?level=${level}`)
            .then(response => response.json())
            .then(json => json)
            .catch(error => console.log(error))
        console.log('is Array: ' + Array.isArray(workoutsResponseBody))
        if (Array.isArray(workoutsResponseBody)) {
            workoutsResponseBody.sort((item1, item2) => item2.isPremium - item1.isPremium)
        }
        setWorkouts(workoutsResponseBody)
        setLevelPicked(level)
        setLevels(levelsDict)
        setLevels(prev => ({ ...prev, [level]: true }))
    }
    useEffect(() => {
        fetchWorkouts('Beginner')
    }, [])
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
                                    fetchWorkouts(title)
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
                            data={workouts}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <View
                                    key={item.workoutId}
                                    activeOpacity={0.8}
                                    style={{
                                        width: '100%',
                                        height: 120,
                                        borderRadius: 20,
                                        marginTop: '3%'
                                    }}>
                                    <Image
                                        source={ExerciseImages[item.thumbnail]}
                                        key={item.workoutId + 'image'}
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
                                        right: 30,
                                        top: 15,
                                        borderRadius: 8,
                                        backgroundColor: '#f7d902',
                                        padding: 2
                                    }}>
                                        {item.isPremium == 0 && <MaterialCommunityIcons
                                            style={{
                                                color: 'white'

                                            }}
                                            name='star'
                                            size={20}>
                                        </MaterialCommunityIcons>}
                                    </View>
                                    <View key={item.workoutId + 'text'}
                                        style={{
                                            position: 'absolute',
                                            marginLeft: '8%',
                                            marginTop: '20%'
                                        }}>
                                        <Text style={{ fontSize: 20, fontWeight: 600, color: 'white' }}>{item.name}</Text>
                                        <Text style={{ fontSize: 16, color: 'white' }}>{item.totalExercise} exercise | {levelPicked}</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => { showConfirmDialog() }}>
                                        <MaterialCommunityIcons name='delete' size={33} color={'white'} style={{ position: 'absolute', bottom: 10, right: 26 }} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => navigation.navigate('Workout Detail', { workoutId: item.workoutId, levelPicked: levelPicked })}>
                                        <Icon name='form' size={30} color={'white'} style={{ position: 'absolute', bottom: 12, right: 65 }} />
                                    </TouchableOpacity>
                                </View>

                            )}
                        />

                    </View>

                </View>
                <FAB
                    icon="plus"
                    style={{
                        position: 'absolute',
                        margin: 16,
                        right: 0,
                        bottom: 0,
                        borderRadius: 50,
                        backgroundColor: '#701CF0'
                    }}
                    onPress={() => console.log('Pressed')}
                    color='white'
                />
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
    },
    ugradePremiumStyle: {
        flexDirection: 'column',
        backgroundColor: '#461CF0',
        paddingHorizontal: 15,
        paddingVertical: 25,
        rowGap: 15,
        padding: '10%',
        borderRadius: 20,
        flex: 1
    },
    packPurchasedStyle: {
        flexDirection: 'column',
        backgroundColor: '#886bff',
        paddingHorizontal: 15,
        paddingVertical: 25,
        rowGap: 15,
        padding: '10%',
        borderRadius: 20,
        flex: 1,
    },
})
export default WorkoutsAdmin;