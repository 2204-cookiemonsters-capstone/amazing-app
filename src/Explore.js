import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
  getDoc,
  doc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  Image,
  Modal,
} from "react-native";
import { auth, firestore } from "../firebase";
import SinglePost from "./SinglePost";
import Stories from "./Stories";
import StoriesModal from "./StoriesModal";

const Explore = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [friendIds, setFriendIds] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const currentuser = auth.currentUser ? auth.currentUser.uid : "";

  const [stories, setStories] = useState([]);
  const [allFriends, setAllFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState({});
  const [showStories, setShowStories] = useState(false);

  const fetchAllFriends = async () => {
    onSnapshot(
      collection(firestore, "users", auth.currentUser.uid, "friendships"),
      async (snapShot) => {
        const friends = [];
        snapShot.forEach((doc) => {
          if (doc.data().status === "friends") {
            friends.push(doc.data());
          }
        });

        const friendDocs = await Promise.all(
          friends.map((f) => getDoc(doc(firestore, "users", f.userid)))
        );
        console.log("GOT FRIENDS FOR STORIES");
        const friendItems = friendDocs.map((i) => i.data());

        setAllFriends(friendItems);
      }
    );
  };

  const handleSelectFriend = async (friend) => {
    setSelectedFriend(friend);
    //Retrieve stories for selected friend, set stories to state
    const yesterday = new Date(Date.now() - 86400000);
    const q = query(
      collection(firestore, "users", friend.userid, "stories"),
      where("dateTime", ">=", yesterday)
    );
    onSnapshot(q, async (snapShot) => {
      const stories = [];
      snapShot.forEach((doc) => {
        stories.push(doc.data());
      });
      stories.sort((a, b) => a.dateTime.seconds - b.dateTime.seconds);
      setStories(stories);
      console.log("FETCHED STORIES FROM EXPLORE.JS FOR", friend.name);
    });

    toggleStoryModal();
  };

  const toggleStoryModal = () => {
    setShowStories(!showStories);
  };

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
          if (docs.data().visibility !== "private") {
            postList.push(docs.data());
          }
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
    fetchAllFriends();
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [friendIds]);

  return (
    <View
      style={{ height: "100%", paddingBottom: 70, backgroundColor: "white" }}
    >
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
            marginBottom: 30,
            height: !posts.length ? 350 : "100%",
            justifyContent: !posts.length ? "center" : null,
            alignItems: !posts.length ? "center" : null,
            backgroundColor: "white",
          }}
        >

          {/* <ScrollView style={{ flex: 1 }} horizontal>

            {allFriends.map((friend, index) => (
              <Stories
                friend={friend}
                handleSelectFriend={handleSelectFriend}
                key={index}
              />
            ))}
          </ScrollView> */}
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
      <Modal
        animationType='slide'
        visible={showStories}
        onRequestClose={() => toggleStoryModal()}
      >
        <StoriesModal
          stories={stories}
          toggleStoryModal={toggleStoryModal}
          user={selectedFriend}
        />
      </Modal>
    </View>
  );
};

export default Explore;
