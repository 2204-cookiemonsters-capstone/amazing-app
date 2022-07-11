import { CurrentRenderContext } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
} from 'react-native';
import {
  TouchableOpacity,
  TouchableWithoutFeedback, Swipeable
} from 'react-native-gesture-handler';
import { auth, firestore } from '../firebase';
import {
  collection,
  getDocs,
  addDoc,
  query,
  onSnapshot,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { PanGestureHandler, TapGesture,  } from 'react-native-gesture-handler';
import {featuredPostsData} from './assets/featuredPostsData'
import {profileImagesArray, profileImages} from './assets/profileImages'

const Tasks = (props) => {
  const [allUserTasks, setAllUserTasks] = useState([]);
  const [view, setView] = useState('featured');
  const [goalNum, setGoalNum] = useState('28');
  const [currentTask, setCurrentTask] = useState({});
  const [displayPost, setDisplayPost] = useState({});
  const [reflection, setReflection] = useState('');
  const [displayPostText, setDisplayPostText] = useState(1);
  const [allFriends, setAllFriends] = useState([])
  const [strengthsCount, setStrengthsCount] = useState([])
  const [friendsPosts, setFriendsPosts] = useState([])
  const [currentFriendUsername, setCurrentFriendUsername] = useState("")
 
  let completed = allUserTasks.filter((item) => item.completed === true);

  const getCompletedCount = () => {
  if (completed.length) { 
  let nature = completed.filter((item) => item.category === 'nature')
  let natureCount = nature.length
  let meditation = completed.filter((item) => item.category === 'meditation')
  let meditationCount = meditation.length
  let movement = completed.filter((item) => item.category === 'movement')
  let movementCount = movement.length
  let reflection = completed.filter((item) => item.category === 'reflection')
  let reflectionCount = reflection.length
  let creativity = completed.filter((item) => item.category === 'creativity')
  let creativityCount = creativity.length
  let kindness = completed.filter((item) => item.category === 'kindness')
  let kindnessCount = kindness.length
  let community = completed.filter((item) => item.category === 'community')
  let communityCount = community.length
  let strengthsList = {...strengthsCount, "nature": natureCount, "meditation": meditationCount, "movement": movementCount, "reflection": reflectionCount, "creativity": creativityCount, "kindness": kindnessCount, "community": communityCount}
  if (strengthsCount != strengthsList) {
  setStrengthsCount(strengthsList)}}}
  
  // updates a single users posts
   async function updateUserPosts(taskId){
    const snapShot = await getDoc(
      doc(firestore, 'users', auth.currentUser.uid, 'posts', "July"))
    
    let previousPosts = snapShot.data().userTasks

   let userTasks = previousPosts.map((item) => item.taskId !== taskId ? item : {...item, completed: true, completedTime: Date.now(), reflection: reflection})

    const postsRef = await doc(firestore, 'users', auth.currentUser.uid, "posts", "July")

    setDoc(postsRef, {userTasks}, {merge: true })
   }

     // updates goal num to 7, 14, 21, or 28
   async function updateGoalNum(num){
    const postsRef = await doc(firestore, 'users', auth.currentUser.uid, "posts", "July")
    setDoc(postsRef, {goalNum: num}, {merge: true})
   }
  
      // grabs a single users 28 posts
  async function fetchUserPosts(){
      const snapShot = await getDoc(
        doc(firestore, 'users', auth.currentUser.uid, 'posts', "July"))
        let userTasks = snapShot.data().userTasks;
        userTasks.sort((b,a) => a.completedTime - b.completedTime)
        setAllUserTasks(userTasks)
    }

const fetchAllFriends = async () => {
  const snapShot = await getDocs(
    collection(firestore, 'users', auth.currentUser.uid, 'friendships')
  );
  const friends = [];
  snapShot.forEach((doc) => {
    if (doc.data().status === 'friends') {
      friends.push(doc.data());
    }
  })
  const friendDocs = await Promise.all(
    friends.map((f) => getDoc(doc(firestore, 'users', f.userid)))
  );
  const friendsItems = friendDocs.map((i) => i.data());

  setAllFriends(friendsItems)
  // console.log(allFriends)
}

async function fetchFriendsPosts(id){
  const snapShot = await getDoc(
    doc(firestore, 'users', id, 'posts', "July"))
    let friendsPosts = snapShot.data().userTasks;
    friendsPosts.sort((b,a) => a.completedTime - b.completedTime)
    setFriendsPosts(friendsPosts)
}

  const handleView = (view, item) => {
    if (view === 'tasks' || view === 'posts' || view === 'featured') {
      setDisplayPost({});
      setFriendsPosts([])
    }
    if (view === 'submit' || 'submitEdit'){
      setCurrentTask(item)
    }
    setView(view);
  };

  
  const getBackgroundColor = (category) => {
    let color;
    if (category === "nature") {
        color = "#558564";
    } else if (category === "community") {
        color = "#574D68";
      } else if (category === "reflection") {
        color = "#33658A";
      } else if (category === "meditation") {
        color = "#A22522";
      } else if (category === "movement") {
        color = "#59A96A";
      } else if (category === "kindness") {
        color = "#EF798A";
      } else if (category === "creativity") {
        color = "#EB6426";
    }
    else {color === "#8021D9"}
    return color;
};

  const handleDisplayFeaturedPost = (id) => {
    let post = featuredPostsData.filter((item) => item.taskId === id);
    setDisplayPostText(1);
    setDisplayPost(post[0]);
    setView('postStack');
  };

  const handleDisplayFollowing = (id, username) => {
    fetchFriendsPosts(id)
    setCurrentFriendUsername(username)
    setView('friendsPosts');
  };

  // const handleDisplayFollowingPage = (id) => {
  //   let post = featuredPostsData.filter((item) => item.taskId === id);
  //   setDisplayPostText(true);
  //   setDisplayPost(post[0]);
  //   setView('postStack');
  // };

  const handleDisplayPostText = () => {  
    setDisplayPostText(displayPostText + 1);
  };


  const handlePrevious = (taskId) => {
    let previousPost = featuredPostsData.filter((item) => item.taskId === taskId - 1)
    setDisplayPostText(1);
    previousPost.length ? setDisplayPost(previousPost[0]) : setView('featured')
  }
  

  const handleNext = (taskId) => {
    let nextPost = featuredPostsData.filter((item) => item.taskId === taskId + 1)
    setDisplayPostText(1);
    // console.log(nextPost)
    nextPost.length ? setDisplayPost(nextPost[0]) : setView('featured')
  }


  const handleGoalNum = (num) => {
    (updateGoalNum(num))
    setGoalNum(num);
  };

  const handleSubmit = (taskId) => {
    let newUserTasks = allUserTasks.map((item) =>
      item.taskId === taskId
        ? (item = {
            ...item,
            completed: true,
            reflection: reflection,
          })
        : item
    );
    updateUserPosts(taskId)
    setAllUserTasks(newUserTasks);
    setReflection('');
    setCurrentTask({});
    setView('posts');
  };

  const handleFollowNewPeople = () => {
    setView('followNewPeople');
  };

//initial load creates user tasks if don't exist, fetches users posts, fetches featured posts
  useEffect(() => {
    fetchUserPosts();
    fetchAllFriends()
    console.log('useEffect1')
    // console.log('All user tasks', allUserTasks);

  }, []);

// need to do a useEffect to update taskPosts if user submits a post or changes the goal num-- need to timestamp the postTime value to current time


  useEffect(() => {
    // console.log('useEffect2');
    fetchUserPosts();
    getCompletedCount()
  }, [allUserTasks]);

// need to do a useEffect to fetch friends and featured recent posts if visits featured view / scrolls.


  return (
    
    <ScrollView>
      
      <View style={styles.container}>
        {/* top icon bar */}
        {view === 'postStack' ? null : 
        <View style={styles.topOptions}>
          <TouchableWithoutFeedback onPress={() => handleView('posts')}>
          <Text style={styles.subheading}>
            {view === 'posts' ? <FontAwesome name="photo" size={24} color="black"/> :
          <FontAwesome name="photo" size={24} color="gray"/>}
          </Text>
          </TouchableWithoutFeedback>
        
          <TouchableWithoutFeedback onPress={() => handleView('tasks')}>
          <Text style={[styles.subheading, styles.fontWeight700]} >
         {view === 'tasks' ?
         <AntDesign name="dashboard" size={24} color="black"/> :
         <AntDesign name="dashboard" size={24} color="gray"/> }
          </Text>
          </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => handleView('featured')}>
          <Text style={styles.subheading} >
            {view === 'featured' ? 
          <FontAwesome name="star-o" size={24} color="black"/> :
          <FontAwesome name="star-o" size={24} color="gray"/> }
          </Text>
          </TouchableWithoutFeedback>
        </View>}

        {/* your tasks section */}
        {view === 'tasks' ? (
<View>
           
    {/* your dashboard */}
    <Text style={[styles.center, styles.fontWeight700, styles.subheading]}>Your {allUserTasks && allUserTasks[0] ? allUserTasks[0].month : null} Dashboard</Text>

    <View style={styles.dashboardContainer}>

      <View style={styles.userDashboard}>         
<View style={styles.dashboardRowTop}>
  <View style={styles.dashboardSetYourGoal}>
        <View >
            <Text style={[styles.goalNum, styles.center, styles.fontWeight700]}>
              Set Your Goal</Text>

              <Text style={[styles.center, styles.white]}>
              <Text onPress={() => handleGoalNum(7)}> 7 </Text>
              <Text onPress={() => handleGoalNum(14)}> 14 </Text>
              <Text onPress={() => handleGoalNum(21)}> 21 </Text>
              <Text onPress={() => handleGoalNum(28)}> 28 </Text>
            </Text>
            </View>
        </View>
        <View style={styles.dashboardPipe}>
        <Text> </Text>
        </View>
        <View style={styles.dashboardCompleted}>
          <View>
          <Text style={[styles.fontWeight700, styles.white]}>Completed</Text>
          </View>
          <View style={styles.dashboardCompletedContainer}>
              <Text style={styles.dashboardCompletedCount}>{completed ? completed.length : null}</Text>
              <Text style={[styles.padding10, styles.white]}>/ {goalNum}</Text>
          </View>
          {completed.length >= goalNum ? <Text style={styles.white}>goal reached!</Text> : null}
          </View>
      </View>

      <View style={styles.dashboardRowBottom}>
        
      <View style={styles.center}>
        <Text style={[styles.center, styles.padding10, styles.fontWeight700, styles.white]}>Your Strengths</Text>

        {completed.length ? null : <Text style={styles.white}>complete tasks to see your strengths</Text>}

<View style={[styles.strengthsIconContainer, styles.padding10]}>

{strengthsCount.community ? 
  <View style={styles.strengthIconRow}>
<FontAwesome name="users" size={20} color="white"/>
<Text style={styles.strengths}>community x {strengthsCount.community}</Text>
  </View> : null}

  {strengthsCount.creativity ? 
    <View style={styles.strengthIconRow}>
<FontAwesome name="lightbulb-o" size={20} color="white"/>
<Text style={styles.strengths}>creativity x {strengthsCount.creativity}</Text>
  </View> : null}

  {strengthsCount.kindness ? 
<View style={styles.strengthIconRow}>
<FontAwesome name="heart" size={20} color="white"/>
<Text style={styles.strengths}>kindness x {strengthsCount.kindness}</Text>
  </View> : null}

  {strengthsCount.meditation ? 
    <View style={styles.strengthIconRow}>
<FontAwesome name="gear" size={20} color="white"/> 
<Text style={styles.strengths}>meditation x {strengthsCount.meditation}</Text>
  </View> : null}

  {strengthsCount.movement ? 
    <View style={styles.strengthIconRow}>
<MaterialCommunityIcons name="yoga" size={20} color="white"/>
<Text style={styles.strengths}>movement x {strengthsCount.movement} </Text>
  </View> : null}

  {strengthsCount.nature ? 
    <View style={styles.strengthIconRow}>
 <FontAwesome name="tree" size={20} color="white"/>
 <Text style={styles.strengths}>nature x {strengthsCount.nature}</Text>
 </View> : null}

  {strengthsCount.reflection ? 
<View style={styles.strengthIconRow}>
<FontAwesome name="book" size={20} color="white"/>
<Text style={styles.strengths}>reflection x {strengthsCount.reflection} </Text>
  </View> : null}

        </View>
        </View>
        </View>
        </View>
        </View>
         

    {/* remaining tasks */}

            <Text style={[styles.subheading, styles.fontWeight700]}>Remaining Tasks for {allUserTasks && allUserTasks[0] ? allUserTasks[0].month : null}</Text>
           
            <ScrollView horizontal= {true}decelerationRate={0}
            snapToInterval={310} //your element width
            snapToAlignment={"center"}>
            {!allUserTasks ? null : allUserTasks.map((item) => {
              // console.log(item, "item")
            return (
              item.completed !== true ? (
                
                <View style={[styles.uncompletedContainer, {backgroundColor: getBackgroundColor(item.category)}
                ]} key={item.taskId}>
                  <Text
                    style={styles.taskTitle}
                  >
                    {item.title}
                    
                  </Text>
                  <View style={styles.taskIconContainer}>
                  {item.category === "meditation" ? <FontAwesome name="gear" size={42} color="white"/> : null}
                  {item.category === "movement" ? <MaterialCommunityIcons name="yoga" size={42} color="white"/> : null}
                  {item.category === "nature" ? <FontAwesome name="tree" size={42} color="white"/> : null}
                  {item.category === "creativity" ? <FontAwesome name="lightbulb-o" size={42} color="white"/> : null}
                  {item.category === "reflection" ? <FontAwesome name="book" size={42} color="white"/> : null}
                  {item.category === "community" ? <FontAwesome name="users" size={42} color="white"/> : null}
                  {item.category === "kindness" ? <FontAwesome name="heart" size={42} color="white"/> : null}
                  </View>
                <Text style={styles.taskIcon}></Text>
                    <View>
                      <Text style={styles.taskDescription}>
                        {item.description}
                      </Text>
                      <View style={styles.goToSubmitContainer}>
                        <Text
                          style={styles.goToSubmit}
                          onPress={() => handleView('submit', item)}
                        >
                          submit your post
                        </Text>
                        
                      </View>
                    </View>
                  
                </View>
              ) : null
              )})}
              </ScrollView>

            <Text style={[styles.about, styles.center]} onPress={() => handleView('about')}>
                about
              </Text>
          </View>
        ) : null}

        {/* about tasks view */}
        {view === 'about' ? (
          <ScrollView>
            <View>
              <Text style={styles.subheading}>the 28 tasks challenge</Text>
            
              <Text>Consistency and kindness: two superpowers within your control.</Text>
              <Text style={styles.subheading}>what</Text>
              <Text style={styles.aboutParagraph}>
                Every month, we share a list of 28 tasks for all users to achieve. These tasks are intended to inspire our users to spend time in nature, connecting with their communities, and practicing activities proven by research to promote wellbeing and increase happiness.
              </Text>
              <Text style={styles.subheading}>why</Text>
              <Text style={styles.aboutParagraph}>
                
                Lots of social media wants to users to stay on their devices-- endlessly scrolling, shopping, and making comparisons. Our tasks are all intended
                to motivate our users to find balance and practice activities known to make life a little more enjoyable and meaningful.
              </Text>
              <Text style={styles.subheading}>how</Text>
              <Text style={styles.aboutParagraph}>
                All you have to do is choose a task and begin. If 28 tasks is
                beyond your current grasp, you can adjust your monthly goal to 7, 14, or 21
                tasks. To complete a task, simply click on that task and submit a short reflection on the activity.
              </Text>
              <Text onPress={() => fetchAllFriends()}>fetch friends</Text>
            </View>
          </ScrollView>
        ) : null}

        {/* submit a post section */}
        {view === 'submit' ? (
        
        <View style={styles.submitHeading}> 
            <Text style={[styles.subheading, styles.fontWeight700]}>{currentTask.title}</Text>
            <Text style={{padding: 20}}>{currentTask.description}</Text>

          <Text style={[styles.center,{color:"lightgray"}]}>select an image</Text>
          <View style={{flexDirection: "row", justifyContent: "center", marginTop:10}}>
            <Image style={{ width: 150, height: 150, marginTop: 2, marginRight: 1,}} source={{uri: currentTask.defaultImgUrl}} />
            <Image style={{ width: 150, height: 150, marginTop: 2, marginRight: 1}} source={{uri: currentTask.defaultImgUrl}} />
           </View>

           <View style={{flexDirection: "row", justifyContent: "center"}}> 
            <Image style={{ width: 150, height: 150, marginTop: 2, marginRight: 1}} source={{uri: currentTask.defaultImgUrl}} />
            <View>
            <TouchableWithoutFeedback style={{justifyContent: "center", alignItems: "center", flexDirection: "column", width: 150, height: 150, margin: 1, marginTop: 2, borderWidth: 2, borderColor: "lightgray"}}>
            <FontAwesome name="camera-retro" size={84} color="lightgray"/>
            <Text style={{color: "lightgray"}}>add an image</Text>
            </TouchableWithoutFeedback>
            </View>
            </View>
            
            <View>

          <View style={styles.inputReflection}>
            <TextInput
              style={styles.addReflection}
              placeholder='add a reflection'
              multiline={true}
              textAlign={'left'}
              maxLength={1000}
              onChangeText={(newText) => setReflection(newText)}
              defaultValue={reflection}
            />
            </View>
            </View>

            <View style={styles.visibility}>
            <FontAwesome name="eye" size={16} color="black" />
            <Text style={{paddingLeft: 10}}>Who can see this post?</Text>
            </View>
            <View style={styles.visibilityOptions}>
            <Text style={{paddingLeft: 30}}>only me</Text>
            <Text style={{paddingLeft: 30}}>friends</Text>
            <Text style={{paddingLeft: 30}}>public</Text>
            </View>
            <Text
              style={styles.submitCompletedTask}
              onPress={() => handleSubmit(currentTask.taskId)}
            >
              submit completed task
            </Text>
          </View>
        ) : null}

          {view === 'submitEdit' ? (
        
        <View style={styles.submitHeading}> 
            <Text style={[styles.subheading, styles.fontWeight700]}>{currentTask.title}</Text>
            <Text style={{padding: 20}}>{currentTask.description}</Text>

          <Text style={[styles.center,{color:"lightgray"}]}>select an image</Text>
          <View style={{flexDirection: "row", justifyContent: "center", marginTop:10}}>
            <Image style={{ width: 150, height: 150, marginTop: 2, marginRight: 1,}} source={{uri: currentTask.defaultImgUrl}} />
            <Image style={{ width: 150, height: 150, marginTop: 2, marginRight: 1}} source={{uri: currentTask.defaultImgUrl}} />
           </View>

           <View style={{flexDirection: "row", justifyContent: "center"}}> 
            <Image style={{ width: 150, height: 150, marginTop: 2, marginRight: 1}} source={{uri: currentTask.defaultImgUrl}} />
            <View>
            <TouchableWithoutFeedback style={{justifyContent: "center", alignItems: "center", flexDirection: "column", width: 150, height: 150, margin: 1, marginTop: 2, borderWidth: 2, borderColor: "lightgray"}}>
            <FontAwesome name="camera-retro" size={84} color="lightgray"/>
            <Text style={{color: "lightgray"}}>add an image</Text>
            </TouchableWithoutFeedback>
            </View>
            </View>
            
            <View>

          <View style={styles.inputReflection}>
            <TextInput
              style={styles.addReflection}
              placeholder={currentTask.reflection}
              multiline={true}
              textAlign={'left'}
              maxLength={1000}
              onChangeText={(newText) => setReflection(newText)}
              defaultValue={reflection}
            />
            </View>
            </View>

          <View style={styles.visibility}>
            <FontAwesome name="eye" size={16} color="black" />
            <Text style={{paddingLeft: 10}}>Who can see this post?</Text>
            </View>
            <View style={styles.visibilityOptions}>
            <Text style={{paddingLeft: 30}}>only me</Text>
            <Text style={{paddingLeft: 30}}>friends</Text>
            <Text style={{paddingLeft: 30}}>public</Text>
            </View>
            <Text
              style={styles.submitCompletedTask}
              onPress={() => handleSubmit(currentTask.taskId)}
            >
              submit
            </Text>
          </View>
        ) : null}

        {/* users posts section */}
        {view === 'posts' ? (
          <View>
            <Text style={[styles.subheading, styles.fontWeight700]}>Your Post History</Text>
            {allUserTasks.map((item) => {


              return item.completed == true ? (
                <View style={styles.postContainer} key={item.taskId}>
                  <Image
                    style={{ width: 'auto', height: 400 }}
                    source={item.defaultImgUrl ? { uri: item.defaultImgUrl } : null}
                  />
                  <View style={styles.postTitleEditContainer}>
                  <Text style={styles.postTag}>{item.title}</Text>
                  <View style={styles.postEditDeleteContainer}>
                    <TouchableWithoutFeedback onPress={() => handleView('submitEdit', item)}>
                  <FontAwesome name="pencil" size={16} color="black" style={styles.postEdit}/>
                  </TouchableWithoutFeedback>
                  <FontAwesome name="trash" size={16} color="black" style={styles.postEdit}/>
                  </View>

                  </View>
                  <Text style={styles.reflection}>
                    {item.reflection}
                  </Text>
                   
              
                </View>
              ) : null;
            })}
          </View>
        ) : null}

         {/* users posts section */}
         {view === 'friendsPosts' ? (
          <View>
            <Text style={[styles.subheading, styles.fontWeight700]}>{currentFriendUsername}'s Posts</Text>
            {friendsPosts.map((item) => {
              return item.completed == true ? (
                <View style={styles.postContainer} key={item.taskId}>
                  <Image
                    style={{ width: 'auto', height: 400 }}
                    source={item.defaultImgUrl ? { uri: item.defaultImgUrl } : null}
                  />
                  <View style={styles.friendsPostTitleCommentContainer}>
                  <Text style={[styles.postTag]}>{item.title}</Text>
                  <MaterialCommunityIcons name="chat-outline" size={16} color="black" style={styles.postEdit}/>

                  </View>
                  <Text style={styles.reflection}>
                    {item.reflection}
                  </Text>
                   
                </View>
              ) : null;
            })}
          </View>
        ) : null}

        {/* following section */}
        {view === 'featured' ? (
          <View style={styles.featuredContainer}>
             <View style={styles.followingSectionContainer}>
              <Text style={[styles.subheading, styles.fontWeight700]}>Following</Text>
              
{allFriends.length ? 
        <ScrollView horizontal={true}>
        <View style={styles.followingItemsContainer}>
        {allFriends.map((item)=> 

         <TouchableWithoutFeedback onPress={() => handleDisplayFollowing(item.userid, item.username)} key={item.userid}>
          <Image source={{uri: profileImagesArray[6]["url"]}} style={styles.followingItem}/>
          <Text style={[styles.followingItemUsername, styles.center]}>{item.username}</Text>
       </TouchableWithoutFeedback>
        )
      }
      </View>
     </ScrollView> : <Text style={[styles.center, styles.padding10]}>no friend posts to display</Text>}
     
    </View>

            {/* featured section */}

            <View style={styles.featuredSectionContainer}>
              <Text style={[styles.subheading, styles.fontWeight700]}>Featured</Text>

              <ScrollView>
                <View style={styles.featuredItemsContainer}>
                  {featuredPostsData ? (
                    featuredPostsData.map((item) => (
                      <View key={item.taskId}>
                        <TouchableWithoutFeedback
                          style={styles.featuredItemTouch}
                          onPress={() => handleDisplayFeaturedPost(item.taskId)}
                        >
                          <Image
                            style={styles.featuredItem}
                            source={{ uri: item.defaultImgUrl }}
                          />
                        </TouchableWithoutFeedback>
                      </View>
                    ))
                  ) : (
                    <text>nothing to display</text>
                  )}
                </View>
              </ScrollView>
            </View>
          </View>
        ) : null}

        {/* display single posts as a stack to swipe thru section */}
        {/* swipe right changes display to taskId+ 1, swipe left changes display to taskId -1 */}


        {view === 'postStack' ? (
         
          <View style={styles.displayPostContainer}>
                     
              <ImageBackground
                style={styles.displayPostImage}
                source={{ uri: displayPost.defaultImgUrl }}
              />

          <View style={styles.previousNext}>
              <TouchableWithoutFeedback onPress={() => handlePrevious(displayPost.taskId)}>
                 <Text style={styles.previous} ></Text>
              </TouchableWithoutFeedback>  

              <TouchableWithoutFeedback style={styles.showDisplayReflection} onPress={() => handleDisplayPostText()}>
              <Text> </Text>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback onPress={() => handleNext(displayPost.taskId)} >
                 <Text style={styles.next}> </Text>
              </TouchableWithoutFeedback>
              </View>

                
                  {displayPostText % 3 === 1 ? 
                   <View style={styles.displayPostTextContainer}>
                  <Text style={styles.displayReflection}>{displayPost.reflection}</Text> 
                  </View> : null}

                  {displayPostText % 3 === 2 ? 
                   <View style={styles.displayPostTextContainer}>
                  <Text style={styles.displayReflection}>{displayPost.reflection2}</Text> 
                  </View>
                  : null}
               
              </View>
            
             
        ) : null}


      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 100,
  },
  center: {
    textAlign: 'center',
  },
  padding10: {
    padding: 10
  },
  white: {color: "white"},
  fontWeight700: {
    fontWeight: "700"
  },
  topOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  twentyEight: {
    padding: 10,
    color: "white"
  },
  twentyEightContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 10,
  },

  dashboardContainer: {
    borderColor: "black",
    backgroundColor: "#3F88C5",
    borderRadius: 5
},
dashboardPipe: {
  height: 70,
  borderLeftWidth: 1, 
  borderColor: "white" },

userDashboard: {
  justifyContent: "space-around",
  padding: 5,  
  margin: 5,
  backgroundColor: '"#5BD858"',
},
dashboardRowTop : {
    flexDirection: 'row',
    alignItems: 'top',
    justifyContent: 'space-around',
    paddingTop: 15,
    paddingBottom: 10,
  },
  dashboardRowBottom : {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 5,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderColor: "white"
  },

  dashboardCompletedCount: {
    fontSize: 40,
    textAlign: 'center',
    color: "white",
  }, 
  dashboardCompletedContainer: {
    flexDirection: "row",
    textAlign: 'center',
    color: "white",

  }, 
  goalNum: {
    paddingBottom: 10,
    color: "white",
  },
  newList: {
    textAlign: 'center',
    paddingBottom: 30,
    color: 'gray',
  },
  subheading: {
    textAlign: 'center',
    paddingBottom: 20,
    paddingTop: 20,
    letterSpacing: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  about:{
    paddingTop: 30,
  color: "lightgray"
  },
  aboutParagraph: {
    lineHeight: 25,
    textAlign: 'justify',
    paddingBottom: 30,
  },
  taskTitle: {
    textAlign: 'center',
    padding: 15,
    fontWeight: '500',
    fontSize: 16,
    color: "white"
  },
  taskIconContainer:{
    flexDirection: "row", 
    justifyContent: "center", 
    padding: 10},

  taskDescription: {
    textAlign: 'center',
    padding: 15,
    color:"white"
  },
  completed: {
    paddingBottom: 30,
  },
  goToSubmitContainer: {
    textAlign: 'center',
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  goToSubmit: {
    padding: 5,
    margin: 5,
    borderWidth: 1,
    color: 'white',
    borderRadius: 5,
    borderColor: "white",
  },
  uncompletedContainer:{
    backgroundColor: "#585BD9", 
  borderRadius: "5", 
  margin: 5, 
  width: 300
},

 
  submitCompletedTask: {
    textAlign: 'center',
    padding: 10,
    backgroundColor: 'white',
    width: '60%',
    marginLeft: '20%',
    marginRight: '20%',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'white',
    overflow: 'hidden',
  },
  addPhoto: {
    textAlign: 'center',
    borderWidth: 1,
    padding: 100,
    paddingBottom: 300,
  },
  inputReflection:{
  marginTop:30,
  marginBottom: 30
  },
  submitHeading:{
    marginLeft: 20,
    marginRight: 20
  },
  addReflection: {
    textAlign: 'center',
    margin: 30,
  },
  submitPostBtn: {
    textAlign: 'center',
    padding: 50,
  },

  featuredContainer: {
    flexDirection: 'column',
  },
  followingSectionContainer: {
    flex: 1,
  },
  followingItemsContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  followingItemAdd: {
    width: 100,
    height: 100,
    textAlign: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 0,
    paddingBottom: 40,
    marginRight: 5,
    marginLeft: 5,
    borderColor: 'black',
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 50,
    backgroundColor: "white", 
    overflow: "hidden"
  },
  followingItem: {
    width: 100,
    height: 100,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 40,
    marginRight: 5,
    marginLeft: 5,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 50,
    alignItems: "center",
  },
  followingItemUsername:{
    color: "black", 
  paddingLeft: 5},

  featuredSectionContainer: {
    flex: 1,
  },
  featuredItemsContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
  },
  featuredItemTouch: {
    width: '100%',
  },
  featuredItem: {
    width: 183,
    height: 250,
    padding: 1,
    margin: 1,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
  },

  imageContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },

  imageBackground: {
    flex: 1,
    alignItems: 'center',
    resizeMode: 'contain',
  },
  postTag: {
    fontWeight: '800',
    paddingTop: 20,
    paddingBottom: 10,
  },
  reflection: {
    paddingBottom: 20,
  },
  postContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    paddingBottom: 5,
    marginBottom: 10,
  },
  displayPostContainer: {
    width: '100%',
    justifyContent: 'space-between',
  },
  displayPostImage: {
    width: '110%',
    height: 800,
    marginLeft: -20,
    marginRight: -20
  },
 
  displayPostTextContainer: {
    padding: 10,
    margin: "10%",
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,.5)',
    bottom: 30,
    borderRadius: "10",
    width: "80%",
  },
  displayReflection: {
    fontSize: 16,
    lineHeight: 20,
    color: "white",
    textAlign: "center",
    fontWeight: "700"
  },
  previousNext : {
    position: 'absolute',
    width: "112%",
    marginLeft: -20,
    height: 800,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  previous:{
    paddingTop: 330,
    paddingBottom: 330,
    width: 110,
    marginLeft: 0,

  },
  showDisplayReflection:{
    paddingTop: 330,
    paddingBottom: 330,
    width: 200,
  },
  next:{
paddingTop: 330,
paddingBottom: 330,
width: 130,
},
backToFeatured:{
  backgroundColor:"red"
},

strengths: {
  color: "white", 
paddingLeft: 5, 
paddingBottom: 5
},
strengthIconRow:{
    flexDirection: "row", 
    paddingRight: 15, 
    paddingBottom: 10 
  },

  strengthsIconContainer:{
flexDirection: "row",
justifyContent: "center",
flexWrap: "wrap"
  },
  postTitleEditContainer:{
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-between"
  },
  postEdit:{
    marginTop:20, 
    marginRight: 10
  },
  postEditDeleteContainer:{
    flexDirection: "row"},
  friendsPostTitleCommentContainer:{
    flexDirection: "row", 
    justifyContent: "space-between"},
    iconAndNameContainer:{
      flexDirection: "row", alignItems: "center"},
      visibility:{flexDirection: "row", alignItems: "center", justifyContent: "center"},
      visibilityOptions:{flexDirection:"row", justifyContent: "center", paddingTop: 30, paddingBottom: 30}
});

export default Tasks;
