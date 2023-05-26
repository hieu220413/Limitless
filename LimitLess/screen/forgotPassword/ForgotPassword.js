import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Button} from '@rneui/themed';
import {color} from '@rneui/themed/dist/config';

const ForgotPassword = () => {
  const methodOps = {
    SMS: false,
    Email: false,
  };
  const [options, setOptions] = useState(methodOps);
  const [SMS, setSMS] = useState(false);
  const [Email, setEmail] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>
        <Ionicons name="arrow-back-outline" style={styles.icon} /> Forgot
        Password
      </Text>
      <Image
        source={require('../assets/image/fgpw.png')}
        style={styles.image}
      />
      <Text style={styles.regularText}>
        Select which contact details should we use to reset your password
      </Text>
      <View style={styles.body}>
        <Pressable
          onPress={() => {
            setSMS(!SMS);
            setEmail(false);
          }}
          style={
            SMS == false
              ? [styles.button, {borderRadius: 20, height: 80}]
              : [styles.buttonPressed, {borderRadius: 20, height: 80}]
          }>
          <Ionicons
            name="chatbox-ellipses"
            style={
              SMS == false ? styles.icon2 : [styles.icon2, {color: 'white'}]
            }
          />
          <Text
            style={
              SMS == false
                ? styles.buttonText
                : [styles.buttonText, {color: 'white'}]
            }>
            via SMS:
          </Text>
          <Text
            style={
              SMS == false
                ? styles.btnText2
                : [styles.btnText2, {color: 'white'}]
            }>
            +84 950****99
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setEmail(!Email);
            setSMS(false);
          }}
          style={
            Email == false
              ? [styles.button, {borderRadius: 20, height: 80}]
              : [styles.buttonPressed, {borderRadius: 20, height: 80}]
          }>
          <Ionicons
            name="mail"
            style={
              Email == false ? styles.icon2 : [styles.icon2, {color: 'white'}]
            }
          />
          <Text
            style={
              Email == false
                ? styles.buttonText
                : [styles.buttonText, {color: 'white'}]
            }>
            via Email:
          </Text>
          <Text
            style={
              Email == false
                ? styles.btnText2
                : [styles.btnText2, {color: 'white'}]
            }>
            kh*****68@gmail.com
          </Text>
        </Pressable>
        <Button
          title="Continue"
          titleStyle={{
            color: 'white',
            fontSize: 16,
            fontWeight: 'bold',
          }}
          buttonStyle={{
            backgroundColor: '#461CF0BF',
            borderRadius: 25,
            height: 38,
            borderWidth: 1,
          }}
          containerStyle={{
            top: 16,
            width: '80%',
            alignSelf: 'center',
            justifyContent: 'center',
            alignContent: 'center',
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    fontWeight: '700',
    fontSize: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  regularText: {
    padding: 10,
    marginTop: 10,
    marginLeft: 10,
    fontSize: 17,
  },
  icon: {
    fontSize: 22,
  },
  image: {
    flex: 0.52,
    width: '100%',
    resizeMode: 'stretch',
  },
  body: {
    flex: 0.45,
    // backgroundColor: 'red',
  },
  button: {
    backgroundColor: '#e3e6e9',
    marginTop: '3%',
    width: '90%',
    alignSelf: 'center',
  },
  buttonPressed: {
    backgroundColor: '#461CF0BF',
    marginTop: '3%',
    width: '90%',
    alignSelf: 'center',
  },
  icon2: {
    fontSize: 30,
    top: '30%',
    left: '10%',
  },
  buttonText: {
    color: 'grey',
    fontSize: 12,
    top: '-10%',
    left: '24%',
  },
  btnText2: {
    fontWeight: '600',
    left: '24%',
    top: '-10%',
  },
});
