import React, { Component } from 'react'
import { FlatList,RefreshControl} from 'react-native'
import axios from "axios";

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text,Card, CardItem} from 'native-base';

import AsyncStorage from "@react-native-async-storage/async-storage";

import {observer} from "mobx-react";
import Store from "../Store";

@observer
export default class App extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerShown: false,
    };
  };

  constructor (){
    super()
    this.state={
      notes : [],
      notes_id :null,
      isRefresh : false,
      fullname : null,
      userId : null
    }
  }

  componentDidMount(){

    this.props.navigation.addListener('willFocus', ()=>{
      AsyncStorage.getItem('userId').then(res=>{
        axios.post("https://ozgeceblog.com/home/getNotes",{ userId : res })
          .then( (res)=>{
            const data = res.data;
            this.setState({ notes : data , userId : res })
          })
      })
    })

    AsyncStorage.getItem('isLogin').then( (res)=>{
      if (res  != 'ok'){
        this.props.navigation.navigate('Home')
      }else {
        this.props.navigation.navigate('Notes')
      }
    })

    AsyncStorage.getItem('fullname').then(res=>{
      this.setState({ fullname : res })
    })

    AsyncStorage.getItem('userId').then(res=>{
      axios.post("https://ozgeceblog.com/home/getNotes",{ userId : res })
        .then( (res)=>{
          const data = res.data;
          this.setState({ notes : data , userId : res })
        })
    })
  }

  deleteItem = (itemId)=>{
    axios.post('https://www.ozgeceblog.com/Home/deleteData',{
      id : itemId,
    }).then((res) =>{
      if (res.data == 'basarili'){
        alert("Başarılı")
        setTimeout(()=>{
          AsyncStorage.getItem('userId').then(res=>{
            axios.post("https://ozgeceblog.com/home/getNotes",{ userId : res })
              .then( (res)=>{
                const data = res.data;
                this.setState({ notes : data })
              }).catch(e =>{
              console.log(e);
            })
          })
        },100)
      }else{
        alert("Başarısız")
      }
    })
  }

  onRefresh = ()=>{
    this.setState({ isRefresh :true })
    AsyncStorage.getItem('userId').then(res=>{
      axios.post("https://ozgeceblog.com/home/getNotes",{ userId : res})
        .then( (res)=>{
          const data = res.data;
          this.setState({
            notes : data,
            isRefresh : false
          })
        })
    })
  }

  _listEmptyComponent= ()=>{
    return (
      <Card style={{flex:1}}>
        <CardItem header>
          <Text>Örnek Note</Text>
        </CardItem>
        <CardItem>
          <Body>
            <Text>
              <Text> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur aut cumque delectus enim excepturi expedita hic
                id illum iure laudantium modi non obcaecati optio porro quam, recusandae sed voluptates, voluptatibus?</Text>
            </Text>
          </Body>
        </CardItem>
      </Card>
    )
  }

  _renderItem = ({item})=>{
    return (
      <Card style={{flex:1}}>
        <CardItem header>
          <Text>  {item.note_title}</Text>
        </CardItem>
        <CardItem>
          <Body>
            <Text>
              <Text>  {item.note_desc}</Text>
            </Text>
          </Body>
        </CardItem>
        <CardItem footer>
          <Button onPress={()=>{this.deleteItem(item.id)}} style={{justifyContent:'center', flex:1}} bordered>
            <Text style={{textAlign:'center'}}><Icon name="trash" /></Text>

          </Button>
        </CardItem>
      </Card>
    )
  }

  render() {
    const { notes, isRefresh, fullname} = this.state;
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent
                    onPress = { ()=> this.props.navigation.openDrawer()}>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>{fullname }</Title>
          </Body>
          <Right>
            <Button
              onPress = { ()=>{ this.props.navigation.navigate('NoteAdd')}}
              transparent>
              <Text>Note Ekle</Text>
            </Button>
          </Right>
        </Header>
        <Content>
          <FlatList
            refreshControl={<RefreshControl refreshing={isRefresh} onRefresh={this.onRefresh} />}
            ListEmptyComponent={this._listEmptyComponent}
            data={notes}
            numColumns={2}
            renderItem={this._renderItem}
            keyExtractor = {(item,index) => index.toString() }
          />
        </Content>
        <Footer>
          <FooterTab>
            <Button full>
              <Text>Design by Metge Yazılım</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    )
  }
}


