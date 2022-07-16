import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  SafeAreaView,
  FlatList,
  Keyboard,
  ScrollView,
  Image,
  Modal,
} from "react-native";
import { ActivityIndicator, Avatar } from "react-native-paper";
import { firestore } from "../firebase";
import { doc, setDoc, getDocs, collection } from "firebase/firestore";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import FriendToDoList from "./FriendToDoList";
import { todoListStyle, color, friendModal } from "../styles";

const FriendModal = ({ user, closeModal }) => {
  const userid = user.userid;
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLists();
  }, [loading]);

  let getLists = async () => {
    const snapShot = await getDocs(
      collection(firestore, "users", userid, "Todo Lists")
    );
    console.log("FETCHED FRIEND'S TODO LISTS FROM FIRESTORE");
    let todos = [];
    snapShot.forEach((doc) => {
      let todo = doc.data();
      todo.id = doc.id;
      todos.push(todo);
    });
    setLists(todos);
    setLoading(false);
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size='large' color={color.list.blue} />
      </View>
    );
  }

  const renderSingleList = (list) => {
    return <FriendToDoList list={list} user={user} updateList={updateList} />;
  };

  const updateList = (list) => {
    const todoRef = doc(firestore, "users", userid, "Todo Lists", list.id);
    setDoc(todoRef, list, { merge: true });
    //Update state here
    setLists(lists.map((item) => (item.id === list.id ? list : item)));
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding'>
      <SafeAreaView
        style={{
          width: "100%",

          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          style={{ position: "absolute", top: 64, right: 32, zIndex: 10 }}
          onPress={closeModal}
        >
          <AntDesign name='close' size={24} color='black' />
        </TouchableOpacity>
        <ScrollView>
          <View
            style={{
              alignItems: "center",
              marginTop: 80,
              marginBottom: 40,
              justifyContent: "center",
            }}
          >
            <Avatar.Text
              size={100}
              label={user.name.charAt(0)}
              style={friendModal.avatar}
            >
              {user.name}
            </Avatar.Text>
            <View>
              <Text style={friendModal.title}>{user.name}</Text>
            </View>

            <Text style={friendModal.userName}>{user.username}</Text>

            <View style={friendModal.score}>
              <AntDesign name='aliwangwang-o1' size={15} />
              <Text style={{ fontSize: 20, marginLeft: 5 }}>{user.score}</Text>
            </View>
          </View>
          <View style={friendModal.container}>
            <View style={{ flexDirection: "row" }}>
              <View style={friendModal.divider} />
              <Text style={friendModal.title}>
                Todo{" "}
                <Text style={{ fontWeight: "300", color: color.list.blue }}>
                  Lists
                </Text>
              </Text>
              <View style={friendModal.divider} />
            </View>
            {lists.length > 0 ? (
              <View style={{ height: 275, paddingLeft: 30 }}>
                <FlatList
                  data={lists}
                  keyExtractor={(item) => item.id}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => renderSingleList(item)}
                  keyboardShouldPersistTaps='always'
                />
              </View>
            ) : (
              <View>
                <Text style={{ fontSize: 20, marginTop: 30 }}>
                  {user.name} has no lists
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default FriendModal;
