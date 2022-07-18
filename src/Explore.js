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
    onSnapshot(reference, async (snapshot) => {
      const friends = [];
      snapshot.forEach((docs) => {
        if (docs.data().status === "friends") {
          friends.push(docs.data().userid);
        }
      });
      friendIds !== friends ? setFriendIds(friends) : null;
    });
  };

  const fetchPosts = async () => {
    setLoading(true);
    const reference = collection(firestore, "posts");
    onSnapshot(reference, (snapshot) => {
      const postList = [];

      snapshot.forEach((docs) => {
        if (friendIds.includes(docs.data().userid)) {
          postList.push(docs.data());
        }
      });

      postList.sort(sorting);
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

  function sorting(a, b) {
    if (a.timeposted > b.timeposted) return -1; //this function sorts the array by the time sent so the most recent message will appear first
    if (a.timeposted < b.timeposted) return 1;
    return 0;
  }

  useEffect(() => {
    fetchFriends();
  }, [currentuser]);

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
                <SinglePost key={post.postid} post={post} />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Explore;
