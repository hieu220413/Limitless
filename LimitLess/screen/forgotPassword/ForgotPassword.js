import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Button} from '@rneui/themed';

const ForgotPassword = () => {
  const methodOps = {
    SMS: false,
    Email: false,
  };
  const [options, setOptions] = useState(methodOps);
  return (
    <View style={styles.container}>
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
        {Object.keys(options).map(method => (
          <Pressable
            key={method}
            title={method}
            onPress={() => {
              setOptions(methodOps);
              setOptions(prev => ({...prev, [method]: true}));
            }}
            style={[
              !options[method]
                ? [styles.button, {borderRadius: 20, height: 80}]
                : [styles.buttonPressed, {borderRadius: 20, height: 80}],
              {marginTop: '3%', width: '90%', alignSelf: 'center'},
            ]}>
            <Text style={styles.buttonText}>Log in</Text>
          </Pressable>
        ))}
      </View>
    </View>
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
    marginTop: 20,
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
    flex: 0.55,
    width: '100%',
    resizeMode: 'stretch',
  },
  body: {
    flex: 0.45,
    // backgroundColor: 'red',
  },
  button: {
    backgroundColor: '#e3e6e9',
  },
  buttonPressed: {
    backgroundColor: 'rgba(140,14,241,1)',
  },
});
