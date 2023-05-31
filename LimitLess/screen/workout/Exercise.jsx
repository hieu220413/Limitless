import * as React from 'react';
import { SafeAreaView, Image, FlatList, StyleSheet, View, Text, TouchableOpacity, ScrollView, StatusBar, TextInput } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useState, useEffect, useRef } from "react";
import { useIsFocused } from '@react-navigation/native'
import Footer from '../../component/Footer';
import Header from '../../component/Header';
import Video from 'react-native-video';
import video from '../../assets/video/exercise.mp4'

const Stack = createNativeStackNavigator();
const Exercise = (props) => {
    const [isFinish, setFinish] = useState(false);
    const [isPaused, setPause] = useState(false);
    const isFocused = useIsFocused();
    const exerciseVideo = useRef();
    const navigation = props.navigation;
    const route = props.route;
    const unsubscribe = navigation.addListener('blur', () => {
        console.log('Leaving Exercise Screen');
        exerciseVideo.current?.setNativeProps({ paused: true, muted: true })
    });
    const [exercise, setExercise] = useState({});
    const fetchExerciseDetail = async (exerciseId) => {
        exerciseDetailResponseBody = await fetch(`http://limitless-api.us-east-1.elasticbeanstalk.com/exercise/fetchById?id=${exerciseId}`)
            .then(response => response.json())
            .then(json => json)
            .catch(error => console.log(error));
            console.log(JSON.stringify(exerciseDetailResponseBody))  
        setExercise(exerciseDetailResponseBody);
    }
    useEffect(() => {
        fetchExerciseDetail(route.params)
        if (isFocused) {
            setFinish(false);
            setPause(true);
            exerciseVideo.current?.seek(0);
        } else {
            setPause(true)
        }
        return unsubscribe;
    }, [isFocused])

    const ExerciseVideo = {
        "barbell-curl.mp4": require('../../assets/video/barbell-curl.mp4'),
        "barbell-rows.mp4": require('../../assets/video/barbell-rows.mp4'),
        "bench-press.mp4": require('../../assets/video/bench-press.mp4'),
        "calves-raise.mp4": require('../../assets/video/calves-raise.mp4'),
        "chest-fly.mp4": require('../../assets/video/chest-fly.mp4'),
        "exercise.mp4": require('../../assets/video/exercise.mp4'),
        "hammer-curl.mp4": require('../../assets/video/hammer-curl.mp4'),
        "inclined-barbell-close-grip-bench-press.mp4": require('../../assets/video/inclined-barbell-close-grip-bench-press.mp4'),
        "inclined-dumbell-press.mp4": require('../../assets/video/inclined-dumbell-press.mp4'),
        "lat-pulldown.mp4": require('../../assets/video/lat-pulldown.mp4'),
        "leg-curl.mp4": require('../../assets/video/leg-curl.mp4'),
        "leg-extension.mp4": require('../../assets/video/leg-extension.mp4'),
        "leg-press.mp4": require('../../assets/video/leg-press.mp4'),
        "one-arm-lat-pulldown.mp4": require('../../assets/video/one-arm-lat-pulldown.mp4'),
        "squat.mp4": require('../../assets/video/squat.mp4'),
        "triceps-extension.mp4": require('../../assets/video/triceps-extension.mp4')
    }
    return (
        <>
            <SafeAreaView style={styles.container}>
                <View style={styles.head}>
                    <Header></Header>
                </View>
                <Video
                    source={ExerciseVideo[exercise.video]}
                    // Can be a URL or a local file.
                    style={styles.image}
                    controls={true}
                    onEnd={() => setFinish(true)}
                    resizeMode={'stretch'}
                    ref={exerciseVideo}
                    muted={true}
                    paused={isPaused || (!isFocused)} />
                <View style={styles.body} >
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{
                            fontWeight: 600,
                            fontSize: 25,
                            marginTop: '2%'
                        }}>
                            {exercise.name}
                        </Text>
                        {isFinish ? <Ionicons name='checkmark-circle' size={30} style={{ color: '#2EC561', marginTop: '1.5%', marginLeft: '4%' }}></Ionicons> : <View></View>}
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: '1%', marginTop: '2%' }}>
                        <Text style={{ color: 'black', fontStyle: 'italic' }}>{exercise.description}</Text>
                    </View>
                    <View
                        style={{
                            width: '100%',
                            height: '78%',
                            marginTop: '2%',
                            alignSelf: 'center'
                        }}>

                        <Text>Time</Text>
                        <View style={{ flexDirection: 'row', marginVertical: '2%' }}>
                            <View style={{ backgroundColor: '#459CF0', borderRadius: 5, marginRight: '4%' }}><Text style={{ color: 'white', padding: '3%' }}>{exercise.duration} minutes</Text></View>
                        </View>
                        <Text>Reps</Text>
                        <View style={{ flexDirection: 'row', marginVertical: '2%' }}>
                            <View style={{ backgroundColor: '#459CF0', borderRadius: 5, marginRight: '4%' }}><Text style={{ color: 'white', padding: '3%' }}>{exercise.reps}</Text></View>
                        </View>
                        <Text>Sets</Text>
                        <View style={{ flexDirection: 'row', marginVertical: '2%' }}>
                            <View style={{ backgroundColor: '#459CF0', borderRadius: 5, marginRight: '4%' }}><Text style={{ color: 'white', padding: '3%' }}>{exercise.sets}</Text></View>
                        </View>
                        <Text>Calories Burn</Text>
                        <View style={{ flexDirection: 'row', marginVertical: '2%' }}>
                            <View style={{ backgroundColor: '#459CF0', borderRadius: 5, marginRight: '4%' }}><Text style={{ color: 'white', padding: '3%' }}>{exercise.caloriesBurn}</Text></View>
                        </View>
                    </View>
                </View>
                <View style={styles.foot}>
                    <Footer />
                </View>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    head: {
        flex: 0.6,
        flexDirection: 'row',
        marginLeft: '4%',
        marginRight: '4%'
    },
    image: {
        flex: 3,
        width: '95%',
        height: '100%',
        alignSelf: 'center',
        borderWidth: 0.5,
        marginTop: '4%',
        marginLeft: '5%',
        marginRight: '5%'
    },
    body: {
        flex: 6,
        marginLeft: '4%',
        marginRight: '4%'
    },
    foot: {
        flex: 0.7
    },
    button: {
        backgroundColor: '#e3e6e9',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#461CF0'
    },
    titleBtn: {
        color: "#461CF0",
        fontSize: 14
    }
})
export default Exercise;