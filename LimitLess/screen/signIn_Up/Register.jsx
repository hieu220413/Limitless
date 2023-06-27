import 'react-native';
import React, { useState } from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { SignInUpLayout, SignInUpLayoutBody } from '../../component/Authen-layout';
import { useFocusEffect } from '@react-navigation/native';
import { AvoidSoftInput } from 'react-native-avoid-softinput';

const Register = ({ navigation }) => {
  // const onFocusEffect = () => {
  //   AvoidSoftInput.setAdjustPan()
  //   AvoidSoftInput.setEnabled(true)
  //   console.log('focuse')

  //   return () => {
  //     AvoidSoftInput.setEnabled(false);
  //     AvoidSoftInput.setEnabled(false)
  //     console.log('unfocuse')
  //   }
  // }
  // useFocusEffect(onFocusEffect)
  const [usernameInput, setUsernameInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [emailInput, setEmailInput] = useState('')
  const [phoneInput, setPhoneInput] = useState('')
  const [errorMessage, setErrorMessage] = useState({
    usernameError: '',
    passwordError: '',
    emailError: '',
    phoneError: '',
  })
  const signUp = async () => {

    const result = await fetch('http://limitless-api.us-east-1.elasticbeanstalk.com/api/user/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: usernameInput,
        password: passwordInput,
        email: emailInput,
        phone: phoneInput,
      }),
    }).then(response => response.json()).then(json => json)
    if (result.status == 422) {
      setErrorMessage({
        usernameError: result.errorFieldsDetail.usernameError ? result.errorFieldsDetail.usernameError : '',
        passwordError: result.errorFieldsDetail.passwordError ? result.errorFieldsDetail.passwordError : '',
        emailError: result.errorFieldsDetail.emailError ? result.errorFieldsDetail.emailError : '',
        phoneError: result.errorFieldsDetail.phoneError ? result.errorFieldsDetail.phoneError : '',
      })
      return
    }
    navigation.navigate('Login')
  }

  return (
    <SignInUpLayout>
      <SignInUpLayoutBody>
        <Text style={styles.titleStyle}>Create your account</Text>
        <View style={styles.formFieldGroupStyle}>
          <View>
            <TextInput style={styles.textInputStyle} placeholder='Username' onChangeText={setUsernameInput} value={usernameInput} />
            {errorMessage.usernameError.length != 0 && <Text style={styles.errorInputStyle}>{errorMessage.usernameError}</Text>}
          </View>
          <View>
            <TextInput style={styles.textInputStyle} placeholder='Email' onChangeText={setEmailInput} value={emailInput} />
            {errorMessage.emailError.length != 0 && <Text style={styles.errorInputStyle}>{errorMessage.emailError}</Text>}
          </View>
          <View>
            <TextInput style={styles.textInputStyle} secureTextEntry={true} placeholder='Password' onChangeText={setPasswordInput} value={passwordInput} />
            {errorMessage.passwordError.length != 0 && <Text style={styles.errorInputStyle}>{errorMessage.passwordError}</Text>}
          </View>
          <View>
            <TextInput style={styles.textInputStyle} placeholder='Phone Number' maxLength={11} keyboardType='phone-pad' onChangeText={setPhoneInput} value={phoneInput} />
            {errorMessage.phoneError.length != 0 && <Text style={styles.errorInputStyle}>{errorMessage.phoneError}</Text>}
          </View>
          <TouchableHighlight style={styles.buttonResgisterStyle} underlayColor="#461CF0" onPress={() => { signUp() }}>
            <View>
              <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: 'white' }}>Join us</Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={{ flexDirection: 'row', columnGap: 5, alignItems: 'center', marginBottom: 10 }}>
          <View style={[styles.Line, { flex: 1 }]} />
          <Text style={{ fontSize: 20, color: '#15186D' }}>Or sign up with</Text>
          <View style={[styles.Line, { flex: 1 }]} />
        </View>
        <View style={styles.buttonLoginWithGroupStyle}>
          <TouchableOpacity>
            <Icon name='google' size={45} color="#fb2d2d"></Icon>
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name='facebook' size={45} color="#1877F2"></Icon>
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name='apple' size={45} color="#050708"></Icon>
          </TouchableOpacity>
        </View>
        <View style={{ flexGrow: 1, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center' }}>
          <View style={{ flexDirection: 'row', columnGap: 5 }}>
            <Text style={{ textAlign: 'center', fontSize: 18 }}>Already have an account?</Text>
            <TouchableOpacity onPress={() => { navigation.navigate('Login') }}><Text style={{ fontWeight: 'bold', fontSize: 18 }}>Login</Text></TouchableOpacity>
          </View>
        </View>
      </SignInUpLayoutBody>
    </SignInUpLayout>
    // <View style={styles.LayoutStyle}>
    //   <TouchableOpacity>
    //     <IconAnt name='arrowleft' size={25} color="#050708"></IconAnt>
    //   </TouchableOpacity>
    // </View>
  )
};

const styles = StyleSheet.create({
  titleStyle: {
    textAlign: 'left',
    fontWeight: 'bold',
    width: '60%',
    color: 'black',
    marginHorizontal: 20,
    fontSize: 40,
  },
  // subTitleStyle: {
  //   textAlign: 'center',
  //   fontWeight: 'bold',
  //   fontSize: 30,
  // },
  buttonLoginWithGroupStyle: {
    justifyContent: 'center',
    columnGap: 60,
    flexDirection: 'row',
  },
  buttonLoginWithStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  buttonResgisterStyle: {
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 50,
    backgroundColor: '#461CF0',
    marginBottom: 40,
    marginTop: 10
  },
  textInputStyle: {
    backgroundColor: '#E6E6E6',
    borderRadius: 50,
    paddingVertical: 9,
    paddingHorizontal: 15,
    fontSize: 16,
    color: 'black'
  },
  errorInputStyle: {
    paddingHorizontal: 15,
    color: 'red',
    fontWeight: 'bold',
    fontSize: 12,
    marginTop: 2
  },
  formFieldGroupStyle: {
    flexDirection: 'column',
    height: '60%',
    rowGap: 10,
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  Line: {
    borderBottomColor: "#15186D",
    borderBottomWidth: 1
  },
})

export default Register;
