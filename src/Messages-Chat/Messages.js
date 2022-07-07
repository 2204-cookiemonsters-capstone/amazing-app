import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { auth, firestore } from '../../firebase';
import {
  collection,
  getDocs,
  addDoc,
  query,
  onSnapshot,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';
import { useTheme } from 'react-navigation';

const image = require('../../assets/favicon.png');
const messages = [
  {
    id: '1',
    userName: 'Jenny Doe',
    userImg: require('../../assets/favicon.png'),
    messageTime: '4 mins ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '2',
    userName: 'John Doe',
    userImg: require('../../assets/favicon.png'),
    messageTime: '2 hours ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '3',
    userName: 'Ken William',
    userImg: require('../../assets/favicon.png'),
    messageTime: '1 hours ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '4',
    userName: 'Selina Paul',
    userImg: require('../../assets/favicon.png'),
    messageTime: '1 day ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '5',
    userName: 'Christy Alex1',
    userImg: require('../../assets/favicon.png'),
    messageTime: '2 days ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '6',
    userName: 'Christy Alex2',
    userImg: require('../../assets/favicon.png'),
    messageTime: '2 days ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '7',
    userName: 'Christy Alex3',
    userImg: require('../../assets/favicon.png'),
    messageTime: '2 days ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '8',
    userName: 'Christy Alex4',
    userImg: require('../../assets/favicon.png'),
    messageTime: '2 days ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '9',
    userName: 'Christy Alex5',
    userImg: require('../../assets/favicon.png'),
    messageTime: '2 days ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
];

const Messages = (props) => {
  const [allChatsData, setAllChatsData] = useState([]);

  const fetchAllChats = async () => {
    const snapShot = await getDocs(collection(firestore, 'chats'));

    const chats = []; //holds details of chat
    snapShot.forEach((doc) => {
      if (doc.data().userids.includes(auth.currentUser.uid)) {
        chats.push(doc.data());
      }
    });

    const userData = []; //data to be rendered on messages screen for each chat
    for (let i = 0; i < chats.length; i++) {
      const docSnap = await getDoc(
        doc(
          firestore,
          'users',
          chats[i].userids.filter((id) => id !== auth.currentUser.uid)[0]
        )
      );

      userData.push({
        ...docSnap.data(),
        lastMessage: chats.find(
          (chat) =>
            chat.userids.includes(docSnap.data().userid) &&
            chat.userids.includes(auth.currentUser.uid)
        ).messages[0],
        chatid: chats.find(
          (chat) =>
            chat.userids.includes(docSnap.data().userid) &&
            chat.userids.includes(auth.currentUser.uid)
        ).chatid,
      });
    }
    console.log(userData);
    allChatsData !== userData ? setAllChatsData(userData) : null;
  };

  useEffect(() => {
    fetchAllChats();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={allChatsData}
        keyExtractor={(chat) => chat.chatid} //might not see if we cant get the id
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 80, //fix navbar does not block the last item
        }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ width: '100%' }}
            onPress={() =>
              props.navigation.navigate('ChatScreen', { chatid: item.chatid })
            }
          >
            <View style={styles.userinfo}>
              <View style={styles.userimage}>
                <Image source={image} style={styles.img} />
              </View>
              <View style={styles.textView}>
                <View style={styles.userinfotext}>
                  <Text style={styles.username}>{item.name}</Text>
                  {/* <Text style={styles.posttime}>{item.messageTime}</Text> */}
                </View>
                <Text style={styles.messageText}>
                  {item.lastMessage.message}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: '#ee6e73',
          position: 'absolute',
          bottom: 70,
          right: 20,
          borderRadius: 70 / 2,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Ionicons name='add' size={26} color='white' />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 0,
  },
  userinfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userimage: {
    paddingTop: 15,
    paddingBottom: 15,
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textView: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 15,
    paddingLeft: 0,
    marginLeft: 10,
    width: 300,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  userinfotext: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  username: {
    fontSize: 14,
    fontWeight: 'bold',
    // fontFamily: 'serif',
  },
  posttime: {
    fontSize: 12,
    color: '#666',
    // fontFamily: 'serif',
    marginRight: 30,
  },
  messageText: {
    fontSize: 14,
    color: '#333333',
  },
});

export default Messages;
