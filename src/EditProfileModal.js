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
  StyleSheet,
  Image,
  TextInput,
  ActivityIndicator,
} from "react-native";
import {
  Button,
  Snackbar,
  Avatar,
  TouchableRipple,
  Title,
} from "react-native-paper";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { auth, firestore, signOut, updateEmail, storage } from "../firebase";
import { ref, uploadBytes, blob, getDownloadURL } from "firebase/storage";
import { doc, setDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";
import * as ImagePicker from "expo-image-picker";
import { authStyle, userProfile } from "../styles";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

import Toast from "react-native-root-toast";
import { RootSiblingParent } from "react-native-root-siblings";
import { useEffect } from "react";

const EditProfileModal = ({ setVisibilitySettings }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState("");

  const bs = React.createRef();
  const fall = new Animated.Value(1);

  const getUser = async () => {
    const docRef = doc(firestore, "users", auth.currentUser.uid);
    onSnapshot(docRef, async (snapShot) => {
      setUserData(snapShot.data());
    });
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });

    const id = uuidv4();
    const imageRef = ref(storage, `${auth.currentUser.uid}/profilepic/${id}`);

    const img = await fetch(result.uri);
    const bytes = await img.blob();
    uploadBytes(imageRef, bytes).then(() => {
      const reference = ref(
        storage,
        `${auth.currentUser.uid}/profilepic/${id}`
      );

      getDownloadURL(reference).then((x) => {
        const userRef = doc(firestore, "users", auth.currentUser.uid);
        updateDoc(
          userRef,
          {
            profilepic: x,
          },
          { merge: true }
        );
        Toast.show("Profile Photo Updated", {
          duration: Toast.durations.LONG,
        });
      });
    });

    //making a reference to image to the user

    bs.current.snapTo(1);
  };

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert(
        "You've denied permission to allow this app to access your camera."
      );
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    const id = uuidv4();
    const imageRef = ref(storage, `${auth.currentUser.uid}/profilepic/${id}`);

    const img = await fetch(result.uri);
    const bytes = await img.blob();

    uploadBytes(imageRef, bytes).then(() => {
      const reference = ref(
        storage,
        `${auth.currentUser.uid}/profilepic/${id}`
      );

      getDownloadURL(reference).then((x) => {
        console.log(x);
        const userRef = doc(firestore, "users", auth.currentUser.uid);
        updateDoc(
          userRef,
          {
            profilepic: x,
          },
          { merge: true }
        );
        Toast.show("Profile Photo Updated", {
          duration: Toast.durations.LONG,
        });
      });
    });

    bs.current.snapTo(1);
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleUpdate = async () => {
    if (userData.email !== email) {
      updateEmail(auth.currentUser, email).catch((error) => {
        setIsValid({
          bool: true,
          boolSnack: true,
          message: "Something went wrong: " + error.message,
        });
        return;
      });
    }

    const reference = doc(firestore, "users", auth.currentUser.uid);
    await updateDoc(reference, {
      username: username !== "" ? username : userData.username,
      name: name !== "" ? name : userData.name,
      email: email !== "" ? email : userData.email,
    });

    Toast.show("Profile Updated", {
      duration: Toast.durations.SHORT,
    });

    setVisibilitySettings(false);
  };

  const handleRemove = async () => {
    const userRef = doc(firestore, "users", auth.currentUser.uid);
    await updateDoc(
      userRef,
      {
        profilepic: null,
      },
      { merge: true }
    );

    setVisibilitySettings(false);
    setVisibilitySettings(true);
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
    <RootSiblingParent>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <BottomSheet
          ref={bs}
          snapPoints={[300, 0]}
          renderContent={renderInner}
          renderHeader={renderHeader}
          initialSnap={1}
          callbackNode={fall}
          enabledGestureInteraction={true}
        />
        <View
          style={{
            backgroundColor: "white",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <View
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              backgroundColor: "white",
              height: "8%",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
              }}
              onPress={() => setVisibilitySettings(false)}
            >
              <View
                style={styles.smallButton}
                onPress={() => setVisibilitySettings(false)}
              >
                <AntDesign name="left" size={20} color="lightgreen" />
              </View>
              <Text
                style={{
                  fontSize: 21,
                  color: "lightgreen",
                  fontWeight: "500",
                }}
              >
                Settings
              </Text>
            </TouchableOpacity>
            <View style={{ flexGrow: 1 }} />
            <TouchableOpacity
              style={styles.button}
              onPress={() => auth.signOut()}
            >
              <Text style={{ fontWeight: "500", fontSize: 17, color: "red" }}>
                Sign Out
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginLeft: 20, marginTop: 10 }}>
            <Text style={{ fontWeight: "500", fontSize: 18 }}>Avatar</Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {isLoading ? (
                <View
                  style={{
                    width: 80,
                    height: 80,
                    marginTop: 12,
                    justifyContent: "center",
                  }}
                >
                  <ActivityIndicator size="large" color={"blue"} />
                </View>
              ) : (
                <Image
                  source={
                    userData.profilepic
                      ? { uri: userData.profilepic }
                      : require("../assets/defaultprofileicon.webp")
                  }
                  style={{
                    width: 80,
                    height: 80,
                    marginTop: 12,
                    borderRadius: 40,
                  }}
                />
              )}

              <TouchableOpacity
                style={styles.signoutBut}
                onPress={() => bs.current.snapTo(0)}
              >
                <Text
                  style={{
                    fontWeight: "500",
                    fontSize: 17,
                    color: "skyblue",
                  }}
                >
                  Edit
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleRemove()}
              >
                <Text
                  style={{ fontWeight: "500", fontSize: 17, color: "gray" }}
                >
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              borderBottomWidth: 0.3,
              borderColor: "gray",
              marginTop: 30,
              marginLeft: "8%",
              marginRight: "8%",
            }}
          />
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 30,
            }}
          >
            <View style={{ disply: "flex", flexDirection: "row" }}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "44%",
                  marginLeft: 12,
                }}
              >
                <Text
                  style={{
                    fontWeight: "500",
                    fontSize: 17,
                    marginBottom: 15,
                  }}
                >
                  Username
                </Text>
                <TextInput
                  style={styles.textSmall}
                  placeholder={userData.username}
                  label="Username"
                  onChangeText={(e) => setUsername(e)}
                />
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "44%",
                  marginLeft: 20,
                }}
              >
                <Text
                  style={{
                    fontWeight: "500",
                    fontSize: 17,
                    marginBottom: 15,
                  }}
                >
                  Full Name
                </Text>
                <TextInput
                  style={styles.textSmall}
                  onChangeText={(e) => setName(e)}
                  label="Name"
                  placeholder={userData.name}
                />
              </View>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                marginTop: 30,
                paddingLeft: 12,
                paddingRight: 12,
              }}
            >
              <Text
                style={{ fontWeight: "500", fontSize: 17, marginBottom: 15 }}
              >
                Email Address
              </Text>
              <TextInput
                style={styles.textEmail}
                placeholder={userData.email}
                label="email"
                onChangeText={(e) => setEmail(e)}
              />
            </View>
          </View>
          <View style={styles.flexRow}>
            <TouchableOpacity
              style={{ ...styles.button, marginTop: 30 }}
              disabled={username === "" && email === "" && name === ""}
              onPress={() => handleUpdate()}
            >
              <Text style={{ fontWeight: "500", fontSize: 18 }}>Update</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </RootSiblingParent>
  );
};

export default EditProfileModal;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "white",
    borderRadius: 25,
    height: 35,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 3,
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
    marginRight: 20,
  },
  smallButton: {
    backgroundColor: "white",
    borderRadius: 25,
    height: 35,
    width: 35,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 3,
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
    marginRight: 10,
  },
  signoutBut: {
    backgroundColor: "white",
    borderRadius: 25,
    height: 40,
    width: 85,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 3,
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
    marginRight: 10,
    marginLeft: 20,
  },
  textEmail: {
    borderWidth: 0.3,
    borderColor: "gray",
    width: "100%",
    height: 40,
    paddingTop: 3,
    paddingLeft: 10,
    borderRadius: 10,
  },
  textSmall: {
    borderWidth: 0.3,
    borderColor: "gray",
    width: "100%",
    height: 40,
    paddingTop: 3,
    paddingLeft: 10,
    borderRadius: 10,
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
