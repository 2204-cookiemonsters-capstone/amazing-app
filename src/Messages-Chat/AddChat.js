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
  where,
  snapshotEqual,
} from "firebase/firestore";
import { auth, firestore } from "../../firebase";
import { ScrollView } from "react-native-gesture-handler";
const image = require("../../assets/favicon.png");

const AddChat = ({ navigation }) => {
  const [allFriends, setAllFriends] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState("");
  const [userName, setUserName] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const [renderedUsers, setRenderedUsers] = useState([]);
  const firstThreeUsers = renderedUsers.slice(0, 5);

  const [showAll, setShowAll] = useState(false);
  const [showAllSearch, setShowAllSearch] = useState(false);

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
    setUserName("");
  }, []);

  const handleAddChat = async (userid) => {
    const q = query(
      collection(firestore, "chats"),
      where("userids", "array-contains", auth.currentUser.uid && userid)
    );

    const snapShot = await getDocs(q);

    const selectedChat = [];
    snapShot.forEach((docs) => {
      selectedChat.push(docs.data());
    });

    if (!selectedChat.length) {
      const docRef = await addDoc(collection(firestore, "chats"), {
        userids: [auth.currentUser.uid, userid],
        messages: [],
      });

      const snap = await getDocs(q);

      snap.forEach(async (docs) => {
        const ref = doc(firestore, "chats", docs.id);
        await setDoc(ref, { chatid: docs.id }, { merge: true });
      });
      const index = allFriends.indexOf(
        allFriends.find((item) => item.userid === userid)
      );

      allFriends[index] = { ...allFriends[index], chatid: snap[0].id };
      navigation.navigate("ChatScreen", {
        chatid: allFriends[index].chatid,
        username: allFriends[index].username,
      });
    } else {
      const index = allFriends.indexOf(
        allFriends.find((item) => item.userid === userid)
      );

      allFriends[index] = {
        ...allFriends[index],
        chatid: selectedChat[0].chatid,
      };
      navigation.navigate("ChatScreen", {
        chatid: allFriends[index].chatid,
        username: allFriends[index].username,
      });
    }

    const userRef = doc(firestore, "users", userid);
    const userSnap = await getDoc(userRef);
    setUserName(userSnap.data().name);
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
          style={{
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
          }}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name='left' color='black' size={18} />
        </TouchableOpacity>
        <View style={{ flexGrow: 1 }} />
        <Text style={{ fontWeight: "700", fontSize: 22 }}>New Chat</Text>
        <View style={{ flexGrow: 1 }} />
        <TouchableOpacity
          style={{
            backgroundColor: "white",
            borderRadius: 25,
            height: 35,
            width: 35,
            alignItems: "center",
            justifyContent: "center",
            marginRight: 13,
            shadowColor: "#7F5DF0",
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.5,
            elevation: 5,
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
        }}
      >
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
            style={{
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
            }}
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
                            backgroundColor: "#CBC3E3",
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
                            backgroundColor: "#CBC3E3",
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
                  style={{
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
                  }}
                  onPress={() => setShowAll(true)}
                >
                  <Text>View More</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{
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
                  }}
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
                    >
                      <TouchableOpacity>
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
                            backgroundColor: "#CBC3E3",
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
                    >
                      <TouchableOpacity>
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
                            backgroundColor: "#CBC3E3",
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
                  style={{
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
                  }}
                  onPress={() => setShowAllSearch(true)}
                >
                  <Text>View More</Text>
                </TouchableOpacity>
              ) : showAllSearch && renderedUsers > 5 ? (
                <TouchableOpacity
                  style={{
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
                  }}
                  onPress={() => setShowAllSearch(false)}
                >
                  <Text>View Less</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          ) : null}
        </ScrollView>
      )}
    </View>
  );
};

export default AddChat;
