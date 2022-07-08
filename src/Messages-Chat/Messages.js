import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { auth, firestore } from "../../firebase";
import {
  collection,
  getDocs,
  addDoc,
  query,
  onSnapshot,
  doc,
  getDoc,
  setDoc,
  snapshotEqual,
} from "firebase/firestore";
import { useTheme } from "react-navigation";

const image = require("../../assets/favicon.png");

const Messages = (props) => {
  const [allChatsData, setAllChatsData] = useState([]);

  const fetchAllChats = async () => {
    // const snapShot = await getDocs(collection(firestore, "chats"))

    onSnapshot(collection(firestore, "chats"), async (snapShot)=>{
      const chats = []; //holds details of chat
      snapShot.forEach((doc) => {
        if (doc.data().userids.includes(auth.currentUser.uid)) {
          chats.push(doc.data());
        }
      });
  
      //doc.id returns the auto genned id
  
      const userData = []; //data to be rendered on messages screen for each chat
      for (let i = 0; i < chats.length; i++) {
        const docSnap = await getDoc(
          doc(
            firestore,
            "users",
            chats[i].userids.filter((id) => id !== auth.currentUser.uid)[0]
          )
        );
  
        userData.push({
          ...docSnap.data(),
          lastMessage: chats.find(
            (chat) =>
              chat.userids.includes(docSnap.data().userid) &&
              chat.userids.includes(auth.currentUser.uid)
          ).messages[0],
          chatid: chats.find(
            (chat) =>
              chat.userids.includes(docSnap.data().userid) &&
              chat.userids.includes(auth.currentUser.uid)
          ).chatid,
        });
      }
  
      allChatsData !== userData ? setAllChatsData(userData) : null;
    })
  };

  useEffect(() => {
    fetchAllChats();
  }, []);

  return (
    <View style={styles.container}>
      {allChatsData.length ? (
        <View>
          <FlatList
            data={allChatsData}
            keyExtractor={(chat) => chat.chatid} //might not see if we cant get the id
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 80, //fix navbar does not block the last item
            }}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{ width: "100%" }}
                onPress={() =>
                  props.navigation.navigate("ChatScreen", {
                    chatid: item.chatid,
                    username: item.name,
                  })
                }
              >
                <View style={styles.userinfo}>
                  <View style={styles.userimage}>
                    <Image source={image} style={styles.img} />
                  </View>
                  <View style={styles.textView}>
                    <View style={styles.userinfotext}>
                      <Text style={styles.username}>{item.name}</Text>
                      {/* <Text style={styles.posttime}>{item.messageTime}</Text> */}
                    </View>
                    <Text style={styles.messageText}>
                      {/* {item.lastMessage.message ? item.lastMessage.message : null} */}
                      hi
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity
            style={{
              width: 60,
              height: 60,

              backgroundColor: "#ee6e73",
              position: "absolute",
              bottom: 90,
              right: 0,
              borderRadius: 70 / 2,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => props.navigation.navigate("AddChat")}
          >
            <Ionicons name='add' size={26} color='white' />
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "80%",
          }}
        >
          <Text>You have no Chats</Text>
          <TouchableOpacity
            style={{
              borderRadius: 25,
              backgroundColor: "red",
              width: 100,
              height: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => props.navigation.navigate("AddChat")}
          >
            <Text style={{ color: "blue" }}> Add a Chat</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: "center",
    backgroundColor: "white",
    marginTop: 0,
  },
  userinfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userimage: {
    paddingTop: 15,
    paddingBottom: 15,
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textView: {
    flexDirection: "column",
    justifyContent: "center",
    padding: 15,
    paddingLeft: 0,
    marginLeft: 10,
    width: 300,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  userinfotext: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  username: {
    fontSize: 14,
    fontWeight: "bold",
    // fontFamily: 'serif',
  },
  posttime: {
    fontSize: 12,
    color: "#666",
    // fontFamily: 'serif',
    marginRight: 30,
  },
  messageText: {
    fontSize: 14,
    color: "#333333",
  },
});

export default Messages;
