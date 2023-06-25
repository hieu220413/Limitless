import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, Image, FlatList, StyleSheet, View, Text, TouchableOpacity, ScrollView, StatusBar, TextInput } from "react-native";
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

const Stack = createNativeStackNavigator();
const Workouts = (props) => {
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const handleModal = () => setIsModalVisible(() => !isModalVisible);
    const { navigation, route } = props
    const levelsDict = {
        'Beginner': false,
        'Intermediate': false,
        'Advanced': false
    }
    const [levels, setLevels] = useState(levelsDict);
    const [isPremiumUser, setIsPremiumUser] = useState(false)
    const [workouts, setWorkouts] = useState({});
    const [levelPicked, setLevelPicked] = useState('');
    const selectedWorkoutPremium = useRef('');
    const [workoutPurchased, setWorkoutPurchased] = useState([]);
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
    const fetchWorkouts = async (level) => {
        workoutsResponseBody = await fetch(`http://limitlessapi.us-east-1.elasticbeanstalk.com/workout/fetchByLevel?level=${level}`)
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
    useFocusEffect(
        React.useCallback(() => {
            // Do something when the screen is focused
            const checkPremium = async () => {
                let userId = ''
                let user_level = ''
                const user_info = await AsyncStorage.getItem('user_info')
                if (user_info != null) {
                    userId = JSON.parse(user_info).userId
                    user_level = JSON.parse(user_info).level
                    setWorkoutPurchased(JSON.parse(user_info).workoutIdList)
                    console.log(user_info)
                    console.log(user_level)
                } else {
                    //redirect to welcomepage
                }
                const checkResult = await fetch(`http://limitlessapi.us-east-1.elasticbeanstalk.com/api/subscription/checkActiveSubscription?userId=${userId}`).then(response => response.json()).then(json => json)
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
    useEffect(() => {
        const loadWorkout = async () => {
            const user_info = await AsyncStorage.getItem('user_info')
            let user_level = JSON.parse(user_info).level
            fetchWorkouts(user_level)
        };
        loadWorkout()
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
                                !(item.isPremium == 0) || isPremiumUser || workoutPurchased.findIndex(id => item.workoutId == id) != -1 ?
                                    <TouchableOpacity
                                        key={item.workoutId}
                                        onPress={() => navigation.navigate('Workout Detail', { workoutId: item.workoutId, levelPicked: levelPicked })}
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
                                            right: 25,
                                            top: 10,
                                        }}>
                                            {item.isPremium == 0 && <MaterialCommunityIcons
                                                style={{
                                                    color: 'white',
                                                    borderRadius: 100,
                                                    backgroundColor: '#f8f202',
                                                    padding: 4
                                                }}
                                                name='star'
                                                size={20}>
                                            </MaterialCommunityIcons>}
                                        </View>
                                        <View key={item.workoutId + 'text'}
                                            style={{
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
                                        key={item.workoutId}
                                        onPress={() => {
                                            handleModal()
                                            selectedWorkoutPremium.current = item.name
                                            console.log('selectedWorkout: ' + selectedWorkoutPremium.current)
                                        }}
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
                                        <BlurView
                                            key={item.workoutId + 'blur'}
                                            style={{
                                                width: '95%',
                                                height: "100%",
                                                borderRadius: 30,
                                                alignSelf: 'center',
                                                borderWidth: 1,
                                                position: 'absolute'
                                            }}
                                            overlayColor="transparent"
                                            blurAmount={1}
                                            blurRadius={3}
                                        />
                                        <View style={{
                                            position: 'absolute',
                                            right: 25,
                                            top: 10,
                                        }}>
                                            <MaterialCommunityIcons
                                                style={{
                                                    color: 'white',
                                                    borderRadius: 100,
                                                    backgroundColor: '#f8f202',
                                                    padding: 4
                                                }}
                                                name='star'
                                                size={20}>
                                            </MaterialCommunityIcons>
                                        </View>
                                        <View style={{
                                            position: 'absolute',
                                            alignSelf: 'center',
                                            marginTop: '4%'
                                        }}>
                                            <EvilIcons name='lock' size={46} style={{ color: 'white' }}  ></EvilIcons>
                                        </View>
                                        <View key={item.workoutId + 'text'}
                                            style={{
                                                position: 'absolute',
                                                marginLeft: '8%',
                                                marginTop: '16%'
                                            }}>
                                            <Text style={{ fontSize: 25, fontWeight: 600, color: 'white' }}>{item.name}</Text>
                                            <Text style={{ fontSize: 18, color: 'white' }}>{item.totalExercise} exercise | {levelPicked}</Text>
                                        </View>
                                    </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
            </SafeAreaView>
            <ReactNativeModal isVisible={isModalVisible} onBackdropPress={handleModal}>
                <View style={{ backgroundColor: 'white', borderWidth: 0.5, borderRadius: 20, height: '20%', maxHeight: 200, minHeight: 150, position: 'relative' }}>
                    <TouchableOpacity style={styles.ugradePremiumStyle} activeOpacity={0.8} onPress={() => { navigation.navigate('Premium'), setIsModalVisible(() => !isModalVisible) }}>
                        <View style={{ flexDirection: 'row', columnGap: 15, alignItems: 'center' }}>
                            <Text style={{ paddingVertical: 3, paddingHorizontal: 15, color: 'white', backgroundColor: '#FAE20B', fontSize: 20, fontWeight: 'bold', borderRadius: 20 }}>PRO</Text>
                            <Text style={{ flexGrow: 1, color: 'white', textAlign: 'center', fontSize: 19, fontWeight: 'bold' }}>Upgrade to Premium</Text>
                            <Icon name='rightcircle' size={25} color="#fff"></Icon>
                        </View>
                        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Enjoy workout access without ads and restrictions</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity onPress={handleModal} style={{ position: 'absolute', alignSelf: 'flex-end' }}>
                            <Ionicons name='ios-close-outline' size={46} style={{ color: 'white' }}  ></Ionicons>
                        </TouchableOpacity> */}
                </View>
                <Text style={{ color: 'white', textAlign: 'center', fontSize: 25, fontWeight: 'bold', marginVertical: 20 }}>
                    OR
                </Text>
                <View style={{ backgroundColor: 'white', borderWidth: 0.5, borderRadius: 20, height: '20%', maxHeight: 200, minHeight: 150, position: 'relative' }}>
                    <TouchableOpacity style={styles.packPurchasedStyle} activeOpacity={0.8} onPress={() => { navigation.navigate('PackPurchaseMomoQR', { workoutName: selectedWorkoutPremium.current }), setIsModalVisible(() => !isModalVisible) }}>
                        <View style={{ flexDirection: 'row', columnGap: 15, alignItems: 'center' }}>
                            <Text style={{ paddingVertical: 3, paddingHorizontal: 15, color: 'white', backgroundColor: '#e0e0de', fontSize: 20, fontWeight: 'bold', borderRadius: 20 }}>LOW</Text>
                            <Text style={{ flexGrow: 1, color: 'white', textAlign: 'center', fontSize: 19, fontWeight: 'bold' }}>Pack purchase</Text>
                            <Icon name='rightcircle' size={25} color="#fff"></Icon>
                        </View>
                        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Purchase Once, Use Forever, No Ads And Restrictions</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity onPress={handleModal} style={{ position: 'absolute', alignSelf: 'flex-end' }}>
                            <Ionicons name='ios-close-outline' size={46} style={{ color: 'white' }}  ></Ionicons>
                        </TouchableOpacity> */}
                </View>
            </ReactNativeModal>
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
export default Workouts;