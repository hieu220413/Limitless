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
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/AntDesign';

const EditProfile = ({ navigation }) => {
    const [date, setDate] = useState(new Date(0))
    const [open, setOpen] = useState(false)

    return (
        <View style={styles.LayoutStyle}>
            <View style={styles.formFieldGroupStyle}>
                <View>
                    <TextInput style={styles.textInputStyle} placeholder='Full Name' />
                    <Text style={styles.errorInputStyle}>Invalid name</Text>
                </View>
                <View>
                    <View style={{ position: 'relative' }}>
                        <TextInput style={[styles.textInputStyle]} placeholder='Birthday' value={date ? date.toISOString().split('T')[0] : ''} editable={false} />
                        {/* <Button title="Open" onPress={() => setOpen(true)} /> */}
                        <TouchableOpacity style={styles.calendarStyle} activeOpacity={0.7} onPress={() => setOpen(true)}>
                            <Icon name='calendar' size={25}></Icon>
                        </TouchableOpacity>

                    </View>
                    <Text style={styles.errorInputStyle}>Invalid date</Text>
                    <DatePicker
                        modal
                        mode="date"
                        open={open}
                        date={date}
                        onConfirm={(date) => {
                            setOpen(false)
                            setDate(date)
                        }}
                        onCancel={() => {
                            setOpen(false)
                        }}
                    />
                    {/* <Text style={styles.errorInputStyle}>{date.toISOString().split('T')[0]}</Text> */}
                </View>
                <View>
                    <TextInput style={styles.textInputStyle} placeholder='Email' />
                    <Text style={styles.errorInputStyle}>Invalid email</Text>
                </View>
                <View>
                    <TextInput style={styles.textInputStyle} placeholder='Phone Number' />
                    <Text style={styles.errorInputStyle}>Invalid phone number</Text>
                </View>
                <View>
                    <TextInput style={styles.textInputStyle} placeholder='Gender' />
                </View>
            </View>
            <TouchableHighlight style={styles.buttonResgisterStyle} underlayColor="#461CF0" onPress={() => { navigation.reset({ index: 0, routes: [{ name: 'Setting' }] }) }}>
                <View>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', textAlign: 'center', color: 'white' }}>Update</Text>
                </View>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    LayoutStyle: {
        flex: 1,
        justifyContent: 'space-between',
        marginBottom: 20,
        marginTop: 20,
    },
    formFieldGroupStyle: {
        flexDirection: 'column',
        rowGap: 15,
        paddingHorizontal: 30,
        marginVertical: 20,
    },
    textInputStyle: {
        backgroundColor: '#E6E6E6',
        borderRadius: 50,
        paddingVertical: 8,
        paddingHorizontal: 15,
        fontSize: 13,
        color: 'black'
    },
    errorInputStyle: {
        paddingHorizontal: 15,
        color: 'red',
        fontWeight: 'bold',
        fontSize: 11,

    },
    datePickerStyle: {

    },
    calendarStyle: {
        position: 'absolute',
        right: 15,
        top: 8,
    },
    buttonResgisterStyle: {
        padding: 10,
        marginHorizontal: 30,
        borderRadius: 50,
        backgroundColor: '#461CF0',

    },

})

export default EditProfile;

