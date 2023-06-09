import { StyleSheet, View, Text, TouchableOpacity, ScrollView, StatusBar, TextInput, Alert } from "react-native";
import { Button} from '@rneui/themed';
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

function Height(props) {
    const titleDict = {
        'Beginner': false,
        'Intermediate': false,
        'Advanced': false
    }
    const navigationTitleArray = ['Back', 'Continue'];
    const { route, navigation } = props;
    const [number, onChangeNumber] = useState('');
    const validateInput = (number) => {
        if(number < 130 || number > 200 ){
            Alert.alert('Invalid input', 'height is in range 130cm to 190cm', [
                {
                  text: 'Cancel',
                  onPress: () => {},
                  style: 'cancel',
                },
                {text: 'OK'},
              ]);
            return
        }
        navigation.navigate('Goals', {
            ...route.params,
            height: number,
        })
    }
    console.log(route.params)
    return (
        <>
            <SafeAreaView style={styles.container}>
                <View style={styles.head}>
                    <Text style={styles.title}>What is your height ?</Text>
                    <Text style={styles.subtitle}>Height in cm. Don’t worry, you can always change it later.</Text>
                </View>
                <View style={styles.body}>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeNumber}
                        value={number}
                        placeholder="Your height"
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
                            onPress={()=> validateInput(number)}
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
            </SafeAreaView>

        </>
    )
}
const styles = StyleSheet.create({
    container: {
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
export default Height;