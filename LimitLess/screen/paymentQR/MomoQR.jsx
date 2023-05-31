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
import Icon from 'react-native-vector-icons/FontAwesome5';
import { SignInUpLayout, SignInUpLayoutBody } from '../../component/Authen-layout';
import { useFocusEffect } from '@react-navigation/native';
import { AvoidSoftInput } from 'react-native-avoid-softinput';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MomoQR = ({navigation}) => {
    return (
        <View style={styles.layoutStyle}>
            <Text style={styles.titleStyle}>Momo payment QR code</Text>
            <Image
                source={require('../../assets/paymentQR/momoQR.jpg')}
                style={styles.imageStyle}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    layoutStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        rowGap: 40,
        
    },
    titleStyle: {
        fontSize: 35,
        textAlign: 'center'
    },
    // paymentAmountStyle: {
    //     fontSize: 40
    // },
    imageStyle: {
        width: "100%",
        height: "80%",
    }
})

export default MomoQR