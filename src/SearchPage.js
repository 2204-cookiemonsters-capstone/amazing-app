import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
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
import { auth, firestore, storage } from "../firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { ScrollView } from "react-native-gesture-handler";
import FriendModal from "./FriendModal";

const image = require("../assets/favicon.png");

const SearchPage = ({ navigation }) => {
  const [searchValue, setSearchValue] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [renderedUsers, setRenderedUsers] = useState([]);
  const firstThreeUsers = renderedUsers.slice(0, 3);

  const [showAll, setShowAll] = useState(false);
  const [showAllSearch, setShowAllSearch] = useState(false);

  const [selectedFriend, setSelectedFriend] = useState("");
  const [showFriendModal, setShowFriendModal] = useState(false);

  const height = () => {
    return allUsers.length * 92 + 150;
  };

  const heightNoShowAll = () => {
    return firstThreeUsers.length * 92 + 150;
  };

  const fetchAllUsers = async () => {
    const reference = collection(firestore, "users");

    onSnapshot(reference, (snapShot) => {
      const users = [];

      snapShot.forEach((doc) => {
        if (doc.data().userid !== auth.currentUser.uid) {
          users.push(doc.data());
        }
      });

      allUsers !== users ? setAllUsers(users) : null;
      renderedUsers !== users ? setRenderedUsers(users) : null;
    });
  };

  const fetchPhotos = () => {
    allUsers.forEach((userdata) => {
      const reference = ref(
        storage,
        `${userdata.userid}/profilepic/${userdata.profilepic}`
      );

      const index = allUsers.indexOf(
        allUsers.find((user) => userdata.userid === user.userid)
      );

      getDownloadURL(reference)
        .then((x) => {
          allUsers[index] = { ...allUsers[index], imageUrl: x };
        })
        .catch((e) => {
          allUsers[index] = { ...allUsers[index], imageUrl: null };
        });
    });
  };

  const search = (value) => {
    const filtered = allUsers.filter(
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

  const toggleFriendModal = () => {
    setShowFriendModal(!showFriendModal);
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  useEffect(() => {
    fetchPhotos();
  }, [allUsers]);

  return (
    <View>
      <View
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
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
        <View style={{ marginTop: 40 }}>
          <TouchableOpacity
            style={{ right: 15 }}
            onPress={() => navigation.goBack()}
          >
            <Text style={{ fontWeight: "900", fontSize: 15 }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {searchValue === "" || !searchValue ? (
          <View style={{ height: showAll ? height() : heightNoShowAll() }}>
            <Text
              style={{
                fontWeight: "700",
                fontSize: 17,
                margin: 25,
              }}
            >
              Quick Add
            </Text>
            {showAll
              ? allUsers.map((item) => (
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
                      borderTopLeftRadius: item === allUsers[0] ? 8 : 0,
                      borderTopRightRadius: item === allUsers[0] ? 8 : 0,
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
                    onPress={() => {
                      toggleFriendModal();
                      setSelectedFriend(item);
                    }}
                  >
                    <TouchableOpacity>
                      <Image
                        source={
                          item.profilepic
                            ? { uri: item.profilepic }
                            : require("../assets/defaultprofileicon.webp")
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
                      >
                        <View
                          style={{
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Image
                            source={require("../assets/addfriendclear.png")}
                            style={{ width: 15, height: 15 }}
                          />
                        </View>
                        <Text style={{ marginLeft: 5 }}>Add</Text>
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
                      borderTopLeftRadius: item === allUsers[0] ? 8 : 0,
                      borderTopRightRadius: item === allUsers[0] ? 8 : 0,
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
                    onPress={() => {
                      toggleFriendModal();
                      setSelectedFriend(item);
                    }}
                  >
                    <TouchableOpacity>
                      <Image
                        source={
                          item.profilepic
                            ? { uri: item.profilepic }
                            : require("../assets/defaultprofileicon.webp")
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
                      >
                        <View
                          style={{
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Image
                            source={require("../assets/addfriendclear.png")}
                            style={{ width: 15, height: 15 }}
                          />
                        </View>
                        <Text style={{ marginLeft: 5 }}>Add</Text>
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
          <View style={{ height: showAll ? height() : heightNoShowAll() }}>
            <Text
              style={{
                fontWeight: "700",
                fontSize: 17,
                margin: 25,
              }}
            >
              Add Friends
            </Text>
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
                      borderTopLeftRadius: item === allUsers[0] ? 8 : 0,
                      borderTopRightRadius: item === allUsers[0] ? 8 : 0,
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
                    onPress={() => {
                      toggleFriendModal();
                      setSelectedFriend(item);
                    }}
                  >
                    <TouchableOpacity>
                      <Image
                        source={
                          item.profilepic
                            ? { uri: item.profilepic }
                            : require("../assets/defaultprofileicon.webp")
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
                      >
                        <View
                          style={{
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Image
                            source={require("../assets/addfriendclear.png")}
                            style={{ width: 15, height: 15 }}
                          />
                        </View>
                        <Text style={{ marginLeft: 5 }}>Add</Text>
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
                      borderTopLeftRadius: item === allUsers[0] ? 8 : 0,
                      borderTopRightRadius: item === allUsers[0] ? 8 : 0,
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
                    onPress={() => {
                      toggleFriendModal();
                      setSelectedFriend(item);
                    }}
                  >
                    <TouchableOpacity>
                      <Image
                        source={
                          item.profilepic
                            ? { uri: item.profilepic }
                            : require("../assets/defaultprofileicon.webp")
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
                      >
                        <View
                          style={{
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Image
                            source={require("../assets/addfriendclear.png")}
                            style={{ width: 15, height: 15 }}
                          />
                        </View>
                        <Text style={{ marginLeft: 5 }}>Add</Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                ))}
            {!showAllSearch ? (
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
                onPress={() => setShowAllSearch(false)}
              >
                <Text>View Less</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : null}
      </ScrollView>
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

export default SearchPage;
