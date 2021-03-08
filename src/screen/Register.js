
import React, { Component } from 'react'
import { Text, View,SafeAreaView,Button,StyleSheet , Image ,TextInput,ScrollView} from 'react-native'
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";

import Store from "../Store";
import {observer} from "mobx-react";

@observer
export default class Register extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerShown: false,
    }
  }
  constructor() {
    super();
    this.state={
      username : null,
      password : null,
      fullname: null
    }
  }

  getUsername = (value)=>{
    this.setState({
      username : value
    })
  }

  getPassword = (value)=>{
    this.setState({
      password : value
    })
  }
  getUFullname = (value)=>{
    this.setState({
      fullname : value
    })
  }

  register = ()=>{
    setTimeout(()=>{
      axios.post('https://www.ozgeceblog.com/Home/saveUser',{
        username : this.state.username,
        password : this.state.password,
        fullname : this.state.fullname,
      }).then((res) =>{
        if (res.data == 'basarili'){
          alert('Kullanıcı oluşturuldu. Lüften giriş yapınız.')
          this.props.navigation.navigate('Login')
        }else{
          alert('Kullanıcı oluşturulamadı')
        }
      })
    },500)
  }

  render() {
    return (
      <SafeAreaView style = {style.body} >
        <ScrollView>
          <View style = {style.header}>
            <Text style = {style.title}>Create Account</Text>
          </View>

          <View style = {style.logo_area}>
            <Image source={require('../assets/images/homelogo.png')}></Image>
          </View>

          <View style = {style.board}>

            <View style = {style.item}>
              <TextInput
                onChangeText={this.getUFullname}
                value={this.state.fullname}
                placeholder = {"Fullname"}
                style = { style.input}></TextInput>
            </View>

            <View style = {style.item}>
              <TextInput
                onChangeText={this.getUsername}
                value={this.state.username}
                placeholder = {"Username"}
                style = { style.input}></TextInput>
            </View>

            <View style = {style.item}>
              <TextInput
                onChangeText={this.getPassword}
                value={this.state.password}
                secureTextEntry={true}
                placeholder = {"Password"}
                style = { style.input}></TextInput>
            </View>

            <View style = {[style.item, {flexDirection:'row' , justifyContent: 'flex-end', fontSize: 16 , fontWeight: "bold" } ]}>
              <Text style = {{ color: '#535464' }} ></Text>
            </View>

            <View style = {style.item}>
              <TouchableOpacity onPress={ ()=>  this.register() } style = {style.button}>
                <Text style = {style.buttonText}> Create </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity  onPress={ ()=> this.props.navigation.navigate('Home') } style = {style.item}>
              <Text style={{textAlign:'center'}}> Have a account Login </Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const style = StyleSheet.create({
  body : {
    backgroundColor: 'white',
    flex : 1
  },
  header : {
    padding : 50,
    justifyContent:'center',
    alignItems:'center'
  },
  title : {
    fontWeight: '700',
    fontSize:20,
    color :'#535464'
  },
  logo_area : {
    alignItems: 'center',
    marginTop:70
  },
  board : {
    marginTop: 40,
    paddingHorizontal:30
  },
  input : {
    backgroundColor:'#F7F7F7',
    padding: 20
  },
  item : {
    marginBottom : 20
  },
  button : {
    backgroundColor : "#20C3AF",
    paddingVertical: 22,
    borderRadius:2,
    justifyContent: 'center',
    alignItems:'center'
  },
  buttonText : {
    textAlign:'center',
    color: 'white',
    fontSize: 17,
    fontWeight: '700'
  },

})
