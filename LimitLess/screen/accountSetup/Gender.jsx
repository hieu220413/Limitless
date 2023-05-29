import { StyleSheet, View, Text, TouchableOpacity, ScrollView, StatusBar } from "react-native";
import Svg, { Ellipse } from "react-native-svg";
import Ionicons from 'react-native-vector-icons/Ionicons';
import CupertinoButtonPurple from "../../component/CupertinoButtonPurple";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

function Gender(props) {
    const [gender, setGender] = useState('male')
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.head}>
                <View>
                    <Text style={styles.loremIpsum}>Tell us about yourself</Text>
                    <Text style={styles.loremIpsum2}>
                        To give you a better experience and results{"\n"}we need to know
                        your gender
                    </Text>
                </View>
            </View>
            <View style={styles.body}>
                <View style={styles.aboutInfoColumn}>
                    <View>
                        <TouchableOpacity style={styles.maleBtn} onPress={() => {
                            setGender('male')
                            console.log(gender)
                        }}>
                            <View >
                                <Svg viewBox="-3 -1 105 105" style={styles.ellipse}>
                                    <Ellipse
                                        stroke="rgba(230, 230, 230,1)"
                                        strokeWidth={0}
                                        fill={gender == 'male' ? "rgba(140,14,241,1)" : "rgba(210,210,210,1)"}
                                        cx={51}
                                        cy={51}
                                        rx={51}
                                        ry={51}
                                    ></Ellipse>
                                </Svg>
                                <Text style={styles.male}>MALE</Text>
                                <Ionicons name="male" style={styles.iconMale}></Ionicons>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.femaleBtn} onPress={() => {
                            setGender('female');
                            console.log(gender)
                        }}>
                            <View>
                                <Svg viewBox="-3 -1 105 105" style={styles.ellipse1}>
                                    <Ellipse
                                        stroke="rgba(230, 230, 230,1)"
                                        strokeWidth={0}
                                        fill={gender == 'female' ? "rgba(140,14,241,1)" : "rgba(210,210,210,1)"}
                                        cx={51}
                                        cy={51}
                                        rx={51}
                                        ry={51}
                                    ></Ellipse>
                                </Svg>
                                <Text style={styles.female2}>FEMALE</Text>
                                <Ionicons name="female" style={styles.iconFemale}></Ionicons>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.foot}>
                <CupertinoButtonPurple
                    caption="Continue"
                    style={styles.cupertinoButtonPurple}
                    param={{"gender": (gender == 'male' ? 0 : 1)}}
                ></CupertinoButtonPurple>
            </View>
        </SafeAreaView>
    );
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
    loremIpsum: {
        color: "#121212",
        fontSize: 35,
        fontWeight: "bold",
        justifyContent: "center",
        alignSelf:'center'
    },
    loremIpsum2: {
        color: "#121212",
        textAlign: "center",
        fontSize: 16,
        marginTop: 22,
        height: 40,
        alignSelf: "center"
    },
    maleBtn: {
        width: 130,
        height: 130,
        alignSelf: "center"
    },
    ellipse: {
        width: 150,
        height: 150,
        position: "relative",
        alignSelf: 'center'
    },
    ellipse1: {
        width: 150,
        height: 150,
        position: "relative",
        marginTop:'20%'
    },
    male: {
        top: 100,
        position: "absolute",
        color: "rgba(247,244,244,1)",
        alignSelf: 'center',
        fontSize: 25,
        textAlign: "center"
    },
    iconFemale: {
        top: 7,
        position: "absolute",
        color: "rgba(255,255,255,1)",
        fontSize: 84,
        left: 35,
        marginTop:'20%'
    },
    iconMale: {
        top: 7,
        position: "absolute",
        color: "rgba(255,255,255,1)",
        fontSize: 84,
        left: 30
    },
    femaleBtn: {
        width: 150,
        height: 130,
        marginTop: 25,
        alignSelf: "center"
    },
    female2: {
        top: 100,
        position: "absolute",
        color: "rgba(255,255,255,1)",
        fontSize: 25,
        alignSelf: 'center',
        marginTop:'20%'
    },
    icon2: {
        top: 16,
        left: 42,
        position: "relative",
        color: "rgba(254,249,249,1)",
        fontSize: 70,
    },
    ellipse1Stack: {
        width: 166,
        height: 166
    },
    aboutInfoColumn: {
        width: 339,
        alignSelf: 'center'
    },
    aboutInfoColumnFiller: {
        flex: 1
    },
    cupertinoButtonPurple: {
        height: 55,
        width: 322,
        backgroundColor: "#461CF0",
        position: 'relative',
        margin: 50
    }
});

export default Gender;
