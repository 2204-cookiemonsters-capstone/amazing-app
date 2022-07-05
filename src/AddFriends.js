import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Touchable,
  Image,
  FlatList,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { auth, firestore } from '../firebase';
import {
  collection,
  getDocs,
  addDoc,
  query,
  onSnapshot,
  doc,
} from 'firebase/firestore';

const image = require('../assets/favicon.png');

const users = [
  {
    id: '1',
    name: 'John',
    username: 'johndoe123',
    imageURL: image,
    mutalFriends: '3 Mutual Friends',
  },
  {
    id: '2',
    name: 'John',
    username: 'johndoe123',
    imageURL: image,
    mutalFriends: '3 Mutual Friends',
  },
  {
    id: '3',
    name: 'John',
    username: 'johndoe123',
    imageURL: image,
    mutalFriends: '3 Mutual Friends',
  },
  {
    id: '4',
    name: 'John',
    username: 'johndoe123',
    imageURL: image,
    mutalFriends: '3 Mutual Friends',
  },
  {
    id: '5',
    name: 'John',
    username: 'johndoe123',
    imageURL: image,
    mutalFriends: '3 Mutual Friends',
  },
  {
    id: '6',
    name: 'John',
    username: 'johndoe123',
    imageURL: image,
    mutalFriends: '3 Mutual Friends',
  },
  {
    id: '7',
    name: 'John',
    username: 'johndoe123',
    imageURL: image,
    mutalFriends: '3 Mutual Friends',
  },
  {
    id: '8',
    name: 'John',
    username: 'johndoe123',
    imageURL: image,
    mutalFriends: '3 Mutual Friends',
  },
  {
    id: '9',
    name: 'John',
    username: 'johndoe123',
    imageURL: image,
    mutalFriends: '3 Mutual Friends',
  },
  {
    id: '10',
    name: 'John',
    username: 'johndoe123',
    imageURL: image,
    mutalFriends: '3 Mutual Friends',
  },
];

const AddFriends = ({ navigation }) => {
  const [friends, setFriends] = useState('');
  // useEffect(() => {
  //   const getFriends = async () => {
  //     const subColRef = collection(
  //       firestore,
  //       'users',
  //       auth.currentUser.uid,
  //       'friendships'
  //     );
  //     const docSnaps = await getDocs(subColRef);
  //     console.log('SUB COLLECTION REF', subColRef);
  //     if (docSnaps.exists()) {
  //       setFriends(docSnaps.data());
  //     }
  //   };
  //   getFriends();
  // }, []);
  // console.log('USER ID', auth.currentUser.uid);
  // console.log('FRIENDSHIPS', friends);
  const handleAddFriend = (userid) => {
    const docRef = doc(firestore, 'users', auth.currentUser.uid);
    const colRef = collection(docRef, 'friendships');
    addDoc(colRef, {
      userid,
      status: 'friends',
    });
  };
  return (
    <View>
      <View style={{ display: 'flex', marginTop: 40, marginLeft: 13 }}>
        <TouchableOpacity
          style={{
            backgroundColor: 'aqua', //random vibrant color for now, style our app later
            borderRadius: 25,
            height: 35,
            width: 35,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name='left' color='black' />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: 'aqua', //random vibrant color for now, style our app later
            // borderRadius: 25,
            height: 35,
            width: 100,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => handleAddFriend('users/XOKZaVFNqQaFyng2pTlgq1rOkuo1')}
        >
          <Text>Add Friend</Text>
        </TouchableOpacity>
      </View>
      <View>
        <View style={{ margin: 25 }}>
          <Text style={{ fontWeight: '700', fontSize: 17 }}>Quick Add</Text>
        </View>
        <View style={{ bottom: 20 }}>
          <FlatList
            data={users}
            keyExtractor={(user) => user.id}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 430, //fix navbar does not block the last item
            }}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  marginLeft: 25,
                  marginTop: 10,
                  borderLeftWidth: 1,
                  borderRightWidth: 1,
                  borderBottomWidth: 1,
                  borderTopWidth: 1,
                  marginRight: 25,
                  borderColor: '#cccccc',
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <TouchableOpacity>
                  <Image
                    source={item.imageURL}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 25,
                      margin: 10,
                    }}
                  />
                </TouchableOpacity>
                <View style={{ display: 'flex', flexDirection: 'column' }}>
                  <Text>{item.name}</Text>
                  <Text>{item.username}</Text>
                  <Text>{item.mutalFriends}</Text>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: 30,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      backgroundColor: 'red',
                      borderTopLeftRadius: 10,
                      borderBottomLeftRadius: 10,
                      borderTopRightRadius: 10,
                      borderBottomRightRadius: 10,
                      height: 30,
                      justifyContent: 'center',
                      alignItems: 'center',
                      display: 'flex',
                      flexDirection: 'row',
                    }}
                  >
                    <View style={{ marginLeft: 13, marginRight: 8 }}>
                      <Image
                        source={require('../assets/ADDFRIEND2.png')}
                        style={{ width: 15, height: 15 }}
                      />
                    </View>
                    <Text style={{ marginRight: 14 }}>Add</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            )}
          ></FlatList>
        </View>
      </View>
    </View>
  );
};

export default AddFriends;
