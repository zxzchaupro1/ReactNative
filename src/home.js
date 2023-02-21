import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  FlatList,
} from "react-native";
import avatar from "../src/asset/TechStore.png";

export default function Home({ navigation }) {
  const [isShowImagge, setIsShowImage] = useState(true);

  const [list, setList] = useState(dataDanhMuc);

  const [listCustomer, setListCustomer] = useState();

  const getListCustomer = async () => {
    await fetch("https://60f4d20e2208920017f39df5.mockapi.io/thi")
      .then((response) => response.json())
      .then((json) => {
        setListCustomer(json);
        console.log("list", listCustomer);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getListCustomer();

    // setCustomerInfor(res)
  }, []);

  const dataDanhMuc = [
    {
      name: "Điện thoại",
      uri: require("../src/asset/ip.png"),
    },
    {
      name: "Laptop",
      uri: require("../src/asset/laptop.png"),
    },
    {
      name: "Đồng hồ",
      uri: require("../src/asset/dongho.png"),
    },
    {
      name: "Máy tính bảng",
      uri: require("../src/asset/maytinhban.png"),
    },
    {
      name: "Phụ kiện",
      uri: require("../src/asset/headphones.png"),
    },
  ];

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 2,
          backgroundColor: "#00ABFD",
          flexDirection: "row",
          alignItems: "center",
          paddingTop: 13,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 11,
          },
          shadowOpacity: 0.55,
          shadowRadius: 14.78,

          elevation: 22,
        }}
      >
        <Image
          source={require("../src/asset/AVC.png")}
          style={{ width: 96, height: 100 }}
        />
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 25,
            color: "#fff",
            marginLeft: -15,
          }}
        >
          Tech Store
        </Text>
      </View>

      <View style={{ flex: 10 }}>
        <ScrollView>
          <View style={{ flex: 10, width: "100%" }}>
            <View
              style={{
                backgroundColor: "#00ABFD",
                height: 240,
                borderBottomLeftRadius: 30,
                borderBottomRightRadius: 30,
              }}
            >
              <View
                style={{
                  backgroundColor: "#ffffff",
                  width: "90%",
                  height: 47,
                  alignSelf: "center",
                  marginTop: 11,
                  borderRadius: 10,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ width: 20, height: 20, marginLeft: 16 }}
                  source={require("../src/asset/search.png")}
                />

                <TextInput
                  style={{ width: "100%", height: "100%", marginLeft: 11 }}
                  placeholder="Tìm kiếm sản phẩm"
                  placeholderTextColor="#808080"
                  onChangeText={() => {}}
                  onFocus = {() => {navigation.navigate("Search")}}
                />
              </View>
            </View>

            <View
              style={{
                height: 300,
                backgroundColor: "white",
                width: "90%",
                justifyContent: "center",
                alignSelf: "center",
                position: "absolute",
                top: 110,
                borderRadius: 29,
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
              <FlatList
                // // nestedScrollEnabled
                // horizontal={false}
                numColumns={3}
                data={dataDanhMuc}
                renderItem={({ item }) => (
                  <View
                    style={{
                      width: 90,
                      height: 100,
                      backgroundColor: "#CDF1FF",
                      margin: 5,
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 10,
                    }}
                  >
                    <Image
                      source={item.uri}
                      style={{ width: 60, height: 60, marginBottom: 8 }}
                    />
                    <Text>{item.name}</Text>
                  </View>
                )}
                keyExtractor={(item) => item.name}
              />
            </View>
            <View
              style={{
                height: 500,
                backgroundColor: "white",
                width: "90%",
                justifyContent: "center",
                alignSelf: "center",

                borderRadius: 29,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                padding: 22,
                alignItems: "center",
                marginTop: 230,
                marginBottom: 20
              }}
            >
              <FlatList
                numColumns={2}
                data={listCustomer}
                renderItem={({ item }) => (
                  <View
                    style={{
                      width: 130,
                      height: 160,
                      backgroundColor: "#FFF",
                      margin: 5,
                      alignItems: "center",
                      justifyContent: "center",
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
                    <Image
                      source={{ uri: item.phoneImage }}
                      style={{ width: 100, height: 100, marginBottom: 8 }}
                    />
                    <Text>{item.phoneName}</Text>
                  </View>
                )}
                keyExtractor={(item) => item.name}
              />
            </View>
          </View>
        </ScrollView>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    width: "100%",
    flex: 1,
  },
});
