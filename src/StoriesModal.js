import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native'
import React, {useState, useEffect} from 'react'
// import GestureRecognizer, {swipeDirections} from "react-native-swipe-gestures";
import { AntDesign } from "@expo/vector-icons"

export default function StoriesModal({stories, toggleStoryModal}) {
  const [story, setStory] = useState(stories[0]);
  const [storyIndex, setStoryIndex] = useState(0);

  const handleNext = () => {
    if(storyIndex >= stories.length - 1) {
      toggleStoryModal()
    }
    setStory(stories[storyIndex + 1])
    setStoryIndex(storyIndex + 1)
  }
  const handlePrevious = () => {
    if(storyIndex < 0) {
      toggleStoryModal()
    }
    setStoryIndex(storyIndex - 1)
    setStory(stories[storyIndex])
  }


  return (
    <SafeAreaView  style={styles.container}>
      <TouchableOpacity
          style={{ position: "absolute", top: 50, right: 20, zIndex: 10 }}
          onPress={() => toggleStoryModal()}
        >
          <AntDesign name="close" size={24} color="whitesmoke" />
      </TouchableOpacity>
      <TouchableOpacity
          style={{ position: "absolute", top: 500, right: 20, zIndex: 10 }}
          onPress={() => toggleStoryModal()}
        >
          <AntDesign name="right" size={24} color="whitesmoke" />
      </TouchableOpacity>
      <View>
        {story && <Image source={{uri: story.storyImg}} style={styles.image}/>}

      </View>
    </SafeAreaView>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width
  }
})
