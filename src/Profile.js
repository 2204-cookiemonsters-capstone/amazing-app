import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Button,
  Modal,
  Touchable,
  SafeAreaView,
  TextInput,
} from "react-native";
import { auth, firestore } from "../firebase";
import { userProfile, friendList } from "../styles";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  deleteDoc,
  where,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import AntDesign from "react-native-vector-icons/AntDesign";
import EditProfileModal from "./EditProfileModal";
import FriendModal from "./FriendModal";
import OctIcons from "react-native-vector-icons/Octicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Toast from "react-native-root-toast";
import { RootSiblingParent } from "react-native-root-siblings";

const Profile = ({ navigation }) => {
  const [userData, setUserData] = useState("");
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);

  const [visibilityProfile, setVisibilityProfile] = useState(false);
  const [visibilitySettings, setVisibilitySettings] = useState(false);

  //UPDATING PROFILE STATES
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setVisibilityProfile(true);
  }, []);

  const toggleVisibilityProfile = () => {
    setVisibilityProfile(false);
    navigation.goBack();
  };

  const toggleVisibilitySettings = () => {
    setVisibilitySettings(false);
  };

  const getWidthScore = () => {
    return Number(30 + String(userData.score).length * 9);
  };

  // const getFriends = async () => {
  //   const snapShot = await getDocs(
  //     collection(firestore, "users", auth.currentUser.uid, "friendships")
  //   );
  //   const allFriends = [];
  //   snapShot.forEach((doc) => {
  //     if (doc.data().status === "friends") {
  //       allFriends.push(doc.data());
  //     }
  //   });
  //   // fetching all documents by mapping an array of promises and using Promise.all()
  //   const friendDocs = await Promise.all(
  //     allFriends.map((f) => getDoc(doc(firestore, "users", f.userid)))
  //   );
  //   // mapping array of document data
  //   const friendItems = friendDocs.map((i) => i.data());
  //   //set state
  //   setFriends(friendItems);
  //   console.log("GOT FRIENDS FROM DB");
  // };

  const getUser = async () => {
    const docRef = doc(firestore, "users", auth.currentUser.uid);
    onSnapshot(docRef, async (snapShot) => {
      setUserData(snapShot.data());
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  const toggleEditModal = () => {
    setShowEditModal(!showEditModal);
  };

  // THIS WAS THE CODE TO LAUNCH THE EDIT USER PROFILE MODAL
  // <Modal
  //     animationType="slide"
  //     visible={showEditModal}
  //     onRequestClose={() => toggleEditModal()}
  //   >
  //     <EditProfileModal
  //       user={userData}
  //       closeModal={() => toggleEditModal()}
  //     />
  // </Modal>
  // <View style={userProfile.topNav}>
  //   <TouchableOpacity
  //     style={userProfile.headerButtons}
  //     onPress={() => navigation.goBack()}
  //   >
  //     <AntDesign name='left' color='black' />
  //   </TouchableOpacity>
  //   <TouchableOpacity
  //     style={userProfile.headerButtons}
  //     onPress={() => toggleEditModal()} //edit this in auth path
  //    />

  const handleUpdate = async () => {
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

  return (
    <RootSiblingParent>
      <SafeAreaView>
        <Modal
          animationType='slide'
          visible={visibilityProfile}
          onRequestClose={() => toggleVisibilityProfile()}
        >
          <View style={{ backgroundColor: "#F0F0F0", height: "100%" }}>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: 30,
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: "white",
                    borderRadius: 25,
                    height: 35,
                    width: 35,
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: 15,
                    marginTop: 15,
                    shadowColor: "#7F5DF0",
                    shadowOffset: {
                      width: 0,
                      height: 10,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.5,
                    elevation: 5,
                  }}
                  onPress={() => toggleVisibilityProfile()}
                >
                  <AntDesign name='down' size={20} />
                </TouchableOpacity>
                <View style={{ flexGrow: 1 }} />
                <TouchableOpacity
                  style={{
                    backgroundColor: "white",
                    borderRadius: 25,
                    height: 35,
                    width: 35,
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 15,
                    marginRight: 15,
                    shadowColor: "#7F5DF0",
                    shadowOffset: {
                      width: 0,
                      height: 10,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.5,
                    elevation: 5,
                  }}
                  onPress={() => setVisibilitySettings(true)}
                >
                  <OctIcons name='gear' size={20} />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  height: 60,
                  marginTop: 0,
                  marginLeft: 20,
                }}
              >
                <TouchableWithoutFeedback>
                  <Image
                    source={require("../assets/favicon.png")}
                    style={{ width: 60, height: 60, resizeMode: "contain" }}
                  />
                </TouchableWithoutFeedback>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: 20,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "500",
                      marginBottom: 13,
                    }}
                  >
                    {userData.name}
                  </Text>

                  <Text style={{ color: "grey", fontSize: 12 }}>
                    {userData.username}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 15,
                  height: 30,
                  justifyContent: "center",
                  alignItems: "center",
                  width: getWidthScore(),
                  display: "flex",
                  flexDirection: "row",
                  marginTop: 10,
                  marginLeft: 15,
                  shadowColor: "#7F5DF0",
                  shadowOffset: {
                    width: 0,
                    height: 10,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.5,
                  elevation: 5,
                }}
              >
                <AntDesign name='aliwangwang-o1' />
                <Text> {userData.score}</Text>
              </View>
              <View style={{ marginTop: 25, marginLeft: 15 }}>
                <Text style={{ fontWeight: "700", fontSize: 17 }}>
                  My Stories
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: 20,
                  backgroundColor: "white",
                  marginRight: 15,
                  marginLeft: 15,
                  height: 55,
                  alignItems: "center",
                  borderRadius: 15,
                  shadowColor: "#7F5DF0",
                  shadowOffset: {
                    width: 0,
                    height: 10,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.5,
                  elevation: 5,
                }}
              >
                <SimpleLineIcons
                  name='camera'
                  size={30}
                  style={{ marginLeft: 20 }}
                />
                <Text
                  style={{ marginLeft: 15, fontSize: 18, fontWeight: "300" }}
                >
                  Add To My Story
                </Text>
                <View style={{ flexGrow: 1 }} />
                <AntDesign
                  name='right'
                  size={18}
                  color='lightgray'
                  style={{ marginRight: 15 }}
                />
              </TouchableOpacity>
              <View style={{ marginTop: 25, marginLeft: 15 }}>
                <Text style={{ fontWeight: "700", fontSize: 18 }}>Friends</Text>
              </View>
              <TouchableOpacity
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: 20,
                  backgroundColor: "white",
                  marginRight: 15,
                  marginLeft: 15,
                  height: 55,
                  alignItems: "center",
                  borderRadius: 15,
                  shadowColor: "#7F5DF0",
                  shadowOffset: {
                    width: 0,
                    height: 10,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.5,
                  elevation: 5,
                }}
                onPress={() => {
                  setVisibilityProfile(false);
                  navigation.goBack();
                  navigation.navigate("AddFriends");
                }}
              >
                <Image
                  source={require("../assets/addperson.png")}
                  style={{
                    width: 30,
                    height: 30,
                    resizeMode: "contain",
                    marginLeft: 15,
                  }}
                />
                <Text
                  style={{ marginLeft: 15, fontSize: 18, fontWeight: "300" }}
                >
                  Add Friends
                </Text>
                <View style={{ flexGrow: 1 }} />
                <AntDesign
                  name='right'
                  size={18}
                  color='lightgray'
                  style={{ marginRight: 15 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: 10,
                  backgroundColor: "white",
                  marginRight: 15,
                  marginLeft: 15,
                  height: 55,
                  alignItems: "center",
                  borderRadius: 15,
                  shadowColor: "#7F5DF0",
                  shadowOffset: {
                    width: 0,
                    height: 10,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.5,
                  elevation: 5,
                }}
                onPress={() => {
                  setVisibilityProfile(false);
                  navigation.goBack();
                  navigation.navigate("FriendsList");
                }}
              >
                <Image
                  source={require("../assets/friendlist2.png")}
                  style={{
                    width: 33,
                    height: 33,
                    resizeMode: "contain",
                    marginLeft: 15,
                  }}
                />
                <Text
                  style={{ marginLeft: 15, fontSize: 18, fontWeight: "300" }}
                >
                  My Friends
                </Text>
                <View style={{ flexGrow: 1 }} />
                <AntDesign
                  name='right'
                  size={18}
                  color='lightgray'
                  style={{ marginRight: 15 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal
          animationType='slide'
          visible={visibilitySettings}
          onRequestClose={() => toggleVisibilitySettings()}
        >
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
                  style={{
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
                  }}
                  onPress={() => toggleVisibilityProfile()}
                >
                  <AntDesign name='left' size={20} color='lightgreen' />
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
                style={{
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
                }}
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
                <Image
                  source={require("../assets/favicon.png")}
                  style={{ width: 80, height: 80, marginTop: 12 }}
                />
                <TouchableOpacity
                  style={{
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
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "500",
                      fontSize: 17,
                      color: "skyblue",
                    }}
                  >
                    Upload
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
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
                    marginLeft: 5,
                  }}
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
                    style={{
                      borderWidth: 0.3,
                      borderColor: "gray",
                      width: "100%",
                      height: 40,
                      paddingTop: 3,
                      paddingLeft: 10,
                      borderRadius: 10,
                    }}
                    placeholder={userData.username}
                    label='Username'
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
                    style={{
                      borderWidth: 0.3,
                      borderColor: "gray",
                      width: "100%",
                      height: 40,
                      paddingTop: 3,
                      paddingLeft: 10,
                      borderRadius: 10,
                    }}
                    onChangeText={(e) => setName(e)}
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
                  style={{
                    borderWidth: 0.3,
                    borderColor: "gray",
                    width: "100%",
                    height: 40,
                    paddingTop: 3,
                    paddingLeft: 10,
                    borderRadius: 10,
                  }}
                  placeholder={userData.email}
                  onChangeText={(e) => setEmail(e)}
                />
              </View>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "white",
                  borderRadius: 25,
                  height: 40,
                  width: 100,
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 30,
                  shadowColor: "#7F5DF0",
                  shadowOffset: {
                    width: 0,
                    height: 10,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.5,
                  elevation: 5,
                  marginRight: 10,
                  marginLeft: 5,
                }}
                disabled={username === "" && email === "" && name === ""}
                onPress={() => handleUpdate()}
              >
                <Text style={{ fontWeight: "500", fontSize: 18 }}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </RootSiblingParent>
  );
};

export default Profile;
