import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity  } from 'react-native'
import { Card, ListItem, Icon } from 'react-native-elements'

export default class Detail extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title:'Kurumsal',
      headerLeft: () => (
        <TouchableOpacity
          style = {{ padding:10,backgroundColor:'lightblue', marginLeft:10, borderRadius:7 }}
          onPress = { ()=> navigation.goBack() }
        >
          <Text>Geri</Text>
        </TouchableOpacity>

      ),
    };
  }


  render() {
    return (
      <Card>
        <Card.Title>KURUMSAL VİZYON MİSYON</Card.Title>
        <Card.Divider/>
        <View>
          <Text >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus beatae debitis doloribus expedita in, minima sit! Culpa dicta, doloremque eligendi enim incidunt iure, magnam molestiae neque nisi omnis, reiciendis repellendus?</Text>
        </View>
      </Card>
    )
  }
}
