import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  SafeAreaView,
  Keyboard,
} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Button} from '@rneui/themed';
import OtpInput from './OtpInput';

const VerifyOTP = () => {
  const [code, setCode] = useState('');
  const [pinReady, setPinReady] = useState(false);
  const MAX_CODE_LENGTH = 4;
  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={styles.container} onPress={Keyboard.dismiss}>
        <Text style={styles.headerText}>
          <Ionicons style={{fontSize: 22}} name="arrow-back-outline" /> Forgot
          Password
        </Text>
        <View style={styles.body}>
          <Text>
            Code has been send to{' '}
            <Text style={{fontWeight: 'bold'}}>+84 950****99</Text>
          </Text>
          <OtpInput
            setPinReady={setPinReady}
            code={code}
            setCode={setCode}
            maxLength={MAX_CODE_LENGTH}
          />
        </View>
        <Button
          disabled={!pinReady}
          title="Verify"
          titleStyle={{
            color: 'white',
            fontSize: 16,
            fontWeight: 'bold',
          }}
          buttonStyle={{
            backgroundColor: '#461CF0BF',
            borderRadius: 25,
            height: 38,
          }}
          containerStyle={{
            top: 16,
            width: '80%',
            alignSelf: 'center',
            justifyContent: 'center',
            alignContent: 'center',
          }}
        />
      </Pressable>
    </SafeAreaView>
  );
};

export default VerifyOTP;

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
  body: {
    // backgroundColor: 'red',
    flex: 0.92,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
