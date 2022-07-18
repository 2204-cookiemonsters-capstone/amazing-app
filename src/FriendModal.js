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
import { doc, setDoc, getDocs, collection, getDoc, onSnapshot, query, where } from "firebase/firestore";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import FriendToDoList from "./FriendToDoList";
import StoriesModal from "./StoriesModal";
import { todoListStyle, color, friendModal } from "../styles";

const FriendModal = ({ user, closeModal }) => {
  const userid = user.userid;
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [friends, setFriends] = useState([]);
  const [stories, setStories] = useState([]);
  const [showStories, setShowStories] = useState(false);

  useEffect(() => {
    getLists();
    fetchStories();
  }, [loading]);

  const getLists = async () => {
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

  };

  const fetchStories = async () => {
    const yesterday = new Date(Date.now() - 86400000);
    const q = query(collection(firestore, "users", userid, "stories"), where("dateTime", '>=', yesterday))
    onSnapshot(q, async (snapShot) => {
        const stories = [];
        snapShot.forEach((doc) => {
          stories.push(doc.data())
        });
        stories.sort((a, b) => a.dateTime.seconds - b.dateTime.seconds)
        setStories(stories);
        console.log('FETCHED STORIES FROM FRIEND MODAL')
      }
    );
    setLoading(false);
  };
  // console.log(stories)

  const renderSingleList = (list) => {
    return <FriendToDoList list={list} user={user} updateList={updateList} />;
  };

  const updateList = (list) => {
    const todoRef = doc(firestore, "users", userid, "Todo Lists", list.id);
    setDoc(todoRef, list, { merge: true });
    //Update state here
    setLists(lists.map((item) => (item.id === list.id ? list : item)));
  };

  const toggleStoryModal = () => {
    setShowStories(!showStories)
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={color.list.blue} />
      </View>
    );
  }

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
          <View
            style={{
              alignItems: "center",
              marginTop: 80,
              marginBottom: 40,
            }}
          >
          <TouchableOpacity onPress={() => {stories.length > 0 && toggleStoryModal()}}>
          <View style={stories.length > 0 && {padding: 5, height: 115,borderRadius: 60, borderColor: '#F24C00', borderWidth: 3}}>
            {user.profilepic ?
            <Avatar.Image source={{uri: user.profilepic}} size={100} theme={{colors: {primary: "black"}}}/> :
            <Avatar.Text size={100} label={user.name.charAt(0)} style={friendModal.avatar} theme={{colors: {primary: "#F24C00"}}}/>}
          </View>
          </TouchableOpacity>
            <Text style={friendModal.title}>{user.name}</Text>
            <Text style={friendModal.userName}>{user.username}</Text>
            <View style={friendModal.score}>
              <AntDesign name="aliwangwang-o1" size={15} />
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
                  keyboardShouldPersistTaps="always"
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
        <Modal
          animationType="slide"
          visible={showStories}
          onRequestClose={() => toggleStoryModal()}
        >
          <StoriesModal stories={stories} toggleStoryModal={toggleStoryModal} user={user}/>

        </Modal>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default FriendModal;
