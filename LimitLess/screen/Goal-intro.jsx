import 'react-native';
import React, { useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';


const svgXml = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16"> <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/> <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/> </svg>'


const GoalIntro = ({ title, description }) => {
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
    <View style={styles.LayoutStyle}>
      <Text style={styles.titleStyle}>{title}</Text>
      <Text style={styles.desctiptionStyle}>{description}</Text>
      <FlatList
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
            <TouchableOpacity key={item.item.description} onPress={() => updateSelectionsState(item.item)} style={[{ flexDirection: 'row', justifyContent: 'space-between' }, styles.selectionStyle]}>
              <Text style={{ fontWeight: 'bold' }}>{item.item.description}</Text>
              {item.item.isSelected && <Icon name="checkcircleo" size={19} color='limegreen' />}
            </TouchableOpacity>
          )
        }}
      />
      <View style={{ flexDirection: 'row', columnGap: 5, marginTop: 30 }}>
        <TouchableOpacity style={[styles.buttonStyle, { flex: 1 }, { backgroundColor: '#D8CAFF', }]}>
          <Text style={[{ color: '#461CF0' }, styles.textButtonStyle]}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonStyle, { flex: 1 }, { backgroundColor: '#461CF0', }]}>
          <Text style={[{ color: '#FFFFFF' }, styles.textButtonStyle]}>Continues</Text>
        </TouchableOpacity>
      </View>
    </View >
  );
};

const styles = StyleSheet.create({
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
    marginBottom: 15,
    borderRadius: 20,
    backgroundColor: 'lightgray',
    padding: 12
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
  }
});
export default GoalIntro;
