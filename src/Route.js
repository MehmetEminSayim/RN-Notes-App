import React, { Component } from 'react'
import { Text, View, TouchableOpacity,Button, FlatList } from 'react-native'

import { createAppContainer } from "react-navigation"
import { createStackNavigator } from "react-navigation-stack"
import {createDrawerNavigator } from "react-navigation-drawer"

import App from "./screen/Home"
import Detail from "./screen/Detail"
import Drawer from "./screen/Drawer"
import NoteAdd from "./screen/NoteAdd";
import Login from "./screen/Login";
import Register from "./screen/Register";




const HomeStack = createStackNavigator({
  Home:{screen:Login},
  Notes : {screen:App},
  Detail : { screen : Detail},
  NoteAdd : {screen : NoteAdd},
  Register : {screen : Register},
  Login : {screen : Login}
})


const AppNavigator = createDrawerNavigator({
  Home : HomeStack
},{
  contentComponent:Drawer
});

export default createAppContainer(AppNavigator)
