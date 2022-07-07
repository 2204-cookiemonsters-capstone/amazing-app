import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Button } from 'react-native';
import { auth, firestore } from '../firebase';
import { userProfile, friendList } from '../styles';
import {
  doc,
  getDoc,
  getDocs,
  collection,
  deleteDoc,
  where,
  updateDoc,
} from 'firebase/firestore';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Profile = ({ navigation }) => {
  const [userData, setUserData] = useState('');
  const [friends, setFriends] = useState([]);

  const getFriends = async () => {
    const snapShot = await getDocs(
      collection(firestore, 'users', auth.currentUser.uid, 'friendships')
    );
    const allFriends = [];
    snapShot.forEach((doc) => {
      if (doc.data().status === 'friends') {
        allFriends.push(doc.data());
      }
    });
    // fetching all documents by mapping an array of promises and using Promise.all()
    const friendDocs = await Promise.all(
      allFriends.map((f) => getDoc(doc(firestore, 'users', f.userid)))
    );
    // mapping array of document data
    const friendItems = friendDocs.map((i) => i.data());
    //set state
    setFriends(friendItems);
    console.log("GOT FRIENDS FROM DB")
  };

  useEffect(() => {
    const getUser = async () => {
      const docRef = doc(firestore, 'users', auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserData(docSnap.data());
      }
    };
    getUser();
    getFriends();
  }, []);

  const handleUnfriend = async (userid) => {
    // try {
    //   const docRef = doc(firestore, 'users', auth.currentUser.uid);
    //   const colRef = collection(docRef, 'friendships');
    //   // console.log(colRef)
    //   await deleteDoc(doc(firestore, colRef, where("userid", "==", userid)))

    //   const docRef2 = doc(firestore, 'users', userid);
    //   const colRef2 = collection(docRef2, 'friendships');
    //   await deleteDoc(doc(firestore, colRef2, where("userid", "==", auth.currentUser.uid)))
    //   alert('Success')
    // } catch (error) {
    //   alert('Something went wrong')
    // }

  }

  const friendRow = (item) => (
    <View key={item.userid}>
      <TouchableOpacity style={friendList.friendRow}>
        <TouchableOpacity>
          <Image
            source={require('../assets/user-avatar.png')}
            style={friendList.image}
          />
        </TouchableOpacity>
        <View style={friendList.infoContainer}>
          <Text>{item.name}</Text>
          <Text>{item.username}</Text>
        </View>
        <View style={friendList.buttonContainer}>
          <TouchableOpacity style={friendList.button} onPress={()=> handleUnfriend(item.userid)}>
            <View style={{ marginLeft: 13, marginRight: 8 }}>
            </View>
            <Text style={{ marginRight: 14 }}>Unfriend</Text>
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
          <AntDesign name='left' color='black' />
        </TouchableOpacity>
        <TouchableOpacity
          style={userProfile.headerButtons}
          onPress={() => navigation.navigate('EditProfile')}
        >
          <Image
            source={require('../assets/pencil.png')}
            style={{ width: 30, height: 30 }}
          />
        </TouchableOpacity>
      </View>
      <Button
        title='Friends'
        onPress={() => navigation.navigate('FriendsList')}
      />
      <View style={userProfile.body}>
        <Text style={userProfile.text}>Name: {userData.name}</Text>
        <Text style={userProfile.text}>Score: {userData.score}</Text>
        <View>
          <Text>Friends</Text>
          <View>{friends.map((item) => (friendRow(item)))}</View>
        </View>
      </View>
    </View>
  );
};

export default Profile;
