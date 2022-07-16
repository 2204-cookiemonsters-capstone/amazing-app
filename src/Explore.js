import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, SafeAreaView } from "react-native";
import { auth, firestore } from "../firebase";
import { onSnapshot, collection, getDoc, doc, getDocs, where, query } from "firebase/firestore";
import Stories from "./Stories";

const Explore = () => {
  const [stories, setStories] = useState([]);
  const [allFriends, setAllFriends] = useState([]);

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

        const friendItems = friendDocs.map((i) => i.data());

        setAllFriends(friendItems);
      }
    );
  };

  // console.log("fetched friends for stories", allFriends);
  const fetchStories = async () => {
    const yesterday = new Date(Date.now() - 86400000);


  };

  useEffect(() => {
    fetchAllFriends();
  }, []);
  // useEffect(() => {
  //   fetchStories();
  // }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Stories/>
    </SafeAreaView>
  );
};

export default Explore;
