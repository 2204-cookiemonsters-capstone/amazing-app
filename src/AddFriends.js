import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { auth, firestore } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  query,
  onSnapshot,
  doc,
} from "firebase/firestore";

const AddFriends = ({ navigation }) => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      const docRef = doc(firestore, "users", auth.currentUser.uid);
      const colRef = collection(docRef, "friendships");
      const docSnaps = await getDocs(colRef);

      // docSnaps.forEach(doc => {
      //   setFriends([...friends, doc.data()])
      // })
      //-----------
      // docSnaps.forEach(doc => {
      //   console.log("Doc ",doc.data())
      // })
    };
    getFriends();
  }, []);
  console.log("FRIENDSHIPS", friends);

  const handleAddFriend = (userid) => {
    //create documents for current user, and user receiving friend request
    const docRef = doc(firestore, "users", auth.currentUser.uid);
    const docRef2 = doc(firestore, "users", userid);
    const colRef = collection(docRef, "friendships");
    const colRef2 = collection(docRef2, "friendships");
    const friendId = doc(firestore, 'users/' + userid)
    const friendId2 = doc(firestore, 'users/' + auth.currentUser.uid)
    addDoc(colRef, {
      friendId,
      status: 'friends' //change this to 'request sent' or something
    })
    addDoc(colRef2, {
      friendId: friendId2,
      status: 'friends' //change this to 'request sent' or something
    })
  };

  return (
    <View>
      <View style={{ display: "flex", marginTop: 40, marginLeft: 13 }}>
        <TouchableOpacity
          style={{
            backgroundColor: "aqua", //random vibrant color for now, style our app later
            borderRadius: 25,
            height: 35,
            width: 35,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="left" color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "aqua", //random vibrant color for now, style our app later
            // borderRadius: 25,
            height: 35,
            width: 100,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => handleAddFriend('Trdwh7T41iMytwYQs7GgRHSKkeq2')} //replace param with reference to friend's userId
        >
          <Text>Add Friend</Text>
        </TouchableOpacity>
      </View>
      <Text>AddFriends page</Text>
    </View>
  );
};

export default AddFriends;
