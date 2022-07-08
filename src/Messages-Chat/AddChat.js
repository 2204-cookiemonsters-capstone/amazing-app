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
const image = require("../../assets/favicon.png");

const AddChat = ({ navigation }) => {
  const [allFriends, setAllFriends] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState("");
  const [userName, setUserName] = useState("");

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
  };

  useEffect(() => {
    fetchAllFriends();
  }, []);

  // console.log(allFriends);

  const handleAddChat = async (userid) => {
    const q = query(
      collection(firestore, "chats"),
      where("userids", "array-contains", auth.currentUser.uid && userid)
    );

    const snapShot = await getDocs(q);

    console.log("CHATTT", snapShot);
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
        setSelectedChatId(docs.id);
      });
    }else{
      setSelectedChatId(selectedChat[0].chatid);
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
        <Text style={{ fontWeight: "700", fontSize: 22 }}>New Chat</Text>
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
          placeholder='Search'
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

      <View>
        <FlatList
          data={allFriends}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
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
                  onPress={() =>
                    handleAddChat(item.userid)
                      .then(
                        navigation.navigate("ChatScreen", {
                          chatid: selectedChatId,
                          username: userName,
                        })
                      )
                      .then(setSelectedChatId(""))
                      .then(setUserName(""))
                  }
                >
                  <View
                    style={{
                      marginLeft: 13,
                      marginRight: 13,
                    }}
                  >
                    <Image
                      source={require("../../assets/messageimage.png")}
                      style={{ width: 15, height: 15 }}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default AddChat;
