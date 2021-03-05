import React, { Component } from 'react'
import { Text, View, TouchableOpacity,Button, FlatList } from 'react-native'

import { createAppContainer } from "react-navigation"
import { createStackNavigator } from "react-navigation-stack"
import {createDrawerNavigator } from "react-navigation-drawer"

import App from "./screen/Home"
import Detail from "./screen/Detail"
import Drawer from "./screen/Drawer"
import NoteAdd from "./screen/NoteAdd";




const HomeStack = createStackNavigator({
  Home:{screen:App},
  Detail : { screen : Detail},
  NoteAdd : {screen : NoteAdd}
})


const AppNavigator = createDrawerNavigator({
  Home : HomeStack
},{
  contentComponent:Drawer
});

export default createAppContainer(AppNavigator)
