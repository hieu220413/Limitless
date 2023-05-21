import { View, StyleSheet, Text } from "react-native";
import { Button, ButtonGroup } from '@rneui/themed';
import { useState } from "react";

function Levels(props) {
  const titleDict= {
    'Beginner': false,
    'Intermediate': false,
    'Advanced': false
  }
  const navigationTitleArray = ['Back', 'Continue'];
  const [levels, setLevels] = useState(titleDict);
  var levelPicked = '';
  const {route} =props;
  console.log(route.params)
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Physical activity level ?</Text>
        <Text style={styles.subtitle}>Choose your regular activity level. This will help us to personalize plan for you</Text>
        {Object.keys(levels).map((title) => (
          <Button
            key={title}
            title={title}
            onPress={() => {
              setLevels(titleDict)
              setLevels(prev => ({...prev,[title]:true}))
              levelPicked = title
              console.log(levelPicked)
            }}
            titleStyle={!levels[title] ? styles.titleBtn : styles.titleBtnPressed}
            buttonStyle={!levels[title] ? styles.button : styles.buttonPressed}
            containerStyle={{
              width: '90%',
              alignSelf: 'center',
              marginTop: 45
            }}
          />))}
        <View style={styles.row}>
          <Button
            title='Back'
            titleStyle={{
              color: "#461CF0",
              fontSize: 25,
              fontWeight: 'bold'
            }}
            buttonStyle={{
              backgroundColor: '#D8CAFF',
              borderRadius: 25,
              height: 70
            }}
            containerStyle={{
              width: '40%',
              alignSelf: 'center',
              marginTop: 200,
              marginHorizontal: 10
            }}
          />
          <Button
            title='Continue'
            titleStyle={{
              color: "white",
              fontSize: 25,
              fontWeight: 'bold'
            }}
            buttonStyle={{
              backgroundColor: '#461CF0',
              borderRadius: 25,
              height: 70
            }}
            containerStyle={{
              width: '40%',
              alignSelf: 'center',
              marginTop: 200,
              marginHorizontal: 10
            }}
          />

        </View>
      </View>

    </>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontWeight: 'bold',
    fontSize: 35,
    alignSelf: 'center'
  },
  subtitle: {
    marginTop: 30,
    width: "70%",
    fontSize: 20,
    alignSelf: 'center',
    textAlign: 'center'
  }, row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
    position:'fixed',
    bottom:-10,
  }, button: {
    backgroundColor: '#e3e6e9',
    borderRadius: 40,
    height: 70,
  }, buttonPressed: {
    backgroundColor: '#8365D6',
    borderRadius: 25,
    height: 70
  }, titleBtn: {
    color: "black",
    fontSize: 28,
    fontWeight: 'bold'
  }, titleBtnPressed: {
    color: "white",
    fontSize: 28,
    fontWeight: 'bold'
  }
})
export default Levels;