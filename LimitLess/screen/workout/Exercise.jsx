import * as React from 'react';
import { SafeAreaView, Image, FlatList, StyleSheet, View, Text, TouchableOpacity, ScrollView, StatusBar, TextInput } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useState,useEffect,useRef } from "react";
import { useIsFocused } from '@react-navigation/native'
import Footer from '../../component/Footer';
import Header from '../../component/Header';
import Video from 'react-native-video';
import video from '../../assets/video/exercise.mp4'

const Stack = createNativeStackNavigator();
const Exercise = (props) => {
    const [isFinish, setFinish] = useState(false);
    const [isPaused,setPause] = useState(false);
    const isFocused = useIsFocused();
    const exerciseVideo = useRef();
    const navigation = props.navigation;
    const unsubscribe = navigation.addListener('blur', () => {
        console.log('Leaving Exercise Screen');
        exerciseVideo.current?.setNativeProps({ paused: true, muted: true })
    });

    useEffect(() => {
        if(isFocused){
            setFinish(false);
            setPause(true);
            exerciseVideo.current?.seek(0);
        }else{
            setPause(true)
        }
        return unsubscribe;
    }, [isFocused])
    return (
        <>
            <SafeAreaView style={styles.container}>
                <View style={styles.head}>
                    <Header></Header>
                </View>
                <Video
                    source={video}
                       // Can be a URL or a local file.
                    style={styles.image}
                    controls={true}
                    onEnd={()=> setFinish(true)}
                    resizeMode={'stretch'}
                    ref={exerciseVideo}
                    muted={true}
                    paused={isPaused || (!isFocused)} />
                <View style={styles.body} >
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{
                            fontWeight: 600,
                            fontSize: 25,
                            marginTop: '2%'
                        }}>
                            Push exercise
                        </Text>
                        {isFinish ? <Ionicons name='checkmark-circle' size={30} style={{color:'#2EC561',marginTop:'1.5%',marginLeft:'4%'}}></Ionicons>:<View></View>}
                    </View>
                    <View
                        style={{
                            width: '100%',
                            height: '78%',
                            marginTop: '2%',
                            alignSelf: 'center'
                        }}>
                        <Text>Difficulty levels</Text>
                        <View style={{ flexDirection: 'row', marginVertical: '3%' }}>
                            <View style={{ backgroundColor: 'black', borderRadius: 5, marginRight: '4%' }}><Text style={{ color: 'white', padding: '3%' }}>Intermediate</Text></View>
                            <View style={{ backgroundColor: 'black', borderRadius: 5 }}><Text style={{ color: 'white', padding: '3%' }}>Advanced</Text></View>
                        </View>
                        <Text>Time</Text>
                        <View style={{ flexDirection: 'row', marginVertical: '3%' }}>
                            <View style={{ backgroundColor: 'black', borderRadius: 5, marginRight: '4%' }}><Text style={{ color: 'white', padding: '3%' }}>6 minutes</Text></View>
                        </View>
                        <Text>Reps</Text>
                        <View style={{ flexDirection: 'row', marginVertical: '3%' }}>
                            <View style={{ backgroundColor: 'black', borderRadius: 5, marginRight: '4%' }}><Text style={{ color: 'white', padding: '3%' }}>7</Text></View>
                        </View>
                        <Text>Sets</Text>
                        <View style={{ flexDirection: 'row', marginVertical: '3%' }}>
                            <View style={{ backgroundColor: 'black', borderRadius: 5, marginRight: '4%' }}><Text style={{ color: 'white', padding: '3%' }}>2</Text></View>
                        </View>
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
        flex: 3,
        width: '95%',
        height: '100%',
        alignSelf: 'center',
        borderWidth: 0.5,
        marginTop: '4%',
        marginLeft: '5%',
        marginRight: '5%'
    },
    body: {
        flex: 6,
        marginLeft: '4%',
        marginRight: '4%'
    },
    foot: {
        flex: 0.7
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
export default Exercise;