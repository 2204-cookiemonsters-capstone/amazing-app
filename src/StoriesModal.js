import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, Image, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import { Avatar } from "react-native-paper";
// import GestureRecognizer, {swipeDirections} from "react-native-swipe-gestures";
import { AntDesign } from "@expo/vector-icons";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

export default function StoriesModal({ stories, toggleStoryModal, user }) {
  const [story, setStory] = useState(stories[0]);
  const [storyIndex, setStoryIndex] = useState(0);

  const handleNext = () => {
    if (storyIndex + 2 > stories.length) {
      toggleStoryModal();
    }
    setStory(stories[storyIndex + 1]);
    setStoryIndex(storyIndex + 1);
  };
  const handlePrevious = () => {
    if (storyIndex < 1) {
      toggleStoryModal();
    }
    setStory(stories[storyIndex - 1]);
    setStoryIndex(storyIndex - 1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={{ position: "absolute", top: 50, right: 20, zIndex: 10 }}
        onPress={() => toggleStoryModal()}
      >
        <AntDesign name="close" size={24} color="whitesmoke" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.rightButton} onPress={() => handleNext()}>
        <AntDesign name="right" size={24} color="whitesmoke" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.leftButton}
        onPress={() => handlePrevious()}
      >
        <AntDesign name="left" size={24} color="whitesmoke" />
      </TouchableOpacity>
      <View
        style={{
          position: "absolute",
          top: 50,
          left: 20,
          zIndex: 10,
          flexDirection: "row",
        }}
      >
        <Avatar.Text label={user.name.charAt(0)} size={50} />
        <View style={{ justifyContent: "center" }}>
          <Text style={[styles.text, { fontSize: "20" }]}>{user.name}</Text>
          <Text style={styles.text}>@{user.username}</Text>
        </View>
      </View>
      <View style={{ position: "absolute", top: 90, right: 22, zIndex: 10 }}>
        <Text style={styles.text}>
          {storyIndex + 1}/{stories.length}
        </Text>
      </View>
      <View>
        {story && (
          <Image source={{ uri: story.storyImg }} style={styles.image} />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  image: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").width,
  },
  text: {
    color: "white",
    marginBottom: 3,
    marginLeft: 5,
  },
  leftButton: {
    position: "absolute",
    left: 10,
    zIndex: 10,
    height: windowHeight,
    justifyContent: "center",
    alignItems: "flex-start",
    width: windowWidth / 3,
  },
  rightButton: {
    position: "absolute",
    right: 10,
    zIndex: 9,
    height: windowHeight,
    justifyContent: "center",
    alignItems: "flex-end",
    width: windowWidth / 3,
  },
});
