import React, { Component } from 'react'
import { Text, View, TouchableOpacity, FlatList ,StyleSheet, RefreshControl, ScrollView} from 'react-native'
import axios from "axios";
import { SafeAreaView } from "react-navigation";
import { Card, ListItem, Button, Icon } from 'react-native-elements'

//import Item from "../Notes";

export default class App extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Anasayfa',
      headerStyle: {
        backgroundColor: 'lightblue',
      },
      headerLeft: () => (
        <TouchableOpacity
          style = {{ padding:10,backgroundColor:'#ccfd7f', marginLeft:10, borderRadius:7 }}
          onPress = { ()=> navigation.openDrawer() }
        >
          <Text>Menu</Text>
        </TouchableOpacity>
      ),
    };
  };


  constructor (){
    super()
    this.state={
      notes : [],
      notes_id :null,
      isRefresh : false,
    }
  }

  componentDidMount(){
    setTimeout(()=>{
      axios.get("http://www.webyazilimyaptir.com/notesApp/home/getNotes"
      ).then( (res)=>{
        const data = res.data;
        this.setState({ notes : data })
      }).catch(e =>{
        console.log(e);
      })
    },100)
  }

  deleteItem = (itemId)=>{
    axios.post('http://www.webyazilimyaptir.com/notesApp/Home/deleteData',{
      id : itemId,
    }).then((res) =>{
      if (res.data == 'basarili'){
        alert("Başarılı")
        setTimeout(()=>{
          axios.get("http://www.webyazilimyaptir.com/notesApp/home/getNotes"
          ).then( (res)=>{
            const data = res.data;
            this.setState({ notes : data })
          }).catch(e =>{
            console.log(e);
          })
        },100)
      }else{
        alert("Başarısız")
      }
    })
  }

  onRefresh = ()=>{
    this.setState({ isRefresh :true })
    axios.get("http://www.webyazilimyaptir.com/notesApp/home/getNotes"
    ).then( (res)=>{
      const data = res.data;
      this.setState({ notes : data })
    })
    setTimeout(()=>{
      this.setState({ isRefresh :false })
    },2000)
  }

  _listEmptyComponent= ()=>{
    return (
      <View style={styles.card} >
        <View style={{justifyContent:'center' }}>
          <Text style={styles.cardTitle} > Örnek Note</Text>
          <Text style={styles.cardText} >  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Debitis dicta incidunt libero natus placeat porro sunt suscipit vel.
            Fugiat id necessitatibus nihil obcaecati rem tempore vero? Ducimus molestiae obcaecati quisquam.</Text>
        </View>
      </View>
    )
  }

  _renderItem = ({item})=>{
    return (
      <Card style={{flex:1}}>
        <Card.Title>{item.note_title}</Card.Title>
        <View>
          <Text>  {item.note_desc}</Text>
        </View>
        <TouchableOpacity onPress={()=>{this.deleteItem(item.id)}} style={{padding:10, flexDirection: 'column'}}>
          <Text style={{ textAlignVertical: "center", textAlign: "center",fontWeight:'700'}}>Sil</Text>
        </TouchableOpacity>
      </Card>
    )
  }

  render() {
    const { notes, isRefresh} = this.state;
    return (
      <SafeAreaView style={styles.container}>
          <TouchableOpacity
            onPress={()=>{ this.props.navigation.navigate('NoteAdd') }}
            style={styles.noteAdd}>
            <Text>Note Ekle</Text>
          </TouchableOpacity>
          <FlatList
            refreshControl={<RefreshControl refreshing={isRefresh} onRefresh={this.onRefresh} />}
            ListEmptyComponent={this._listEmptyComponent}
            data={notes}
            renderItem={this._renderItem}
            keyExtractor = {(item,index) => index.toString() }
          />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container : {
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  card : {
    marginLeft:2,
    marginTop:20,
    backgroundColor:'white',
    borderBottomWidth : 1,
    borderBottomColor:'#ddd',
    padding:10,
  },
  cardText : {
    marginTop: 7,
    marginLeft: 10,
    textAlign: 'center'
  },
  cardTitle:{
    textAlignVertical: "center",
    textAlign: "center",
    fontWeight: 'bold',
    fontSize:18

  },
  noteAdd:{
    padding: 10,
    backgroundColor:'lightblue',
    marginTop:10
  }
})

