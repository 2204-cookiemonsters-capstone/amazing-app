import { CurrentRenderContext } from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import { Text, TextInput, View, StyleSheet, ScrollView, Image, ImageBackground } from 'react-native';

const dummyUserTasks = [
  {id: 1, userId: 1, taskId:1, title: "read a book", description: "sample description for this task this is just a sample description for a task this is just a sample description for a task", status: "current", completed: true, postDescription: "this is my reflection on the book I read. I recommend this book because...", postImgUrl: "https://imgur.com/BxZS95D", endDate: "July 30"},
  {id: 2, userId: 1, taskId:2, title: "meditate", description: "sample description for this task this is just a sample description for a task this is just a sample description for a task", status: "current", completed: true, postDescription: "this is my reflection on meditating. I'm not good at meditation so this one was a challenge...etc", postImgUrl: "https://imgur.com/Ev7LLdE", endDate: "July 30"},
  {id: 3, userId: 1, taskId:3, title: "spend an hour in nature", description: "sample description for this task this is just a sample description for a task this is just a sample description for a task", status: "current", completed: true, postDescription: "This is my reflection on nature. It was nice to get outdoors.", postImgUrl: "https://imgur.com/hZ4pnHI", endDate: "July 30"},
  {id: 4, userId: 1, taskId:4, title: "write a letter", description: "write and send a letter in the mail", status: "current", completed: false, postDescription: "", postImgUrl: "", endDate: "July 30"},
  {id: 5, userId: 1, taskId:5, title: "spend 30 minutes practicing deep breathing", description: "sample description for this task this is just a sample description for a task this is just a sample description for a task", status: "current", completed: true, postDescription: "This is my reflection on deep breathing. I felt so much more relaxed after 30 minutes.", postImgUrl: "https://imgur.com/DsehfR6", endDate: "July 30"},
  {id: 6, userId: 1, taskId:6, title: "complete an art project", description: "sample description for this task this is just a sample description for a task this is just a sample description for a task", status: "current", completed: true, postDescription: "Doodling is something I used to do a lot when I was younger. I picked up a pen and just started drawing and drew this...", postImgUrl: "https://imgur.com/xVtrThI", endDate: "July 30"},
  {id: 7, userId: 1, taskId:7, title: "write a journal entry", description: "sample description for this task this is just a sample description for a task this is just a sample description for a task", status: "current", completed: false, postDescription: "", postImgUrl: "", endDate: "July 30"},
  {id: 8, userId: 1, taskId:8, title: "family past", description: "record a family story", status: "current", completed: false, postDescription: "", postImgUrl: "", endDate: "July 30"},
  {id: 9, userId: 1, taskId:9, title: "10 meaningful photos", description: "Take ten photos of important people, places or things in your life", status: "current", completed: false, postDescription: "", postImgUrl: "", endDate: "July 30"},
  {id: 10, userId: 1, taskId:10, title: "sit with water", description: "visit a pond, lake, river, ocean, or other body of water and observe the water", status: "current", completed: false, postDescription: "", postImgUrl: "", endDate: "July 30"},
  {id: 11, userId: 1, taskId:11, title: "walking meditation", description: "go on a walk, and focus on feeling the ground beneath your feet with each step", status: "current", completed: false, postDescription: "", postImgUrl: "", endDate: "July 30"},
  {id: 12, userId: 1, taskId:12, title: "watch a movie", description: "watch a movie", status: "current", completed: false, postDescription: "", postImgUrl: "", endDate: "July 30"},
  {id: 13, userId: 1, taskId:13, title: "be a critic", description: "write positive reviews for the locally owned places you love", status: "current", completed: false, postDescription: "", postImgUrl: "", endDate: "July 30"},
  {id: 14, userId: 1, taskId:14, title: "floss", description: "do it", status: "current", completed: false, postDescription: "", postImgUrl: "", endDate: "July 30"},
  {id: 16, userId: 1, taskId:16, title: "movement", description: "yoga, dance, martial arts. Move your body for 30 minutes.", status: "current", completed: false, postDescription: "", postImgUrl: "", endDate: "July 30"},
  {id: 17, userId: 1, taskId:17, title: "stretch", description: "from head to toe, stretch each part of your body", status: "current", completed: false, postDescription: "", postImgUrl: "", endDate: "July 30"},
  {id: 18, userId: 1, taskId:18, title: "relaxation", description: "lie down and spend 10 minutes relaxing your body without falling asleep", status: "current", completed: false, postDescription: "", postImgUrl: "", endDate: "July 30"},
  {id: 19, userId: 1, taskId:19, title: "new food", description: "eat something you've never tried before", status: "current", completed: false, postDescription: "", postImgUrl: "", endDate: "July 30"},
  {id: 15, userId: 1, taskId:15, title: "sample task ", description: "sample description for this task sample for this task this is just a sample description for a task this is just a sample description for a task", status: "current", completed: false, postDescription: "", postImgUrl: "", endDate: "July 30"},
  {id: 20, userId: 1, taskId:20, title: "volunteer", description: "volunteer", status: "current", completed: false, postDescription: "", postImgUrl: "", endDate: "July 30"},
  {id: 21, userId: 1, taskId:21, title: "task 21", description: "task 21", status: "current", completed: false, postDescription: "", postImgUrl: "", endDate: "July 30"},
  {id: 22, userId: 1, taskId:22, title: "task 22", description: "sample description for this task sample for this task this is just a sample description for a task this is just a sample description for a task", status: "current", completed: false, postDescription: "", postImgUrl: "", endDate: "July 30"},
  {id: 23, userId: 1, taskId:23, title: "task 23", description: "sample description for this task sample for this task this is just a sample description for a task this is just a sample description for a task", status: "current", completed: false, postDescription: "", postImgUrl: "", endDate: "July 30"},
  {id: 24, userId: 1, taskId:24, title: "task 24", description: "sample description for this task sample for this task this is just a sample description for a task this is just a sample description for a task", status: "current", completed: false, postDescription: "", postImgUrl: "", endDate: "July 30"},
  {id: 25, userId: 1, taskId:25, title: "task 25", description: "sample description for this task sample for this task this is just a sample description for a task this is just a sample description for a task", status: "current", completed: false, postDescription: "", postImgUrl: "", endDate: "July 30"},
  {id: 26, userId: 1, taskId:26, title: "task 26", description: "sample description for this task sample for this task this is just a sample description for a task this is just a sample description for a task", status: "current", completed: false, postDescription: "", postImgUrl: "", endDate: "July 30"},
  {id: 27, userId: 1, taskId:27, title: "task 27", description: "sample description for this task sample for this task this is just a sample description for a task this is just a sample description for a task", status: "current", completed: false, postDescription: "", postImgUrl: "", endDate: "July 30"},
  {id: 28, userId: 1, taskId:28, title: "task 28", description: "sample description for this task sample for this task this is just a sample description for a task this is just a sample description for a task", status: "current", completed: false, postDescription: "", postImgUrl: "", endDate: "July 30"},

]

const Tasks = (props) => {
const [allTasks, setAllTasks] = useState([])
const [view, setView] = useState('tasks')
const [open, setOpen] = useState(0)
const [currentTask, setCurrentTask] = useState({})
const [followerPosts, setFollowerPosts] = useState([])
const [followerPost, setFollowerPost] = useState({})
const [featuredPosts, setFeaturedPosts] = useState([])
const [featuredPost, setFeaturedPost] = useState({})
const [postDescription, setPostDescription] = useState("")

let completed = allTasks.filter((item) => item.completed === true)

const handleView = (view) => {
  if (view === 'tasks' || view === 'posts' || view === 'stories'){
    setFeaturedPost({})
    setFollowerPost({})
  }
  setView(view)
  setOpen(0)
}

const handleOpen = (taskId) => {
  if (open !== taskId) {
    setOpen(taskId)
    let userTask = allTasks.filter((item => item.taskId === taskId))
    setCurrentTask(userTask[0]) 
    console.log(userTask)
  }
  else {setOpen(0)
    setCurrentTask({})
  } 
}

const handleFollowerPost = (id) => {
setFollowerPost(id)
setView('follower')
}

const handleFeaturedPost = (id) => {
setFeaturedPost(id)
setView('featured')
}

const handleSubmit = (id) => {
  //update thru table to add photo, description, completeStatus, and redirect to posts page
  let newUserTasks = allTasks.map((item => 
    item.id === id ? 
    item = {...item, completed: true, postDescription: postDescription} : 
    item))
  console.log(newUserTasks)
  setAllTasks(newUserTasks)
  setPostDescription("")
  setCurrentTask(0)
  setView('posts')
}

useEffect(() => {
  setAllTasks(dummyUserTasks)
  console.log("useEffect1")}, []
  )
  

useEffect(() => {
console.log("useEffect2")}, [view, allTasks]
)


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
  <Text style={styles.newList}><Text style={styles.about} onPress={()=>handleView('about')}>about  </Text> |   next: {allTasks.length > 0 ? allTasks[1].endDate : null}</Text>
  
  {allTasks.map((item) => (
        item.completed == false ? (
          <View style={styles.uncompletedContainer}>
             <Text style={styles.taskTitle} onPress={() => handleOpen(item.id)}>{item.title}</Text>
             {open === item.id ?
             <View>
             <Text style={styles.taskDescription}>{item.description}</Text> 
             <Text style={styles.goToSubmit} onPress={() => handleView('submit')}>submit your post</Text>
             </View>
             : null}
          </View>
        ) : null))}
</View>
          ) : null } 

{/* about tasks view */}
{view === 'about' ? (
  <ScrollView>
  <View>
    <Text style={styles.subheading}>the 28 tasks challenge</Text>
    <Text style={styles.subheading}>what</Text>
    <Text style={styles.aboutParagraph}>Every 28 days, we post a list of 28 tasks for all users to achieve. These tasks change each month, but always inspire our users to spend time connecting with nature, their community, and practicing and sharing activities proven to promote wellbeing. </Text>
    <Text style={styles.subheading}>why</Text>
    <Text style={styles.aboutParagraph}>While social media can often promote endless scrolling and comparisons, these tasks are all intended to motivate our users to put their phone away for awhile and focus on small daily achievements, while still benefitting from the community aspect of social media.</Text>
    <Text style={styles.subheading}>how</Text>
    <Text style={styles.aboutParagraph}>All you have to do is choose a task and begin. To complete a task, simply click on that task and submit any photo and a short description or reflection on the activity.</Text>

</View>
</ScrollView>
) : null}

{/* submit a post section */}
{view === 'submit' ? (
   <View>
   <Text style={styles.subheading}>{currentTask.title}</Text>
   <Text style={styles.addPhoto}>add a photo</Text>
   <TextInput 
      style={styles.addReflection} 
      placeholder="add a reflection"
      onChangeText={newText => setPostDescription(newText)}
      defaultValue={postDescription}
    />
   <Text style={styles.submitPost} onPress={()=>handleSubmit(currentTask.id)}>submit</Text>
</View>
) : null}

{/* users posts section */}
{view === 'posts' ? (
      <View>    
        <Text>***This page will be image posts***</Text>
    {allTasks.map((item) => {
  let image = {uri: item.postImgUrl}
  return (
        item.completed == true ? (
          
          <View style={styles.imageContainer}>
           
            <Image
             style={{width: "100%", height: "50%"}}
              source={image}/>
            <Text style={styles.postTag}>{item.title}</Text>
            <Text>{item.postDescription}</Text>
            <Text></Text>
            
          </View>) : null
    )})}
</View>) : null}

{/* following section */}
{view === 'stories' ? (
  <View style={styles.storiesContainer}>
    <View style={styles.followingSectionContainer}>
      <Text style={styles.subheading}>Following</Text>
      <ScrollView horizontal={true}>
      <View style={styles.followingItemsContainer}>
       <Text style={styles.followingItem} onPress={()=>handleFollowerPost(1)}>1</Text>
       <Text style={styles.followingItem} onPress={()=>handleFollowerPost(2)}>2</Text>
       <Text style={styles.followingItem} onPress={()=>handleFollowerPost(3)}>3</Text>
       <Text style={styles.followingItem} onPress={()=>handleFollowerPost(4)}>4</Text>
       <Text style={styles.followingItem} onPress={()=>handleFollowerPost(5)}>5</Text>
       <Text style={styles.followingItem} onPress={()=>handleFollowerPost(6)}>6</Text>
  
      </View> 
      </ScrollView>
     </View>

    <View style={styles.featuredSectionContainer}>
     <Text style={styles.subheading}>Featured</Text>
     <ScrollView>
     <View style={styles.featuredItemsContainer}>
      <Text style={styles.featuredItem} onPress={()=>handleFeaturedPost(1)}>Featured 1</Text>
      <Text style={styles.featuredItem} onPress={()=>handleFeaturedPost(2)}>Featured 2</Text>
      <Text style={styles.featuredItem} onPress={()=>handleFeaturedPost(3)}>Featured 3</Text>
      <Text style={styles.featuredItem} onPress={()=>handleFeaturedPost(4)}>Featured 4</Text>
      <Text style={styles.featuredItem} onPress={()=>handleFeaturedPost(5)}>Featured 5</Text>
      <Text style={styles.featuredItem} onPress={()=>handleFeaturedPost(6)}>Featured 6</Text>
     </View>
     </ScrollView>
    </View>
  </View>
) : null}


{/* single follower post section */}
{view === 'follower' ? (
<View>
  <Text>single follower post stack</Text>
</View>) : null}


{/* single follower post section */}
{view === 'featured' ? (
<View>
  <Text>single featured post stack</Text>
</View>) : null}



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
  aboutParagraph:{
    lineHeight: 25,
    textAlign: "justify",
    paddingBottom: 30
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
  goToSubmit: {
    textAlign: "center",
    paddingBottom: 20,
  },
  submitPost: {
    textAlign: "center",
    padding: 50,
  },
  addPhoto: {
    textAlign: "center",
    borderWidth: 1,
    padding: 100,
    paddingBottom: 300,
  },
  addReflection: {
    textAlign: "center",
    margin: 30
  },
  submitPostBtn: {
    textAlign: "center",
    padding: 50
  },

  storiesContainer:{
    flexDirection: "column",
  },
  followingSectionContainer:{
    flex:1
  },
  followingItemsContainer:{
    flexDirection: "row",
    flex: 1,
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
  featuredSectionContainer:{
    flex: 1
  },
  featuredItemsContainer:{
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around"
  },
  featuredItem:{
    width: "48%",
    height: 250,
    textAlign: "center",
    padding: "1%",
    margin:"1%",
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 25 },

  imageContainer:{
    flex: 1,
  backgroundColor: "#fff",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column"
},

  imageBackground:{
    flex: 1,
    alignItems: "center",
    resizeMode:"contain"
},
postTag : {
  fontWeight: "800"
},


});

export default Tasks;
