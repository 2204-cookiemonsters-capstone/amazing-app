import {
  AntDesign,
  EvilIcons,
  FontAwesome,
  Octicons,
} from "@expo/vector-icons";

import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, Image, Modal } from "react-native";
import { firestore, auth } from "../firebase";
import FriendModal from "./FriendModal";

const SinglePost = (props) => {
  const post = props.post;

  const [showAllCaption, setShowAllCaption] = useState(false);
  const [userData, setUserData] = useState("");

  const [showFriendModal, setShowFriendModal] = useState(false);

  const toggleFriendModal = () => {
    setShowFriendModal(!showFriendModal);
  };

  const fetchUser = async () => {
    const reference = doc(firestore, "users", post.userid);
    const snapshot = await getDoc(reference);

    let user = "";
    if (snapshot.exists()) {
      user = snapshot.data();
    } else {
      console.log("No Such Documents");
    }

    userData !== user ? setUserData(user) : null;
  };

  const getTimeDifference = (timesent) => {
    timesent = timesent.toDate();
    const timeNow = new Date().getTime();
    const difference = (timeNow - timesent) / 1000;
    const diff = difference / 60;
    return Math.abs(Math.round(diff));
  };

  const addLike = () => {};

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        marginBottom: 20,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          height: 55,
        }}
      >
        <Image
          source={
            userData.profilepic
              ? { uri: userData.profilepic }
              : require("../assets/defaultprofileicon.webp")
          }
          style={{ width: 40, height: 40, borderRadius: 70, marginLeft: 10 }}
        />
        <Text
          style={{ fontSize: 16, marginLeft: 5, fontWeight: "500" }}
          onPress={() => toggleFriendModal()}
        >
          {userData.username}
        </Text>
      </View>

      <View
        style={{
          marginLeft: 15,
          marginTop: -7,
          marginBottom: 5,
        }}
      >
        <Text style={{ fontSize: 12, color: "darkgray" }}>{post.taskname}</Text>
      </View>

      <View style={{ width: "100%", height: 410 }}>
        <Image
          source={{ uri: post.imageurl }}
          style={{ height: "100%", width: "100%" }}
        />
      </View>
      <View
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "row",
          height: 50,
        }}
      >
        <TouchableOpacity>
          <AntDesign name='hearto' size={26} style={{ marginLeft: 13 }} />
        </TouchableOpacity>
      </View>
      <View style={{ marginLeft: 13 }}>
        <Text style={{ fontWeight: "500", fontSize: 15 }}>
          {post.likes.length} likes
        </Text>
      </View>
      <View
        style={{
          width: "100%",
          backgroundColor: "white",
          marginLeft: 13,
          marginTop: 3,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginRight: 15,
            backgroundColor: "white",
          }}
        >
          <Text style={{ flexShrink: 1 }}>
            <Text style={{ fontWeight: "500" }}>{userData.username}: </Text>
            {post.caption.length > 80 && !showAllCaption ? (
              <Text>
                {post.caption.slice(0, 80)}
                <Text
                  style={{ color: "gray" }}
                  onPress={() => setShowAllCaption(true)}
                >
                  ...more
                </Text>
              </Text>
            ) : post.caption.length > 80 && showAllCaption ? (
              <Text>{post.caption}</Text>
            ) : post.caption.length < 80 ? (
              <Text>{post.caption}</Text>
            ) : null}
          </Text>
        </View>

        <View style={{ marginTop: 2 }}>
          {getTimeDifference(post.timeposted) < 60 ? (
            <View>
              <Text style={{ fontSize: 12, color: "darkgray" }}>
                {getTimeDifference(post.timeposted)} minutes ago
              </Text>
            </View>
          ) : getTimeDifference(post.timeposted) >= 60 &&
            getTimeDifference(post.timeposted) < 1440 ? (
            <Text style={{ fontSize: 12, color: "darkgray" }}>
              {Math.floor(getTimeDifference(post.timeposted) / 60)}{" "}
              {Math.floor(getTimeDifference(post.timeposted) / 60) === 1
                ? "hour Ago"
                : "hours Ago"}
            </Text>
          ) : (
            <Text style={{ fontSize: 12, color: "darkgray" }}>
              {Math.floor(getTimeDifference(post.timeposted) / 1440)}{" "}
              {!post.timeposted
                ? null
                : Math.floor(getTimeDifference(post.timeposted) / 1440) === 1
                ? "day ago"
                : "days ago"}
            </Text>
          )}
        </View>
      </View>
      <Modal
        animationType='slide'
        visible={showFriendModal}
        onRequestClose={() => toggleFriendModal()}
      >
        <FriendModal user={userData} closeModal={() => toggleFriendModal()} />
      </Modal>
    </View>
  );
};

export default SinglePost;
