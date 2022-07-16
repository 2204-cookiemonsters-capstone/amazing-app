import { collection, getDocs, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  Image,
} from "react-native";
import { auth, firestore } from "../firebase";
import SinglePost from "./SinglePost";

const Explore = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [friendIds, setFriendIds] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
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
    // fetchPosts();
  };

  const fetchPosts = async () => {
    setLoading(true);
    const reference = collection(firestore, "posts");
    onSnapshot(reference, (snapshot) => {
      const postList = [];

      snapshot.forEach((docs) => {
        if (friendIds.includes(docs.data().userid)) {
          postList.push(docs.data());
          console.log(docs.data());
        }
      });

      posts !== postList ? setPosts(postList) : null;
      setLoading(false);
    });
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

  useEffect(() => {
    fetchPosts();
  }, [friendIds]);

  return (
    <View style={{ height: "100%" }}>
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
            display: "flex",
            flexDirection: "column",
            marginBottom: 50,
            height: !posts.length ? 630 : "100%",
            justifyContent: !posts.length ? "center" : null,
            alignItems: !posts.length ? "center" : null,
            backgroundColor: "white",
          }}
        >
          {loading ? (
            <View style={{ marginTop: 30 }}>
              <ActivityIndicator size='large' />
            </View>
          ) : posts.length === 0 ? (
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../assets/sadface.png")}
                style={{ height: 70, width: 70 }}
              />
              <Text style={{ fontSize: 18, marginTop: 20 }}>
                No posts to show
              </Text>
            </View>
          ) : (
            <View>
              {posts.map((post) => (
                <SinglePost post={post} />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Explore;
