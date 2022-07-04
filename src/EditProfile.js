import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { auth, signOut, firestore } from "../firebase";
import { authStyle } from "../styles";
import { doc, getDoc } from "firebase/firestore";
import { userProfile } from "../styles";
import AntDesign from 'react-native-vector-icons/AntDesign';

const Profile = ({ navigation }) => {
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
    <View style={userProfile.container}>
      <View style={userProfile.topNav}>
        <TouchableOpacity
          style={userProfile.headerButtons}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name='left' color='black' />
        </TouchableOpacity>
      </View>
      <View style={userProfile.body}>
        <Image source={require('../assets/user-avatar.png')} style={{width: 100, height: 100}}/>
        <Text style={userProfile.text}>Name: {userData.name}</Text>
        <Text style={userProfile.text}>Score: {userData.score}</Text>
        <Text style={userProfile.text}>Email: {userData.email}</Text>
        <Text style={userProfile.text}>Username: {userData.username}</Text>
        <TouchableOpacity style={authStyle.submitButton} title="SaveUser">
          <Text>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;
