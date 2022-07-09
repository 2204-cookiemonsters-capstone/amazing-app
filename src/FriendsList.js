import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
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

const FriendsList = ({ navigation }) => {
  const [allFriends, setAllFriends] = useState([]);
  const [renderedUsers, setRenderedUsers] = useState([]);
  const [searchValue, setSearchValue] = useState([""]);

  const fetchAllFriends = async () => {
    const snapShot = await getDocs(
      collection(firestore, "users", auth.currentUser.uid, "friendships")
    );
    const friends = [];

    snapShot.forEach((doc) => {
      console.log(doc.data());
      if (doc.data().status === "friends") {
        friends.push(doc.data());
      }
    });

    // allFriends !== friends ? setAllFriends(friends) : null;

    const friendDocs = await Promise.all(
      friends.map((f) => getDoc(doc(firestore, "users", f.userid)))
    );

    const friendItems = friendDocs.map((i) => i.data());

    setAllFriends(friendItems);
    setRenderedUsers(friendItems);
  };

  const search = (value) => {
    const filtered = allFriends.filter(
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
    fetchAllFriends();
  }, []);

  return (
    <View>
      <View
        style={{
          display: "flex",
          marginTop: 40,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "aqua", //random vibrant color for now, style our app later
            borderRadius: 25,
            height: 35,
            width: 35,
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 13,
          }}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name='left' color='black' size={18} />
        </TouchableOpacity>
        <View style={{ flexGrow: 1 }} />
        <Text style={{ fontWeight: "700", fontSize: 22 }}>My Friends</Text>
        <View style={{ flexGrow: 1 }} />
        <TouchableOpacity
          style={{
            backgroundColor: "aqua", //random vibrant color for now, style our app later
            borderRadius: 25,
            height: 35,
            width: 35,
            alignItems: "center",
            justifyContent: "center",
            marginRight: 13,
          }}
          onPress={() => navigation.goBack()}
        >
          <Entypo name='dots-three-horizontal' color='black' size={18} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginTop: 40,
          marginLeft: 25,
          marginRight: 25,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextInput
          placeholder='Find Friends'
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
            width: "100%",
            backgroundColor: "ghostwhite",
          }}
        />
        <TouchableOpacity
          style={{ right: 10 }}
          onPress={() => navigation.goBack()}
        ></TouchableOpacity>
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

export default FriendsList;
