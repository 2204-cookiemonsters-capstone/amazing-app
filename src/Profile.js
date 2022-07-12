import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, Button, Modal, Touchable, SafeAreaView, Platform } from "react-native";
import { Avatar } from "react-native-paper";
import { auth, firestore } from "../firebase";
import { userProfile, friendList } from "../styles";
import { doc, getDoc, getDocs, collection, deleteDoc, where } from "firebase/firestore";
import AntDesign from "react-native-vector-icons/AntDesign";
import EditProfileModal from "./EditProfileModal";
import FriendModal from "./FriendModal";
import OctIcons from "react-native-vector-icons/Octicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const Profile = ({ navigation }) => {
  const [userData, setUserData] = useState("");
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);

  const [visibilityProfile, setVisibilityProfile] = useState(false);

  useEffect(() => {
    setVisibilityProfile(true);
  }, []);

  const toggleVisibilityProfile = () => {
    setVisibilityProfile(false);
    navigation.goBack();
  };

  const getWidthScore = () => {
    return Number(30 + String(userData.score).length * 9);
  };

  const getUser = async () => {
    const docRef = doc(firestore, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setUserData(docSnap.data());
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const toggleEditModal = () => {
    setShowEditModal(!showEditModal);
  }

  const topMargin = Platform.OS=== 'ios' ? 30 : 0;

  return (
    <SafeAreaView>
      <Modal
      animationType='slide'
      visible={visibilityProfile}
      onRequestClose={() => toggleVisibilityProfile()}
    >
      <View style={{ backgroundColor: "#F0F0F0", height: "100%" }}>
        <View style={{ display: "flex", flexDirection: "column" }}
        >
          <View
            style={{ display: "flex", flexDirection: "row", marginBottom: 30, marginTop: topMargin }}
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
              onPress={() => toggleEditModal()}
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
                style={{ fontSize: 18, fontWeight: "500", marginBottom: 13 }}
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
            <Text style={{ fontWeight: "700", fontSize: 17 }}>My Stories</Text>
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
            <Text style={{ marginLeft: 15, fontSize: 18, fontWeight: "300" }}>
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
            <Text style={{ marginLeft: 15, fontSize: 18, fontWeight: "300" }}>
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
            <Text style={{ marginLeft: 15, fontSize: 18, fontWeight: "300" }}>
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
      <Modal
          animationType="slide"
          visible={showEditModal}
          onRequestClose={() => toggleEditModal()}
        >
          <EditProfileModal
            user={userData}
            closeModal={() => toggleEditModal()}
          />
      </Modal>
    </Modal>




    </SafeAreaView>
  );
};

export default Profile;
