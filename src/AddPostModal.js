import { AntDesign } from "@expo/vector-icons";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
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
} from "react-native";

import { SimpleLineIcons } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
DropDownPicker.setListMode("FLATLIST");

import { auth, firestore, storage } from "../firebase";

const AddPostModal = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);

  const [caption, setCaption] = useState("");

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
      };
      itemarr.push(item);
    });

    items !== itemarr ? setItems(itemarr) : null; //fix rerender everytime we save, not proudction necessary
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <View>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={{
          dispaly: "flex",
          flexDirection: "column",
          height: "100%",
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            height: 60,
            backgroundColor: "white",
          }}
        >
          <TouchableOpacity style={{ marginLeft: 10 }}>
            <AntDesign name='close' size={28} />
          </TouchableOpacity>
          <Text style={{ fontSize: 19, fontWeight: "500", marginLeft: 25 }}>
            New post
          </Text>
          <View style={{ flexGrow: 1 }} />
          <AntDesign name='arrowright' size={26} style={{ marginRight: 10 }} />
        </View>

        {/*IMAGE BACKGROUND*/}

        <TouchableOpacity
          style={{
            height: 365,
            width: "100%",
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
            borderBottomWidth: 0.5,
          }}
        >
          <SimpleLineIcons name='camera' size={40} />
          <Text style={{ fontSize: 21 }}>Add an image</Text>
        </TouchableOpacity>

        {/*DESCRIPTION*/}

        <View style={{ width: "50%", marginTop: 20, marginLeft: 10 }}>
          <Text style={{ fontWeight: "500", fontSize: 17, marginBottom: 15 }}>
            Task
          </Text>
          <DropDownPicker
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
              marginBottom: 15,
              marginTop: 15,
            }}
          >
            Caption
          </Text>
        </View>
        <View style={{ width: "95%", marginLeft: 10 }}>
          <TextInput
            style={styles.textEmail}
            placeholder='Add a caption!'
            label='caption'
            onChangeText={(e) => setCaption(e)}
            multiline
          />
        </View>
      </KeyboardAvoidingView>
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
});
