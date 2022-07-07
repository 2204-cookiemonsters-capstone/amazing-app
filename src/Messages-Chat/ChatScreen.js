import { Text, View, StyleSheet } from 'react-native';
import React, { Component, useEffect, useState, useCallback } from 'react';
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
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

//https://stackoverflow.com/questions/58844095/how-to-get-firestore-document-id
const ChatScreen = (props) => {
  const [allMessages, setAllMessages] = useState([]);
  const [previousMessages, setPreviousMessages] = useState([]);

  const fetchMessages = async () => {
    const docRef = doc(firestore, 'chats', props.route.params.chatid);
    const docSnap = await getDoc(docRef);

    const chatData = [];
    const data = docSnap.data();

    if (docSnap.exists()) {
      previousMessages !== data.messages
        ? setPreviousMessages(data.messages)
        : null;

      for (let i = 0; i < data.messages.length; i++) {
        const message = data.messages[i];
        chatData.push({
          _id: i,
          text: message.message,
          createdAt: new Date(),
          user: {
            _id: message.userid,
            name: 'React Native',
          },
        });
      }

      allMessages !== chatData ? setAllMessages(chatData) : null;
    } else {
      console.log('No Such Documents');
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const onSend = useCallback((messages = []) => {
    setAllMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  const handleSubmit = async (messages) => {
    onSend(messages);

    const message = {
      message: messages[0].text,
      userid: messages[0].user._id,
    };

    const res = await setDoc(
      doc(firestore, 'chats', props.route.params.chatid),
      {
        messages: [message, ...previousMessages],
      }
    );
  };

  const sendMessageFirebase = async () => {};

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: 'red',
          },
          left: {
            backgroundColor: '#24CCE7',
          },
        }}
        textStyle={{
          right: {
            color: 'white',
          },
          left: {
            color: '#ECF0F1',
          },
        }}
      />
    );
  };

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name='send-circle'
            style={{ marginBottom: 5, marginRight: 5 }}
            size={32}
            color='#2e64e5'
          />
        </View>
      </Send>
    );
  };

  const scrollToBottomComponent = () => {
    return <FontAwesome name='angle-double-down' size={22} color='#333' />;
  };

  return (
    <GiftedChat
      messages={allMessages}
      onSend={(messages) => handleSubmit(messages)}
      user={{
        _id: auth.currentUser.uid,
      }}
      renderBubble={renderBubble}
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
      scrollToBottomStyle={{ alignItems: 'center' }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ChatScreen;
