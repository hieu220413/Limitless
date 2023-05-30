import 'react-native';
import React, { useState } from 'react';
import { Button, ButtonGroup } from '@rneui/themed';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { SafeAreaView } from 'react-native-safe-area-context';


const svgXml = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16"> <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/> <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/> </svg>'


function Goals(props) {
  const { navigation, route } = props
  console.log(route.params)
  const [selections, setSelections] = useState([
    {
      description: 'Get fitter',
      isSelected: false,
    },
    {
      description: 'Gain weight',
      isSelected: false,
    },
    {
      description: 'Lose weight',
      isSelected: false,
    },
    {
      description: 'Building muscle',
      isSelected: false,
    },
    {
      description: 'Improving endurance',
      isSelected: false,
    },
    {
      description: 'Others',
      isSelected: false,
    },
  ])


  const updateSelectionsState = (selection) => {
    const newState = selections.map((element) => {
      if (selection.description === element.description) {
        element.isSelected = element.isSelected ? false : true
      }
      return element
    })
    setSelections(newState)
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.head}>
          <Text style={styles.title}>What is your goals ?</Text>
          <Text style={styles.subtitle}>You can choose more than one. Don’t worry, you can always change it later.</Text>
        </View>
        <View style={styles.body}>
          <FlatList
            contentContainerStyle={styles.goals}
            data={
              selections.map((item) => {
                return {
                  description: item.description,
                  isSelected: item.isSelected,
                }
              })
            }
            renderItem={(item) => {
              return (
                <TouchableOpacity
                  key={item.item.description}
                  activeOpacity={0.8}
                  onPress={() => (updateSelectionsState(item.item))}
                  style={
                    [{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      shadowOpacity: 0.4,
                      shadowColor: 'black',
                      shadowOffset: {
                        width: 0,
                        height: 3
                      }
                    },
                    styles.selectionStyle
                    ]}>
                  <Text style={{ fontWeight: 'bold' }}>{item.item.description}</Text>
                  {item.item.isSelected ? <Icon name="checkcircleo" size={19} color='black' /> : <Feather name="circle" size={19} color='black' />}
                </TouchableOpacity>
              )
            }}
          />
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
              onPress={() => navigation.navigate('Level', {...route.params})}
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
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  head: {
    flex: 2
  },
  goals: {
    justifyContent: 'center',
    marginHorizontal: 20,
    padding: '6%'
  },
  body: {
    flex: 6.5,
    justifyContent: 'center'
  },
  foot: {
    flex: 1.3
  },
  title: {
    fontWeight: 'bold',
    fontSize: 35,
    alignSelf: 'center'
  },
  subtitle: {
    marginTop: 20,
    width: "70%",
    fontSize: 16,
    alignSelf: 'center',
    textAlign: 'center'
  },
  LayoutStyle: {
    padding: 20,
  },
  titleStyle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 25,
  },
  desctiptionStyle: {
    marginTop: 10,
    textAlign: 'center',
    marginBottom: 30,
    fontSize: 15
  },
  selectionStyle: {
    marginBottom: '6%',
    borderRadius: 10,
    backgroundColor: '#EAEAEA',
    padding: '4%'
  },
  buttonStyle: {
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  textButtonStyle: {
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold'
  }, row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
    position: 'relative'
  }
});
export default Goals;
