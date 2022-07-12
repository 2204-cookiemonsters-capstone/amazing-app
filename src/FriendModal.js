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
  Modal
} from "react-native";
import {ActivityIndicator} from 'react-native-paper';
import { firestore } from "../firebase";
import { doc, setDoc, getDocs, collection } from "firebase/firestore";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import FriendToDoList from "./FriendToDoList";
import { todoListStyle, color } from "../styles";

const FriendModal = ({ user, closeModal }) => {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLists();
  }, [loading]);

  let getLists = async () => {
    const snapShot = await getDocs(
      collection(firestore, "users", user, "Todo Lists")
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
        <ActivityIndicator size="large" color={color.list.blue} />
      </View>
    );
  }

  const renderSingleList = (list) => {
    return <FriendToDoList list={list} updateList={updateList} />;
  };

  const updateList = (list) => {
    const todoRef = doc(
      firestore,
      "users",
      user,
      "Todo Lists",
      list.id
    );
    setDoc(todoRef, list, { merge: true });
    //Update state here
    setLists(lists.map((item) => (item.id === list.id ? list : item)));
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <SafeAreaView>
        <TouchableOpacity
          style={{ position: "absolute", top: 64, right: 32, zIndex: 10 }}
          onPress={closeModal}
        >
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>
        <ScrollView>
          <Text>{user}</Text>

          <View style={todoListStyle.container}>
            <View style={{ flexDirection: "row" }}>
              <View style={todoListStyle.divider} />
              <Text style={todoListStyle.title}>
                Todo{" "}
                <Text style={{ fontWeight: "300", color: color.list.blue }}>
                  Lists
                </Text>
              </Text>
              <View style={todoListStyle.divider} />
            </View>
            <View style={{ height: 275, paddingLeft: 32 }}>
              <FlatList
                data={lists}
                keyExtractor={(item) => item.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => renderSingleList(item)}
                keyboardShouldPersistTaps="always"
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default FriendModal;
