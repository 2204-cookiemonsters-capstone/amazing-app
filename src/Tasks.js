import { CurrentRenderContext } from '@react-navigation/native';
import React, {useState} from 'react';
import { Text, View, StyleSheet, ScrollView, Image, ImageBackground } from 'react-native';

const dummyUserTasks = [
  {id: 1, userId: 1, taskId:1, title: "read a book", description: "sample description for this task this is just a sample description for a task this is just a sample description for a task", status: "current", completed: true, postDescription: "this is my reflection on the book I read. I recommend this book because...", postImgUrl: "https://imgur.com/BxZS95D", endDate: "July 30"},
  {id: 2, userId: 1, taskId:2, title: "meditate", description: "sample description for this task this is just a sample description for a task this is just a sample description for a task", status: "current", completed: true, postDescription: "this is my reflection on meditating. I'm not good at meditation so this one was a challenge...etc", postImgUrl: "https://imgur.com/Ev7LLdE", endDate: "July 30"},
  {id: 3, userId: 1, taskId:3, title: "spend an hour in nature", description: "sample description for this task this is just a sample description for a task this is just a sample description for a task", status: "current", completed: true, postDescription: "This is my reflection on nature. It was nice to get outdoors.", postImgUrl: "https://imgur.com/hZ4pnHI", endDate: "July 30"},
  {id: 4, userId: 1, taskId:4, title: "example task", description: "sample description for this task this is just a sample description for a task this is just a sample description for a task", status: "current", completed: false, postDescription: "", postImgUrl: "", endDate: "July 30"},
  {id: 5, userId: 1, taskId:5, title: "spend 30 minutes practicing deep breathing", description: "sample description for this task this is just a sample description for a task this is just a sample description for a task", status: "current", completed: true, postDescription: "This is my reflection on deep breathing. I felt so much more relaxed after 30 minutes.", postImgUrl: "https://imgur.com/DsehfR6", endDate: "July 30"},
  {id: 6, userId: 1, taskId:6, title: "complete an art project", description: "sample description for this task this is just a sample description for a task this is just a sample description for a task", status: "current", completed: true, postDescription: "Doodling is something I used to do a lot when I was younger. I picked up a pen and just started drawing and drew this...", postImgUrl: "https://imgur.com/xVtrThI", endDate: "July 30"},
  {id: 7, userId: 1, taskId:7, title: "write a journal entry", description: "sample description for this task this is just a sample description for a task this is just a sample description for a task", status: "current", completed: false, postDescription: "", postImgUrl: "", endDate: "July 30"},
  {id: 8, userId: 1, taskId:8, title: "sample task ", description: "sample description for this task sample for this task this is just a sample description for a task this is just a sample description for a task", status: "current", completed: false, postDescription: "", postImgUrl: "", endDate: "July 30"},
]

const Tasks = (props) => {
const [view, setView] = useState('tasks')
const [open, setOpen] = useState(0)

let completed = dummyUserTasks.filter((item) => item.completed === true)

const handleView = (view) => {
  setView(view)
  setOpen(0)
}

const handleOpen = (taskId) => {
  if (open !== taskId) setOpen(taskId)
  else setOpen(0)
}
  return (
  <ScrollView>
  <View style={styles.container}>

{/* top scroll bar */}
{/* need to make each have onPress that sets state view to corresponding section, also makes icon/title bold and/or underlined */}

    <View style={styles.topOptions}>
        <Text style={styles.subheading} onPress={() => handleView('posts')}>posts</Text>
        

        <Text style={styles.subheading} onPress={() => handleView('tasks')} >28</Text>

        <Text style={styles.subheading} onPress={() => handleView('stories')}>stories</Text>
   </View>

{/* your tasks section */}
{/* need to make description hidden and visible on click down arrow */}
{view === 'tasks' ? (
<View>
  <View style={styles.twentyEightContainer}>
     <Text style={styles.twentyEightCount}>{completed.length}</Text>
     <Text style={styles.twentyEight}>/ 28</Text>
  </View>
  <Text style={styles.newList}>new list: {dummyUserTasks[1].endDate}</Text>

  
  {dummyUserTasks.map((item) => (
        item.completed == false ? (
          <View style={styles.uncompletedContainer}>
             <Text style={styles.taskTitle} onPress={() => handleOpen(item.id)}>{item.title}</Text>
             {open === item.id ?
             <View>
             <Text style={styles.taskDescription}>{item.description}</Text> 
             <Text style={styles.submitPost} onPress={() => handleView('submit')}>submit your post</Text>
             </View>
             : null}
          </View>
        ) : null))}
</View>
          ) : null } 

{/* submit a post section */}
{view === 'submit' ? (
   <View>
   <Text style={styles.subheading}>Add a photo</Text>
   <Text style={styles.addPhoto}>+</Text>
   <Text style={styles.subheading}>Add a reflection</Text>
   <Text style={styles.addReflection}>+</Text>
   <Text style={styles.submitPost}>submit</Text>
</View>
) : null}

{/* completed section */}
{view === 'posts' ? (
      <View>    
    {dummyUserTasks.map((item) => (
   
        item.completed == true ? (
          
          <View style={styles.imageContainer}>
            <ImageBackground 
              source={{uri: item.postImgUrl}} 
              style={styles.imageBackground}>
            <Text style={styles.postTag}>{item.title}</Text>
            <Text>{item.postDescription}</Text>
            <Text></Text>
            </ImageBackground>
          </View>) : null
    ))}
</View>) : null}

{/* following section */}
{view === 'stories' ? (
  <View>
    <Text style={styles.subheading}>Following</Text>
    <ScrollView horizontal={true}>
    <View style={styles.followingContainer}>
     <Text style={styles.followingItem}>1</Text>
     <Text style={styles.followingItem}>2</Text>
     <Text style={styles.followingItem}>3</Text>
     <Text style={styles.followingItem}>4</Text>
     <Text style={styles.followingItem}>5</Text>
     <Text style={styles.followingItem}>6</Text>
     <Text style={styles.followingItem}>7</Text>
     <Text style={styles.followingItem}>8</Text>
     <Text style={styles.followingItem}>9</Text>
     <Text style={styles.followingItem}>10</Text>
   
     </View> 
     </ScrollView>
    <Text></Text>
    <View>
    <Text style={styles.subheading}>Featured</Text>

    <View style={styles.featuredContainer}>
    <ScrollView horizontal={true}>
     <Text style={styles.featuredItem}>Featured 1</Text>
     <Text style={styles.featuredItem}>Featured 2</Text>
     <Text style={styles.featuredItem}>Featured 3</Text>
     <Text style={styles.featuredItem}>Featured 4</Text>
     <Text style={styles.featuredItem}>Featured 5</Text>
     </ScrollView>
     </View>

  </View>
  </View>
) : null}


  </View>
  </ScrollView>
)};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 100
  },
  topOptions:{
    flexDirection: "row",
    justifyContent: "space-between",
  }, 
   twentyEightCount: {
    fontSize: 60,
    textAlign: "center",
},
twentyEight: {
  padding: 10
},
twentyEightContainer: {
  flexDirection: "row",
  alignItems: 'flex-end',
  justifyContent: "center",
  paddingTop: 20,
  paddingBottom: 10
},
  newList:{
    textAlign: "center",
    paddingBottom: 30,
    color: "gray"
  },
  subheading:{
    textAlign: "center", 
    paddingBottom: 20, 
    paddingTop: 10, 
    textTransform: 'capitalize', 
    letterSpacing: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  taskTitle:{
    textAlign: "center", 
    paddingBottom: 25, 
    fontWeight: "500", 
    fontSize: 30 

  },
  taskDescription:{
    textAlign: "center", 
    paddingBottom: 20
  },
  completed:{
    paddingBottom: 30
  },
  submitPost: {
    textAlign: "center",
    paddingBottom: 50
  },
  addPhoto: {
    textAlign: "center",
    marginBottom: 50,
  },
  addReflection: {
    textAlign: "center"
  },
  submitPostBtn: {
    textAlign: "center",
    padding: 50
  },
  followingContainer:{
    flexDirection: "row",

  },
  followingItem:{
    width: 100,
    textAlign: "center",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 40,
    paddingBottom: 40,
    marginRight: 5,
    marginLeft: 5,
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 25
  },
  featuredContainer:{
    flexDirection: "row",
  },
  featuredItem:{
    width: 300,
    height: 250,
    textAlign: "center",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 40,
    paddingBottom: 40,
    marginRight: 5,
    marginLeft: 5,
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 25  },

  imageContainer:{
    flex: 1,
  backgroundColor: "#fff",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column"
},

  imageBackground:{
    flex: 1,
    width:"100%",
    alignItems: "center",
    resizeMode:"contain"
},
postTag : {
  fontWeight: "800"
},

});

export default Tasks;
