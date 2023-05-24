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
import { SignInUpLayout, SignInUpLayoutBody } from '../component/Authen-layout';
import { useFocusEffect } from '@react-navigation/native';
import { AvoidSoftInput } from 'react-native-avoid-softinput';

const FillProfile = () => {
    const onFocusEffect = () => {
        AvoidSoftInput.setAdjustPan()
        AvoidSoftInput.setEnabled(true)
        return () => {
            AvoidSoftInput.setEnabled(false)
            AvoidSoftInput.setAdjustResize()
        }
    }
    useFocusEffect(onFocusEffect)
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
                            <TextInput style={styles.textInputStyle} placeholder='Name' />
                            <Text style={styles.errorInputStyle}>Invaid Name</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.buttonGroupStyle}>
                    <TouchableOpacity style={[styles.buttonStyle, { flex: 1 }, { backgroundColor: '#D8CAFF', }]} activeOpacity={0.8}>
                        <Text style={[{ color: '#461CF0' }, styles.textButtonStyle]}>Skip</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.buttonStyle, { flex: 1 }, { backgroundColor: '#461CF0', }]} activeOpacity={0.8}>
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
        paddingVertical: 5,
        paddingHorizontal: 15,
        color: 'black'
    },

    errorInputStyle: {
        paddingHorizontal: 15,
        color: 'red',
        fontWeight: 'bold',
        fontSize: 10,
        marginTop: 2
    },
    buttonStyle: {
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    textButtonStyle: {
        textAlign: 'center',
        fontSize: 17,
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
