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
  Animated,
} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {Button} from '@rneui/themed';
import {useTogglePasswordVisibility} from './useTogglePasswordVisibility';
import {useToggleRepasswordVisibility} from './useToggleRepasswordVisibility';

const ModalPopup = ({visible, children}) => {
  const [showModal, setShowModal] = useState(visible);
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    toggleModal();
  }, [visible]);
  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 200);
      setShowModal(false);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };
  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackground}>
        <Animated.View
          style={[styles.modalContainer, {transform: [{scale: scaleValue}]}]}>
          {children}
        </Animated.View>
      </View>
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
      <ModalPopup visible={visible}>
        {/* <View style={{alignItems: 'center'}}>
          <View style={styles.headerModal}>
            <Image
              source={require('../assets/image/X.png')}
              style={{height: 20, width: 20}}
            />
          </View>
        </View> */}
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../assets/image/success.png')}
            style={{height: 150, width: 150, marginVertical: 0}}></Image>
        </View>
        <Text
          style={{
            marginVertical: 20,
            fontSize: 26,
            textAlign: 'center',
            fontWeight: 'bold',
            color: '#461CF0BF',
          }}>
          Congratulation!
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
          }}>
          Your account is ready to use
        </Text>
        <Button
          onPress={() => setVisible(false)}
          title="Go to homepage"
          titleStyle={{
            color: 'white',
            fontSize: 16,
            fontWeight: '700',
          }}
          buttonStyle={{
            backgroundColor: '#461CF0BF',
            borderRadius: 25,
            height: 46,
            borderWidth: 1,
          }}
          containerStyle={{
            top: 16,
            width: '80%',
            alignSelf: 'center',
            justifyContent: 'center',
            alignContent: 'center',
            marginVertical: 10,
          }}
        />
      </ModalPopup>
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
        onPress={() => setVisible(true)}
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
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  headerModal: {
    width: '100%',
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});
