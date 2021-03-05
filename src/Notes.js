import React, { Component } from 'react'
import { Text, View  , StyleSheet } from "react-native";

const Item = ({item})=>{
  return (
    <View style={styles.card} >
      <View style={{justifyContent:'center' }}>
        <Text style={styles.cardText} > Title: {item.note_title}</Text>
        <Text style={styles.cardText} > Description: {item.note_desc}</Text>
      </View>
    </View>
  )
}

export default Item;

const styles = StyleSheet.create({
  card : {
    flex: 1,
    flexDirection:'row',
    marginLeft:2,
    marginBottom:2,
    marginTop:20,
    backgroundColor:'white',
    borderBottomWidth : 1,
    borderBottomColor:'#ddd',
    padding:10,
    paddingHorizontal:15
  },
  cardText : {
    fontWeight:'bold',
    marginTop: 7,
    marginLeft: 10
  }
})


