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
import {
  doc,
  setDoc,
  getDocs,
  collection,
  getDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import FriendToDoList from "./FriendToDoList";
import StoriesModal from "./StoriesModal";
import { todoListStyle, color, friendModal } from "../styles";
import { ScrollView as GestureHandlerScrollView } from "react-native-gesture-handler";
import SinglePostView from "./SinglePostView";

const screenWidth = Dimensions.get("window").width;

const FriendModal = ({ user, closeModal }) => {
  let scrollViewRef = useRef();
  const userid = user.userid;
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [friends, setFriends] = useState([]);
  const [stories, setStories] = useState([]);
  const [showStories, setShowStories] = useState(false);

  const [pageNumber, setPageNumber] = useState(0);

  const [images, setImages] = useState([]);
  const [profilepic, setProfilepic] = useState(null);

  const [showSinglePost, setShowSinglePost] = useState(false);
  const [selectedPost, setSelectedPost] = useState("");

  useEffect(() => {
    getLists();
    fetchStories();
  }, [loading]);

  const getLists = async () => {
    const snapShot = await getDocs(
      collection(firestore, "users", userid, "Todo Lists")
    );

    let todos = [];
    snapShot.forEach((doc) => {
      let todo = doc.data();
      todo.id = doc.id;
      todos.push(todo);
    });
    setLists(todos);
  };

  const fetchProfilepic = async () => {
    const reference = doc(firestore, "users", userid);
    const snapshot = await getDoc(reference);

    if (snapshot.exists()) {
      setProfilepic(snapshot.data().profilepic);
    } else {
      console.log("No Such Documents");
    }
  };

  const fetchStories = async () => {
    const yesterday = new Date(Date.now() - 86400000);
    const q = query(
      collection(firestore, "users", userid, "stories"),
      where("dateTime", ">=", yesterday)
    );
    onSnapshot(q, async (snapShot) => {
      const stories = [];
      snapShot.forEach((doc) => {
        stories.push(doc.data());
      });
      stories.sort((a, b) => a.dateTime.seconds - b.dateTime.seconds);
      setStories(stories);
      console.log("FETCHED STORIES FROM FRIEND MODAL");
    });
    setLoading(false);
  };
  // console.log(stories)

  const renderSingleList = (list) => {
    return (
      <FriendToDoList
        list={list}
        user={user}
        updateList={updateList}
        key={list.id}
      />
    );
  };

  const updateList = (list) => {
    const todoRef = doc(firestore, "users", userid, "Todo Lists", list.id);
    setDoc(todoRef, list, { merge: true });
    //Update state here
    setLists(lists.map((item) => (item.id === list.id ? list : item)));
  };

  function sorting(a, b) {
    if (a.timeposted > b.timeposted) return -1; //this function sorts the array by the time sent so the most recent message will appear first
    if (a.timeposted < b.timeposted) return 1;
    return 0;
  }

  let onScrollEnd = (e) => {
    let contentOffset = e.nativeEvent.contentOffset;
    let viewSize = e.nativeEvent.layoutMeasurement;

    // Divide the horizontal offset by the width of the view to see which page is visible
    let pageNum = Math.floor(contentOffset.x / viewSize.width);
    setPageNumber(pageNum);
  };

  const handleSelectPost = (post) => {
    setSelectedPost(post);
    setShowSinglePost(true);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const reference = collection(firestore, "posts");
      const q = query(reference, where("userid", "==", userid));
      const snapShot = await getDocs(q);

      const result = [];
      snapShot.forEach((docs) => {
        result.push(docs.data());
      });

      result.sort(sorting);
      images !== result ? setImages(result) : null;
    };

    fetchPosts();
    fetchProfilepic();
  }, []);

  //this has to be below every single react hook or you will get error

  const toggleStoryModal = () => {
    setShowStories(!showStories);
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size='large' color={color.list.blue} />
      </View>
    );
  }

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
          onPress={() => closeModal()}
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
            <TouchableOpacity
              onPress={() => {
                stories.length > 0 && toggleStoryModal();
              }}
            >
              <View
                style={
                  stories.length > 0 && {
                    padding: 5,
                    height: 115,
                    borderRadius: 60,
                    borderColor: "#F24C00",
                    borderWidth: 3,
                  }
                }
              >
                {user.profilepic ? (
                  <Avatar.Image
                    source={{ uri: user.profilepic }}
                    size={100}
                    theme={{ colors: { primary: "black" } }}
                  />
                ) : (
                  <Avatar.Text
                    size={100}
                    label={user.name.charAt(0)}
                    style={friendModal.avatar}
                    theme={{ colors: { primary: "#F24C00" } }}
                  />
                )}
              </View>
            </TouchableOpacity>
            <Text style={friendModal.title}>{user.name}</Text>
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
              marginBottom: pageNumber === 1 ? 30 : 0,
            }}
          >
            <TouchableOpacity
              style={{
                borderBottomWidth: pageNumber === 0 ? 1 : 0,
                width: "50%",
                alignItems: "center",
                height: 35,
                justifyContent: "center",
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
                justifyContent: "center",
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
                marginTop: 7,
                width: screenWidth,
              }}
            >
              {!images.length ? (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    width: screenWidth,
                    height: 300,
                  }}
                >
                  <Text>This user has no posts</Text>
                </View>
              ) : (
                images.map((image) => (
                  <TouchableOpacity
                    style={{
                      width:
                        (images.indexOf(images.find((img) => img === image)) %
                          3) +
                          1 ===
                        0
                          ? screenWidth / 3
                          : screenWidth / 3 - 1,
                      height: screenWidth / 3,
                      marginRight:
                        (images.indexOf(images.find((img) => img === image)) %
                          3) +
                          1 ===
                        0
                          ? 0
                          : 1,
                      marginBottom: 1,
                    }}
                    onPress={() => handleSelectPost(image)}
                  >
                    <Image
                      source={{ uri: image.imageurl }}
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </TouchableOpacity>
                ))
              )}
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
                  <View>
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                    >
                      {lists.map((item) => (
                        <TouchableWithoutFeedback>
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
        <Modal
          visible={showSinglePost}
          onRequestClose={() => setShowSinglePost(false)}
          animationType='slide'
        >
          <SinglePostView
            post={selectedPost}
            setShowSinglePost={setShowSinglePost}
          />
        </Modal>
        <Modal
          animationType='slide'
          visible={showStories}
          onRequestClose={() => toggleStoryModal()}
        >
          <StoriesModal
            stories={stories}
            toggleStoryModal={toggleStoryModal}
            user={user}
          />
        </Modal>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default FriendModal;
