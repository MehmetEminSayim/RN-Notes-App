
import React, { Component } from 'react'
import { Text, View,SafeAreaView,Button,StyleSheet , Image ,TextInput,ScrollView} from 'react-native'
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Store from "../Store";
import {observer} from "mobx-react";

@observer
export default class Login extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerShown: false,
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('isLogin').then( (res)=>{
      if (res  != 'ok'){
        this.props.navigation.navigate('Home')
      }else {
        this.props.navigation.navigate('Notes')
      }
    })
  }

  constructor() {
    super();
    this.state={
      username : null,
      password : null
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

  _singin = ()=>{
    setTimeout(()=>{
      axios.post('https://www.ozgeceblog.com/Home/getUsers',{
        username : this.state.username,
        password : this.state.password,
      }).then((res) =>{
        var deger = res.data;
        var id = deger.id
        var fullname = deger.fullname
        if (!deger){
          alert('Kullanıcı Bulunamadı')
        }else{
          Store.getId(id)
          Store.getFullname(fullname)
          this.setState({
            username : null,
            password : null
          })
          AsyncStorage.setItem('isLogin','ok');
          AsyncStorage.setItem('userId',id);
          AsyncStorage.setItem('fullname',fullname);
          this.props.navigation.navigate('Notes')
        }
      })
    },500)
  }

  render() {
    return (
      <SafeAreaView style = {style.body} >
        <ScrollView>
          <View style = {style.header}>
            <Text style = {style.title}>LOGIN PAGE </Text>
          </View>

          <View style = {style.logo_area}>
            <Image source={require('../assets/images/homelogo.png')}></Image>
          </View>

          <View style = {style.board}>
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
              <TouchableOpacity onPress={ ()=>  this._singin() } style = {style.button}>
                <Text style = {style.buttonText}> Sing in </Text>
              </TouchableOpacity>
            </View>

            <View style = {style.item}>
                <Text style={{textAlign:'center'}}> Or </Text>
            </View>

            <View style = {style.item}>
              <TouchableOpacity onPress={ ()=> this.props.navigation.navigate('Register') } style = {style.registerBtn}>
                <Text style = {style.buttonText}> Register </Text>
              </TouchableOpacity>
            </View>

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
  registerBtn : {
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
