import * as React from 'react';
import { SafeAreaView, Image, FlatList, StyleSheet, View, Text, TouchableOpacity, ScrollView, StatusBar, TextInput } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useState } from "react";
import { Button } from '@rneui/themed';
import Footer from '../component/Footer';
import Header from '../component/Header';


const Stack = createNativeStackNavigator();
const MainPage = (props) => {
    const { navigation, route } = props
    var userFullName = 'Anh Khoa';
    const time = ['Morning', 'Afternoon', 'Evening'];
    const DATA = [
        {
            id: '1',
            url: require('../image/workout1.jpg'),
            name: 'Arm Workout',
            level: 'Beginner',
            time: 10
        },
        {
            id: '2',
            url: require('../image/workout2.jpg'),
            name: 'Chest Workout',
            level: 'Beginner',
            time: 12
        },
        {
            id: '3',
            url: require('../image/workout3.jpg'),
            name: 'Leg Workout',
            level: 'Beginner',
            time: 20
        },
        {
            id: '4',
            url: require('../image/workout4.jpg'),
            name: 'Push Workout',
            level: 'Beginner',
            time: 6
        },
        {
            id: '5',
            url: require('../image/workout5.jpg'),
            name: 'Squat Workout',
            level: 'Beginner',
            time: 8
        },
    ];
    // 'https://drive.google.com/uc?export=view&id=1RnbR8vgeJ4KIvHdC59KjPEEsO1iKlh-A'
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
                            fontSize: 30,
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
                        <TouchableOpacity style={{ flex: 1 }}>
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
                    <View style={{ height: '15%' }}>
                        <FlatList
                            style={styles.featureWorkout}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={DATA}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('Workout Detail', [item.id])}
                                    style={{
                                        width: 120,
                                        height: 120,
                                        borderRadius: 10,
                                        borderWidth: 0.5,
                                        borderColor: 'black',
                                        margin: 5
                                    }}>
                                    <Image
                                        source={item.url}
                                        key={item.id}
                                        style={{
                                            width: 120,
                                            height: 120,
                                            borderRadius: 10,
                                            padding: 10
                                        }}

                                    />
                                    <View style={{
                                        position: 'absolute',
                                        marginLeft: '6%',
                                        marginTop: '67%'
                                    }}>
                                        <Text style={{ fontSize: 15, fontWeight: 600, color: 'white' }}>{item.name}</Text>
                                        <Text style={{ fontSize: 10, color: 'white' }}>{item.time} minutes | {item.level}</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
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
                    <SafeAreaView style={{
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
                            data={DATA}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('Workout Detail', [item.id])}
                                    style={{
                                        width: '100%',
                                        height: 120,
                                        borderRadius: 20,
                                        marginTop: '3%'
                                    }}>
                                    <Image
                                        source={item.url}
                                        key={item.id}
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
                                        marginTop: '17%'
                                    }}>
                                        <Text style={{ fontSize: 20, fontWeight: 600, color: 'white' }}>{item.name}</Text>
                                        <Text style={{ color: 'white' }}>{item.time} minutes | {item.level}</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    </SafeAreaView>
                </ScrollView>
                <View style={styles.foot}>
                    <Footer page='Home' />
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
        marginTop: "2%",
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
    }
})
export default MainPage;