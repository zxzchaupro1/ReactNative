import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TextInput, ScrollView, FlatList, TouchableOpacity, Alert } from 'react-native';
import {avatar} from '../src/asset/TechStore.png';

export default function Cart({ navigation }) {
  const [listProduct, setListProduct] = useState();
  const [quantityProduct, setQuantityProduct] = useState();
  const [tong,setTong] = useState();

  const getListProduct = async () => {
    await fetch("https://60c7a3edafc88600179f5766.mockapi.io/w")
      .then((response) => response.json())
      .then((json) => {
        setListProduct(json);
        console.log("list", listProduct);
        var total = 0 ;
        json.forEach(element => {
          // var total = element.price
          console.log(element.price);
          total = total + element.price
        })
       setTong(total);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  // const onDelete = (deleteId) => {
  //   const newList = listProduct.filter((item) => item.id !== deleteId);
  //   setListProduct(newList);
  // };
 const onDeleteAPI = async(deleteId) => {
  fetch("https://60c7a3edafc88600179f5766.mockapi.io/w/" + deleteId,{
    method: 'DELETE',
  })
  .then(res => {
    Alert.alert('xóa thành công')
    if (res.status == 200){
      getListProduct()
    }else{
      Alert.alert("Khôgn xóa đc")
    }})
 }
  const onDelete = (deleteID) => {
    const newList = new Array();
    listProduct.forEach(element => {
      if(element.id != deleteId) {
        newList.push(element)
      }
    });
    var total = 0;
      newList.forEach(element => {
        total = total + element.price
        console.log(total)
      }) 
    setListProduct(newList)
    setQuantityProduct(newList.length)
    setTong(total)
  }

  useEffect(() => {
    getListProduct();
  }, []);

const updateItem = (item) => {
  item.quantityBuy =  item.quantityBuy + 1;
  const requestOptions = {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(item)
  };
  fetch("https://60c7a3edafc88600179f5766.mockapi.io/w/" + item.id, requestOptions)
  .then(res => {
    console.log(res);
    if(res.status == 200){
      console.log("Update thành công rồi nhé ", item.id);
      getListProduct()
    }
    else{
      console.log("Thất lại");
    }
  })
  const updateItem = (item) => {
    item.quantityBuy =  item.quantityBuy - 1;
    const requestOptions = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(item)
    };
    fetch("https://60c7a3edafc88600179f5766.mockapi.io/w/" + item.id, requestOptions)
    .then(res => {
      console.log(res);
      if(res.status == 200){
        console.log("Update thành công rồi nhé ", item.id);
        getListProduct()
      }
      else{
        console.log("Thất lại");
      }
    })
  

  }
  return (
    <View style={styles.container}>
      <View style={{
        flex: 2,
        backgroundColor: "#00ABFD",
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 13,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2.78,
        elevation: 22,

      }}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 25,
            color: "#fff",
            marginLeft: 20
          }}
        >
          Giỏ hàng của tôi
        </Text>


      </View>
      <View style={{flex: 0.5, marginTop: 10, marginLeft: 10}}>
        <Text>Tổng cộng: {quantityProduct} sản phẩm</Text>
      </View>
      <View style={{ flex: 10}}>
        <ScrollView>
              <FlatList
                data={listProduct}
                renderItem={({ item }) => (
                  <View
                    style={{flexDirection: "row",
                    display: "flex",
                      width: 400,
                      height: 160,
                      backgroundColor: "#FFF",
                      margin: 5,
                      borderRadius: 10,
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,
                      elevation: 5,
                      padding: 22,
                      justifyContent: "space-between"
                    }}
                  >
                  
                    
                    <Image
                      source={{ uri: item.imagePhone }}
                      style={{ width: 100, height: 100, marginBottom: 8, marginLeft: 10}}
                    />
                    <View style={{flexDirection: "column"}}>
                      <Text style={{fontWeight: "bold"}}>{item.name}</Text>
                      <Text style={{color: "#FF5F40"}}>{item.price}</Text>
                      <Text style={{color: "#707070"}}>Chỉ còn {item.quantity} sản phẩm </Text>
                    </View>

                    <View>
                      <TouchableOpacity onPress={() => onDeleteAPI (item.id)}>
                        <Text style={{marginLeft: 80, fontSize: 30 }}>x</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => updateItem (item)}>
                      <Text style={{marginLeft: 80, fontSize: 30 }}>+</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => updateItem}>
                      <Text style={{marginLeft: 80, fontSize: 30 }}>-</Text>
                      </TouchableOpacity>
                      <Text style={{marginLeft: 80, fontSize: 30 }}>{item.quantityBuy}</Text>
                    </View>
                  </View>
                )}
                keyExtractor={(item) => item.id}
    
              />
        </ScrollView>

      </View>
      
      <View style={{flex: 0.9, marginLeft: 10, flexDirection: "row"}}>
          <Text style={{fontWeight: 'bold', marginTop: 20}}> Tổng cộng {tong} </Text>
          <TouchableOpacity
        style={{
          width: 146,
          height: 40,
          borderRadius: 15,
          marginLeft: 70,
          alignContent: "center",
          
          backgroundColor: "#00ABFD",
          marginTop: 10,
        }}
        //onPress={() => Login()}
      >
        <Text style={{ color: "#fff", alignSelf: "center", fontSize: 20 , marginTop: 6}}>
          Thanh toán
        </Text>
      </TouchableOpacity>
   </View>
      <StatusBar style="auto" />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '100%',
    flex: 1,

  },
});
}