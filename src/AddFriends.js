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
  getDoc,
  setDoc
} from 'firebase/firestore';

const image = require('../assets/favicon.png');

const AddFriends = ({ navigation }) => {
  const [friends, setFriends] = useState('');
  const [allUsers, setAllUsers] = useState([]);

  const fetchAllUsers = async () => {
    const snapShot = await getDocs(collection(firestore, 'users'));
    const users = [];
    snapShot.forEach((doc) => {
      users.push(doc.data());
    });

    allUsers !== users ? setAllUsers(users) : ''; //need this or else it will push to allUsers everytime we save
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);
  console.log('FINALLLLLLLLLL', allUsers);

  const handleAddFriend = (userid) => {
    const docRef = doc(firestore, 'users', auth.currentUser.uid, 'friendships', userid);
    // const colRef = collection(docRef, 'friendships');
    setDoc(docRef, {
      userid,

      status: 'pending', //the one sending
    });

    const docRef2 = doc(firestore, 'users', userid, 'friendships', auth.currentUser.uid);
    // const colRef2 = collection(docRef2, 'friendships');
    setDoc(docRef2, {
      userid: auth.currentUser.uid,
      status: 'incoming', // the one receiving
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
      </View>
      <View>
        <View style={{ margin: 25 }}>
          <Text style={{ fontWeight: '700', fontSize: 17 }}>Quick Add</Text>
        </View>
        <View style={{ bottom: 20 }}>
          <FlatList
            data={allUsers}
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
                    source={image}
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
                  <Text>3 Mutual Friends</Text>
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
                    onPress={()=> handleAddFriend(item.userid)}
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
