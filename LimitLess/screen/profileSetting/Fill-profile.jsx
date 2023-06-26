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
    Image,
    Alert
} from 'react-native';
import { SignInUpLayout, SignInUpLayoutBody } from '../../component/Authen-layout';
import { useFocusEffect } from '@react-navigation/native';
import { AvoidSoftInput } from 'react-native-avoid-softinput';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FillProfile = ({ navigation, route }) => {
    // const onFocusEffect = () => {
    //     AvoidSoftInput.setAdjustPan()
    //     AvoidSoftInput.setEnabled(true)
    //     return () => {
    //         AvoidSoftInput.setEnabled(false)
    //         AvoidSoftInput.setAdjustResize()
    //     }
    // }
    // useFocusEffect(onFocusEffect)
    const [nameInput, setNameInput] = useState('')
    console.log(route.params)
    const validateInput = async (name = '') => {
        if (name.length < 2 || name.length > 50) {
            Alert.alert('Invalid input', 'name length min is 2 and max is 50', [
                {
                    text: 'Cancel',
                    onPress: () => { },
                    style: 'cancel',
                },
                { text: 'OK' },
            ]);
            return
        }
        console.log(await AsyncStorage.getItem('user_info'))
        const user_info = await AsyncStorage.getItem('user_info') ? JSON.parse(await AsyncStorage.getItem('user_info')) : undefined
        const userId = user_info ? user_info.userId : ''
        console.log(JSON.stringify({
            ...route.params,
            fullName: nameInput,
        }))
        const result = await fetch(`http://limitlessapi.us-east-1.elasticbeanstalk.com/api/user/${userId}/updateAdditonalDetail`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...route.params,
                fullName: nameInput,
            }),
        }).then(response => response.json()).then(json => json)

        console.log(result)
        if (!result.error) {
            user_info.fullName = result.fullName
            user_info.gender = result.gender
            user_info.weight = result.weight
            user_info.height = result.height
            user_info.age = result.age
            user_info.level = result.level
            console.log(JSON.stringify(user_info))
            await AsyncStorage.setItem('user_info', JSON.stringify(user_info))
            navigation.reset({ index: 0, routes: [{ name: 'Main' }] })
        } else {
            Alert.alert('Update detail Error', 'Update detail failed', [
                {
                    text: 'Cancel',
                    onPress: () => { },
                    style: 'cancel',
                },
                { text: 'OK' },
            ]);
            return
        }
    }
    return (
        <SignInUpLayout title='Fill your profile'>
            <SignInUpLayoutBody>
                <Text style={styles.descriptionStyle}>
                    Don’t worry, you can always change it later, or you can skip it for now.
                </Text>
                <View style={{ flexGrow: 1 }}>
                    <Image
                        style={styles.avatarFrame}
                        source={{
                            uri: 'https://t3.ftcdn.net/jpg/03/53/11/00/360_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg',
                        }}></Image>
                    <View style={styles.formFieldGroupStyle}>
                        <View>
                            <TextInput style={styles.textInputStyle} placeholder='Name' onChangeText={setNameInput} value={nameInput} />
                        </View>
                    </View>
                </View>

                <View style={styles.buttonGroupStyle}>
                    <TouchableOpacity style={[styles.buttonStyle, { flex: 1 }, { backgroundColor: '#D8CAFF', }]} activeOpacity={0.8} onPress={() => navigation.goBack()}>
                        <Text style={[{ color: '#461CF0' }, styles.textButtonStyle]}>Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.buttonStyle, { flex: 1 }, { backgroundColor: '#461CF0', }]} activeOpacity={0.8} onPress={() => validateInput(nameInput)}>
                        <Text style={[{ color: '#FFFFFF' }, styles.textButtonStyle]}>Start</Text>
                    </TouchableOpacity>
                </View>
            </SignInUpLayoutBody>
        </SignInUpLayout>
    )
}

const styles = StyleSheet.create({
    descriptionStyle: {
        marginHorizontal: 20,
        fontSize: 20,
        textAlign: 'center',
        marginTop: 25
    },
    formFieldGroupStyle: {
        flexDirection: 'column',
        rowGap: 10,
        paddingHorizontal: 20,
        marginVertical: 20,
    },
    avatarFrame: {
        width: 200,
        height: 200,
        alignSelf: 'center',
        marginTop: 30,
        borderRadius: 100
    },
    textInputStyle: {
        backgroundColor: '#E6E6E6',
        borderRadius: 50,
        paddingVertical: 15,
        paddingHorizontal: 15,
        fontSize: 20,
        color: 'black'
    },
    errorInputStyle: {
        paddingHorizontal: 15,
        color: 'red',
        fontWeight: 'bold',
        fontSize: 13,
        marginTop: 2
    },
    buttonStyle: {
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 15,
        margin: '2%'
    },
    textButtonStyle: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold'
    },
    buttonGroupStyle: {
        flexDirection: 'row',
        columnGap: 5,
        marginTop: 30,
        alignSelf: 'baseline',
        paddingHorizontal: 20
    }
})

export default FillProfile
