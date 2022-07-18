import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { Avatar, ActivityIndicator } from "react-native-paper";
import { firestore } from "../firebase";
import {
  doc,
  setDoc,
  getDocs,
  collection,
  getDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

export default function Stories({ friend, handleSelectFriend }) {
  const [loading, setLoading] = useState(true);
  const [stories, setStories] = useState([]);
  const [showStories, setShowStories] = useState(false);
  const [storySeen, setStorySeen] = useState(false);

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
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
      console.log("FETCHED STORIES FROM STORIES.JS FOR", friend.name);
    });
    setLoading(false);
  };

  if (loading) {
    return (
      <View style={styles.story}>
        <ActivityIndicator size="medium" color={"blue"} />
      </View>
    );
  }

  if (stories.length > 0) {
    return (
      <TouchableOpacity
        style={storySeen == false ? styles.unseenStory : styles.seenStory}
        onPress={() => handleSelectFriend(friend)}
      >
        {friend.profilepic ? (
          <Avatar.Image source={{ uri: friend.profilepic }} size={80} />
        ) : (
          <Avatar.Text
            size={80}
            label={friend.name.charAt(0)}
            theme={{ colors: { primary: "#F24C00" } }}
          />
        )}
        <Text style={styles.username}>{friend.name}</Text>
      </TouchableOpacity>
    );
  } else {
    return null;
  }
}

const styles = StyleSheet.create({
  unseenStory: {
    padding: 2,
    borderRadius: 60,
    borderColor: "#F24C00",
    borderWidth: 3,
    height: 90,
    marginLeft: 5,
    marginTop: 5,
  },
  seenStory: {
    padding: 2,
    borderRadius: 60,
    borderColor: "#B7B8B7",
    borderWidth: 3,
    height: 90,
    marginLeft: 5,
    marginTop: 5,
  },
  username: {
    textAlign: "center",
    fontSize: 12,
    textTransform: "lowercase",
    marginTop: 5,
  },
});
