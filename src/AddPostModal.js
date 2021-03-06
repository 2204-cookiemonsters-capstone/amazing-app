import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import BottomSheet from "reanimated-bottom-sheet";
import { FontAwesome } from "@expo/vector-icons";

import { SimpleLineIcons } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
DropDownPicker.setListMode("FLATLIST");
import * as ImagePicker from "expo-image-picker";
import { auth, firestore, storage } from "../firebase";
import { ref, uploadBytes, blob, getDownloadURL } from "firebase/storage";
import {
  doc,
  setDoc,
  updateDoc,
  onSnapshot,
  getDoc,
  addDoc,
  collection,
} from "firebase/firestore";
import { userProfile } from "../styles";
import { v4 as uuidv4 } from "uuid";
import Animated from "react-native-reanimated";
import Toast from "react-native-root-toast";
import { RootSiblingParent } from "react-native-root-siblings";

const AddPostModal = (props) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(
    //name of the task
    props.initialValue ? props.initialValue : null
  ); //value of selected task

  const [items, setItems] = useState([]);

  const [imageURI, setImageURI] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const [caption, setCaption] = useState("");

  const [loading, setLoading] = useState(false);

  const [visibility, setVisibility] = useState("friends");

  const bs = useRef(null);
  const fall = new Animated.Value(1);

  const fetchItems = async () => {
    const docRef = doc(
      firestore,
      "users",
      auth.currentUser.uid,
      "posts",
      "July"
    );
    const snapShot = await getDoc(docRef);
    const itemarr = [];

    snapShot.data().userTasks.forEach((docs) => {
      const item = {
        label: docs.completed ? docs.title + " -completed" : docs.title,
        value: docs.title,
        disabled: docs.completed ? true : false,
        taskid: docs.taskId,
      };
      itemarr.push(item);
    });

    items !== itemarr ? setItems(itemarr) : null; //fix rerender everytime we save, not proudction necessary
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
    const imageRef = ref(storage, `${auth.currentUser.uid}/posts/${id}`);

    setImageURI(result.uri);

    const img = await fetch(result.uri);
    const bytes = await img.blob();
    uploadBytes(imageRef, bytes).then(() => {
      const reference = ref(storage, `${auth.currentUser.uid}/posts/${id}`);

      getDownloadURL(reference).then((x) => {
        setImageUrl(x);
      });
    });
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
    const imageRef = ref(storage, `${auth.currentUser.uid}/posts/${id}`);

    setImageURI(result.uri);

    const img = await fetch(result.uri);
    const bytes = await img.blob();

    uploadBytes(imageRef, bytes).then(() => {
      const reference = ref(storage, `${auth.currentUser.uid}/posts/${id}`);

      getDownloadURL(reference).then((x) => {
        setImageUrl(x);
      });
    });
    bs.current.snapTo(1);
  };

  async function updateUserPosts(taskId) {
    const snapShot = await getDoc(
      doc(firestore, "users", auth.currentUser.uid, "posts", "July")
    );

    let previousPosts = snapShot.data().userTasks;

    let userTasks = previousPosts.map((item) =>
      item.taskId !== taskId
        ? item
        : {
            ...item,
            completed: true,
            completedTime: Date.now(),
            reflection: caption,
            visibility: visibility,
          }
    );

    const postsRef = await doc(
      firestore,
      "users",
      auth.currentUser.uid,
      "posts",
      "July"
    );

    setDoc(postsRef, { userTasks }, { merge: true });
  }

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

  const handleSubmit = async () => {
    const reference = collection(firestore, "posts");
    try {
      setLoading(true);
      await addDoc(reference, {
        caption: caption,
        taskname: value,
        imageurl: imageUrl,
        userid: auth.currentUser.uid,
        timeposted: new Date(),
        likes: [],
        comments: [],
        visibility: visibility,
        taskid: items.find((item) => item.value === value).taskid,
      })
        .then(async function (docref) {
          await updateDoc(doc(firestore, "posts", docref.id), {
            postid: docref.id,
          });
        })
        .then(async () => {
          updateUserPosts(items.find((item) => item.value === value).taskid);
        });
      props.setAddPostVisible(false);
      setLoading(false);
    } catch (error) {
      Toast.show("Something went wrong, please try again", {
        duration: Toast.durations.LONG,
      });
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <View>
      <RootSiblingParent>
        <BottomSheet
          ref={bs}
          snapPoints={[300, 0]}
          renderContent={renderInner}
          renderHeader={renderHeader}
          initialSnap={1}
          callbackNode={fall}
          enabledGestureInteraction={true}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={{
            dispaly: "flex",
            flexDirection: "column",
            height: "100%",
            backgroundColor: !loading ? "white" : "black",
            opacity: loading ? 0.5 : null,
            marginTop: Platform.OS === "ios" ? 30 : 0,
          }}
        >
          {loading ? (
            <View
              style={{
                position: "absolute",
                zIndex: 10000,
                top: 330,
                left: 50,
                right: 50,
                bottom: 50,
              }}
            >
              <ActivityIndicator size='large' />
            </View>
          ) : null}
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              height: 60,
              backgroundColor: "white",
              position: "sticky",
            }}
          >
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              onPress={() => props.setAddPostVisible(false)}
            >
              <AntDesign name='close' size={28} />
            </TouchableOpacity>
            <Text style={{ fontSize: 19, fontWeight: "500", marginLeft: 25 }}>
              New post
            </Text>
            <View style={{ flexGrow: 1 }} />
            <TouchableOpacity
              onPress={() => handleSubmit()}
              disabled={!value || !imageUrl || !caption || loading}
            >
              <AntDesign
                name='arrowright'
                size={26}
                style={{ marginRight: 10 }}
              />
            </TouchableOpacity>
          </View>

          {/*IMAGE BACKGROUND*/}
          <ScrollView keyboardShouldPersistTaps='handled'>
            {!imageURI ? (
              <TouchableOpacity
                style={styles.addImage}
                onPress={() => bs.current.snapTo(0)}
              >
                <SimpleLineIcons name='camera' size={40} />
                <Text style={{ fontSize: 21 }}>Add an image</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{
                  height: 365,
                  width: "100%",
                  backgroundColor: "white",
                  justifyContent: "center",
                  alignItems: "center",
                  borderBottomWidth: 0.5,
                }}
                onPress={() => bs.current.snapTo(0)}
              >
                <Image
                  source={{ uri: imageURI }}
                  style={{ height: 365, width: "100%" }}
                />
              </TouchableOpacity>
            )}

            {/*DESCRIPTION*/}
            <View style={{ width: "100%", height: 370 }}>
              <View
                style={{
                  width: "50%",
                  marginTop: Platform.OS === "ios" ? 10 : 20,
                  marginLeft: 10,
                  zIndex: 1,
                }}
              >
                <Text
                  style={{
                    fontWeight: "500",
                    fontSize: 17,
                    marginBottom: Platform.OS === "ios" ? 0 : 15,
                  }}
                >
                  Task
                </Text>
                <DropDownPicker
                  zIndex={1000}
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                  placeholder='Pick a task'
                  flatListProps={{
                    initialNumToRender: 10,
                  }}
                />
                <Text
                  style={{
                    fontWeight: "500",
                    fontSize: 17,
                    marginBottom: Platform.OS === "ios" ? 5 : 15,
                    marginTop: 15,
                  }}
                >
                  Reflection
                </Text>
              </View>
              <View style={{ width: "95%", marginLeft: 10 }}>
                <TextInput
                  style={styles.textEmail}
                  placeholder='Add a reflection'
                  label='caption'
                  onChangeText={(e) => setCaption(e)}
                  multiline
                />
              </View>
              <View style={styles.visibility}>
                <FontAwesome name='eye' size={16} color='black' />
                <Text style={{ paddingLeft: 10 }}>Who can see this post?</Text>
              </View>

              {visibility === "private" ? (
                <View style={styles.visibilityOptions}>
                  <Text
                    style={{
                      paddingLeft: 10,
                      paddingRight: 10,
                      fontWeight: "700",
                    }}
                    onPress={() => setVisibility("private")}
                  >
                    only me
                  </Text>
                  <Text
                    style={{ paddingLeft: 10, paddingRight: 10 }}
                    onPress={() => setVisibility("friends")}
                  >
                    friends
                  </Text>
                </View>
              ) : null}

              {visibility === "friends" ? (
                <View style={styles.visibilityOptions}>
                  <Text
                    style={{ paddingLeft: 10, paddingRight: 10 }}
                    onPress={() => setVisibility("private")}
                  >
                    only me
                  </Text>
                  <Text
                    style={{
                      paddingLeft: 10,
                      paddingRight: 10,
                      fontWeight: "700",
                    }}
                    onPress={() => setVisibility("friends")}
                  >
                    friends
                  </Text>
                </View>
              ) : null}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </RootSiblingParent>
    </View>
  );
};

export default AddPostModal;

const styles = StyleSheet.create({
  textEmail: {
    borderWidth: 1,
    borderColor: "gray",
    width: "100%",
    height: 40,
    paddingTop: 3,
    paddingLeft: 10,
    borderRadius: 10,
  },
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.5,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  addImage: {
    height: 410,
    width: "100%",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 0.5,
  },
  visibilityOptions: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 30,
    paddingBottom: 30,
  },
  visibility: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
});
