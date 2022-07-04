import { CurrentRenderContext } from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import { Text, TextInput, View, StyleSheet, ScrollView, Image, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const dummyUserTasks = [
  {id: 1, userId: 1, taskId:1, title: "read a book", description: "sample description for this task this is just a sample description for a task this is just a sample description for a task", status: "current", completed: true, postDescription: "this is my reflection on the book I read. I recommend this book because...", postImgUrl: "https://i.imgur.com/DsehfR6.jpg", endDate: "July 30"},
  {id: 2, userId: 1, taskId:2, title: "meditate", description: "sample description for this task this is just a sample description for a task this is just a sample description for a task", status: "current", completed: true, postDescription: "this is my reflection on meditating. I'm not good at meditation so this one was a challenge...etc", postImgUrl: "https://imgur.com/Ev7LLdE.jpg", endDate: "July 30"},
  {id: 3, userId: 1, taskId:3, title: "spend an hour in nature", description: "sample description for this task this is just a sample description for a task this is just a sample description for a task", status: "current", completed: true, postDescription: "This is my reflection on nature. It was nice to get outdoors.", postImgUrl: "https://imgur.com/hZ4pnHI.jpg", endDate: "July 30"},
  {id: 4, userId: 1, taskId:4, title: "write a letter", description: "write and send a letter in the mail", status: "current", completed: false, postDescription: "", postImgUrl: "https://imgur.com/hZ4pnHI.jpg", endDate: "July 30"},
  {id: 5, userId: 1, taskId:5, title: "spend 30 minutes practicing deep breathing", description: "sample description for this task this is just a sample description for a task this is just a sample description for a task", status: "current", completed: true, postDescription: "This is my reflection on deep breathing. I felt so much more relaxed after 30 minutes.", postImgUrl: "https://imgur.com/DsehfR6.jpg", endDate: "July 30"},
  {id: 6, userId: 1, taskId:6, title: "complete an art project", description: "sample description for this task this is just a sample description for a task this is just a sample description for a task", status: "current", completed: true, postDescription: "Doodling is something I used to do a lot when I was younger. I picked up a pen and just started drawing and drew this...", postImgUrl: "https://imgur.com/xVtrThI.jpg", endDate: "July 30"},
  {id: 7, userId: 1, taskId:7, title: "write a journal entry", description: "sample description for this task this is just a sample description for a task this is just a sample description for a task", status: "current", completed: false, postDescription: "", postImgUrl: "https://imgur.com/hZ4pnHI.jpg", endDate: "July 30"},
  {id: 8, userId: 1, taskId:8, title: "family past", description: "record a family story", status: "current", completed: false, postDescription: "", postImgUrl: "https://imgur.com/hZ4pnHI.jpg", endDate: "July 30"},
  {id: 9, userId: 1, taskId:9, title: "10 meaningful photos", description: "Take ten photos of important people, places or things in your life", status: "current", completed: false, postDescription: "", postImgUrl: "https://imgur.com/hZ4pnHI.jpg", endDate: "July 30"},
  {id: 10, userId: 1, taskId:10, title: "sit with water", description: "visit a pond, lake, river, ocean, or other body of water and observe the water", status: "current", completed: false, postDescription: "", postImgUrl: "https://imgur.com/hZ4pnHI", endDate: "July 30"},
  {id: 11, userId: 1, taskId:11, title: "walking meditation", description: "go on a walk, and focus on feeling the ground beneath your feet with each step", status: "current", completed: false, postDescription: "", postImgUrl: "https://imgur.com/hZ4pnHI", endDate: "July 30"},
  {id: 12, userId: 1, taskId:12, title: "watch a movie", description: "watch a movie", status: "current", completed: false, postDescription: "", postImgUrl: "https://imgur.com/hZ4pnHI", endDate: "July 30"},
  {id: 13, userId: 1, taskId:13, title: "be a critic", description: "write positive reviews for the locally owned places you love", status: "current", completed: false, postDescription: "", postImgUrl: "https://imgur.com/hZ4pnHI", endDate: "July 30"},
  {id: 14, userId: 1, taskId:14, title: "floss", description: "do it", status: "current", completed: false, postDescription: "", postImgUrl: "https://imgur.com/hZ4pnHI", endDate: "July 30"},
  {id: 16, userId: 1, taskId:16, title: "movement", description: "yoga, dance, martial arts. Move your body for 30 minutes.", status: "current", completed: false, postDescription: "", postImgUrl: "https://imgur.com/hZ4pnHI", endDate: "July 30"},
  {id: 17, userId: 1, taskId:17, title: "stretch", description: "from head to toe, stretch each part of your body", status: "current", completed: false, postDescription: "", postImgUrl: "https://imgur.com/hZ4pnHI", endDate: "July 30"},
  {id: 18, userId: 1, taskId:18, title: "relaxation", description: "lie down and spend 10 minutes relaxing your body without falling asleep", status: "current", completed: false, postDescription: "", postImgUrl: "https://imgur.com/hZ4pnHI", endDate: "July 30"},
  {id: 19, userId: 1, taskId:19, title: "new food", description: "eat something you've never tried before", status: "current", completed: false, postDescription: "", postImgUrl: "https://imgur.com/hZ4pnHI", endDate: "July 30"},
  {id: 15, userId: 1, taskId:15, title: "sample task ", description: "sample description for this task sample for this task this is just a sample description for a task this is just a sample description for a task", status: "current", completed: false, postDescription: "", postImgUrl: "https://imgur.com/hZ4pnHI", endDate: "July 30"},
  {id: 20, userId: 1, taskId:20, title: "volunteer", description: "volunteer", status: "current", completed: false, postDescription: "", postImgUrl: "", endDate: "July 30"},
  {id: 21, userId: 1, taskId:21, title: "task 21", description: "task 21", status: "current", completed: false, postDescription: "", postImgUrl: "https://imgur.com/hZ4pnHI", endDate: "July 30"},

]

const Tasks = (props) => {
const [allTasks, setAllTasks] = useState([])
const [view, setView] = useState('stories')
const [open, setOpen] = useState(0)
const [goalNum, setGoalNum] = useState("21")
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

const handleGoalNum = (num) => {
  setGoalNum(num)
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
     <Text style={styles.twentyEight}>/ {goalNum}</Text>
  </View>
  <Text style={[styles.goalNum, styles.center]}>set your goal:  
  <Text onPress={() => handleGoalNum(7)}>  7  </Text>
  <Text onPress={() => handleGoalNum(14)}>  14  </Text>
  <Text onPress={() => handleGoalNum(21)}>  21  </Text>
  <Text onPress={() => handleGoalNum(28)}>  28  </Text>


  </Text>

  <Text style={styles.newList}><Text style={styles.about} onPress={()=>handleView('about')}>about  </Text> |   next: {allTasks.length > 0 ? allTasks[1].endDate : null}</Text>
  
  {allTasks.map((item) => (
        item.completed == false ? (
          <View style={styles.uncompletedContainer}>
             <Text style={styles.taskTitle} onPress={() => handleOpen(item.id)}>{item.title}</Text>
             {open === item.id ?
             <View>
             <Text style={styles.taskDescription}>{item.description}</Text> 
             <View style={styles.goToSubmitContainer}>
             <Text style={styles.goToSubmit} onPress={() => handleView('submit')}>submit your post</Text>
             <Text style={styles.getInspired} onPress={() => handleView('featured')}>get inspired</Text>
             </View>
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
    <Text style={styles.aboutParagraph}> Lots of social media wants to suck users in-- endless scrolling, shopping, and comparisons. Our tasks are all intended to motivate our users to find a balance-- to put their phones down for awhile, to reflect, and to connect.</Text>
    <Text style={styles.subheading}>how</Text>
    <Text style={styles.aboutParagraph}>All you have to do is choose a task and begin. If 28 tasks is beyond your grasp, you can set your monthly goal to 7, 14, or 21 tasks. To complete a task, simply click on that task and submit any photo and a short description or reflection on the activity. </Text>

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
        <Text style={styles.subheading}>your post history</Text>
    {allTasks.map((item) => {
    console.log(item.postImgUrl, "image url")

  return (
        item.completed == true ? (
          <View style={styles.postContainer}>
          
          <Image style={{width:"auto", height: 400}} source={item.postImgUrl ? {uri: item.postImgUrl} : null } />
            <Text style={styles.postTag}>{item.title}</Text>
            <Text>{item.postDescription}</Text>
            
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
        <TouchableOpacity onPress={()=>handleFollowerPost(1)}>
       <Image style={styles.followingItem} source={{uri: "https://i.imgur.com/DsehfR6.jpg"}} />
       </TouchableOpacity>

       <TouchableOpacity onPress={()=>handleFollowerPost(2)}>
       <Image style={styles.followingItem} source={{uri: "https://imgur.com/Ev7LLdE.jpg"}} />
       </TouchableOpacity>

       <TouchableOpacity onPress={()=>handleFollowerPost(3)}>
       <Image style={styles.followingItem} source={{uri: "https://imgur.com/xVtrThI.jpg"}} />
       </TouchableOpacity>

       <TouchableOpacity onPress={()=>handleFollowerPost(4)}>
       <Image style={styles.followingItem} source={{uri:  "https://imgur.com/hZ4pnHI.jpg"}} />
       </TouchableOpacity>

       <TouchableOpacity onPress={()=>handleFollowerPost(5)}>
       <Image style={styles.followingItem} source={{uri: "https://imgur.com/Ev7LLdE.jpg"}} />
       </TouchableOpacity>


      </View> 
      </ScrollView>
     </View>

    <View style={styles.featuredSectionContainer}>
     <Text style={styles.subheading}>Featured</Text>
     <ScrollView>
     <View style={styles.featuredItemsContainer}>

      <TouchableOpacity onPress={()=>handleFeaturedPost(1)}>
      <Image style={styles.featuredItem} source={{uri: "https://i.imgur.com/DsehfR6.jpg"}} />
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>handleFeaturedPost(2)}>
      <Image style={styles.featuredItem} source={{uri: "https://imgur.com/Ev7LLdE.jpg"}} />
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>handleFeaturedPost(3)}>
      <Image style={styles.featuredItem} source={{uri: "https://imgur.com/xVtrThI.jpg"}} />
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>handleFeaturedPost(4)}>
      <Image style={styles.featuredItem} source={{uri: "https://imgur.com/hZ4pnHI.jpg"}}  />
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>handleFeaturedPost(5)}>
      <Image style={styles.featuredItem} source={{uri: "https://imgur.com/Ev7LLdE.jpg"}} onPress={()=>handleFeaturedPost(5)} />
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>handleFeaturedPost(6)}>
      <Image style={styles.featuredItem} source={{uri: "https://imgur.com/Ev7LLdE.jpg"}} onPress={()=>handleFeaturedPost(6)} />
     </TouchableOpacity>
     
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
  center: {
    textAlign: "center"
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
goalNum:{
  paddingBottom: 10
}
  ,
  newList:{
    textAlign: "center",
    paddingBottom: 30,
    color: "gray"
  },
  subheading:{
    textAlign: "center", 
    paddingBottom: 20, 
    paddingTop: 20, 
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
  goToSubmitContainer: {
    textAlign: "center",
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "center"
  },
  goToSubmit:{   
    padding: 5,
    margin: 5,
    borderWidth: 1,
    color: "gray",
    borderRadius: 5
  },
  getInspired:{   
    padding: 5,
    margin: 5,
    borderWidth: 1,
    color: "gray",
    borderRadius: 5

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
    height: 100,
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
    borderRadius: 50,
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
    width: 160,
    height: 250,
    padding: 1,
    margin: 1,
    borderColor: "black",
    borderWidth: 1,
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
postContainer:{
  padding: 5,
  borderBottomWidth: 1,
  borderColor: "lightgray",
  paddingBottom: 5,
  marginBottom: 10
}


});

export default Tasks;
