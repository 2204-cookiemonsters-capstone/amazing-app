import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { TextInput, Button, Snackbar } from "react-native-paper";
import { auth, signOut, firestore } from "../firebase";
import { authStyle, userProfile } from "../styles";
import { doc, getDoc } from "firebase/firestore";
import AntDesign from 'react-native-vector-icons/AntDesign';

const EditProfile = ({ navigation }) => {
  const [userData, setUserData] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [email, setEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [hasNewEmail, setHasNewEmail] = useState(false);
  const [isValid, setIsValid] = useState(false);

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
      <ScrollView>
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
      <Text style={authStyle.header}>Edit your profile</Text>
        <TextInput
          label="Name"
          style={userProfile.input}
          mode="outlined"
          onChangeText={(name) => setName(name)}
          value={name}
        />
        <TextInput
          style={userProfile.input}
          value={username}
          autoCapitalize='none'
          mode="outlined"
          label="Username"
          onChangeText={(username) => setUsername(username.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '').replace(/[^a-z0-9]/gi, ''))}
          />
          <TextInput
              style={userProfile.input}
              autoCapitalize='none'
              mode="outlined"
              label="Email"
              value={email}
              disabled={hasNewEmail}
              onFocus={() => setHasNewEmail(!hasNewEmail)}
          />
          {hasNewEmail &&
          <View>
            <TextInput
              style={userProfile.input}
              autoCapitalize='none'
              mode="outlined"
              label="New Email"
              value={newEmail}
              onChangeText={(newEmail) => setNewEmail(newEmail)}
            />
            <TextInput
              style={userProfile.input}
              autoCapitalize='none'
              secureTextEntry={passwordVisible}
              mode="outlined"
              label="Password"
              right={<TextInput.Icon name={passwordVisible ? "eye" : "eye-off"} onPress={() => setPasswordVisible(!passwordVisible)} />}
              onChangeText={(password) => setPassword(password)}
            />
          </View>}
          <TouchableOpacity style={authStyle.submitButton} title="SaveUser">
            <Text>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={authStyle.submitButton} title="Signout" onPress={() => handleSignOut()}>
          <Text>Sign Out</Text>
        </TouchableOpacity>
      </View>
      <Snackbar
          visible={isValid.boolSnack}
          style={authStyle.snackbarError}
          duration={2000}
          onDismiss={() => {
            setIsValid({ boolSnack: false });
          }}
        >
          {isValid.message}
        </Snackbar>
      </ScrollView>
    </View>
  );
};


export default EditProfile;
