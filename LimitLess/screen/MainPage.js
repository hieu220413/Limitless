import * as React from 'react';
import { SafeAreaView,Image, FlatList, StyleSheet, View, Text, TouchableOpacity, ScrollView, StatusBar, TextInput } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { useState } from "react";
import { Button } from '@rneui/themed';


const Stack = createNativeStackNavigator();
const MainPage = ({navigation}) => {
    var userFullName = 'Anh Khoa';
    const time = ['Morning', 'Afternoon', 'Evening'];
    const DATA = [
        {
            id: '1',
            url: 'https://drive.google.com/uc?export=view&id=12flrjOCJm27ywCDk5QLaC8hnM_cWRInf',
        },
        {
            id: '2',
            url: 'https://drive.google.com/uc?export=view&id=1acuudDHiSkC62sv71wjmcNnXpH-wfNkz',
        },
        {
            id: '3',
            url: 'https://drive.google.com/uc?export=view&id=16cJPE7RPENKN3P-dGeGGzHbltvtOSrA4',
        },
        {
            id: '4',
            url: 'https://drive.google.com/uc?export=view&id=16oYazh304-TOvtFQ8C0sCqq15r24ejuC',
        },
        {
            id: '5',
            url: 'https://drive.google.com/uc?export=view&id=1RnbR8vgeJ4KIvHdC59KjPEEsO1iKlh-A',
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
            <View style={styles.container}>
                <View style={styles.head}>
                    <View style={styles.backgroundIcon}><Ionicons name='barbell-sharp' size={25} style={styles.icon}></Ionicons></View>
                    <Text style={styles.appName}>LimitLess</Text>
                    <View style={styles.iconBar}>
                        <EvilIcons name='bell' size={40} style={styles.notificationIcon} ></EvilIcons>
                        <Ionicons name='md-bookmarks-outline' size={28} style={styles.markIcon} ></Ionicons>
                    </View>
                </View>
                <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{
                                fontWeight: 700,
                                fontSize: 30,
                                paddingLeft: '2%'
                            }}> Morning, {userFullName}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: '5%' }}>
                            <Text style={{
                                fontWeight: 600,
                                fontSize: 20
                            }}>
                                Feature Workout
                            </Text>
                            <TouchableOpacity style={{ flex: 1 }} onPress={() => { navigation.navigate('Setting') }}>
                                <Text style={{
                                    fontWeight: 600,
                                    fontSize: 20,
                                    flex: 1,
                                    textAlign: 'right',
                                    color: '#461CF0'
                                }}> See all
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <SafeAreaView style={{ height: '15%' }}>
                            <FlatList
                                style={styles.featureWorkout}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                data={DATA}
                                keyExtractor={item => item.id}
                                renderItem={({ item }) => (
                                    <View style={{
                                        width: 120,
                                        height: 120,
                                        borderRadius: 10,
                                        margin: 5
                                    }}>
                                        <Image
                                            source={{
                                                uri: item.url,
                                                width: 200,
                                                height: 100
                                            }}
                                            key={item.id}
                                            style={{
                                                width: 120,
                                                height: 120,
                                                borderRadius: 10,
                                                padding: 10
                                            }}

                                        />
                                    </View>
                                )}
                            />
                        </SafeAreaView>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{
                                fontWeight: 600,
                                fontSize: 20
                            }}>
                                Workout Level
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
                        <SafeAreaView style={{ height: '100%', marginTop: '2%' }}>
                            <FlatList
                                style={styles.exercise}
                                showsVerticalScrollIndicator={false}
                                scrollEnabled={false}
                                data={DATA}
                                keyExtractor={item => item.id}
                                renderItem={({ item }) => (
                                    <View style={{
                                        width: 340,
                                        height: 120,
                                        borderRadius: 20,
                                        margin: 5
                                    }}>
                                        <Image
                                            source={{
                                                uri: item.url
                                            }}
                                            key={item.id}
                                            style={{
                                                width: 325,
                                                height: 120,
                                                borderRadius: 30,
                                                padding: 10,
                                                alignSelf: 'center',
                                                borderWidth: 1
                                            }}

                                        />
                                    </View>
                                )}
                            />
                        </SafeAreaView>
                </ScrollView>
                <View style={styles.foot}>

                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        marginLeft: '4%',
        marginRight: '4%',
        marginTop: '10%',
        flex: 1
    },
    head: {
        flex: 0.1,
        flexDirection: 'row'
    },
    body: {
        flex: 10
    },
    foot: {
        flex: 0.1
    },
    icon: {
        transform: [{
            rotate: '-30deg'
        }],
        padding: '10%',
        color: 'white'
    },
    backgroundIcon: {
        backgroundColor: '#461CF0',
        width: '8%',
        height: '55%',
        marginRight: '2%',
        marginTop: '2%',
        borderRadius: 10,
        justifyContent: 'center'
    },
    appName: {
        fontSize: 20,
        fontWeight: 600,
        paddingTop: '3%'

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