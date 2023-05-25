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
const Workouts = (props) => {
    var userFullName = 'Anh Khoa';
    const {navigation,route} = props
    const time = ['Morning', 'Afternoon', 'Evening'];
    const DATA = [
        {
            id: '1',
            url: require('../image/workout1.png'),
            name: 'Arm Workout',
            level: 'Beginner',
            time: 10
        },
        {
            id: '2',
            url: require('../image/workout2.png'),
            name: 'Chest Workout',
            level: 'Beginner',
            time: 12
        },
        {
            id: '3',
            url: require('../image/workout3.png'),
            name: 'Leg Workout',
            level: 'Beginner',
            time: 20
        },
        {
            id: '4',
            url: require('../image/workout4.png'),
            name: 'Push Workout',
            level: 'Beginner',
            time: 6
        },
        {
            id: '5',
            url: require('../image/workout5.png'),
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
                    <View style={{ width: '100%', height: '92%', marginTop: '2%', alignSelf: 'center', justifyContent: 'center' }}>
                        <FlatList
                            style={{ width: '100%', alignSelf: 'center' }}
                            showsVerticalScrollIndicator={false}
                            data={DATA}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => (
                                <TouchableOpacity 
                                onPress={()=> navigation.navigate('Workout Detail',[item])}
                                style={{
                                    width: '100%',
                                    height: 120,
                                    borderRadius: 20,
                                    marginTop: 10
                                }}>
                                    <Image
                                        source={item.url}
                                        key={item.id}
                                        style={{
                                            width: '95%',
                                            height: '100%',
                                            borderRadius: 30,
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