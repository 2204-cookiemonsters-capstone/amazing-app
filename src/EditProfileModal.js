import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  SafeAreaView,
  Keyboard,
  ScrollView,
  ImageBackground,
  Platform,
} from "react-native";
import {
  TextInput,
  Button,
  Snackbar,
  Avatar,
  TouchableRipple,
  Title,
} from "react-native-paper";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { auth, firestore, signOut, updateEmail } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";
import * as ImagePicker from "expo-image-picker";
import { authStyle, userProfile } from "../styles";
const userAvatar = require("../assets/favicon.png");
// console.log("AVATAR", avatar)

const EditProfileModal = ({ user, closeModal }) => {
  const [userData, setUserData] = useState("");
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [email, setEmail] = useState(user.email);
  const [hasNewEmail, setHasNewEmail] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [avatar, setAvatar] = useState(
    "https://cdn-icons-png.flaticon.com/512/1177/1177568.png"
  );

  const bs = React.createRef();
  const fall = new Animated.Value(1);

  const handleSignOut = () => {
    signOut(auth);
  };

  const handleSubmit = () => {
    if (username.length == 0) {
      setIsValid({
        bool: true,
        boolSnack: true,
        message: "Please enter a username",
      });
      return;
    }
    if (name.length == 0) {
      setIsValid({
        bool: true,
        boolSnack: true,
        message: "Please enter your name",
      });
      return;
    }
    if (email.length == 0) {
      setIsValid({
        bool: true,
        boolSnack: true,
        message: "Please enter your email",
      });
      return;
    }
    if (!hasNewEmail) {
      const userRef = doc(firestore, "users", auth.currentUser.uid);
      let updatedUser = { name, username, email };
      setDoc(userRef, updatedUser, { merge: true });
      return;
    }
    if (user.email !== email) {
      updateEmail(auth.currentUser, email).catch((error) => {
        setIsValid({
          bool: true,
          boolSnack: true,
          message: "Something went wrong: " + error.message,
        });
        return;
      });
    }
    Keyboard.dismiss();
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.cancelled) {
      setAvatar(result.uri);
    }
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      cropping: true,
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
    });

    console.log("RESULT", result);
    if (!result.cancelled) {
      setAvatar(result.uri);
    }
  };

  const renderInner = () => (
    <View style={userProfile.panel}>
      <View style={{ alignItems: "center" }}>
        <Text style={userProfile.panelTitle}>Upload your profile picture</Text>
      </View>
      <TouchableOpacity style={userProfile.panelButton} onPress={takePhoto}>
        <Text style={userProfile.panelButtonTitle}>Take a photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={userProfile.panelButton} onPress={pickImage}>
        <Text style={userProfile.panelButtonTitle}>Choose from library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={userProfile.panelButton}
        onPress={() => bs.current.snapTo(1)}
      >
        <Text style={userProfile.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <View style={userProfile.header}>
      <View style={userProfile.panelHeader}>
        <View style={userProfile.panelHandle}></View>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding'>
      <BottomSheet
        ref={bs}
        snapPoints={[300, 0]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
      />
      <SafeAreaView>
        <Animated.View
          style={{ opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)) }}
        >
          <TouchableOpacity
            style={{ position: "absolute", right: 20, zIndex: 10 }}
            onPress={closeModal}
          >
            <AntDesign name='close' size={24} color='black' />
          </TouchableOpacity>
          <ScrollView>
            <Title style={authStyle.header}>Edit your profile</Title>
            <View style={userProfile.body}>
              {/* ------------------------------ Bottom Slider ------------------------------------ */}
              <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
                <View
                  style={{
                    height: 100,
                    width: 100,
                    borderRadius: 15,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ImageBackground
                    source={{ uri: avatar }}
                    style={{ height: 100, width: 100 }}
                    imageStyle={{ borderRadius: 15 }}
                  >
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Icon
                        name='camera'
                        size={40}
                        color='white'
                        style={{
                          opacity: 0.4,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      />
                    </View>
                  </ImageBackground>
                </View>
              </TouchableOpacity>
              <TextInput
                label='Name'
                style={userProfile.input}
                autoCorrect={false}
                autoComplete={false}
                mode='outlined'
                onChangeText={(name) => setName(name)}
                value={name}
              />
              <TextInput
                style={userProfile.input}
                value={username}
                autoCapitalize='none'
                autoCorrect={false}
                autoComplete={false}
                mode='outlined'
                label='Username'
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
                autoCapitalize='none'
                autoCorrect={false}
                autoComplete={false}
                mode='outlined'
                label='Email'
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
                    autoCapitalize='none'
                    secureTextEntry={passwordVisible}
                    mode='outlined'
                    label='Password'
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
              <TouchableOpacity
                style={authStyle.submitButton}
                title='SaveUser'
                onPress={() => handleSubmit()}
              >
                <Text>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={authStyle.submitButton}
                title='Signout'
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
        </Animated.View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default EditProfileModal;
