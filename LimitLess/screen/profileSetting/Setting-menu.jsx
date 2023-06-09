import 'react-native';
import React, { useCallback, useState } from 'react';
import {
    Button,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    TouchableHighlight,
    Switch,
    Image
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { AvoidSoftInput } from 'react-native-avoid-softinput';
import Icon from 'react-native-vector-icons/AntDesign';
import IconOcticons from 'react-native-vector-icons/Octicons'
import IconFeather from 'react-native-vector-icons/Feather'
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Footer from '../../component/Footer';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingMenu = ({ navigation }) => {
    const [userFullName, setUserFullName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    useFocusEffect(
        React.useCallback(() => {
            // Do something when the screen is focused
            const setUpAccountDetail = async () => {
                const user_info = await AsyncStorage.getItem('user_info')
                if (user_info != null) {
                    setUserFullName(JSON.parse(user_info).fullName)
                    setUserEmail(JSON.parse(user_info).email)
                } else {
                    //redirect to welcomepage
                }
            }
            setUpAccountDetail()

            return () => {
                // Do something when the screen is unfocused
                // Useful for cleanup functions
            };
        }, [])
    )
    return (
        <SafeAreaView style={styles.layoutStyle}>
            <View style={styles.userInfoStyle}>
                <Image
                    style={styles.avatarFrame}
                    source={{
                        uri: 'https://t3.ftcdn.net/jpg/03/53/11/00/360_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg',
                    }} />
                <Text style={styles.userFullNameStyle}>{userFullName}</Text>
                <Text style={styles.userEmailStyle}>{userEmail}</Text>
            </View>
            <TouchableOpacity style={styles.ugradePremiumStyle} activeOpacity={0.8} onPress={() => { navigation.navigate('Premium') }}>
                <View style={{ flexDirection: 'row', columnGap: 15, alignItems: 'center' }}>
                    <Text style={{ paddingVertical: 3, paddingHorizontal: 15, color: 'white', backgroundColor: '#FAE20B', fontSize: 15, fontWeight: 'bold', borderRadius: 20 }}>PRO</Text>
                    <Text style={{ flexGrow: 1, color: 'white', textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>Upgrade to Premium</Text>
                    <Icon name='rightcircle' size={25} color="#fff"></Icon>
                </View>
                <Text style={{ color: 'white', fontSize: 13, fontWeight: 'bold' }}>Enjoy workout access without ads and restrictions</Text>
            </TouchableOpacity>
            <View style={styles.settingOptionsStyle}>
                <View style={styles.Line} />
                <TouchableOpacity style={styles.optionStyle} activeOpacity={0.8} onPress={() => { navigation.navigate('Edit Profile') }}>
                    <IconFontAwesome5 name='user-circle' size={30} color='black'></IconFontAwesome5>
                    <Text style={styles.optionTextLabelStyle}>Edit Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionStyle} activeOpacity={0.8}>
                    <IconFontAwesome5 name='bell' size={30} color='black'></IconFontAwesome5>
                    <Text style={styles.optionTextLabelStyle}>Notifications</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionStyle} activeOpacity={0.8}>
                    <IconOcticons name='shield-check' size={30} color='black'></IconOcticons>
                    <Text style={styles.optionTextLabelStyle}>Security</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionStyle} activeOpacity={0.8}>
                    <IconFeather name='alert-circle' size={30} color='black'></IconFeather>
                    <Text style={styles.optionTextLabelStyle}>Help</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionStyle} activeOpacity={0.5} onPress={async () => { 
                    await AsyncStorage.removeItem('user_info')
                    navigation.reset({ index: 0, routes: [{ name: 'Welcome' }] })
                    
                }}>
                    <IconFeather name='log-out' size={30} color='red'></IconFeather>
                    <Text style={[styles.optionTextLabelStyle, { color: 'red' }]}>Logout</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    layoutStyle: {
        flex: 1,
        marginHorizontal: 30,
        marginVertical: 35,
    },
    userInfoStyle: {
        paddingHorizontal: 20,
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 20,
    },
    userFullNameStyle: {
        fontWeight: 'bold',
        fontSize: 23,
        textAlign: 'center'
    },
    userEmailStyle: {
        fontWeight: 'bold',
        fontSize: 13,
        textAlign: 'center'
    },
    ugradePremiumStyle: {
        flexDirection: 'column',
        borderRadius: 20,
        backgroundColor: '#461CF0',
        paddingHorizontal: 15,
        paddingVertical: 25,
        rowGap: 15
    },
    avatarFrame: {
        width: 120,
        height: 120,
        // alignSelf: 'center',
        borderRadius: 100
    },
    Line: {
        borderBottomColor: "#15186D",
        borderBottomWidth: 1
    },
    settingOptionsStyle: {
        marginTop: 25,
        flex: 1,
        flexDirection: 'column',
        rowGap: 15,
    },
    optionStyle: {
        flexDirection: 'row',
        columnGap: 15,
        alignItems: 'center',
        marginHorizontal: 10,
    },
    optionTextLabelStyle: {
        fontSize: 16,
        fontWeight: 'bold'
    }
})
export default SettingMenu