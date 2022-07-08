import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import {
  collection,
  getDocs,
  addDoc,
  query,
  onSnapshot,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { auth, firestore } from "../firebase";

const image = require("../assets/favicon.png");

const SearchPage = ({ navigation }) => {
  const [searchValue, setSearchValue] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [allUsers2, setAllUsers2] = useState([]);
  const [renderedUsers, setRenderedUsers] = useState([]);

  const fetchAllUsers = async () => {
    const reference = collection(firestore, "users");

    onSnapshot(reference, (snapShot) => {
      const users = [];

      snapShot.forEach((doc) => {
        users.push(doc.data());
      });

      allUsers !== users ? setAllUsers(users) : null;
    });
  };

  const search = (value) => {
    setAllUsers2(allUsers);

    const filtered = allUsers2.filter(
      (user) =>
        user.name
          .toLowerCase()
          .slice(0, value.length)
          .includes(value.toLowerCase()) ||
        user.username
          .toLowerCase()
          .slice(0, value.length)
          .includes(value.toLowerCase())
    );

    setRenderedUsers(filtered);
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <View>
      <View
        style={{
          marginTop: 40,
          marginLeft: 30,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextInput
          placeholder="Find Users"
          onChangeText={(value) => {
            setSearchValue(value), search(value);
          }}
          style={{
            height: 40,
            borderWidth: StyleSheet.hairlineWidth,
            borderRadius: 30,
            paddingHorizontal: 16,
            color: "black",
            fontWeight: "600",
            width: 270,
            backgroundColor: "ghostwhite",
            right: 28,
          }}
        />
        <TouchableOpacity
          style={{ right: 10 }}
          onPress={() => navigation.goBack()}
        >
          <Text style={{ fontWeight: "900", fontSize: 15 }}>Cancel</Text>
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          data={renderedUsers}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                marginLeft: 25,
                marginTop: 10,
                borderLeftWidth: 1,
                borderRightWidth: 1,
                borderBottomWidth: 1,
                borderTopWidth: 1,
                marginRight: 25,
                borderColor: "#cccccc",
                display: "flex",
                flexDirection: "row",
                paddingLeft: 10,
                paddingRight: 15,
              }}
            >
              <TouchableOpacity>
                <Image
                  source={image}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    margin: 10,
                  }}
                />
              </TouchableOpacity>
              <View style={{ display: "flex", flexDirection: "column" }}>
                <Text>{item.name}</Text>
                <Text>{item.username}</Text>
                <Text>3 Mutual Friends</Text>
              </View>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: 30,
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: "red",
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                    borderTopRightRadius: 10,
                    borderBottomRightRadius: 10,
                    height: 30,
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <View style={{ marginLeft: 13, marginRight: 8 }}>
                    <Image
                      source={require("../assets/ADDFRIEND2.png")}
                      style={{ width: 15, height: 15 }}
                    />
                  </View>
                  <Text style={{ marginRight: 14 }}>Remove</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default SearchPage;
