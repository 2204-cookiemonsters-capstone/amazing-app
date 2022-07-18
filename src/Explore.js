import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Modal } from "react-native";
import { auth, firestore } from "../firebase";
import { onSnapshot, collection, getDoc, doc, getDocs, where, query } from "firebase/firestore";
import Stories from "./Stories";
import StoriesModal from "./StoriesModal";

const Explore = () => {
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
        console.log("GOT FRIENDS FOR STORIES")
        const friendItems = friendDocs.map((i) => i.data());

        setAllFriends(friendItems);
      }
    );
  };

  useEffect(() => {
    fetchAllFriends();
  }, []);

  const toggleStoryModal = () => {
    setShowStories(!showStories)
  }

  const handleSelectFriend = async (friend) => {
    setSelectedFriend(friend);
    //Retrieve stories for selected friend, set stories to state
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

    toggleStoryModal();
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={{flex: 1}} horizontal>
        {allFriends.map((friend, index) => (
          <Stories friend={friend} handleSelectFriend={handleSelectFriend}/>
        ))}
      </ScrollView>
      <Modal
          animationType="slide"
          visible={showStories}
          onRequestClose={() => toggleStoryModal()}
        >
          <StoriesModal stories={stories} toggleStoryModal={toggleStoryModal} user={selectedFriend}/>
        </Modal>
    </SafeAreaView>
  );
};

export default Explore;
