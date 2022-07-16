import { View, Text, Image, ScrollView, StyleSheet} from 'react-native';
import { Avatar } from "react-native-paper";

import React from 'react'

const stories = [
  {
    name: 'User 1',
    dateTime: new Date(),
    storyImg: 'https://firebasestorage.googleapis.com/v0/b/capstone-b8471.appspot.com/o/BOEh8LS6vwbxVDZIpLxrYbUScUC3%2Fstories%2F0e951132-d2b2-49e0-bdd2-b641c824dd48?alt=media&token=57610bd1-a6d0-47b7-8392-89b38d102454',
    userid: 'BOEh8LS6vwbxVDZIpLxrYbUScUC3'
  },
  {
    name: 'User 2',
    dateTime: new Date(),
    storyImg: 'https://firebasestorage.googleapis.com/v0/b/capstone-b8471.appspot.com/o/BOEh8LS6vwbxVDZIpLxrYbUScUC3%2Fstories%2F76de72c6-5723-4bba-9b2b-dbe3e88fe0e0?alt=media&token=29268491-d2f3-474f-bcf5-6853a39c33f4',
    userid: 'EINX1vfWuPYGymrD9K5mn0SS67j2'
  },
  {
    name: 'USer 3',
    dateTime: new Date(),
    storyImg: 'https://firebasestorage.googleapis.com/v0/b/capstone-b8471.appspot.com/o/BOEh8LS6vwbxVDZIpLxrYbUScUC3%2Fstories%2F1d8582ce-7c2c-49be-8260-4d8adc55b0d4?alt=media&token=ac7fe27c-fcfa-4cb4-82f4-f1564ace484f',
    userid: 'Lut57KwDW1MBiJY3GrPG1RA3Uxh2'
  },

]

export default function Stories() {
  return (
    <ScrollView style={{flex: 1}} horizontal>
      {stories.map((item, index) => (
        <View style={styles.story}>
          <Avatar.Image source={{uri: item.storyImg}} size={80}/>
          <Text style={styles.username}>{item.name}</Text>
        </View>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  story: {
    width: 85,
    padding: 5,
    marginTop: 5,
    marginLeft: 5
  },
  username: {
    textAlign: 'center',
    fontSize: 12,
    textTransform: 'lowercase',
    marginTop: 5
  }
})

