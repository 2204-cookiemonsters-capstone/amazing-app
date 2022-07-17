import React, { useState, useEffect, useRef } from "react";
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
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { ActivityIndicator, Avatar } from "react-native-paper";
import { firestore } from "../firebase";
import { doc, setDoc, getDocs, collection } from "firebase/firestore";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import FriendToDoList from "./FriendToDoList";
import { todoListStyle, color, friendModal } from "../styles";
import { ScrollView as GestureHandlerScrollView } from "react-native-gesture-handler";

const screenWidth = Dimensions.get("window").width;

const FriendModal = ({ user, closeModal }) => {
  let scrollViewRef = useRef();
  const userid = user.userid;
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);

  const [enableScrolling, setEnableScrolling] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);

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
    return (
      <FriendToDoList
        list={list}
        user={user}
        updateList={updateList}
        key={list.id}
        setEnableScrolling={setEnableScrolling}
      />
    );
  };

  const updateList = (list) => {
    const todoRef = doc(firestore, "users", userid, "Todo Lists", list.id);
    setDoc(todoRef, list, { merge: true });
    //Update state here
    setLists(lists.map((item) => (item.id === list.id ? list : item)));
  };

  let onScrollEnd = (e) => {
    let contentOffset = e.nativeEvent.contentOffset;
    let viewSize = e.nativeEvent.layoutMeasurement;

    // Divide the horizontal offset by the width of the view to see which page is visible
    let pageNum = Math.floor(contentOffset.x / viewSize.width);
    setPageNumber(pageNum);
  };

  const moveBody = (index) => {
    scrollViewRef.current.scrollTo({
      x: index * screenWidth,
      animation: false,
    });
  };

  console.log(scrollViewRef.current);
  // console.log(setEnableScrolling);
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding'>
      <SafeAreaView
        style={{
          width: "100%",
          height: "100%",
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
              marginTop: 40,
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
          <View
            style={{
              display: "flex",
              flexDirection: "row",

              marginBottom: 30,
            }}
          >
            <TouchableOpacity
              style={{
                borderBottomWidth: pageNumber === 0 ? 1 : 0,
                width: "50%",
                alignItems: "center",
              }}
              onPress={() => {
                scrollViewRef.current.scrollTo({ x: 0 });
                setPageNumber(0);
              }}
            >
              <Text>Posts</Text>
            </TouchableOpacity>
            <View style={{ flexGrow: 1 }} />
            <TouchableOpacity
              style={{
                borderBottomWidth: pageNumber === 1 ? 1 : 0,
                width: "50%",
                alignItems: "center",
                paddingBottom: 10,
              }}
              onPress={() => {
                scrollViewRef.current.scrollTo({ x: screenWidth });
                setPageNumber(1);
              }}
            >
              <Text>Lists</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal={true}
            pagingEnabled={true}
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(e) => onScrollEnd(e)}
            ref={scrollViewRef}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                marginTop: 30,
                width: screenWidth,
              }}
            >
              <View style={{ width: screenWidth / 3 }}>
                <Image
                  source={require("../assets/favicon.png")}
                  style={{ width: "100%", height: 100 }}
                />
              </View>
            </View>

            <View
              style={{
                ...friendModal.container,
                width: screenWidth,
              }}
            >
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
                <View
                  style={{
                    height: 275,
                    // paddingLeft: 30,
                  }}
                >
                  <View onPress={() => setEnableScrolling(false)}>
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                    >
                      {lists.map((item) => (
                        <TouchableWithoutFeedback
                          onPressIn={() => setEnableScrolling(false)}
                          onPressOut={() => setEnableScrolling(true)}
                        >
                          {renderSingleList(item)}
                        </TouchableWithoutFeedback>
                      ))}
                    </ScrollView>
                  </View>
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
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default FriendModal;
