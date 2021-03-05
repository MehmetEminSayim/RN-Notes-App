import React, { Component } from 'react'
import { Text, View, TouchableOpacity,Button, FlatList } from 'react-native'

export default class Detail extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title:'Detay',
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


  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View>
          <Text style = {{marginLeft:10}}>Detail Componenti</Text>
          <Text style = {{marginLeft:10}}>
            Yinelenen bir sayfa içeriğinin okuyucunun dikkatini dağıttığı bilinen bir gerçektir. Lorem Ipsum kullanmanın amacı, sürekli 'buraya metin gelecek, buraya metin gelecek' yazmaya kıyasla daha dengeli bir harf dağılımı sağlayarak okunurluğu artırmasıdır. Şu anda birçok masaüstü yayıncılık paketi ve web sayfa düzenleyicisi, varsayılan mıgır metinler olarak Lorem Ipsum kullanmaktadır. Ayrıca arama motorlarında 'lorem ipsum' anahtar sözcükleri ile arama yapıldığında henüz tasarım aşamasında olan çok sayıda site listelenir. Yıllar içinde, bazen kazara, bazen bilinçli olarak (örneğin mizah katılarak), çeşitli sürümleri geliştirilmiştir.
          </Text>
        </View>
      </View>
    )
  }
}
