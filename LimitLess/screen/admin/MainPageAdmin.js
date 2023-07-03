import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, Image, FlatList, StyleSheet, View, Text, TouchableOpacity, ScrollView, StatusBar, TextInput } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/AntDesign';
import { Button } from '@rneui/themed';
import Header from '../../component/Header';
import { BlurView } from '@react-native-community/blur';
import { ReactNativeModal } from 'react-native-modal';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Pie from 'react-native-pie';
import { BarChart, LineChart, PieChart } from 'react-native-gifted-charts';

const Stack = createNativeStackNavigator();
const MainPageAdmin = (props) => {
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const handleModal = () => setIsModalVisible(() => !isModalVisible);
    const { navigation, route } = props
    const [userFullName, setUserFullName] = useState('');
    const [loaded, isLoaded] = useState(false);
    const [statistic, setStatistic] = useState(undefined)
    const pieData = [
        {
            value: 47,
            color: '#009FFF',
            gradientCenterColor: '#006DFF',
            focused: true,
        },
        { value: 40, color: '#93FCF8', gradientCenterColor: '#3BE9DE' },
        { value: 16, color: '#BDB2FA', gradientCenterColor: '#8F80F3' }
    ];
    const renderDot = color => {
        return (
            <View
                style={{
                    height: 10,
                    width: 10,
                    borderRadius: 5,
                    backgroundColor: color,
                    marginRight: 10,
                }}
            />
        );
    };
    const renderLegendComponent = () => {
        return (
            <>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginBottom: 10,
                        alignSelf: 'center'
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: '25%',
                            marginRight: '5%',
                        }}>
                        {renderDot('#006DFF')}
                        <Text style={{ color: 'black' }}>High: 47%</Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: '25%',
                            marginRight: '5%',
                        }}>
                        {renderDot('#8F80F3')}
                        <Text style={{ color: 'black' }}>Low: 16%</Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: '25%',
                            marginRight: '5%'
                        }}>
                        {renderDot('#3BE9DE')}
                        <Text style={{ color: 'black' }}>Free: 40%</Text>
                    </View>
                </View>
            </>
        );
    };

    const highBundleIncome = [
        { value: 70 },
        { value: 36 },
        { value: 50 },
        { value: 40 },
        { value: 18 },
        { value: 38 },
    ];
    const lowBundleIncome = [
        { value: 50 },
        { value: 10 },
        { value: 45 },
        { value: 30 },
        { value: 45 },
        { value: 18 },
    ];
    const barData = [
        {
            value: 40,
            label: 'Jan',
            spacing: 2,
            labelWidth: 30,
            labelTextStyle: { color: 'gray' },
            frontColor: '#177AD5',
        },
        { value: 20, frontColor: '#ED6665' },
        {
            value: 50,
            label: 'Feb',
            spacing: 2,
            labelWidth: 30,
            labelTextStyle: { color: 'gray' },
            frontColor: '#177AD5',
        },
        { value: 40, frontColor: '#ED6665' },
        {
            value: 75,
            label: 'Mar',
            spacing: 2,
            labelWidth: 30,
            labelTextStyle: { color: 'gray' },
            frontColor: '#177AD5',
        },
        { value: 25, frontColor: '#ED6665' },
        {
            value: 30,
            label: 'Apr',
            spacing: 2,
            labelWidth: 30,
            labelTextStyle: { color: 'gray' },
            frontColor: '#177AD5',
        },
        { value: 20, frontColor: '#ED6665' },
        {
            value: 60,
            label: 'May',
            spacing: 2,
            labelWidth: 30,
            labelTextStyle: { color: 'gray' },
            frontColor: '#177AD5',
        },
        { value: 40, frontColor: '#ED6665' },
        {
            value: 65,
            label: 'Jun',
            spacing: 2,
            labelWidth: 30,
            labelTextStyle: { color: 'gray' },
            frontColor: '#177AD5',
        },
        { value: 30, frontColor: '#ED6665' },
    ];
    const max = barData.reduce((acc, data) => acc = acc > data.value ? acc : data.value, 0);
    useFocusEffect(
        React.useCallback(() => {
            // Do something when the screen is focused
            const getUser_Infor = async () => {
                let userId = ''
                let user_level = ''
                const user_info = await AsyncStorage.getItem('user_info')
                if (user_info != null) {
                    userId = JSON.parse(user_info).userId
                    user_level = JSON.parse(user_info).level
                    setUserFullName(JSON.parse(user_info).fullName)
                    console.log(user_info)
                    console.log(user_level)
                } else {
                    //redirect to welcomepage
                }
            }
            getUser_Infor()
            return () => {
                // Do something when the screen is unfocused
                // Useful for cleanup functions
            };
        }, [])
    );
    const renderTitle = () => {
        return (
            <View style={{ marginVertical: 30 }}>
                <Text
                    style={{
                        color: 'black',
                        fontSize: 20,
                        fontWeight: 'bold',
                        textAlign: 'center',
                    }}>
                    Users
                </Text>
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        marginTop: 24,
                    }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View
                            style={{
                                height: 12,
                                width: 12,
                                borderRadius: 6,
                                backgroundColor: '#177AD5',
                                marginRight: 8,
                            }}
                        />
                        <Text
                            style={{
                                width: 60,
                                height: 16,
                                color: 'black',
                            }}>
                            High
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View
                            style={{
                                height: 12,
                                width: 12,
                                borderRadius: 6,
                                backgroundColor: '#ED6665',
                                marginRight: 8,
                            }}
                        />
                        <Text
                            style={{
                                width: 60,
                                height: 16,
                                color: 'black',
                            }}>
                            Low
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
    const Item = ({title,value,color,percent}) => (
        console.log(color),
        <>
            <View style={{
                backgroundColor: color,
                height: 150,
                marginHorizontal: 10,
                marginVertical: 10,
                width: 215,
                borderRadius: 20,
                shadowColor: "#000",
                shadowOffset: {
                    width: 3,
                    height: 3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,
                elevation: 6,
            }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{
                            marginLeft: 20,
                            marginTop: 25,
                            fontWeight: 700
                        }}>{title}</Text>
                    </View>
                    <View style={{
                        marginRight: 15,
                        marginTop: 22,
                        fontWeight: 700,
                        borderRadius: 7,
                        backgroundColor: 'gray',
                        padding: 6,
                    }}>
                        <Text style={{color:'white',fontWeight:600}}>+ {percent}%</Text>
                    </View>

                </View>
                <Text style={{
                    marginLeft: 20,
                    marginTop: 15,
                    fontWeight: 700,
                    fontSize: 40,
                    
                }}>{value}</Text>
            </View>

        </>
    );
    const DATA = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            title: 'Users',
            value:300,
            color : '#ffe890',
            percent: 30
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            title: 'Sales (month)',
            value:'$ 542,14',
            color : '#93d683',
            percent: 10
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            title: 'Sale (year)',
            value:'$ 1542,14',
            color : '#e2d2ff',
            percent: 5
        },
    ];
    const data = [{ value: 0 }, { value: 20 }, { value: 8 }, { value: 10 }, { value: 0 }, { value: 40 }, { value: 8 }, { value: 10 }, { value: 0 }, { value: 30 }, { value: 8 }, { value: 10 }, { value: 0 }, { value: 30 }, { value: 1 }, { value: 10 }];
    return (
        <>
            <SafeAreaView style={styles.container}>
                <View style={styles.head}>
                    <Header />
                </View>
                <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between',marginTop:20,marginBottom:10,marginEnd:20}}>
                        <Text style={{
                            fontWeight: 700,
                            fontSize: 26,
                            paddingLeft: '2%'
                        }}>
                            Hello, {userFullName}
                        </Text>
                        <MaterialCommunityIcons
                            style={{
                                marginTop: '2%',
                                marginRight: '3%',
                                color: '#C87F11'
                            }}
                            name='hand-wave-outline'
                            size={28}>
                        </MaterialCommunityIcons>
                    </View>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        data={DATA}
                        renderItem={({ item }) => <Item title={item.title} value={item.value} color={item.color} percent ={item.percent}/>}
                        keyExtractor={item => item.id}
                    />
                    <View
                        style={{
                            paddingBottom: 40,
                            borderRadius: 10,
                            backgroundColor: 'white',
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 3,
                                height: 3,
                            },
                            shadowOpacity: 0.27,
                            shadowRadius: 4.65,
                            elevation: 0,
                            paddingHorizontal: 10,
                            marginVertical: '3%',
                            marginHorizontal: 5
                        }}>
                        {renderTitle()}
                        <BarChart
                            data={barData}
                            barWidth={8}
                            spacing={22}
                            roundedTop
                            roundedBottom
                            hideRules
                            xAxisThickness={0}
                            yAxisThickness={0}
                            yAxisTextStyle={{ color: 'black' }}
                            noOfSections={3}
                            maxValue={max + 10}
                        />
                    </View>
                    <View
                        style={{
                            marginVertical: '3%',
                            paddingVertical: 20,
                            paddingLeft: 5,
                            paddingRight: 5,
                            backgroundColor: 'white',
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 3,
                                height: 3,
                            },
                            shadowOpacity: 0.27,
                            shadowRadius: 4.65,
                            elevation: 6,
                            borderRadius: 10,
                            marginHorizontal: 5

                        }}>
                        <Text
                            style={{
                                color: 'black',
                                fontSize: 20,
                                fontWeight: 'bold',
                                textAlign: 'center',
                            }}>
                            Income
                        </Text>
                        <LineChart
                            areaChart
                            curved
                            data={highBundleIncome}
                            data2={lowBundleIncome}
                            hideDataPoints
                            spacing={60}
                            color1="#8a56ce"
                            color2="#56acce"
                            startFillColor1="#8a56ce"
                            startFillColor2="#56acce"
                            endFillColor1="#8a56ce"
                            endFillColor2="#56acce"
                            startOpacity={0.9}
                            endOpacity={0.2}
                            initialSpacing={0}
                            noOfSections={4}
                            yAxisColor="white"
                            yAxisThickness={0}
                            rulesType="solid"
                            rulesLength={290}
                            rulesColor="gray"
                            yAxisTextStyle={{ color: 'black' }}
                            yAxisLabelSuffix="$"
                            xAxisColor="lightgray"
                            pointerConfig={{
                                pointerStripUptoDataPoint: true,
                                pointerStripColor: 'black',
                                pointerStripWidth: 2,
                                strokeDashArray: [2, 5],
                                pointerColor: 'black',
                                radius: 4,
                                pointerLabelWidth: 100,
                                pointerLabelHeight: 120,
                                pointerLabelComponent: items => {
                                    return (
                                        <View
                                            style={{
                                                height: 120,
                                                width: 100,
                                                backgroundColor: 'black',
                                                borderRadius: 4,
                                                justifyContent: 'center',
                                                paddingLeft: 16,
                                            }}>
                                            <Text style={{ color: 'lightgray', fontSize: 12 }}>High</Text>
                                            <Text style={{ color: 'white', fontWeight: 'bold' }}>{items[0].value + '$'}</Text>
                                            <Text style={{ color: 'lightgray', fontSize: 12, marginTop: 12 }}>Low</Text>
                                            <Text style={{ color: 'white', fontWeight: 'bold' }}>{items[1].value + '$'}</Text>
                                        </View>
                                    );
                                },
                            }}
                        />
                    </View>
                    <View
                        style={{
                            marginVertical: '3%',
                            paddingVertical: 20,
                            paddingLeft: 5,
                            paddingRight: 5,
                            backgroundColor: 'white',
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 3,
                                height: 3,
                            },
                            shadowOpacity: 0.27,
                            shadowRadius: 4.65,
                            elevation: 6,
                            borderRadius: 10,
                            marginHorizontal: 5
                        }}>
                        <View>
                            <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold', alignSelf: 'center' }}>
                                Premium vs free users
                            </Text>
                            <View style={{ padding: 40, alignItems: 'center' }}>
                                <PieChart
                                    data={pieData}
                                    donut
                                    showGradient
                                    sectionAutoFocus
                                    radius={90}
                                    innerRadius={60}
                                    innerCircleColor={'#232B5D'}
                                    centerLabelComponent={() => {
                                        return (
                                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                <Text
                                                    style={{ fontSize: 22, color: 'white', fontWeight: 'bold' }}>
                                                    47%
                                                </Text>
                                                <Text style={{ fontSize: 14, color: 'white' }}>High Premium</Text>
                                            </View>
                                        );
                                    }}
                                />
                            </View>
                            {renderLegendComponent()}
                        </View>
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
    }, statisticRow1: {
        paddingTop: 30,
        alignItems: 'center',
    },
    statisticRow2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 20
    }, icon: {
        transform: [{
            rotate: '-30deg'
        }],
        padding: 5,
        color: 'white'
    },
    backgroundIcon: {
        backgroundColor: '#461CF0',
        width: 35,
        height: 35,
        marginRight: '2%',
        marginTop: '2%',
        borderRadius: 10,
        justifyContent: 'center'
    },
})
export default MainPageAdmin;