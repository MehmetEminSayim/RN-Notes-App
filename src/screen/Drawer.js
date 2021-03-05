import React, { Component } from 'react'
import { Text, View, TouchableOpacity,Button, FlatList } from 'react-native'

export default class Drawer extends React.Component {
  render() {
    return (
      <View style={{ marginTop:50, alignItems: 'center', justifyContent: 'center' }}>
        <View>
          <Text style={{fontSize:22}}>Menu</Text>
        </View>

        <TouchableOpacity
          style={{ marginTop:10, alignItems: "center", backgroundColor: "#DDDDDD", padding: 10, borderRadius:5}}
          onPress = { ()=>{ this.props.navigation.closeDrawer() } }
        >
          <Text>Anasayfa</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{alignItems: "center", backgroundColor: "#DDDDDD", padding: 10,marginTop:20,borderRadius:5}}
          onPress = { ()=>{ this.props.navigation.navigate('NoteAdd')}}
        >
          <Text>Note Ekle </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{alignItems: "center", backgroundColor: "#DDDDDD", padding: 10,marginTop:20,borderRadius:5}}
          onPress = { ()=>{ this.props.navigation.navigate('Detail',{
            id: 3 ,
            name : "e min js"
          }) } }
        >
          <Text>Detay Param </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{alignItems: "center", backgroundColor: "#DDDDDD", padding: 10 , marginTop: 20,borderRadius:5}}
          onPress = { ()=>{ this.props.navigation.closeDrawer() } }
        >
          <Text>Menu Kapat </Text>
        </TouchableOpacity>

      </View>
    )
  }
}
