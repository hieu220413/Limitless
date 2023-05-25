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
    const time = ['Morning', 'Afternoon', 'Evening'];
    const DATA = [
        {
            id: '1',
            url: 'https://drive.google.com/uc?export=view&id=12flrjOCJm27ywCDk5QLaC8hnM_cWRInf',
            name: 'Bench Press',
            reps: 5,
            sets: 2
        },
        {
            id: '2',
            url: 'https://drive.google.com/uc?export=view&id=1acuudDHiSkC62sv71wjmcNnXpH-wfNkz',
            name: 'Dumbbell Press',
            reps: 3,
            sets: 3
        },
        {
            id: '3',
            url: 'https://drive.google.com/uc?export=view&id=16cJPE7RPENKN3P-dGeGGzHbltvtOSrA4',
            name: 'Cable Fly',
            reps: 5,
            sets: 4
        }
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
                </View>
                <Image
                    source={{
                        uri: DATA[0].url
                    }}
                    key={DATA[0].id}
                    style={styles.image}
                />
                <View style={styles.body} >
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Button
                            key='Level'
                            title='Beginner'
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
                            title='3 exercises'
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
                            height: '78%',
                            marginTop: '2%',
                            marginLeft: '9%',
                            marginRight: '1%',
                            alignSelf: 'center',
                            justifyContent: 'center'
                        }}>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={DATA}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => (
                                <View style={{
                                    width: 340,
                                    height: 120,
                                    borderRadius: 20,
                                    marginTop: 10,
                                    flexDirection: 'row'
                                }}>
                                    <Image
                                        source={{
                                            uri: item.url
                                        }}
                                        key={item.id}
                                        style={{
                                            width: 160,
                                            height: 100,
                                            borderRadius: 15,
                                            borderWidth: 0.5,
                                            alignSelf: 'flex-start'
                                        }}

                                    />
                                    <View style={{
                                        marginLeft: '7%',
                                        marginTop: '7%'

                                    }}>
                                        <Text style={{ fontSize: 20, fontWeight: 400 }}>{item.name}</Text>
                                        <Text style={{ fontSize: 15, fontWeight: 200 }}>{item.sets} sets of {item.reps} reps</Text>
                                    </View>
                                </View>
                            )}
                        />
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
        flex: 2,
        width: '100%',
        height: '100%',
        alignSelf: 'center',
        borderWidth: 0.5,
        marginTop: '2%'
    },
    body: {
        flex: 6,
        marginLeft: '4%',
        marginRight: '4%'
    },
    foot: {
        flex: 0.6
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
export default Workouts;