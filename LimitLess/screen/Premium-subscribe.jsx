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
    ImageBackground
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const PremiumSubscribe = () => {
    return (
        <ImageBackground style={styles.imageBackgroundStyle} imageStyle={styles.imageStyle} source={require('../image/premium-background.jpg')}>
            <LinearGradient
                colors={['rgba(255, 255, 255, 0.3)', 'rgba(255, 255, 255, 0.4)', 'rgba(255, 255, 255, 1)']}
                style={{ height: '100%', width: '100%' }}>

                <View style={{ flex: 1, justifyContent: 'space-between' }}>
                    <View style={styles.descriptionContentStyle}>
                        <Text style={styles.titleStyle}>Be Premium</Text>
                        <Text style={styles.subTitleSytle}>Get Unlimited Access</Text>
                        <Text style={styles.descriptionStyle}>Enjoy workout access without ads and restrictions</Text>
                    </View>
                    <TouchableHighlight style={styles.buttonStyle} underlayColor="#461CF0" onPress={() => { }}>
                        <Text style={styles.buttonTextStyle}>Subscribe</Text>
                    </TouchableHighlight>
                </View>
            </LinearGradient>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    imageBackgroundStyle: {
        flexDirection: 'column',
        width: "100%",
        height: "100%",
        position: 'relative'
    },
    imageStyle: {
    },
    titleStyle: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#461CF0'
    },
    subTitleSytle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#461CF0'
    },
    descriptionStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black'
    },
    descriptionContentStyle: {
        marginHorizontal: 30,
        marginTop: "25%",
        flexDirection: 'column',
        rowGap: 15
    },
    bottomBackgroundStyle: {
        backgroundColor: 'white',
        width: "100%",
        height: "20%",
    },
    buttonStyle: {
        paddingHorizontal: 15,
        padding: 15,
        borderRadius: 50,
        marginHorizontal: 30,
        marginBottom: 60,
        backgroundColor: '#461CF0',
    },
    buttonTextStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 15
    }
})

export default PremiumSubscribe 