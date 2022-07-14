import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
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
  const [isLoading, setIsLoading] = useState(true);

  const fetchAllChats = async () => {
    onSnapshot(collection(firestore, "chats"), async (snapShot) => {
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
          lastMessage:
            chats.find(
              (chat) =>
                chat.userids.includes(docSnap.data().userid) &&
                chat.userids.includes(auth.currentUser.uid)
            ).messages.length !== 0
              ? chats.find(
                  (chat) =>
                    chat.userids.includes(docSnap.data().userid) &&
                    chat.userids.includes(auth.currentUser.uid)
                ).messages[0].message
              : "",

          chatid: chats.find(
            (chat) =>
              chat.userids.includes(docSnap.data().userid) &&
              chat.userids.includes(auth.currentUser.uid)
          ).chatid,
          timesent:
            chats.find(
              (chat) =>
                chat.userids.includes(docSnap.data().userid) &&
                chat.userids.includes(auth.currentUser.uid)
            ).messages.length !== 0
              ? chats
                  .find(
                    (chat) =>
                      chat.userids.includes(docSnap.data().userid) &&
                      chat.userids.includes(auth.currentUser.uid)
                  )
                  .messages[0].time.toDate()
                  .getTime()
              : null,
        });
      }

      userData.sort(sorting);

      allChatsData !== userData ? setAllChatsData(userData) : null;
      setIsLoading(false);
    });
  };

  console.log(allChatsData);
  const getTimeDifference = (timesent) => {
    const timeNow = new Date().getTime();
    const difference = (timeNow - timesent) / 1000;
    const diff = difference / 60;

    return Math.abs(Math.round(diff));
  };

  function sorting(a, b) {
    if (a.timesent > b.timesent) return -1; //this function sorts the array by the time sent so the most recent message will appear first
    if (a.timesent < b.timesent) return 1;
    return 0;
  }

  useEffect(() => {
    fetchAllChats();
  }, []);

  return (
    <View style={styles.container}>
      {allChatsData.length ? (
        <View style={{ width: "100%" }}>
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
                style={{
                  width: "100%",
                  backgroundColor: "white",
                  marginBottom: 1,
                }}
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

                      {!item.timesent ? null : getTimeDifference(
                          item.timesent
                        ) < 60 ? (
                        <Text
                          style={{
                            fontSize: 12,
                            color: "#666",
                            marginRight: 30,
                          }}
                        >
                          {getTimeDifference(item.timesent)} minutes ago
                        </Text>
                      ) : getTimeDifference(item.timesent) >= 60 &&
                        getTimeDifference(item.timesent) < 1440 ? (
                        <Text
                          style={{
                            fontSize: 12,
                            color: "#666",
                            marginRight: 30,
                          }}
                        >
                          {" "}
                          {Math.floor(
                            getTimeDifference(item.timesent) / 60
                          )}{" "}
                          {Math.floor(getTimeDifference(item.timesent) / 60) ===
                          1
                            ? "hour Ago"
                            : "hours Ago"}
                        </Text>
                      ) : (
                        <Text
                          style={{
                            fontSize: 12,
                            color: "#666",
                            marginRight: 30,
                          }}
                        >
                          {Math.floor(getTimeDifference(item.timesent) / 1440)}{" "}
                          {!item.timesent
                            ? null
                            : Math.floor(
                                getTimeDifference(item.timesent) / 1440
                              ) === 1
                            ? "day Ago"
                            : "days Ago"}
                        </Text>
                      )}
                    </View>
                    <View style={{ width: "65%" }}>
                      <Text style={styles.messageText}>
                        {!item.lastMessage.length
                          ? ""
                          : item.lastMessage.length <= 25 &&
                            item.lastMessage.length > 0
                          ? item.lastMessage
                          : item.lastMessage.length > 25
                          ? item.lastMessage.slice(0, 23) + "..."
                          : null}
                      </Text>
                    </View>
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
              position: "relative",
              top: "170%",
              left: "78%",
              borderRadius: 70 / 2,
              alignItems: "center",
              justifyContent: "center",
              shadowColor: "#7F5DF0",
              shadowOffset: {
                width: 0,
                height: 10,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.5,
              elevation: 5,
            }}
            onPress={() => props.navigation.navigate("AddChat")}
          >
            <Ionicons name="add" size={26} color="white" />
          </TouchableOpacity>
        </View>
      ) : isLoading ? (
        <View style={{ margin: "50%" }}>
          <ActivityIndicator size="large" color="blue" />
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
          <Text>You have no chats</Text>
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
            onPress={() => props.navigation.navigate("AddChat")}
          >
            <Text style={{ color: "black" }}> Add a Chat</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    marginTop: 0,
    width: "100%",
  },
  userinfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userimage: {
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 15,
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
