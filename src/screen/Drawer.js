import React, { Component } from 'react'
import { View, TouchableOpacity, FlatList } from 'react-native'
import {
  Container,
  Header,
  Content,
  Button,
  ListItem,
  Text,
  Icon,
  Left,
  Body,
  Right,
  Switch,
  Title,
} from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class Drawer extends React.Component {
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent
                    onPress = { ()=> this.props.navigation.closeDrawer()}>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Menu</Title>
          </Body>
        </Header>
        <Content>
          <ListItem icon>
            <Left>
              <Button
                onPress = { ()=>{ this.props.navigation.closeDrawer() } }
                style={{ backgroundColor: "#007AFF" }}>
                <Icon active name="home" />
              </Button>

            </Left>
            <Body>
              <Text>Anasayfa</Text>
            </Body>
            <Right>
              <Text>On</Text>
            </Right>
          </ListItem>

          <ListItem icon>
            <Left>
              <Button
                onPress = { ()=>{ this.props.navigation.navigate('NoteAdd')}}
                style={{ backgroundColor: "#FF9501" }}>
                <Icon active name="arrow-forward" />
              </Button>
            </Left>
            <Body>
              <Text>Note Ekle</Text>
            </Body>
            <Right>
              <Text>On</Text>
            </Right>
          </ListItem>

          <ListItem icon>
            <Left>
              <Button
                onPress = { ()=>{ this.props.navigation.navigate('Detail')}}
                style={{ backgroundColor: "#FF9501" }}>
                <Icon active name="link" />
              </Button>
            </Left>
            <Body>
              <Text>Kurumsal</Text>
            </Body>
            <Right>
              <Text>On</Text>
            </Right>
          </ListItem>

          <ListItem icon>
            <Left>
              <Button
                onPress = { ()=> {
                  AsyncStorage.setItem('isLogin', 'No');
                  AsyncStorage.setItem('fullname', '');
                  AsyncStorage.setItem('userId', '');
                  this.props.navigation.navigate('Login')
                }}
                style={{ backgroundColor: "red" }}>
                <Icon active name="close" />
              </Button>
            </Left>
            <Body>
              <Text>Çıkış Yap</Text>
            </Body>
            <Right>
              <Text>Logout</Text>
            </Right>
          </ListItem>

        </Content>

      </Container>
    )
  }
}
