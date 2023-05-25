import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  SafeAreaView,
  ScrollView,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {Button} from '@rneui/themed';
import {useTogglePasswordVisibility} from './useTogglePasswordVisibility';
import {useToggleRepasswordVisibility} from './useToggleRepasswordVisibility';

const ModalPopup = ({visible, children}) => {
  const [showModal, setShowModal] = useState(visible);
  return (
    <Modal transparent visible={true}>
      <View style={styles.modalBackground}></View>
    </Modal>
  );
};

const NewPassword = () => {
  const [visible, setVisible] = useState(false);
  const [password, onChangePassword] = useState('');
  const [repassword, onChangeRepassword] = useState('');
  const {passwordVisibility, rightIcon1, handlePasswordVisibility} =
    useTogglePasswordVisibility();

  const {repasswordVisibility, rightIcon2, handleRepasswordVisibility} =
    useToggleRepasswordVisibility();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>
        <Ionicons name="arrow-back-outline" style={styles.icon} /> Create New
        Password
      </Text>
      <Image source={require('../assets/image/npw.png')} style={styles.image} />
      <Text style={styles.regularText}>Create your new password</Text>
      <View style={styles.body}>
        <View style={styles.passwordContainer}>
          <Fontisto name="locked" color="#000" size={20} />
          <TextInput
            returnKeyType="done"
            style={styles.inputStyle}
            secureTextEntry={passwordVisibility}
            placeholder="Enter your new password"
            value={password}
            onChangeText={onChangePassword}
            id="myInput"
          />
          <Pressable onPress={handlePasswordVisibility}>
            <Ionicons name={rightIcon1} color="#000" size={20} />
          </Pressable>
        </View>
        <View style={styles.passwordContainer}>
          <Fontisto name="locked" color="#000" size={20} />
          <TextInput
            returnKeyType="done"
            style={styles.inputStyle}
            secureTextEntry={repasswordVisibility}
            placeholder="Confirm password"
            value={repassword}
            onChangeText={onChangeRepassword}
          />
          <Pressable onPress={handleRepasswordVisibility}>
            <Ionicons name={rightIcon2} color="#000" size={20} />
          </Pressable>
        </View>
      </View>
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
    </SafeAreaView>
  );
};

export default NewPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 0.41,
    // backgroundColor: 'red',
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
  passwordContainer: {
    flexDirection: 'row',
    height: 46,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontSize: 18,
    borderRadius: 20,
    borderColor: '#EDEFEE',
    backgroundColor: '#EDEFEE',
  },
  inputStyle: {
    flex: 1,
    fontSize: 18,
    paddingLeft: 10,
  },
});
