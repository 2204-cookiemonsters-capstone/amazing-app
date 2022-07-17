import { View, Text, Image, StyleSheet } from "react-native";
import React, {useState, useEffect} from "react";
import { Avatar } from "react-native-paper";
import { firestore } from "../firebase";
import { doc, setDoc, getDocs, collection, getDoc, onSnapshot, query, where } from "firebase/firestore";

export default function UserStoriesBubble({friend}) {
  const [loading, setLoading] = useState(true);
  const [stories, setStories] = useState([]);
  const [showStories, setShowStories] = useState(false);

  useEffect(() => {
    fetchStories();
  }, [loading])

  const fetchStories = async () => {
    const yesterday = new Date(Date.now() - 86400000);
    const q = query(collection(firestore, "users", friend.userid, "stories"), where("dateTime", '>=', yesterday))
    onSnapshot(q, async (snapShot) => {
        const stories = [];
        snapShot.forEach((doc) => {
          stories.push(doc.data())
        });
        stories.sort((a, b) => a.dateTime.seconds - b.dateTime.seconds)
        setStories(stories);
        console.log('FETCHED STORIES FROM STORIES.JS FOR', friend.name)
      }
    );
    setLoading(false);
    setLoading(false);
  };

  return (
    <View style={styles.story}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  story: {
    width: 85,
    padding: 5,
    marginTop: 5,
    marginLeft: 5
  },
  username: {
    textAlign: 'center',
    fontSize: 12,
    textTransform: 'lowercase',
    marginTop: 5
  }
})
