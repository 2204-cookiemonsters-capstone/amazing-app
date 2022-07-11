import React, { useState } from "react";
import { Text, View, TouchableOpacity, KeyboardAvoidingView, SafeAreaView, FlatList, Keyboard, ScrollView, Image} from "react-native";
import { TextInput, Button, Snackbar } from "react-native-paper";
import { auth, firestore, signOut, updateEmail } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { authStyle, userProfile } from "../styles";

const EditProfileModal = ({ user, closeModal }) => {
  const [userData, setUserData] = useState("");
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [email, setEmail] = useState(user.email);
  const [hasNewEmail, setHasNewEmail] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const handleSignOut = () => {
    signOut(auth);
  };

  const handleSubmit = () => {
    // console.log(name, username, email, newEmail);
    if (username.length == 0) {
      setIsValid({
        bool: true,
        boolSnack: true,
        message: 'Please enter a username',
      });
      return;
    }
    if (name.length == 0) {
      setIsValid({
        bool: true,
        boolSnack: true,
        message: 'Please enter your name',
      });
      return;
    }
    if (email.length == 0) {
      setIsValid({
        bool: true,
        boolSnack: true,
        message: 'Please enter your email',
      });
      return
    }
    if (!hasNewEmail) {
      const userRef = doc(firestore, 'users', auth.currentUser.uid);
      let updatedUser = {name, username, email};
      setDoc(userRef, updatedUser, {merge: true});
      return
    }
    if (user.email !== email) {
      updateEmail(auth.currentUser, email).catch(error => {
        setIsValid({
          bool: true,
          boolSnack: true,
          message: 'Something went wrong: ' + error.message,
        });
        return
      })
    }
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <SafeAreaView>
        <TouchableOpacity
          style={{ position: "absolute", top: 64, right: 32, zIndex: 10 }}
          onPress={closeModal}
        >
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>
        <ScrollView>
          <View style={userProfile.body}>
            <Image
              source={require("../assets/user-avatar.png")}
              style={{ width: 100, height: 100 }}
            />
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
              autoCapitalize="none"
              mode="outlined"
              label="Username"
              onChangeText={(username) =>
                setUsername(
                  username
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .replace(/\s+/g, "")
                    .replace(/[^a-z0-9]/gi, "")
                )
              }
            />
            <TextInput
              style={userProfile.input}
              autoCapitalize="none"
              mode="outlined"
              label="Email"
              value={email}
              onChangeText={(email) => {
                setEmail(email);
                setHasNewEmail(true);
              }}
            />
            {hasNewEmail && (
              <View>
                <TextInput
                  style={userProfile.input}
                  autoCapitalize="none"
                  secureTextEntry={passwordVisible}
                  mode="outlined"
                  label="Password"
                  right={
                    <TextInput.Icon
                      name={passwordVisible ? "eye" : "eye-off"}
                      onPress={() => setPasswordVisible(!passwordVisible)}
                    />
                  }
                  onChangeText={(password) => setPassword(password)}
                />
              </View>
            )}
            <TouchableOpacity style={authStyle.submitButton} title="SaveUser" onPress={() => handleSubmit()}>
              <Text>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={authStyle.submitButton}
              title="Signout"
              onPress={() => handleSignOut()}
            >
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
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default EditProfileModal;
