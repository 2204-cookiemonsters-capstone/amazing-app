import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { auth, firestore } from "../firebase";
import { userProfile, friendList } from "../styles";
import { doc, getDoc, getDocs, collection, deleteDoc, where, updateDoc } from "firebase/firestore";
import AntDesign from "react-native-vector-icons/AntDesign";

const Profile = ({ navigation }) => {
  const [userData, setUserData] = useState("");
  const [friends, setFriends] = useState([]);
  const [pendingFriends, setPendingFriends] = useState([]);
  const [incomingFriends, setIncomingFriends] = useState([]);

  const getFriends = async () => {
    const snapShot = await getDocs(
      collection(firestore, "users", auth.currentUser.uid, "friendships")
    );
    const allFriends = [], allIncomingFriends = [], allPendingFriends = [];
    snapShot.forEach((doc) => {
      if (doc.data().status === "friends") {
        allFriends.push(doc.data());
      } else if (doc.data().status === "pending") {
        allPendingFriends.push(doc.data());
      } else if (doc.data().status === "incoming") {
        allIncomingFriends.push(doc.data());
      }
    });
    // console.log("allFriends", allFriends);
    // console.log("allPendingFriends", allPendingFriends);
    // console.log("allIncomingFriends", allIncomingFriends);
    // fetching all documents by mapping an array of promises and using Promise.all()

    //issue is bein
    const friendDocs = await Promise.all(
      allFriends.map((f) => getDoc(doc(firestore, "users", f.userid)))
    );
    const pendingDocs = await Promise.all(
      allPendingFriends.map((f) => getDoc(doc(firestore, "users", f.userid)))
    );
    const incomingDocs = await Promise.all(
      allIncomingFriends.map((f) => getDoc(doc(firestore, "users", f.userid)))
    );
    // mapping array of document data
    const friendItems = friendDocs.map((i) => i.data());
    const pendingItems = pendingDocs.map((i) => i.data());
    const incomingItems = incomingDocs.map((i) => i.data());

    //set state
    setFriends(friendItems);
    setPendingFriends(pendingItems);
    setIncomingFriends(incomingItems);
  };

  useEffect(() => {
    const getUser = async () => {
      const docRef = doc(firestore, "users", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserData(docSnap.data());
      }
    };
    getUser();

    getFriends();
  }, []);
  console.log("Friends", friends)
  console.log("Pending Friends", pendingFriends)
  console.log("Incoming Friends", incomingFriends)

  const handleCancelFriendship = async (userid) => {
    try {
      const docRef = doc(firestore, 'users', auth.currentUser.uid);
      const colRef = collection(docRef, 'friendships');
      // console.log(colRef)
      await deleteDoc(doc(firestore, colRef, where("userid", "==", userid)))

      const docRef2 = doc(firestore, 'users', userid);
      const colRef2 = collection(docRef2, 'friendships');
      await deleteDoc(doc(firestore, colRef2, where("userid", "==", auth.currentUser.uid)))
      alert('Success')
    } catch (error) {
      alert('Something went wrong')
    }

  }
  const handleAcceptFriendship = async (userid) => {
      const docRef = doc(firestore, 'users', auth.currentUser.uid, 'friendships', userid);
      await updateDoc(docRef, { status: 'friends' })
      const docRef2 = doc(firestore, 'users', userid, 'friendships', auth.currentUser.uid);
      await updateDoc(docRef2, { status: 'friends' })
      // const docRef2 = doc(firestore, 'users', userid);
      // const colRef2 = collection(docRef2, 'friendships');
      // await deleteDoc(doc(firestore, colRef2, where("userid", "==", auth.currentUser.uid)))
  }

  const friendRow = (item, context) => (
    <View key={item.userid}>
      <TouchableOpacity style={friendList.friendRow}>
        <TouchableOpacity>
          <Image
            source={require("../assets/user-avatar.png")}
            style={friendList.image}
          />
        </TouchableOpacity>
        <View style={friendList.infoContainer}>
          <Text>{item.name}</Text>
          <Text>{item.username}</Text>
          {/* <Text>3 Mutual Friends</Text> */}
        </View>
        <View style={friendList.buttonContainer}>
          {/* display an accept button if the reject button is there */}
          {context == "Reject" &&
          <TouchableOpacity style={friendList.acceptButton} onPress={()=> handleAcceptFriendship(item.userid)}>
            <View style={{ marginLeft: 13, marginRight: 8 }}>
            </View>
            <Text style={{ marginRight: 14 }}>Accept</Text>
          </TouchableOpacity>}
          <TouchableOpacity style={friendList.button} onPress={()=> handleCancelFriendship(item.userid)}>
            <View style={{ marginLeft: 13, marginRight: 8 }}>
            </View>
            <Text style={{ marginRight: 14 }}>{context}</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={userProfile.container}>
      <View style={userProfile.topNav}>
        <TouchableOpacity
          style={userProfile.headerButtons}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="left" color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={userProfile.headerButtons}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <Image
            source={require("../assets/pencil.png")}
            style={{ width: 30, height: 30 }}
          />
        </TouchableOpacity>
      </View>
      <View style={userProfile.body}>
        <Text style={userProfile.text}>Name: {userData.name}</Text>
        <Text style={userProfile.text}>Score: {userData.score}</Text>
        <View>
          <Text>My Friend Requests</Text>
          <View>{incomingFriends.map((item) => (friendRow(item, "Reject")))}</View>
          <Text>Pending Requests</Text>
          <View>{pendingFriends.map((item) => (friendRow(item, "Cancel")))}</View>
          <Text>Friends</Text>
          <View>{friends.map((item) => (friendRow(item, "Unfriend")))}</View>
        </View>
      </View>
    </View>
  );
};

export default Profile;
