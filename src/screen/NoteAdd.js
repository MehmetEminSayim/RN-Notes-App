import React, { Component } from 'react'
import { Text, View, TouchableOpacity,Button, FlatList,StyleSheet,TextInput,SafeAreaView } from 'react-native'
import axios from "axios";

export default class NoteAdd extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title:'Note Ekle',
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

  constructor() {
    super();
    this.state={
      title : null,
      description : null,
    }
  }

  getTitle = (value)=>{
    this.setState({
      title : value
    })
  }

  getDesc = (value)=>{
    this.setState({
      desc : value
    })
  }

  saveNote = ()=>{
    axios.post('https://www.ozgeceblog.com/Home/saveNotes',{
      title : this.state.title,
      desc : this.state.desc
    }).then((res) =>{
      const data = res.data
      if (data == 'basarili'){
        alert('Kayıt Başarılı')
        this.setState({
          title:null,
          description : null
        })
        this.props.navigation.navigate('Home')
      }else{
        alert('Kayıt başarısız')
      }
    })
  }



  render() {
    return (
      <SafeAreaView style={{ flex: 1,  justifyContent: 'center' }}>
        <View>
          <Text style = {style.h1}>Yeni Not Ekle</Text>
        </View>

        <View>
          <View style={style.item}>
            <TextInput
              value={this.state.title}
              placeholder={'Note title'}
              onChangeText={this.getTitle}
              style={style.input}></TextInput>
          </View>

          <View style={style.item}>
            <TextInput
              value={this.state.description}
              onChangeText={this.getDesc}
              numberOfLines={4}
              underlineColorAndroid="transparent"
              placeholder="Type something"
              placeholderTextColor="grey"
              numberOfLines={10}
              multiline={true}
              style={style.textarea}></TextInput>
          </View>


          <View style={style.item}>
            <TouchableOpacity onPress={this.saveNote}  style={style.button}>
              <Text style={style.buttonText}> Kaydet </Text>
            </TouchableOpacity>
          </View>
        </View>

      </SafeAreaView>
    )
  }
}

const style = StyleSheet.create({

  h1:{
    justifyContent:'center' ,
    alignItems:'center',
    flexDirection:'column',
    textAlign:'center',
    marginBottom:50,
    fontWeight:'bold',
    fontSize:25
  },

  title : {
    fontWeight: '700',
    fontSize:20,
    color :'#535464'
  },

  input : {
    backgroundColor:'#EADDF0',
    padding: 20,
    marginLeft:20,
    marginRight:20,
  },
  item : {
    marginBottom : 20
  },
  textarea : {
    backgroundColor:'#EADDF0',
    padding: 10,
    marginLeft:20,
    marginRight:20,
    height:200
  },
  button : {
    backgroundColor : "#20C3AF",
    paddingVertical: 22,
    borderRadius:2,
    justifyContent: 'center',
    alignItems:'center',
    marginLeft:20,
    marginRight:20
  },
  buttonText : {
    textAlign:'center',
    color: 'white',
    fontSize: 17,
    fontWeight: '700'
  },
})
