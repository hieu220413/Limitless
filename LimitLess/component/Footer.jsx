import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import { useNavigation } from '@react-navigation/native';


const Footer = (props) => {
    const navigation = useNavigation();
    return (
        <>
            <View style = {styles.footer}>
                <TouchableOpacity onPress={()=>navigation.navigate('Main')}>
                    <Ionicons style={props.page == 'Home'? styles.active : styles.inactive} name='ios-home-outline' size={25} />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate('Workouts')}>
                    <Ionicons style={props.page == 'Workouts'? styles.active : styles.inactive} name='ios-compass-outline' size={25} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <AntDesign style={props.page == 'Statistics'? styles.active : styles.inactive} name='linechart' size={25} />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate('Setting')}>
                    <Octicons style={props.page == 'Setting'? styles.active : styles.inactive} name='note' size={25}></Octicons>
                </TouchableOpacity>
            </View>

        </>
    )
}

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: '1%',
        marginHorizontal: '4%'
    },
    active:{
        color:'#083BF2'
    },
    inactive:{
        color:'black'
    }
})
export default Footer
