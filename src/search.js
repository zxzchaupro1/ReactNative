import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, FlatList } from 'react-native';

import { useState, useEffect } from "react";

export default function Sea({navigation}) {
    const [listCustomer, setListCustomer] = useState();
    const getListCustomer = async (key) => {
        await fetch("https://api.themoviedb.org/3/search/keyword?api_key=e9e9d8da18ae29fc430845952232787c&page=1&query="+key)
          .then((response) => response.json())
          .then((json) => {
            setListCustomer(json.results);
            console.log("list", json.results);
          })
          .catch((error) => {
            console.error(error);
          });
      };
  return (
    <View style={styles.container}>
      
      

        <View style={{flex:3, backgroundColor: '#00ABFD', alignItems: 'center',flexDirection: 'row',justifyContent: 'center' }}>
            <View style = {{backgroundColor: '#fff', width: '85%', height: 47,marginLeft:15, marginTop: 30, borderRadius: 10, flexDirection: 'row',paddingLeft: 15,justifyContent: 'center',alignItems:'center'}}>
               
                <TextInput placeholder='Tìm kiếm sản phẩm' style={{height: 20, width: '100%', marginLeft: 5}}
                onChangeText={(text) => {getListCustomer(text)}}
                />
                
            </View>
        </View>
        <View style={{flex:10, backgroundColor: '#fff'}}>
            <FlatList
                numColumns = {1}
                data ={listCustomer}   
                renderItem={({ item }) => {
                    console.log('----');
                   return(
                        <View
                        style={{
                        width: '100%',
                        height: 80,
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
                        }}
                        >
                        
                        <Text>{item.name}</Text>
                        </View>
                   )

                }
                    
                 }
                keyExtractor={(item) => item.id}           
            ></FlatList>
        </View>

      
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