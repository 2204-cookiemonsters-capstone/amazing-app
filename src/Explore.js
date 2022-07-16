import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import { auth, firestore } from "../firebase";
import SinglePost from "./SinglePost";

const Explore = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [friendIds, setFriendIds] = useState([]);
  const [posts, setPosts] = useState([]);
  const currentuser = auth.currentUser ? auth.currentUser.uid : "";

  const fetchFriends = async () => {
    if (!auth.currentUser) return;
    const reference = collection(
      firestore,
      "users",
      auth.currentUser.uid,
      "friendships"
    );
    const snapshot = await getDocs(reference);
    const friends = [];
    snapshot.forEach((docs) => {
      if (docs.data().status === "friends") {
        friends.push(docs.data().userid);
      }
      console.log(friends);
    });
    friendIds !== friends ? setFriendIds(friends) : null;
    fetchPosts();
  };

  const fetchPosts = async () => {
    const reference = collection(firestore, "posts");
    const snapshot = await getDocs(reference);

    const postList = [];

    snapshot.forEach((docs) => {
      if (friendIds.includes(docs.data().userid)) {
        postList.push(docs.data());
      }
    });

    posts !== postList ? setPosts(postList) : null;
  };

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    fetchFriends();
  }, [currentuser]);
  console.log(posts);

  return (
    <View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View
          style={{
            width: "100%",
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            marginBottom: 50,
          }}
        >
          {posts.map((post) => (
            <SingleProfile post={post} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Explore;
