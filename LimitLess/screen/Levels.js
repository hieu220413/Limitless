import { StyleSheet, View, Text, TouchableOpacity, ScrollView, StatusBar } from "react-native";
import { Button, ButtonGroup } from '@rneui/themed';
import { useState } from "react";

function Levels(props) {
  const titleDict = {
    'Beginner': false,
    'Intermediate': false,
    'Advanced': false
  }
  const navigationTitleArray = ['Back', 'Continue'];
  const [levels, setLevels] = useState(titleDict);
  var levelPicked = '';
  const { route, navigation } = props;
  console.log(route.params)
  return (
    <>
      <View style={styles.container}>
        <View style={styles.head}> 
          <Text style={styles.title}>Physical activity level ?</Text>
          <Text style={styles.subtitle}>Choose your regular activity level. This will help us to personalize plan for you</Text>
        </View>
        <View style={styles.body}>
          {Object.keys(levels).map((title) => (
            <Button
              key={title}
              title={title}
              onPress={() => {
                setLevels(titleDict)
                setLevels(prev => ({ ...prev, [title]: true }))
                levelPicked = title
                console.log(levelPicked)
              }}
              titleStyle={!levels[title] ? styles.titleBtn : styles.titleBtnPressed}
              buttonStyle={!levels[title] ? styles.button : styles.buttonPressed}
              containerStyle={{
                width: '80%',
                alignSelf: 'center',
                marginTop: '10%'
              }}
            />))}
        </View>
        <View style={styles.foot}>
          <View style={styles.row}>
            <Button
              title='Back'
              onPress={() => (navigation.goBack())}
              titleStyle={{
                color: "#461CF0",
                fontSize: 25,
                fontWeight: 'bold'
              }}
              buttonStyle={{
                backgroundColor: '#D8CAFF',
                borderRadius: 25,
                height: 55
              }}
              containerStyle={{
                width: '40%',
                alignSelf: 'center',
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
                height: 55
              }}
              containerStyle={{
                width: '40%',
                alignSelf: 'center',
                marginHorizontal: 10
              }}
              onPress={() => { navigation.navigate('Fill Profile') }}
            />
          </View>
        </View>
      </View>

    </>
  )
}
const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    flex: 1
  }, 
  head: {
    marginTop:5,
    flex: 1
  },
  body: {
    flex: 6,
    justifyContent:'center'
  },
  foot: {
    flex: 2
  },
  title: {
    fontWeight: 'bold',
    fontSize: 33,
    alignSelf: 'center'
  },
  subtitle: {
    marginTop: 20,
    width: "70%",
    fontSize: 16,
    alignSelf: 'center',
    textAlign: 'center'
  }, row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
    position: 'relative',
    marginTop: 50
  }, button: {
    backgroundColor: '#e3e6e9',
    borderRadius: 40,
    height: 55,
  }, buttonPressed: {
    backgroundColor: 'rgba(140,14,241,1)',
    borderRadius: 25,
    height: 50
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