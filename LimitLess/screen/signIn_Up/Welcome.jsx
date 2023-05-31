import 'react-native';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { SafeAreaView } from 'react-native-safe-area-context';



const Welcome = ({navigation}) => {
    return (
        <SafeAreaView style={styles.LayoutStyle}>
            <Text style={styles.titleStyle}>Welcome!</Text>
            <Text style={styles.subTitleStyle}>Let's go fit!</Text>
            <View style={styles.buttonLoginWithGroupStyle}>
                <TouchableHighlight underlayColor="white" onPress={() => { }}>
                    <View style={[styles.buttonLoginWithStyle, { flexDirection: 'row', backgroundColor: '#1877F2' }]}>
                        <Icon name='facebook' size={40} color="#fff"></Icon>
                        <Text style={{ fontSize: 23, color: '#fff', fontWeight: 'bold' }}>Continue with Facebook</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor="white" onPress={() => { }}>
                    <View style={[styles.buttonLoginWithStyle, { flexDirection: 'row', backgroundColor: '#fb2d2d' }]}>
                        <Icon name='google' size={40} color="#fff"></Icon>
                        <Text style={{ fontSize: 23, color: '#fff', fontWeight: 'bold' }}>Continue with Google</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor="white" onPress={() => { }}>
                    <View style={[styles.buttonLoginWithStyle, { flexDirection: 'row', backgroundColor: '#050708' }]}>
                        <Icon name='apple' size={40} color="#fff"></Icon>
                        <Text style={{ fontSize: 23, color: '#fff', fontWeight: 'bold' }}>Continue with Apple</Text>
                    </View>
                </TouchableHighlight>
            </View>
            <View style={{ flexDirection: 'row', columnGap: 5, alignItems: 'center', marginBottom: 20 }}>
                <View style={[styles.Line, { flex: 1 }]} />
                <Text style={{ color: '#15186D' , fontSize: 18}}>Or sign up with</Text>
                <View style={[styles.Line, { flex: 1 }]} />
            </View>
            <TouchableHighlight style={styles.buttonLoginPasswordStyle} underlayColor="white" onPress={() => { navigation.navigate('Login') }}>
                <View>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Sign in with password</Text>
                </View>
            </TouchableHighlight>
            <View style={{ flexGrow: 1, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center' }}>
                <View style={{flexDirection: 'row', columnGap: 5 }}>
                    <Text style={{ textAlign: 'center', fontSize: 18 }}>Don’t have an account?</Text>
                    <TouchableOpacity onPress={() => { navigation.navigate('Register') }}><Text style={{fontWeight: 'bold', fontSize: 18}}>Sign up</Text></TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    LayoutStyle: {
        flex: 1,
        marginTop: 30,
        marginBottom: 20,

    },
    titleStyle: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'black',
        fontSize: 45,
    },
    subTitleStyle: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 30,
    },
    buttonLoginWithGroupStyle: {
        marginVertical: 40,
        rowGap: 10,
        flexDirection: 'column',
    },
    buttonLoginWithStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 10,
        paddingHorizontal: 10,
        paddingVertical: 15,
    },
    buttonLoginPasswordStyle: {
        padding: 20,
        marginHorizontal: 30,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#531BF2'
    },
    Line: {
        borderBottomColor: "#15186D",
        borderBottomWidth: 1
    },
})

export default Welcome