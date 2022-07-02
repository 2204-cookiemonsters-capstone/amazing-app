import { CurrentRenderContext } from '@react-navigation/native';
import React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';

const dummyUserTasks = [
  {id: 1, userId: 1, taskId:1, title: "read a book", description: "sample description for this task", status: "current", completed: true, postDescription: "post reflection", postImgUrl: "post image"},
{id: 2, userId: 1, taskId:2, title: "meditate", description: "sample description for this task", status: "current", completed: true, postDescription: "post reflection", postImgUrl: "post image"},
{id: 3, userId: 1, taskId:3, title: "spend an hour in nature", description: "sample description for this task", status: "current", completed: false, postDescription: "", postImgUrl: ""},
{id: 4, userId: 1, taskId:4, title: "reach out to someone you haven't spoken to in more than 6 months", description: "sample description for this task", status: "current", completed: false, postDescription: "", postImgUrl: ""},
{id: 5, userId: 1, taskId:5, title: "spend 30 minutes practicing deep breathing", description: "sample description for this task", status: "current", completed: false, postDescription: "", postImgUrl: ""},
{id: 6, userId: 1, taskId:6, title: "complete an art project", description: "sample description for this task", status: "current", completed: false, postDescription: "", postImgUrl: ""},
{id: 7, userId: 1, taskId:7, title: "write a journal entry", description: "sample description for this task", status: "current", completed: false, postDescription: "", postImgUrl: ""},
{id: 8, userId: 1, taskId:8, title: "practice an hour of moving your body", description: "sample description for this task", status: "current", completed: false, postDescription: "", postImgUrl: ""},
]

const Tasks = () => (
  <ScrollView>
  <View style={styles.container}>

    <Text style={styles.subheading}>Your tasks</Text>
    {dummyUserTasks.map((item) => (
        item.completed == false ? (
          <View style={styles.uncompletedContainer}>
             <Text style={styles.taskTitle}>{item.title}</Text>
             <Text style={styles.taskDescription}>{item.description}</Text>
          </View>) : null))}

          <View style={styles.line}></View>
          <Text style={styles.subheading}>Your completed tasks</Text>
          {dummyUserTasks.map((item) => (
        item.completed == true ? (
          <View >
            <Text style={styles.taskTitle}>{item.title}</Text>
            <Text style={styles.taskDescription}>{item.description}</Text>
          </View>) : null
    ))}

  </View>
  </ScrollView>
);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 100
  },
  subheading:{
    textAlign: "center", 
    paddingBottom: 30, 
    paddingTop: 20, 
    textTransform: 'capitalize', 
    letterSpacing: 2
  },
  taskTitle:{
    textAlign: "center", 
    paddingBottom: 5, 
    fontWeight: "800", 
    fontSize: 20 
  },
  taskDescription:{
    textAlign: "center", 
    paddingBottom: 30
  },
  line:{
    borderBottom:"1 solid gray"
  }
});

export default Tasks;
