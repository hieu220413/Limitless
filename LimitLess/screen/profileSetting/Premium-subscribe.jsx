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
    Image,
    ImageBackground,
    NativeEventEmitter,
    Modal,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// import VnpayMerchant, { VnpayMerchantModule } from '../../react-native-vnpay-merchant'
import Icon from 'react-native-vector-icons/AntDesign'
import { useFocusEffect } from '@react-navigation/native';

// const eventEmitter = new NativeEventEmitter(VnpayMerchantModule);
import AsyncStorage from '@react-native-async-storage/async-storage';

// const vnpayCall = async (setModalVisible, setIsPremiumUser) => {
//     // mở sdk
//     eventEmitter.addListener('PaymentBack', (e) => {
//         console.log('Sdk back!')
//         if (e) {
//             console.log("e.resultCode = " + e.resultCode);
//             switch (e.resultCode) {
//                 //resultCode == -1
//                 //vi: Người dùng nhấn back từ sdk để quay lại
//                 //en: back from sdk (user press back in button title or button back in hardware android)

//                 //resultCode == 10
//                 //vi: Người dùng nhấn chọn thanh toán qua app thanh toán (Mobile Banking, Ví...) lúc này app tích hợp sẽ cần lưu lại cái PNR, khi nào người dùng mở lại app tích hợp thì sẽ gọi kiểm tra trạng thái thanh toán của PNR Đó xem đã thanh toán hay chưa.
//                 //en: user select app to payment (Mobile banking, wallet ...) you need save your PNR code. because we don't know when app banking payment successfully. so when user re-open your app. you need call api check your PNR code (is paid or unpaid). PNR: it's vnp_TxnRef. Reference code of transaction at Merchant system

//                 //resultCode == 99
//                 //vi: Người dùng nhấn back từ trang thanh toán thành công khi thanh toán qua thẻ khi gọi đến http://sdk.merchantbackapp
//                 //en: back from button (button: done, ...) in the webview when payment success. (incase payment with card, atm card, visa ...)

//                 //resultCode == 98
//                 //vi: giao dịch thanh toán bị failed
//                 //en: payment failed

//                 //resultCode == 97
//                 //vi: thanh toán thành công trên webview
//                 //en: payment success
//                 case 97:
//                     console.log('payment successe')
//                     setIsPremiumUser(true)
//                     setModalVisible(true)
//                     break;

//             }

//             // khi tắt sdk
//             eventEmitter.removeAllListeners('PaymentBack')
//         }
//     })

//     let userId = 'null'
//     const user_info = await AsyncStorage.getItem('user_info')
//     if (user_info != null) {
//         userId = JSON.parse(user_info).userId
//     }

//     const vnp_HashSecret = 'CZQRWKJUMKNIUPGECAIOTTBLXOJAIMFM'
//     const vpn_Version = '2.1.0'
//     const vnp_Command = 'pay'
//     const vnp_TmnCode = 'MNWQOE3L'
//     const vnp_Amount = 200000
//     const vnp_CurrCode = 'VND'
//     const vnp_IpAddr = '127.0.0.1'
//     const vnp_Locale = 'vn'
//     const vnp_OrderInfo = 'Nangcappremiumfitness'
//     const vnp_ReturnUrl = `http://limitless-api.us-east-1.elasticbeanstalk.com/api/vnpay/transaction/${userId}/result` // http://success.sdk.merchantbackapp/

//     const fields = await fetch(`http://limitless-api.us-east-1.elasticbeanstalk.com/api/vnpay/transaction/getImportantFields?orderInfo=Nangcappremiumfitness&amount=${vnp_Amount}&userId=${userId}`)
//         .then(response => response.json())
//         .then(json => json)

//     console.log(JSON.stringify(fields))

//     const vnp_TxnRef = fields.vnp_TxnRef
//     const vnp_CreateDate = fields.vnp_CreateDate

//     console.log(JSON.stringify(vnp_TxnRef))
//     console.log(JSON.stringify(vnp_CreateDate))


//     // vnp_Amount=15000000&vnp_BankCode=MBAPP&vnp_Command=pay&vnp_CreateDate=20210225130220&vnp_CurrCode=VND&vnp_Locale=vn&vnp_OrderInfo=TEST%20BAEMIN%20ORDER&vnp_TmnCode=BAEMIN01&vnp_TxnRef=130220&vnp_Version=2.0.0

//     const queryParamsFirstHalf = `vnp_Amount=${vnp_Amount * 100}&vnp_Command=${vnp_Command}&vnp_CreateDate=${vnp_CreateDate}&vnp_CurrCode=${vnp_CurrCode}&vnp_IpAddr=${vnp_IpAddr}&` //vnp_IpAddr=${vnp_IpAddr}&
//     const queryParamsSecondHalf = `vnp_Locale=${vnp_Locale}&vnp_OrderInfo=${encodeURIComponent(vnp_OrderInfo)}&vnp_ReturnUrl=${encodeURIComponent(vnp_ReturnUrl)}&`// vnp_ReturnUrl=${encodeURIComponent(vnp_ReturnUrl)}&
//     const queryParamsThirdHalf = `vnp_TmnCode=${vnp_TmnCode}&vnp_TxnRef=${vnp_TxnRef}&vnp_Version=${vpn_Version}`

//     // const sign = hmacSHA512(queryParamsFirstHalf + queryParamsSecondHalf + queryParamsThirdHalf , vnp_HashSecret)
//     const vnp_SecureHash = fields.vnp_SecureHash

//     console.log(queryParamsFirstHalf + queryParamsSecondHalf + queryParamsThirdHalf)
//     console.log(vnp_SecureHash)
//     // ?${ queryParamsFirstHalf + queryParamsSecondHalf + queryParamsThirdHalf + '&vnp_SecureHashType=HMACSHA512&vnp_SecureHash=' + vnp_SecureHash }

//     VnpayMerchant.show({
//         "isSandbox": true,
//         "scheme": "limitless://",
//         "title": "Thanh toán VNPAY",
//         "iconBackName": 'ic_close',
//         "beginColor": "#ffffff",
//         "endColor": "#ffffff",
//         "tmn_code": "MNWQOE3L",
//         "paymentUrl": `https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?${queryParamsFirstHalf + queryParamsSecondHalf + queryParamsThirdHalf + '&vnp_SecureHash=' + vnp_SecureHash}`//${ queryParamsFirstHalf + queryParamsSecondHalf + queryParamsThirdHalf + '&vnp_SecureHash=' + vnp_SecureHash }
//     })

// }

const PremiumSubscribe = ({navigation}) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [isPremiumUser, setIsPremiumUser] = useState(false)
    useFocusEffect(
        React.useCallback(() => {
            // Do something when the screen is focused
            const checkPremium = async () => {
                let userId = ''
                const user_info = await AsyncStorage.getItem('user_info')
                if (user_info != null) {
                    userId = JSON.parse(user_info).userId
                    console.log(userId)
                } else {
                    //redirect to welcomepage
                }
                const checkResult = await fetch(`http://limitless-api.us-east-1.elasticbeanstalk.com/api/subscription/checkActiveSubscription?userId=${userId}`).then(response => response.json()).then(json => json)
                console.log(checkResult)
                if (checkResult.isPremium) {
                    console.log(checkResult.isPremium)
                    setIsPremiumUser(checkResult.isPremium)
                }
            }
            checkPremium()

            return () => {
                // Do something when the screen is unfocused
                // Useful for cleanup functions
            };
        }, [])
    );

    return (
        <ImageBackground style={styles.imageBackgroundStyle} imageStyle={styles.imageStyle} source={require('../../image/premium-background.jpg')}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{ alignContent: 'center', alignItems: 'center', rowGap: 25 }}>
                            <Icon name='checkcircle' size={100} color={'lightgreen'}></Icon>
                            <Text style={{ fontSize: 20 }}>Payment Successful!</Text>
                        </View>

                        <TouchableHighlight style={styles.buttonPaymentStyle} underlayColor="#461CF0" onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.buttonTextStyle}>Close</Text>
                        </TouchableHighlight>
                        {/* <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </TouchableOpacity> */}
                    </View>
                </View>
            </Modal>
            <LinearGradient
                colors={['rgba(255, 255, 255, 0.3)', 'rgba(255, 255, 255, 0.4)', 'rgba(255, 255, 255, 1)']}
                style={{ height: '100%', width: '100%' }}>

                <View style={{ flex: 1, justifyContent: 'space-between' }}>
                    <View style={styles.descriptionContentStyle}>
                        <Text style={styles.titleStyle}>Be Premium</Text>
                        <Text style={styles.subTitleSytle}>Get Unlimited Access</Text>
                        <Text style={styles.descriptionStyle}>Enjoy workout access without ads and restrictions</Text>
                    </View>
                    <TouchableHighlight style={[styles.buttonStyle, isPremiumUser && {opacity: 0.7}]} underlayColor="#461CF0" onPress={() => { navigation.navigate('MomoQR') }} disabled={isPremiumUser}>
                        <Text style={styles.buttonTextStyle}>{isPremiumUser ? 'Already subscribed' : 'Subscribe'}</Text>
                    </TouchableHighlight>
                </View>
            </LinearGradient>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    imageBackgroundStyle: {
        flexDirection: 'column',
        width: "100%",
        height: "100%",
        position: 'relative'
    },
    imageStyle: {
    },
    titleStyle: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#461CF0'
    },
    subTitleSytle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#461CF0'
    },
    descriptionStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black'
    },
    descriptionContentStyle: {
        marginHorizontal: 30,
        marginTop: "25%",
        flexDirection: 'column',
        rowGap: 15
    },
    bottomBackgroundStyle: {
        backgroundColor: 'white',
        width: "100%",
        height: "20%",
    },
    buttonStyle: {
        paddingHorizontal: 15,
        padding: 15,
        borderRadius: 50,
        marginHorizontal: 30,
        marginBottom: 60,
        backgroundColor: '#461CF0',
    },
    buttonTextStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 15
    },

    // modal
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        height: '50%',
        width: '65%',
        justifyContent: 'space-between',
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 30,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonPaymentStyle: {
        width: '100%',
        borderRadius: 20,
        padding: 15,
        elevation: 2,
        backgroundColor: '#461CF0',
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
})

export default PremiumSubscribe 