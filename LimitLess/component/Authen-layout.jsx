import 'react-native';
import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import IconAnt from 'react-native-vector-icons/AntDesign';
import { AvoidSoftInputView } from 'react-native-avoid-softinput';
import { SafeAreaView } from 'react-native-safe-area-context';

export const SignInUpLayoutBody = (props) => {
    return (
        <View style={{ flex: 1 }}>
            {props.children}
        </View>
    )
}

export const SignInUpLayout = (props) => {
    return (
        <SafeAreaView style={styles.LayoutStyle}>
            <View style={{flexDirection:'row', alignItems: 'center'}}>
                {/* <TouchableOpacity>
                    <IconAnt name='arrowleft' size={25} color="#050708"></IconAnt>
                </TouchableOpacity> */}
                {/* <Text style={styles.titleStyle}>{props.title}</Text> */}
            </View>

            {props.children}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    LayoutStyle: {
        flex: 1,
        marginBottom: 20,
        paddingHorizontal: 5,
        marginTop: 20,
    },
    titleStyle: {
        textAlign: 'left',
        fontWeight: 'bold',
        color: 'black',
        fontSize: 25,
    }
})

