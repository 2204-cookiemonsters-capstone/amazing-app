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
  Modal
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
import FriendModal from "./FriendModal";
const image = require("../assets/favicon.png");

const FriendsList = ({ navigation }) => {
  const [allFriends, setAllFriends] = useState([]);
  const [renderedUsers, setRenderedUsers] = useState([]);
  const [searchValue, setSearchValue] = useState([""]);
  const [selectedFriend, setSelectedFriend] = useState('');
  const [showFriendModal, setShowFriendModal] = useState(false);

  const fetchAllFriends = async () => {
    const snapShot = await getDocs(
      collection(firestore, "users", auth.currentUser.uid, "friendships")
    );

    const friends = [];
    snapShot.forEach((doc) => {
      if (doc.data().status === "friends") {
        friends.push(doc.data());
      }
    });

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

  const toggleFriendModal = () => {
    setShowFriendModal(!showFriendModal);
  }

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
            backgroundColor: "white", //random vibrant color for now, style our app later
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
            backgroundColor: "white", //random vibrant color for now, style our app later
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
          marginLeft: 15,
          marginRight: 15,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          borderRadius: 50,
          backgroundColor: "white",
          height: 40,
          paddingHorizontal: 16,
          flexGrow: 1,
          marginBottom: 5,
          shadowColor: "#7F5DF0",
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.5,
          elevation: 5,
        }}
      >
        <Image
          source={require("../assets/search2.png")}
          style={{
            width: 22,
            height: 22,
            resizeMode: "contain",
          }}
        />
        <TextInput
          placeholder='Find Friends'
          onChangeText={(value) => {
            setSearchValue(value), search(value);
          }}
          style={{
            paddingHorizontal: 16,
            color: "black",
            fontWeight: "600",
            flexGrow: 1,
          }}
        />
        <TouchableOpacity
          style={{ right: 10 }}
          onPress={() => navigation.goBack()}
        ></TouchableOpacity>
      </View>

      <View style={{ marginTop: 20 }}>
        {allFriends.map((item) => (
          <TouchableOpacity
            key={item.userid}
            onPress={() => {toggleFriendModal(); setSelectedFriend(item.userid)}}
            style={{
              marginLeft: 15,
              marginRight: 15,
              paddingTop: 7,
              paddingBottom: 0,
              borderColor: "#cccccc",
              display: "flex",
              flexDirection: "row",
              paddingLeft: 10,
              paddingRight: 15,
              borderTopLeftRadius: item === allFriends[0] ? 8 : 0,
              borderTopRightRadius: item === allFriends[0] ? 8 : 0,
              backgroundColor: "white",
              marginBottom: 1,
              borderBottomRightRadius:
                item === allFriends[allFriends.length - 1] ? 8 : 0,
              borderBottomLeftRadius:
                item === allFriends[allFriends.length - 1] ? 8 : 0,
              shadowColor: "#7F5DF0",
              shadowOffset: {
                width: 0,
                height: 10,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.5,
              elevation: 5,
            }}
          >
            <TouchableOpacity>
              <Image
                source={image}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  marginTop: 10,
                  marginBottom: 10,
                  marginRight: 5,
                }}
              />
            </TouchableOpacity>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                width: "52%",
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "400" }}>
                {item.name}
              </Text>
              <Text style={{ color: "gray" }}>{item.username}</Text>
              <Text>3 Mutual Friends</Text>
            </View>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginLeft: 25,
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "red",
                  borderRadius: 25,
                  height: 30,
                  width: 60,
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    source={require("../assets/ADDFRIEND2.png")}
                    style={{ width: 15, height: 15 }}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <Modal
          animationType="slide"
          visible={showFriendModal}
          onRequestClose={() => toggleFriendModal()}
        >
          <FriendModal
            user={selectedFriend}
            closeModal={() => toggleFriendModal()}
          />
      </Modal>
    </View>
  );
};

export default FriendsList;
