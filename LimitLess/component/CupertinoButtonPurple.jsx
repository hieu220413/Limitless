import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';

function CupertinoButtonPurple(props) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={[styles.container, props.style]} onPress={() => navigation.navigate('Old',props.param)}>
      <Text style={styles.caption}>{props.caption || "Button"}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#461CF0",
    justifyContent: "center",
    alignSelf:'center',
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 20
  },
  caption: {
    color: "white",
    fontSize: 25,
    fontWeight: 'bold'
  }
});

export default CupertinoButtonPurple;
