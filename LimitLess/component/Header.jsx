import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const Header = (props) => {
    return (
        <>
            <View style={styles.backgroundIcon}><Ionicons name='barbell-sharp' size={25} style={styles.icon}></Ionicons></View>
            <Text style={styles.appName}>LimitLess</Text>
        </>
    )
}
const styles = StyleSheet.create({
    icon: {
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
    appName: {
        fontSize: 20,
        fontWeight: 600,
        paddingTop: '3%'

    }
})
export default Header
