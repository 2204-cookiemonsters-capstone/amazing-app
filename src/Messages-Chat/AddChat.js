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
  Modal,
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
  where,
  snapshotEqual,
} from "firebase/firestore";
import { auth, firestore } from "../../firebase";
import { ScrollView } from "react-native-gesture-handler";
import FriendModal from "../FriendModal";
const image = require("../../assets/favicon.png");

const AddChat = ({ navigation }) => {
  const [allFriends, setAllFriends] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const [renderedUsers, setRenderedUsers] = useState([]);
  const firstThreeUsers = renderedUsers.slice(0, 5);

  const [showAll, setShowAll] = useState(false);
  const [showAllSearch, setShowAllSearch] = useState(false);

  const [selectedFriend, setSelectedFriend] = useState("");
  const [showFriendModal, setShowFriendModal] = useState(false);

  const toggleFriendModal = () => {
    setShowFriendModal(!showFriendModal);
  };

  const height = () => {
    return allFriends.length * 92 + 150;
  };

  const heightNoShowAll = () => {
    return firstThreeUsers.length * 92 + 150;
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

    // allFriends !== friends ? setAllFriends(friends) : null;

    const friendDocs = await Promise.all(
      friends.map((f) => getDoc(doc(firestore, "users", f.userid)))
    );

    const friendItems = friendDocs.map((i) => i.data());

    setAllFriends(friendItems);
    setRenderedUsers(friendItems);
  };

  useEffect(() => {
    fetchAllFriends();
    setSelectedChatId("");
  }, []);

  const handleAddChat = async (userid) => {
    const q = query(
      collection(firestore, "chats")
      // where("userids", "array-contains", auth.currentUser.uid && userid)
    );

    const snapShot = await getDocs(q);

    const selectedChat = [];
    snapShot.forEach((docs) => {
      if (
        docs.data().userids.includes(auth.currentUser.uid) &&
        docs.data().userids.includes(userid)
      ) {
        selectedChat.push(docs.data());
      }
    });

    const index = allFriends.indexOf(
      allFriends.find((item) => item.userid === userid)
    );

    allFriends[index] = {
      ...allFriends[index],
      chatid: selectedChat[0].chatid,
    };
    navigation.navigate("ChatScreen", {
      chatid: allFriends[index].chatid,
      username: allFriends[index].name,
    });
  };

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
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name='left' color='black' size={18} />
        </TouchableOpacity>
        <View style={{ flexGrow: 1 }} />
        <Text style={{ fontWeight: "700", fontSize: 22 }}>New Chat</Text>
        <View style={{ flexGrow: 1 }} />
        <TouchableOpacity
          style={{
            borderRadius: 25,
            height: 35,
            width: 35,
            alignItems: "center",
            justifyContent: "center",
            marginRight: 13,
          }}
        ></TouchableOpacity>
      </View>
      <View style={styles.searchView}>
        <Image
          source={require("../../assets/search2.png")}
          style={{
            width: 22,
            height: 22,
            resizeMode: "contain",
          }}
        />
        <TextInput
          placeholder='Find Friends'
          onChangeText={(value) => {
            setSearchValue(value);
            search(value);
          }}
          style={{
            paddingHorizontal: 16,
            color: "black",
            fontWeight: "600",
            flexGrow: 1,
          }}
        />
      </View>

      {!allFriends.length ? (
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "40%",
          }}
        >
          <Text>You have no friends</Text>
          <TouchableOpacity
            style={styles.addFriendsButton}
            onPress={() => navigation.navigate("AddFriends")}
          >
            <Text style={{ color: "black" }}> Add Friends</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          {searchValue === "" || !searchValue ? (
            <View
              style={{
                height: showAll ? height() : heightNoShowAll(),
                marginTop: 13,
              }}
            >
              {showAll
                ? allFriends.map((item) => (
                    <TouchableOpacity
                      key={item.userid}
                      style={{
                        ...styles.singleProfile,
                        borderTopLeftRadius: item === allFriends[0] ? 8 : 0,
                        borderTopRightRadius: item === allFriends[0] ? 8 : 0,
                      }}
                      onPress={() => handleAddChat(item.userid)}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          toggleFriendModal();
                          setSelectedFriend(item);
                        }}
                      >
                        <Image
                          source={
                            item.profilepic || item.profilepic !== undefined
                              ? { uri: item.profilepic }
                              : require("../../assets/defaultprofileicon.webp")
                          }
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
                          width: "42%",
                        }}
                      >
                        <Text style={{ fontSize: 18, fontWeight: "400" }}>
                          {item.name}
                        </Text>
                        <Text style={{ color: "gray" }}>{item.username}</Text>
                        {/* <Text>3 Mutual Friends</Text> */}
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
                            backgroundColor: "#F24C00",
                            borderRadius: 25,
                            height: 30,
                            width: 95,
                            justifyContent: "center",
                            alignItems: "center",
                            display: "flex",
                            flexDirection: "row",
                          }}
                          onPress={() => {
                            handleAddChat(item.userid);
                          }}
                        >
                          <View
                            style={{
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Image
                              source={require("../../assets/messageimage.png")}
                              style={{ width: 15, height: 15 }}
                            />
                          </View>
                          <Text style={{ marginLeft: 5 }}>Chat</Text>
                        </TouchableOpacity>
                      </View>
                    </TouchableOpacity>
                  ))
                : firstThreeUsers.map((item) => (
                    <TouchableOpacity
                      key={item.userid}
                      style={{
                        ...styles.singleProfile2,
                        borderTopLeftRadius: item === allFriends[0] ? 8 : 0,
                        borderTopRightRadius: item === allFriends[0] ? 8 : 0,
                      }}
                      onPress={() => handleAddChat(item.userid)}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          toggleFriendModal();
                          setSelectedFriend(item);
                        }}
                      >
                        <Image
                          source={
                            item.profilepic || item.profilepic !== undefined
                              ? { uri: item.profilepic }
                              : require("../../assets/defaultprofileicon.webp")
                          }
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
                          width: "42%",
                        }}
                      >
                        <Text style={{ fontSize: 18, fontWeight: "400" }}>
                          {item.name}
                        </Text>
                        <Text style={{ color: "gray" }}>{item.username}</Text>
                        {/* <Text>3 Mutual Friends</Text> */}
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
                            backgroundColor: "#F24C00",
                            borderRadius: 25,
                            height: 30,
                            width: 95,
                            justifyContent: "center",
                            alignItems: "center",
                            display: "flex",
                            flexDirection: "row",
                          }}
                          onPress={() => {
                            handleAddChat(item.userid);
                          }}
                        >
                          <View
                            style={{
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Image
                              source={require("../../assets/messageimage.png")}
                              style={{ width: 15, height: 15 }}
                            />
                          </View>
                          <Text style={{ marginLeft: 5 }}>Chat</Text>
                        </TouchableOpacity>
                      </View>
                    </TouchableOpacity>
                  ))}
              {!showAll ? (
                <TouchableOpacity
                  style={styles.viewMore}
                  onPress={() => setShowAll(true)}
                >
                  <Text>View More</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.viewLess}
                  onPress={() => setShowAll(false)}
                >
                  <Text>View Less</Text>
                </TouchableOpacity>
              )}
            </View>
          ) : searchValue !== "" && renderedUsers.length ? (
            <View
              style={{
                height: showAll ? height() : heightNoShowAll(),
                marginTop: 13,
              }}
            >
              {showAllSearch
                ? renderedUsers.map((item) => (
                    <TouchableOpacity
                      key={item.userid}
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
                        borderTopLeftRadius: item === renderedUsers[0] ? 8 : 0,
                        borderTopRightRadius: item === renderedUsers[0] ? 8 : 0,
                        borderBottomLeftRadius:
                          renderedUsers.length <= 5 &&
                          item === renderedUsers[renderedUsers.length - 1]
                            ? 8
                            : 0,
                        borderBottomRightRadius:
                          renderedUsers.length <= 5 &&
                          item === renderedUsers[renderedUsers.length - 1]
                            ? 8
                            : 0,
                        backgroundColor: "white",
                        marginBottom: 1,
                        shadowColor: "#7F5DF0",
                        shadowOffset: {
                          width: 0,
                          height: 10,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.5,
                        elevation: 5,
                      }}
                      onPress={() => handleAddChat(item.userid)}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          toggleFriendModal();
                          setSelectedFriend(item);
                        }}
                      >
                        <Image
                          source={
                            item.profilepic || item.profilepic !== undefined
                              ? { uri: item.profilepic }
                              : require("../../assets/defaultprofileicon.webp")
                          }
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
                          width: "42%",
                        }}
                      >
                        <Text style={{ fontSize: 18, fontWeight: "400" }}>
                          {item.name}
                        </Text>
                        <Text style={{ color: "gray" }}>{item.username}</Text>
                        {/* <Text>3 Mutual Friends</Text> */}
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
                            backgroundColor: "#F24C00",
                            borderRadius: 25,
                            height: 30,
                            width: 95,
                            justifyContent: "center",
                            alignItems: "center",
                            display: "flex",
                            flexDirection: "row",
                          }}
                          onPress={() => {
                            handleAddChat(item.userid);
                          }}
                        >
                          <View
                            style={{
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Image
                              source={require("../../assets/messageimage.png")}
                              style={{ width: 15, height: 15 }}
                            />
                          </View>
                          <Text style={{ marginLeft: 5 }}>Chat</Text>
                        </TouchableOpacity>
                      </View>
                    </TouchableOpacity>
                  ))
                : firstThreeUsers.map((item) => (
                    <TouchableOpacity
                      key={item.userid}
                      style={{
                        ...styles.firstThreeUsers,
                        borderTopLeftRadius: item === renderedUsers[0] ? 8 : 0,
                        borderTopRightRadius: item === renderedUsers[0] ? 8 : 0,
                        borderBottomLeftRadius:
                          renderedUsers.length <= 5 &&
                          item === renderedUsers[renderedUsers.length - 1]
                            ? 8
                            : 0,
                        borderBottomRightRadius:
                          renderedUsers.length <= 5 &&
                          item === renderedUsers[renderedUsers.length - 1]
                            ? 8
                            : 0,
                      }}
                      onPress={() => handleAddChat(item.userid)}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          toggleFriendModal();
                          setSelectedFriend(item);
                        }}
                      >
                        <Image
                          source={
                            item.profilepic || item.profilepic !== undefined
                              ? { uri: item.profilepic }
                              : require("../../assets/defaultprofileicon.webp")
                          }
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
                          width: "42%",
                        }}
                      >
                        <Text style={{ fontSize: 18, fontWeight: "400" }}>
                          {item.name}
                        </Text>
                        <Text style={{ color: "gray" }}>{item.username}</Text>
                        {/* <Text>3 Mutual Friends</Text> */}
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
                            backgroundColor: "#F24C00",
                            borderRadius: 25,
                            height: 30,
                            width: 95,
                            justifyContent: "center",
                            alignItems: "center",
                            display: "flex",
                            flexDirection: "row",
                          }}
                          onPress={() => {
                            handleAddChat(item.userid);
                          }}
                        >
                          <View
                            style={{
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Image
                              source={require("../../assets/messageimage.png")}
                              style={{ width: 15, height: 15 }}
                            />
                          </View>
                          <Text style={{ marginLeft: 5 }}>Chat</Text>
                        </TouchableOpacity>
                      </View>
                    </TouchableOpacity>
                  ))}
              {!showAllSearch && renderedUsers > 5 ? (
                <TouchableOpacity
                  style={styles.viewMore2}
                  onPress={() => setShowAllSearch(true)}
                >
                  <Text>View More</Text>
                </TouchableOpacity>
              ) : showAllSearch && renderedUsers > 5 ? (
                <TouchableOpacity
                  style={styles.viewLess2}
                  onPress={() => setShowAllSearch(false)}
                >
                  <Text>View Less</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          ) : null}
        </ScrollView>
      )}
      <Modal
        animationType='slide'
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

export default AddChat;

const styles = StyleSheet.create({
  backButton: {
    backgroundColor: "white",
    borderRadius: 25,
    height: 35,
    width: 35,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 13,
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  searchView: {
    marginTop: 40,
    marginLeft: 15,
    marginRight: 25,
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
  },
  addFriendsButton: {
    borderRadius: 25,
    backgroundColor: "white",
    width: 100,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
    marginTop: 10,
  },
  singleProfile: {
    marginLeft: 15,
    marginRight: 15,
    paddingTop: 7,
    paddingBottom: 0,
    borderColor: "#cccccc",
    display: "flex",
    flexDirection: "row",
    paddingLeft: 10,
    paddingRight: 15,
    backgroundColor: "white",
    marginBottom: 1,
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  singleProfile2: {
    marginLeft: 15,
    marginRight: 15,
    paddingTop: 7,
    paddingBottom: 0,
    borderColor: "#cccccc",
    display: "flex",
    flexDirection: "row",
    paddingLeft: 10,
    paddingRight: 15,

    backgroundColor: "white",
    marginBottom: 1,
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  viewMore: {
    marginLeft: 15,
    marginRight: 15,
    paddingTop: 7,
    paddingBottom: 7,
    borderColor: "#cccccc",
    display: "flex",
    flexDirection: "row",
    paddingLeft: 10,
    paddingRight: 15,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    backgroundColor: "white",
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  viewLess: {
    marginLeft: 15,
    marginRight: 15,
    paddingTop: 7,
    paddingBottom: 7,
    borderColor: "#cccccc",
    display: "flex",
    flexDirection: "row",
    paddingLeft: 10,
    paddingRight: 15,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    backgroundColor: "white",
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  viewMore2: {
    marginLeft: 15,
    marginRight: 15,
    paddingTop: 7,
    paddingBottom: 7,
    borderColor: "#cccccc",
    display: "flex",
    flexDirection: "row",
    paddingLeft: 10,
    paddingRight: 15,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    backgroundColor: "white",
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  viewLess2: {
    marginLeft: 15,
    marginRight: 15,
    paddingTop: 7,
    paddingBottom: 7,
    borderColor: "#cccccc",
    display: "flex",
    flexDirection: "row",
    paddingLeft: 10,
    paddingRight: 15,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    backgroundColor: "white",
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  firstThreeUsers: {
    marginLeft: 15,
    marginRight: 15,
    paddingTop: 7,
    paddingBottom: 0,
    borderColor: "#cccccc",
    display: "flex",
    flexDirection: "row",
    paddingLeft: 10,
    paddingRight: 15,
    backgroundColor: "white",
    marginBottom: 1,
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
