import { StyleSheet, View, Text, TouchableOpacity, ScrollView, StatusBar, TextInput } from "react-native";
import { Button, ButtonGroup } from '@rneui/themed';
import { useState } from "react";

function Weight(props) {
    const titleDict = {
        'Beginner': false,
        'Intermediate': false,
        'Advanced': false
    }
    const navigationTitleArray = ['Back', 'Continue'];
    const { route, navigation } = props;
    const [number, onChangeNumber] = useState('');
    console.log(route.params)
    return (
        <>
            <View style={styles.container}>
                <View style={styles.head}>
                    <Text style={styles.title}>What is your weight ?</Text>
                    <Text style={styles.subtitle}>Weight in kg. Don’t worry, you can    always change it later.</Text>
                </View>
                <View style={styles.body}>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeNumber}
                        value={number}
                        placeholder="Your weight"
                        keyboardType="numeric"
                    />
                </View>
                <View style={styles.foot}>
                    <View style={styles.row}>
                        <Button
                            title='Back'
                            onPress={() => (navigation.goBack())}
                            titleStyle={{
                                color: "#461CF0",
                                fontSize: 25,
                                fontWeight: 'bold'
                            }}
                            buttonStyle={{
                                backgroundColor: '#D8CAFF',
                                borderRadius: 25,
                                height: 55
                            }}
                            containerStyle={{
                                width: '40%',
                                alignSelf: 'center',
                                marginHorizontal: 10
                            }}
                        />
                        <Button
                            title='Continue'
                            onPress={() => navigation.navigate('Height')}
                            titleStyle={{
                                color: "white",
                                fontSize: 25,
                                fontWeight: 'bold'
                            }}
                            buttonStyle={{
                                backgroundColor: '#461CF0',
                                borderRadius: 25,
                                height: 55
                            }}
                            containerStyle={{
                                width: '40%',
                                alignSelf: 'center',
                                marginHorizontal: 10
                            }}
                        />
                    </View>
                </View>
            </View>

        </>
    )
}
const styles = StyleSheet.create({
    container: {
        paddingTop: StatusBar.currentHeight,
        flex: 1
    },
    head: {
        marginTop: 5,
        flex: 1
    },
    body: {
        flex: 6,
        justifyContent:'center'
    },
    foot: {
        flex: 2
    },
    title: {
        fontWeight: 'bold',
        fontSize: 35,
        alignSelf: 'center'
    },
    subtitle: {
        marginTop: 20,
        width: "70%",
        fontSize: 16,
        alignSelf: 'center',
        textAlign: 'center'
    }, 
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignSelf: 'center',
        position: 'relative',
        marginTop: 50
    }, 
    input:{
        borderBottomColor:'black',
        borderBottomWidth:4,
        width: '70%',
        height:'30%',
        fontSize:50,
        alignSelf:'center',
        textAlign:'center'
    }

})
export default Weight;