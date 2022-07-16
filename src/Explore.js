import { collection, getDocs, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
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
            height: "100%",
          }}
        >
          {loading ? (
            <View style={{ marginTop: 30 }}>
              <ActivityIndicator size='large' />
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
