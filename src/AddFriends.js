import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Touchable,
  Image,
  FlatList,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import { auth, firestore } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  query,
  onSnapshot,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

const image = require("../assets/favicon.png");

const AddFriends = ({ navigation }) => {
  const [friends, setFriends] = useState("");

  const [allUsers, setAllUsers] = useState([]);
  const [renderedAllFriends, setRenderedAllFriends] = useState([]);
  const firstThreeUsers = allUsers.slice(0, 3);

  const [pendingFriends, setPendingFriends] = useState([]);

  const [incomingFriends, setIncomingFriends] = useState([]);
  const [renderedIncomingFriends, setRenderedIncomingFriends] = useState([]);

  const [showAllQuickAdd, setShowAllQuickAdd] = useState(false);

  const [searchValue, setSearchValue] = useState("");

  const height = () => {
    return renderedAllFriends.length * 78;
  };

  const heightIncoming = () => {
    return renderedIncomingFriends.length * 78 + 70;
  };

  const fetchAllUsers = async () => {
    const friendSnap = await getDocs(
      collection(firestore, "users", auth.currentUser.uid, "friendships")
    );
    const friends = [];

    friendSnap.forEach((docs) => {
      if (docs.data().status === "friends") {
        friends.push(docs.data().userid);
      }
    });

    onSnapshot(collection(firestore, "users"), async (snapShot) => {
      const users = [];
      snapShot.forEach(async (doc) => {
        if (doc.data().userid !== auth.currentUser.uid) {
          if (!friends.includes(doc.data().userid)) {
            users.push(doc.data());
          }
        }
      });

      allUsers !== users ? setAllUsers(users) : ""; //need this or else it will push to allUsers everytime we save
      setRenderedAllFriends(users);
    });
  };

  const getFriends = async () => {
    onSnapshot(
      collection(firestore, "users", auth.currentUser.uid, "friendships"),
      async (snapShot) => {
        const allFriends = [],
          allIncomingFriends = [],
          allPendingFriends = [];

        snapShot.forEach((doc) => {
          if (doc.data().status === "friends") {
            allFriends.push(doc.data());
          } else if (doc.data().status === "pending") {
            allPendingFriends.push(doc.data());
          } else if (
            doc.data().status === "incoming" &&
            doc.data().userid !== auth.currentUser.uid
          ) {
            allIncomingFriends.push(doc.data());
          }
        });

        const friendDocs = await Promise.all(
          allFriends.map((f) => getDoc(doc(firestore, "users", f.userid)))
        );

        const pendingDocs = await Promise.all(
          allPendingFriends.map((f) =>
            getDoc(doc(firestore, "users", f.userid))
          )
        );
        const incomingDocs = await Promise.all(
          allIncomingFriends.map((f) =>
            getDoc(doc(firestore, "users", f.userid))
          )
        );

        // mapping array of document data
        const friendItems = friendDocs.map((i) => i.data());
        const pendingItems = pendingDocs.map((i) => i.data());
        const incomingItems = incomingDocs.map((i) => i.data());

        //set state
        setFriends(friendItems);
        setPendingFriends(pendingItems);
        setIncomingFriends(incomingItems);
        setRenderedIncomingFriends(incomingItems);
      }
    );
  };

  const search = (value) => {
    if (searchValue === "") {
      setShowAllQuickAdd(false);
    } else {
      setShowAllQuickAdd(true);
    }

    const filteredPending = allUsers.filter(
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

    setRenderedAllFriends(filteredPending);

    const filteredIncoming = incomingFriends.filter(
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

    setRenderedIncomingFriends(filteredIncoming);
  };

  useEffect(() => {
    fetchAllUsers();
    getFriends();
  }, []);

  const handleAddFriend = (userid) => {
    const docRef = doc(
      firestore,
      "users",
      auth.currentUser.uid,
      "friendships",
      userid
    );
    // const colRef = collection(docRef, 'friendships');
    setDoc(docRef, {
      userid,
      status: "pending", //the one sending
    });

    const docRef2 = doc(
      firestore,
      "users",
      userid,
      "friendships",
      auth.currentUser.uid
    );
    // const colRef2 = collection(docRef2, 'friendships');
    setDoc(docRef2, {
      userid: auth.currentUser.uid,
      status: "incoming", // the one receiving
    });
  };

  const handleAcceptFriendship = async (userid) => {
    const docRef = doc(
      firestore,
      "users",
      auth.currentUser.uid,
      "friendships",
      userid
    );

    await updateDoc(docRef, { status: "friends" });
    const docRef2 = doc(
      firestore,
      "users",
      userid,
      "friendships",
      auth.currentUser.uid
    );
    await updateDoc(docRef2, { status: "friends" });
    // const docRef2 = doc(firestore, 'users', userid);
    // const colRef2 = collection(docRef2, 'friendships');
    // await deleteDoc(doc(firestore, colRef2, where("userid", "==", auth.currentUser.uid)))
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
        <Text style={{ fontWeight: "700", fontSize: 22 }}>Add Friends</Text>
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

      <ScrollView>
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
              setSearchValue(value);
              search(value);
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

        {renderedIncomingFriends.length ? (
          <View style={{ height: heightIncoming() }}>
            <View style={{ margin: 25 }}>
              <Text style={{ fontWeight: "700", fontSize: 17 }}>Added Me</Text>
            </View>
            <View>
              {renderedIncomingFriends.map((item) => (
                <TouchableOpacity
                  style={{
                    marginLeft: 25,

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
                      onPress={() => handleAcceptFriendship(item.userid)}
                    >
                      <View style={{ marginLeft: 13, marginRight: 8 }}>
                        <Image
                          source={require("../assets/ADDFRIEND2.png")}
                          style={{ width: 15, height: 15 }}
                        />
                      </View>
                      <Text style={{ marginRight: 14 }}>Accept</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ) : null}

        <View style={{ height: height() }}>
          {!renderedAllFriends.length ? null : (
            <View style={{ margin: 25 }}>
              <Text style={{ fontWeight: "700", fontSize: 17 }}>Quick Add</Text>
            </View>
          )}
          <View
            style={{
              bottom: 20,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {renderedAllFriends.map((item) => (
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
                    onPress={() => handleAddFriend(item.userid)}
                  >
                    <View style={{ marginLeft: 13, marginRight: 8 }}>
                      <Image
                        source={require("../assets/ADDFRIEND2.png")}
                        style={{ width: 15, height: 15 }}
                      />
                    </View>
                    <Text style={{ marginRight: 14 }}>Add</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddFriends;

/*

 <View style={{ height: 300 }}>
          {!renderedAllFriends.length ? null : (
            <View style={{ margin: 25 }}>
              <Text style={{ fontWeight: "700", fontSize: 17 }}>Quick Add</Text>
            </View>
          )}
          <View
            style={{
              bottom: 20,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {renderedAllFriends.length <= 3 ? (
              <FlatList
                data={renderedAllFriends}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  paddingBottom: 430, //fix navbar does not block the last item
                }}
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
                        onPress={() => handleAddFriend(item.userid)}
                      >
                        <View style={{ marginLeft: 13, marginRight: 8 }}>
                          <Image
                            source={require("../assets/ADDFRIEND2.png")}
                            style={{ width: 15, height: 15 }}
                          />
                        </View>
                        <Text style={{ marginRight: 14 }}>Add</Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                )}
              />
            ) : allUsers.length > 3 && showAllQuickAdd ? (
              <FlatList
                data={renderedAllFriends}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                // contentContainerStyle={{
                //   marginBottom: 430, //fix navbar does not block the last item
                // }}
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
                        onPress={() => handleAddFriend(item.userid)}
                      >
                        <View style={{ marginLeft: 13, marginRight: 8 }}>
                          <Image
                            source={require("../assets/ADDFRIEND2.png")}
                            style={{ width: 15, height: 15 }}
                          />
                        </View>
                        <Text style={{ marginRight: 14 }}>Add</Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                )}
              />
            ) : (
              <FlatList
                data={firstThreeUsers}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  paddingBottom: 430, //fix navbar does not block the last item
                }}
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
                        onPress={() => handleAddFriend(item.userid)}
                      >
                        <View style={{ marginLeft: 13, marginRight: 8 }}>
                          <Image
                            source={require("../assets/ADDFRIEND2.png")}
                            style={{ width: 15, height: 15 }}
                          />
                        </View>
                        <Text style={{ marginRight: 14 }}>Add</Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                )}
              />
            )}
            {searchValue !== "" ? null : allUsers.length <=
              3 ? null : showAllQuickAdd ? (
              <TouchableOpacity
                style={{
                  backgroundColor: "red",
                  bottom: 420,
                  width: 100,
                  alignItems: "center",
                  height: 30,
                  justifyContent: "center",
                  borderTopLeftRadius: 10,
                  borderBottomLeftRadius: 10,
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10,
                }}
                onPress={() => setShowAllQuickAdd(false)}
              >
                <Text style={{ fontSize: 15 }}>Show Less</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{
                  backgroundColor: "red",
                  bottom: 420,
                  width: 100,
                  // marginLeft: '25%',
                  // marginRight: '25%',
                  alignItems: "center",
                  height: 30,
                  justifyContent: "center",
                  borderTopLeftRadius: 10,
                  borderBottomLeftRadius: 10,
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10,
                }}
                onPress={() => setShowAllQuickAdd(true)}
              >
                <Text style={{ fontSize: 15 }}>Show More</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        */
