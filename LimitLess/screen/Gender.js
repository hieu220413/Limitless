import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Svg, { Ellipse } from "react-native-svg";
import Ionicons from 'react-native-vector-icons/Ionicons';
import CupertinoButtonPurple from "../component/CupertinoButtonPurple";
import { useState } from "react";

function Gender(props) {
    const [gender,setGender] = useState('')
    return (
        <View style={styles.container}>
            <View style={styles.aboutInfoColumn}>
                <View style={styles.aboutInfo}>
                    <Text style={styles.loremIpsum}>Tell us about yourself</Text>
                    <Text style={styles.loremIpsum2}>
                        To give you a better experience and results{"\n"}we need to know
                        your gender
                    </Text>
                </View>
                <View style={styles.gender}>
                    <TouchableOpacity style={styles.maleBtn} onPress={() => {
                        setGender('male')
                        console.log(gender)
                    }}>
                        <View >
                            <Svg viewBox="-3 -1 105 105" style={styles.ellipse}>
                                <Ellipse
                                    stroke="rgba(230, 230, 230,1)"
                                    strokeWidth={0}
                                    fill={gender == 'male' ?   "rgba(140,14,241,1)":"rgba(210,210,210,1)"}
                                    cx={51}
                                    cy={51}
                                    rx={51}
                                    ry={51}
                                ></Ellipse>
                            </Svg>
                            <Text style={styles.male}>MALE</Text>
                            <Ionicons name="male" style={styles.icon}></Ionicons>
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
                                    fill={gender == 'female' ?   "rgba(140,14,241,1)":"rgba(210,210,210,1)"}
                                    cx={51}
                                    cy={51}
                                    rx={51}
                                    ry={51}
                                ></Ellipse>
                            </Svg>
                            <Text style={styles.female2}>FEMALE</Text>
                            <Ionicons name="female" style={styles.icon}></Ionicons>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.aboutInfoColumnFiller}></View>
            <CupertinoButtonPurple
                caption="Continue"
                style={styles.cupertinoButtonPurple}
                param = {gender}
            ></CupertinoButtonPurple>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    aboutInfo: {
        width: "100%",
        height: 41
    },
    loremIpsum: {
        color: "#121212",
        fontSize: 35,
        fontWeight: "bold",
        justifyContent: "center",

    },
    loremIpsum2: {
        color: "#121212",
        textAlign: "center",
        fontSize: 16,
        marginTop: 22,
        height: 40,
        alignSelf: "center"
    },
    gender: {
        marginTop: 132
    },
    maleBtn: {
        width: 170,
        height: 180,
        alignSelf: "center"
    },
    ellipse: {
        width: 170,
        height: 166,
        position: "absolute",
    },
    male: {
        top: 100,
        position: "absolute",
        color: "rgba(247,244,244,1)",
        left: 39,
        fontSize: 33,
        textAlign: "center"
    },
    icon: {
        top: 7,
        position: "absolute",
        color: "rgba(255,255,255,1)",
        fontSize: 84,
        left: 49
    },
    femaleBtn: {
        width: 170,
        height: 166,
        marginTop: 25,
        alignSelf: "center"
    },
    ellipse1: {
        width: 170,
        height: 166,
        position: "absolute",
    },
    female2: {
        top: 102,
        position: "absolute",
        marginLeft: 10,
        color: "rgba(255,255,255,1)",
        fontSize: 30,
        left: 21
    },
    icon2: {
        top: 16,
        left: 42,
        position: "relative",
        color: "rgba(254,249,249,1)",
        fontSize: 87,
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
        height: 52,
        width: 322,
        backgroundColor: "rgba(148,24,249,1)",
        position: 'relative',
        bottom: 150
    }
});

export default Gender;
