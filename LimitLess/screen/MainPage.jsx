import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, Image, FlatList, StyleSheet, View, Text, TouchableOpacity, ScrollView, StatusBar, TextInput } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/AntDesign';
import { Button } from '@rneui/themed';
import Footer from '../component/Footer';
import Header from '../component/Header';
import { BlurView } from '@react-native-community/blur';
import { ReactNativeModal } from 'react-native-modal';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Stack = createNativeStackNavigator();
const MainPage = (props) => {
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const handleModal = () => setIsModalVisible(() => !isModalVisible);
    const { navigation, route } = props
    const [userFullName, setUserFullName] = useState('');
    const [loaded, isLoaded] = useState(false);
    const [isPremiumUser, setIsPremiumUser] = useState(false);
    const [levelPicked, setLevelPicked] = useState('');
    const [workouts, setWorkouts] = useState({});
    const selectedWorkoutPremium = useRef('');
    const [featureWorkouts, setfeatureWorkouts] = useState({});
    const [workoutPurchased, setWorkoutPurchased] = useState([]);
    var featureWorkout = [];
    const ExerciseImages = {
        "barbell-curl.jpg": require('../assets/exe-thumbnail/barbell-curl.jpg'),
        "barbell-rows.jpg": require('../assets/exe-thumbnail/barbell-rows.jpg'),
        "bench-press.jpg": require('../assets/exe-thumbnail/bench-press.jpg'),
        "calves-raise.jpg": require('../assets/exe-thumbnail/calves-raise.jpg'),
        "db-press.jpg": require('../assets/exe-thumbnail/db-press.jpg'),
        "close-grip-bench-press.jpg": require('../assets/exe-thumbnail/close-grip-bench-press.jpg'),
        "hammer-curl.jpg": require('../assets/exe-thumbnail/hammer-curl.jpg'),
        "lat-pulldown.jpg": require('../assets/exe-thumbnail/lat-pulldown.jpg'),
        "leg-curl.jpg": require('../assets/exe-thumbnail/leg-curl.jpg'),
        "leg-extension.jpg": require('../assets/exe-thumbnail/leg-extension.jpg'),
        "leg-press.jpg": require('../assets/exe-thumbnail/leg-press.jpg'),
        "push-workout.jpg": require('../assets/exe-thumbnail/push-workout.jpg'),
        "squat.jpg": require('../assets/exe-thumbnail/squat.jpg'),
        "triceps-extension.jpg": require('../assets/exe-thumbnail/triceps-extension.jpg')
    }
    const fetchWorkouts = async (level) => {
        workoutsResponseBody = await fetch(`http://limitless-api.us-east-1.elasticbeanstalk.com/workout/fetchByLevel?level=${level}`)
            .then(response => response.json())
            .then(json => json)
            .catch(error => console.log(error))
        console.log(JSON.stringify(workoutsResponseBody))
        console.log('is Array: ' + Array.isArray(workoutsResponseBody))
        if (Array.isArray(workoutsResponseBody)) {
            workoutsResponseBody.sort((item1, item2) => item2.isPremium - item1.isPremium)
        }
        setLevelPicked(level)
        setWorkouts(workoutsResponseBody)
        setLevels(levelsDict)
        setLevels(prev => ({ ...prev, [level]: true }))
        if (Object.keys(featureWorkouts).length == 0) {
            setfeatureWorkouts(workoutsResponseBody)
        }
    }
    useFocusEffect(
        React.useCallback(() => {
            // Do something when the screen is focused
            const checkPremiumAndGetName = async () => {
                let userId = ''
                let user_level = ''
                const user_info = await AsyncStorage.getItem('user_info')
                if (user_info != null) {
                    userId = JSON.parse(user_info).userId
                    setUserFullName(JSON.parse(user_info).fullName)
                    setWorkoutPurchased(JSON.parse(user_info).workoutIdList)
                } else {
                    //redirect to welcomepage
                }
                const checkResult = await fetch(`http://limitless-api.us-east-1.elasticbeanstalk.com/api/subscription/checkActiveSubscription?userId=${userId}`).then(response => response.json()).then(json => json)
                console.log(checkResult)
                if (checkResult.isPremium) {
                    setIsPremiumUser(checkResult.isPremium)
                    console.log(isPremiumUser)
                }
            }
            checkPremiumAndGetName()
            console.log(loaded)
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
    console.log(loaded)
    const time = ['Morning', 'Afternoon', 'Evening'];
    const levelsDict = {
        'Beginner': false,
        'Intermediate': false,
        'Advanced': false
    }
    const [levels, setLevels] = useState(levelsDict);
    return (
        <>
            <SafeAreaView style={styles.container}>
                <View style={styles.head}>
                    <Header></Header>
                    <View style={styles.iconBar}>
                        <TouchableOpacity style={styles.notificationIcon}>
                            <EvilIcons name='bell' size={40}  ></EvilIcons>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.markIcon}>
                            <Ionicons name='md-bookmarks-outline' size={28}  ></Ionicons>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{
                            fontWeight: 700,
                            fontSize: 26,
                            paddingLeft: '2%'
                        }}>
                            {time[0]}, {userFullName}
                        </Text>
                        <MaterialCommunityIcons
                            style={{
                                marginTop: '2%',
                                marginRight: '3%',
                                color: '#C87F11'
                            }}
                            name='hand-wave-outline'
                            size={25}>
                        </MaterialCommunityIcons>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: '5%' }}>
                        <Text style={{
                            fontWeight: 600,
                            fontSize: 20
                        }}>
                            Feature Workout
                        </Text>
                    </View>
                    <View style={{ height: 145, flexWrap: 'wrap' }}>
                        <FlatList
                            style={styles.featureWorkout}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={featureWorkouts}
                            keyExtractor={item => item.workoutId}
                            renderItem={({ item }) => (
                                !(item.isPremium == 0) || isPremiumUser || workoutPurchased.findIndex(id => item.workoutId == id) != -1 ?
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('Workout Detail', { workoutId: item.workoutId, levelPicked: levelPicked })}
                                        activeOpacity={0.8}
                                        style={{
                                            width: 120,
                                            height: 120,
                                            borderRadius: 10,
                                            borderColor: 'black',
                                            margin: 5,
                                            blurRadius: 1
                                        }}>
                                        <Image
                                            source={ExerciseImages[item.thumbnail]}
                                            key={item.workoutId}
                                            style={{
                                                width: 120,
                                                height: 120,
                                                borderRadius: 10,
                                                padding: 10
                                            }}
                                        />
                                        <View style={{
                                            position: 'absolute',
                                            right: 10,
                                            top: 5,
                                        }}>
                                            {item.isPremium == 0 && <MaterialCommunityIcons
                                                style={{
                                                    color: 'white',
                                                    borderRadius: 100,
                                                    backgroundColor: '#f8f202',
                                                    padding: 3
                                                }}
                                                name='star'
                                                size={15}>
                                            </MaterialCommunityIcons>}
                                        </View>
                                        <View style={{
                                            position: 'absolute',
                                            marginLeft: '6%',
                                            marginTop: '50%'
                                        }}>
                                            <Text style={{ fontSize: 15, fontWeight: 600, color: 'white' }}>{item.name}</Text>
                                            <Text style={{ fontSize: 10, color: 'white', fontWeight: 500 }}>{item.totalExercise} exercises</Text>
                                        </View>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity
                                        onPress={() => {
                                            handleModal()
                                            selectedWorkoutPremium.current = item.name
                                            console.log('selectedWorkout: ' + selectedWorkoutPremium.current)
                                        }}
                                        activeOpacity={0.8}
                                        style={{
                                            width: 120,
                                            height: 120,
                                            borderRadius: 10,
                                            borderColor: 'black',
                                            margin: 5,
                                            blurRadius: 1
                                        }}>
                                        <Image
                                            source={ExerciseImages[item.thumbnail]}
                                            key={item.workoutId}
                                            style={{
                                                width: 120,
                                                height: 120,
                                                borderRadius: 10,
                                                padding: 10
                                            }}
                                        />
                                        <BlurView
                                            style={{
                                                width: '100%',
                                                height: "100%",
                                                borderRadius: 10,
                                                borderColor: 'black',
                                                blurRadius: 1,
                                                position: 'absolute'
                                            }}
                                            overlayColor="transparent"
                                            blurType="light"
                                            blurAmount={1}
                                            blurRadius={3}
                                        />
                                        <View style={{
                                            position: 'absolute',
                                            right: 10,
                                            top: 5,
                                        }}>
                                            <MaterialCommunityIcons
                                                style={{
                                                    color: 'white',
                                                    borderRadius: 100,
                                                    backgroundColor: '#f8f202',
                                                    padding: 3
                                                }}
                                                name='star'
                                                size={15}>
                                            </MaterialCommunityIcons>
                                        </View>
                                        <View style={{
                                            position: 'absolute',
                                            marginLeft: '6%',
                                            marginTop: '50%'
                                        }}>
                                            <Text style={{ fontSize: 15, fontWeight: 600, color: 'white' }}>{item.name}</Text>
                                            <Text style={{ fontSize: 10, color: 'white', fontWeight: 500 }}>{item.totalExercise} exercises</Text>
                                        </View>
                                        <View style={{
                                            position: 'absolute',
                                            alignSelf: 'center',
                                            marginVertical: '15%'
                                        }}>
                                            <EvilIcons name='lock' size={40} style={{ color: 'white' }}  ></EvilIcons>
                                        </View>
                                    </TouchableOpacity>
                            )}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: '2%' }}>
                        <Text style={{
                            fontWeight: 600,
                            fontSize: 20
                        }}>
                            Workout Level
                        </Text>
                        <TouchableOpacity style={{ flex: 1 }} onPress={() => navigation.navigate('Workouts')}>
                            <Text style={{
                                fontWeight: 600,
                                fontSize: 20,
                                flex: 1,
                                textAlign: 'right',
                                color: '#461CF0'
                            }}>
                                See all
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        {Object.keys(levels).map((title) => (
                            <Button
                                key={title}
                                title={title}
                                onPress={() => {
                                    fetchWorkouts(title)
                                    setLevels(levelsDict)
                                    setLevels(prev => ({ ...prev, [title]: true }))
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
                    <View style={{
                        flexDirection: 'column',
                        width: '100%',
                        height: '100%',
                        marginTop: '2%',
                        alignSelf: 'center',
                        justifyContent: 'center'
                    }}>
                        <FlatList
                            style={styles.exercise}
                            showsVerticalScrollIndicator={false}
                            scrollEnabled={false}
                            data={workouts}
                            keyExtractor={item => item.workoutId}
                            renderItem={({ item }) => (
                                !(item.isPremium == 0) || isPremiumUser || workoutPurchased.findIndex(id => item.workoutId == id) != -1 ?
                                    <TouchableOpacity
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
                                        <View style={{
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
                </ScrollView>
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
        flex: 0.08,
        flexDirection: 'row'
    },
    body: {
        flex: 10,
        marginTop: '2%'
    },
    foot: {
        flex: 0.08
    },
    notificationIcon: {
        paddingTop: '4%',
        marginRight: '4%'
    },
    markIcon: {
        paddingTop: '4%'
    },
    iconBar: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        flex: 1
    },
    featureWorkout: {
        margin: "2%",
        width: '100%'
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
    exercise: {
        height: '100%'
    },
    ugradePremiumStyle: {
        flexDirection: 'column',
        backgroundColor: '#461CF0',
        paddingHorizontal: 15,
        paddingVertical: 25,
        rowGap: 15,
        padding: '10%',
        borderRadius: 20,
        flex: 1,
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
export default MainPage;