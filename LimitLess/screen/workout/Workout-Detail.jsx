import * as React from 'react';
import { SafeAreaView, Image, FlatList, StyleSheet, View, Text, TouchableOpacity, ScrollView, StatusBar, TextInput } from "react-native";
import { useState } from "react";
import { Button } from '@rneui/themed';
import Header from '../../component/Header';
import { useFocusEffect } from '@react-navigation/native';

const WorkoutsDetail = (props) => {
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
    const { navigation, route } = props
    const workoutId = route.params.workoutId;
    const levelWorkout = route.params.levelPicked;
    console.log(route.params.workoutId)
    const [exercises, setExercises] = useState({});
    const [workoutImage,setWorkoutImage] = useState('');
    const [workout,setWorkout] = useState({});
    const fetchWorkoutDetail = async (workoutId) => {
        workoutDetailResponseBody = await fetch(`http://limitlessapi.us-east-1.elasticbeanstalk.com/workout/${workoutId}`)
            .then(response => response.json())
            .then(json => json)
            .catch(error => console.log(error))
        setExercises(workoutDetailResponseBody.exercises)
        console.log(JSON.stringify(workoutDetailResponseBody.exercises))  
        console.log(JSON.stringify(workoutDetailResponseBody))  
        setWorkoutImage(workoutDetailResponseBody.thumbnail)
        setWorkout(workoutDetailResponseBody)
    }
    useFocusEffect(
        React.useCallback(() => {
            fetchWorkoutDetail(workoutId);
            console.log(workout)  
        }, [])
    );
    return (
        <>
            <SafeAreaView style={styles.container}>
                <View style={styles.head}>
                    <Header></Header>
                </View>
                <Image
                    source={
                        ExerciseImages[workoutImage]
                    }
                    key={workoutId}
                    style={styles.image}
                />
                <View style={styles.body} >
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Button
                            key='Level'
                            title={levelWorkout}
                            titleStyle={styles.titleBtn}
                            buttonStyle={styles.button}
                            containerStyle={{
                                width: '32%',
                                marginRight: '15%',
                                marginTop: '3%'
                            }}
                        />
                        <Button
                            key='exercises'
                            title={workout.totalExercise+' exercises'}
                            titleStyle={styles.titleBtn}
                            buttonStyle={styles.button}
                            containerStyle={{
                                width: '32%',
                                marginRight: '1.5%',
                                marginTop: '3%'
                            }}
                        />
                    </View>
                    <View style={{ borderWidth: 0.5, borderColor: 'grey', marginTop: '5%' }}></View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{
                            fontWeight: 600,
                            fontSize: 20,
                            marginTop: '2%'
                        }}>
                            Workout Activity
                        </Text>
                    </View>
                    <View
                        style={{
                            width: '100%',
                            height: '75%',
                            marginTop: '2%',
                            marginLeft: '9%',
                            marginRight: '1%',
                            alignSelf: 'center',
                            justifyContent: 'center'
                        }}>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={exercises}
                            keyExtractor={item => item.exerciseId}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => props.navigation.navigate('Exercise',item.exerciseId)}
                                    activeOpacity={0.8}
                                    style={{
                                        width: 340,
                                        height: 120,
                                        borderRadius: 20,
                                        marginTop: 10,
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        
                                    }}>
                                    <Image
                                        source={ExerciseImages[item.thumbnail]}
                                        key={item.exerciseId}
                                        style={{
                                            width: 160,
                                            height: 100,
                                            borderRadius: 15,
                                            borderWidth: 0.5,
                                            alignSelf: 'flex-start',
                                            marginLeft:'2%'
                                        }}

                                    />
                                    <View style={{
                                        marginLeft: '5%',
                                        width: '50%',
                                        marginTop:'2%'
                                    }}>
                                        <Text style={{ fontSize: 20, fontWeight: 400 }}>{item.name}</Text>
                                        <Text style={{ fontSize: 15, fontWeight: 200 }}>{item.sets} sets of {item.reps} reps</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
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
        flex: 2,
        width: '100%',
        height: '100%',
        alignSelf: 'center',
        borderWidth: 0.5,
        marginTop: '2%'
    },
    body: {
        flex: 5,
        marginLeft: '4%',
        marginRight: '4%'
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
export default WorkoutsDetail;