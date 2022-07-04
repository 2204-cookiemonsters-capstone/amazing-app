import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { auth, signOut, firestore } from "../firebase";
import { authStyle } from "../styles";
import { doc, getDoc } from "firebase/firestore";

const Profile = () => {
  let [userData, setUserData] = useState('');

  const handleSignOut = () => {
    signOut(auth)
  }

  useEffect(() => {
    const getUser = async () => {
      const docRef = doc(firestore, 'users', auth.currentUser.uid);
      const docSnap = await getDoc(docRef);

      if(docSnap.exists()) {
        setUserData(docSnap.data());
      }
    }
    getUser();
  }, [])

  console.log("USER Data", userData);
  return (
    <View>
      <Text>Name: {userData.name}</Text>
      <Text>Score: {userData.score}</Text>
      <Text>Email: {userData.email}</Text>
      <Text>Username: {userData.username}</Text>
      <TouchableOpacity style={authStyle.submitButton} title="Signout" onPress={() => handleSignOut()}>
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
