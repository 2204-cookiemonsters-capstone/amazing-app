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
  TouchableWithoutFeedback,
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



const featuredPostsData = [
  {
    taskId: 1,
    title: 'read a book',
    description:
      'it can be any genre of your choice, just finish a book this month',
    defaultImgUrl: 'https://i.imgur.com/D7Iht7E.jpg',
    reflection: 'this is a sample reflection 1. The quick brown fox jumped over the lazy dog. Sally sells seashells by the sea shore',
    reflection2: ' this is a sample reflection 2',
    reflection3: 'reflection 3',
    reflection4: 'reflection 4',
    reflection5: 'reflection 5',
    reflection6: 'reflection 6',
    reflection7: 'reflection 7',
    reflection8: 'reflection 8',
    month: 'July',
    year: 2022,

  },
  {
    taskId: 2,
    title: 'meditate',
    description:
      'spend 30 minutes practicing meditation.',
      defaultImgUrl: 'https://i.imgur.com/syBzUa2.jpg',
      reflection: 'reflection 1',
      reflection2: 'reflection 2',
      reflection3: 'reflection 3',
      reflection4: 'reflection 4',
      reflection5: 'reflection 5',
      reflection6: 'reflection 6',
      reflection7: 'reflection 7',
      reflection8: 'reflection 8',
      month: 'July',
      year: 2022,
  },
  {
    taskId: 3,
    title: 'spend an hour in nature',
    description:
      'sample description for this task this is just a sample description for a task this is just a sample description for a task',
    defaultImgUrl: 'https://i.imgur.com/NNKNIWz.jpg',
    reflection: 'reflection 1',
    reflection2: 'reflection 2',
    reflection3: 'reflection 3',
    reflection4: 'reflection 4',
    reflection5: 'reflection 5',
    reflection6: 'reflection 6',
    reflection7: 'reflection 7',
    reflection8: 'reflection 8',
    month: 'July',
    year: 2022,

  },
  {
    taskId: 4,
    title: 'write a letter',
    description: 'write and send a letter in the mail',
    defaultImgUrl: 'https://i.imgur.com/XKzBaOA.jpg',
    reflection: 'reflection 1',
    reflection2: 'reflection 2',
    reflection3: 'reflection 3',
    reflection4: 'reflection 4',
    reflection5: 'reflection 5',
    reflection6: 'reflection 6',
    reflection7: 'reflection 7',
    reflection8: 'reflection 8',    
    month: 'July',
    year: 2022,

  },
  {
    taskId: 5,
    title: 'spend 30 minutes practicing deep breathing',
    description:
      'sample description for this task this is just a sample description for a task this is just a sample description for a task',
      defaultImgUrl: 'https://i.imgur.com/hlhLJcq.jpg',
      reflection: 'reflection 1',
      reflection2: 'reflection 2',
      reflection3: 'reflection 3',
      reflection4: 'reflection 4',
      reflection5: 'reflection 5',
      reflection6: 'reflection 6',
      reflection7: 'reflection 7',
      reflection8: 'reflection 8',  

      month: 'July',
      year: 2022,

  },
  {
    taskId: 6,
    title: 'complete an art project',
    description:
      'sample description for this task this is just a sample description for a task this is just a sample description for a task',
      defaultImgUrl: 'https://i.imgur.com/xVtrThI.jpg',
      reflection: 'reflection 1',
      reflection2: 'reflection 2',
      reflection3: 'reflection 3',
      reflection4: 'reflection 4',
      reflection5: 'reflection 5',
      reflection6: 'reflection 6',
      reflection7: 'reflection 7',
      reflection8: 'reflection 8',  
      month: 'July',
      year: 2022,

  },
  {
    taskId: 7,
    title: 'write a journal entry',
    description:
      "write a journal entry-- what's been on your mind? What is a story you have to tell? What do you need to write down?",
      defaultImgUrl:'https://i.imgur.com/auj7RJW.jpg',

      reflection: 'reflection 1',
      reflection2: 'reflection 2',
      reflection3: 'reflection 3',
      reflection4: 'reflection 4',
      reflection5: 'reflection 5',
      reflection6: 'reflection 6',
      reflection7: 'reflection 7',
      reflection8: 'reflection 8',  
      month: 'July',
      year: 2022,
 
  },
  {

    taskId: 8,
    title: 'family past',
    description: 'record a family story',
    defaultImgUrl: 'https://i.imgur.com/xVtrThI.jpg',

    reflection: 'reflection 1',
    reflection2: 'reflection 2',
    reflection3: 'reflection 3',
    reflection4: 'reflection 4',
    reflection5: 'reflection 5',
    reflection6: 'reflection 6',
    reflection7: 'reflection 7',
    reflection8: 'reflection 8',  
    month: 'July',
    year: 2022,

  },
  {
    taskId: 9,
    title: '10 meaningful photos',
    description:
      'Take ten photos of important people, places or things in your life',
      defaultImgUrl: 'https://i.imgur.com/RcYQzBW.jpg',

      reflection: 'reflection 1',
      reflection2: 'reflection 2',
      reflection3: 'reflection 3',
      reflection4: 'reflection 4',
      reflection5: 'reflection 5',
      reflection6: 'reflection 6',
      reflection7: 'reflection 7',
      reflection8: 'reflection 8',  
      month: 'July',
      year: 2022,

  },
  {

    taskId: 10,
    title: 'sit with water',
    description:
      'visit a pond, lake, river, ocean, or other body of water and observe the water',
      defaultImgUrl: 'https://i.imgur.com/kC0vOPy.jpg',

      reflection: 'reflection 1',
      reflection2: 'reflection 2',
      reflection3: 'reflection 3',
      reflection4: 'reflection 4',
      reflection5: 'reflection 5',
      reflection6: 'reflection 6',
      reflection7: 'reflection 7',
      reflection8: 'reflection 8',  
      month: 'July',
      year: 2022,

  },
  {

    taskId: 11,
    title: 'walking meditation',
    description:
      'go on a walk, and focus on feeling the ground beneath your feet with each step',
      defaultImgUrl: 'https://i.imgur.com/9VFmLyh.jpg',

      reflection: 'this is a sample of a first reflection',
      reflection2: 'this is a sample of a second reflection',
      reflection3: 'this is a sample of a third reflection',
      reflection4: 'reflection 4',
      reflection5: 'reflection 5',
      reflection6: 'reflection 6',
      reflection7: 'reflection 7',
      reflection8: 'reflection 8',  
      month: 'July',
      year: 2022,

  },
  {
    taskId: 12,
    title: 'watch a movie',
    description: 'watch a movie',
    defaultImgUrl: 'https://i.imgur.com/xVtrThI.jpg',

    reflection: 'reflection 1',
    reflection2: 'reflection 2',
    reflection3: 'reflection 3',
    reflection4: 'reflection 4',
    reflection5: 'reflection 5',
    reflection6: 'reflection 6',
    reflection7: 'reflection 7',
    reflection8: 'reflection 8',  
    month: 'July',
    year: 2022,

  },
  {

    taskId: 13,
    title: 'be a critic',
    description: 'write positive reviews for the locally owned places you love',
    defaultImgUrl: 'https://i.imgur.com/p5Lyn9H.jpg',

    reflection: 'reflection 1',
    reflection2: 'reflection 2',
    reflection3: 'reflection 3',
    reflection4: 'reflection 4',
    reflection5: 'reflection 5',
    reflection6: 'reflection 6',
    reflection7: 'reflection 7',
    reflection8: 'reflection 8',  
    month: 'July',
    year: 2022,

  },
  {

    taskId: 14,
    title: 'walk',
    description: '30 minute walk',
    defaultImgUrl: 'https://i.imgur.com/NNKNIWz.jpg',

    reflection: 'reflection 1',
    reflection2: 'reflection 2',
    reflection3: 'reflection 3',
    reflection4: 'reflection 4',
    reflection5: 'reflection 5',
    reflection6: 'reflection 6',
    reflection7: 'reflection 7',
    reflection8: 'reflection 8',  
    month: 'July',
    year: 2022,

  },
{
  taskId: 15,
  title: '30 minute workout',
  description: '30 minute workout',
  defaultImgUrl: 'https://i.imgur.com/bb17UDd.jpg',

  reflection: 'reflection 1',
  reflection2: 'reflection 2',
  reflection3: 'reflection 3',
  reflection4: 'reflection 4',
  reflection5: 'reflection 5',
  reflection6: 'reflection 6',
  reflection7: 'reflection 7',
  reflection8: 'reflection 8',  
  month: 'July',
  year: 2022,

},
  {
    taskId: 16,
    title: 'movement',
    description: 'yoga, dance, martial arts. Move your body for 30 minutes.',
    defaultImgUrl: 'https://i.imgur.com/xVtrThI.jpg',

    reflection: 'reflection 1',
    reflection2: 'reflection 2',
    reflection3: 'reflection 3',
    reflection4: 'reflection 4',
    reflection5: 'reflection 5',
    reflection6: 'reflection 6',
    reflection7: 'reflection 7',
    reflection8: 'reflection 8',  
    month: 'July',
    year: 2022,

  },
  {
    taskId: 17,
    title: 'stretch',
    description: 'stretch each part of your body-- take lots of deep breaths as you let go of whatever tightness you feel in your muscles',
    defaultImgUrl: 'https://i.imgur.com/uJOBwHY.jpg',

    reflection: 'reflection 1',
    reflection2: 'reflection 2',
    reflection3: 'reflection 3',
    reflection4: 'reflection 4',
    reflection5: 'reflection 5',
    reflection6: 'reflection 6',
    reflection7: 'reflection 7',
    reflection8: 'reflection 8', 
    month: 'July',
    year: 2022,

  },
  {
    taskId: 18,
    title: 'deep relaxation',
    description:
      'lie down and spend 10 minutes relaxing your body without falling asleep',
      defaultImgUrl: 'https://i.imgur.com/xVtrThI.jpg',
 
      reflection: 'reflection 1',
      reflection2: 'reflection 2',
      reflection3: 'reflection 3',
      reflection4: 'reflection 4',
      reflection5: 'reflection 5',
      reflection6: 'reflection 6',
      reflection7: 'reflection 7',
      reflection8: 'reflection 8', 
      month: 'July',
      year: 2022,

  },
  {
    taskId: 19,
    title: 'nature sit',
    description: "spend several minutes sitting in nature without your phone or any other distractions-- just listen and observe. ",
    defaultImgUrl: 'https://i.imgur.com/Ga1vIyc.jpg',
 
    reflection: 'reflection 1',
    reflection2: 'reflection 2',
    reflection3: 'reflection 3',
    reflection4: 'reflection 4',
    reflection5: 'reflection 5',
    reflection6: 'reflection 6',
    reflection7: 'reflection 7',
    reflection8: 'reflection 8', 
    month: 'July',
    year: 2022,

  },
  {
    taskId: 20,
    title: 'volunteer',
    description: 'find a volunteer opportunity in your community',
    defaultImgUrl: 'https://i.imgur.com/xOEG5mO.jpg',
    month: 'July',
    year: 2022,

  },{
    taskId: 21,
    title: 'gratitude meditation',
    description: 'Spend several minutes meditating on the people and experiences you are grateful for in your life.',
    defaultImgUrl: 'https://i.imgur.com/GyKJQjk.jpg',

    reflection: 'reflection 1',
    reflection2: 'reflection 2',
    reflection3: 'reflection 3',
    reflection4: 'reflection 4',
    reflection5: 'reflection 5',
    reflection6: 'reflection 6',
    reflection7: 'reflection 7',
    reflection8: 'reflection 8', 
    month: 'July',
    year: 2022,

  },
  {
    taskId: 22,
    title: 'reflection',
    description: 'write a journal entry on your ',
    defaultImgUrl: 'https://i.imgur.com/Xcz7KJ7.jpg',

    reflection: 'reflection 1',
    reflection2: 'reflection 2',
    reflection3: 'reflection 3',
    reflection4: 'reflection 4',
    reflection5: 'reflection 5',
    reflection6: 'reflection 6',
    reflection7: 'reflection 7',
    reflection8: 'reflection 8', 
    month: 'July',
    year: 2022,

  },
  {
    taskId: 23,
    title: 'donate something you own',
    description: 'donate something you own',
    defaultImgUrl: 'https://i.imgur.com/cjOOlHY.jpg',

    reflection: 'reflection 1',
    reflection2: 'reflection 2',
    reflection3: 'reflection 3',
    reflection4: 'reflection 4',
    reflection5: 'reflection 5',
    reflection6: 'reflection 6',
    reflection7: 'reflection 7',
    reflection8: 'reflection 8', 
    month: 'July',
    year: 2022,
  
  },
  {
    taskId: 24,
    title: 'task 24',
    description: 'task 24 description',
    defaultImgUrl: 'https://i.imgur.com/xVtrThI.jpg',
 
    reflection: 'reflection 1',
    reflection2: 'reflection 2',
    reflection3: 'reflection 3',
    reflection4: 'reflection 4',
    reflection5: 'reflection 5',
    reflection6: 'reflection 6',
    reflection7: 'reflection 7',
    reflection8: 'reflection 8', 
    month: 'July',
    year: 2022,

  },
  {
    taskId: 25,
    title: 'task 25',
    description: 'task 25 description',
    defaultImgUrl: 'https://i.imgur.com/xVtrThI.jpg',

    reflection: 'reflection 1',
    reflection2: 'reflection 2',
    reflection3: 'reflection 3',
    reflection4: 'reflection 4',
    reflection5: 'reflection 5',
    reflection6: 'reflection 6',
    reflection7: 'reflection 7',
    reflection8: 'reflection 8', 
    month: 'July',
    year: 2022,

  },
  {
    taskId: 26,
    title: 'support a local business',
    description: 'visit a locally owned business',
    defaultImgUrl: 'https://i.imgur.com/X97pCMd.jpg',
 
    reflection: 'reflection 1',
    reflection2: 'reflection 2',
    reflection3: 'reflection 3',
    reflection4: 'reflection 4',
    reflection5: 'reflection 5',
    reflection6: 'reflection 6',
    reflection7: 'reflection 7',
    reflection8: 'reflection 8', 
    month: 'July',
    year: 2022,

  },
  {
    taskId: 27,
    title: 'task 27',
    description: 'task 27 description',
    defaultImgUrl: 'https://i.imgur.com/xVtrThI.jpg',

    reflection: 'reflection 1',
    reflection2: 'reflection 2',
    reflection3: 'reflection 3',
    reflection4: 'reflection 4',
    reflection5: 'reflection 5',
    reflection6: 'reflection 6',
    reflection7: 'reflection 7',
    reflection8: 'reflection 8', 
    month: 'July',
    year: 2022,
  },
  {
    taskId: 28,
    title: 'express gratitude',
    description: 'express gratitude to 3 people who have made a positive impact on your life',
    defaultImgUrl: 'https://i.imgur.com/A6ZH2gb.jpg',

    reflection: 'reflection 1',
    reflection2: 'reflection 2',
    reflection3: 'reflection 3',
    reflection4: 'reflection 4',
    reflection5: 'reflection 5',
    reflection6: 'reflection 6',
    reflection7: 'reflection 7',
    reflection8: 'reflection 8', 
    month: 'July',
    year: 2022,
  },
];

const Tasks = (props) => {
  const [allUserTasks, setAllUserTasks] = useState([]);
  const [view, setView] = useState('featured');
  const [open, setOpen] = useState(0);
  const [goalNum, setGoalNum] = useState('28');
  const [currentTask, setCurrentTask] = useState({});
  const [displayPost, setDisplayPost] = useState({});
  const [reflection, setReflection] = useState('');
  const [displayPostText, setDisplayPostText] = useState(true);
  const [displayReflection, setDisplayReflection] = useState(1)

  let completed = allUserTasks.filter((item) => item.completed === true);

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
      setAllUserTasks(snapShot.data().userTasks)
    }
  

  const handleView = (view) => {
    if (view === 'tasks' || view === 'posts' || view === 'featured') {
      setDisplayPost({});
    }
    setView(view);
    setOpen(0);
  };

  const handleOpen = (taskId) => {
    if (open !== taskId) {
      setOpen(taskId);
      let userTask = allUserTasks.filter((item) => item.taskId === taskId);
      setCurrentTask(userTask[0]);
    } else {
      setOpen(0);
      setCurrentTask({});
    }
  };

  const handleDisplayFeaturedPost = (id) => {
    let post = featuredPostsData.filter((item) => item.taskId === id);
    setDisplayPostText(true);
    setDisplayPost(post[0]);
    setView('postStack');
  };

  const handleDisplayPostText = () => {
    if (displayPostText) {
      setDisplayPostText(false);
    } else {
      setDisplayPostText(true);
    }
  };

  const handleDisplayReflection = (num) => {
    setDisplayReflection(num + 1)
  }

  const handlePrevious = (taskId) => {
    let previousPost = featuredPostsData.filter((item) => item.taskId === taskId - 1)
    previousPost.length ? setDisplayPost(previousPost[0]) : setView('featured')
  }
  

  const handleNext = (taskId) => {
    let nextPost = featuredPostsData.filter((item) => item.taskId === taskId + 1)
    console.log(nextPost)
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
    console.log('useEffect1')
    // console.log('All user tasks', allUserTasks);

  }, []);

// need to do a useEffect to update taskPosts if user submits a post or changes the goal num-- need to timestamp the postTime value to current time


  useEffect(() => {
    // console.log('useEffect2');
    fetchUserPosts();
  }, [allUserTasks]);

// need to do a useEffect to fetch friends and featured recent posts if visits featured view / scrolls.


  return (
    
    <ScrollView>
      <View style={styles.container}>
        {/* top scroll bar */}
        {/* need to make each have onPress that sets state view to corresponding section, also makes icon/title bold and/or underlined */}

        <View style={styles.topOptions}>
          <Text style={styles.subheading} onPress={() => handleView('posts')}>
            posts
          </Text>

          <Text style={styles.subheading} onPress={() => handleView('tasks')}>
            28
          </Text>

          <Text style={styles.subheading} onPress={() => handleView('featured')}>
            featured
          </Text>
        </View>

        {/* your tasks section */}
        {view === 'tasks' ? (
          <View>
            <View>

            <View style={styles.followingSectionContainer}>
              <Text style={styles.subheading}>Following</Text>
              <ScrollView horizontal={true}>
              
                <View style={styles.followingItemsContainer}>
                  <TouchableOpacity onPress={() => handleFollowNewPeople()}>
                    <Text style={styles.followingItemAdd}>+</Text>
                  </TouchableOpacity>

        {featuredPostsData.map((item)=> 
         <TouchableOpacity onPress={() => handleDisplayFeaturedPost(item.taskId)} key={item.taskId}>
         <Image
           style={styles.followingItem}
           source={{ uri: item.defaultImgUrl }}
         />
       </TouchableOpacity>
        )
      }
      </View>
     </ScrollView>

    </View>
    <View style={styles.dashboardContainer}>
<Text style={[styles.center, styles.padding10, styles.fontWeight700]}>Your Dashboard</Text>

      <View style={styles.userDashboard}>

          {/* number completed */}
         
<View style={styles.dashboardRowTop}>
  <View style={styles.dashboardSetYourGoal}>
        <View >
            <Text style={[styles.goalNum, styles.center, styles.fontWeight700]}>
              set your goal</Text>

              <Text style={styles.center}>
              <Text onPress={() => handleGoalNum(7)}> 7 </Text>
              <Text onPress={() => handleGoalNum(14)}> 14 </Text>
              <Text onPress={() => handleGoalNum(21)}> 21 </Text>
              <Text onPress={() => handleGoalNum(28)}> 28 </Text>
            </Text>
            </View>
        </View>
        
        <View style={styles.dashboardCompleted}>
          <View>
          <Text style={styles.fontWeight700}>completed</Text>
          </View>
          <View style={styles.dashboardCompletedContainer}>
              <Text style={styles.dashboardCompletedCount}>{completed ? completed.length : null}</Text>
              <Text style={styles.padding10}>/ {goalNum}</Text>
          </View>
          </View>
        </View>

        <View style={styles.dashboardRowBottom}>
        

      <View style={styles.center}>
        <Text style={[styles.center, styles.padding10, styles.fontWeight700]}>Your Strengths</Text>
        <Text>complete more tasks to see your strengths</Text>
        </View>
        </View>
  </View>

            <Text style={styles.newList}>

            </Text>
        </View>


            <Text></Text>
            <Text style={styles.subheading}>Remaining Tasks for {allUserTasks && allUserTasks[0] ? allUserTasks[0].month : null}</Text>
          </View>
            {!allUserTasks ? null : allUserTasks.map((item) => {
              // console.log(item, "item")
            return (
              item.completed !== true ? (
                <View style={styles.uncompletedContainer} key={item.taskId}>
                  <Text
                    style={styles.taskTitle}

                    onPress={() => handleOpen(item.taskId)}
                  >
                    {item.title}
                  </Text>
                  {open === item.taskId ? (
                    <View>
                      <Text style={styles.taskDescription}>
                        {item.description}
                      </Text>
                      <View style={styles.goToSubmitContainer}>
                        <Text
                          style={styles.goToSubmit}
                          onPress={() => handleView('submit')}
                        >
                          submit your post
                        </Text>
                        
                      </View>
                    </View>
                  ) : null}
                </View>
              ) : null
            )})}
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
              <Text style={styles.subheading}>what</Text>
              <Text style={styles.aboutParagraph}>
                Every 28 days, we post a list of 28 tasks for all users to
                achieve. These tasks change each month, but are intended to
                inspire our users to spend time in nature, connecting with their
                communities, and practicing activities proven to promote
                wellbeing.{' '}
              </Text>
              <Text style={styles.subheading}>why</Text>
              <Text style={styles.aboutParagraph}>
                {' '}
                Lots of social media wants to suck users in with endless
                scrolling, shopping, and comparisons. Our tasks are all intended
                to motivate our users to find a balance-- to put their phones
                down for awhile, to reflect, and to connect.
              </Text>
              <Text style={styles.subheading}>how</Text>
              <Text style={styles.aboutParagraph}>
                All you have to do is choose a task and begin. If 28 tasks is
                beyond your grasp, you can set your monthly goal to 7, 14, or 21
                tasks. To complete a task, simply click on that task and submit
                any photo and a short description or reflection on the activity.{' '}
              </Text>
            </View>
          </ScrollView>
        ) : null}

        {/* submit a post section */}
        {view === 'submit' ? (
          <View>
            <Text style={styles.subheading}>{currentTask.title}</Text>
            <Text >{currentTask.description}</Text>
          
            <TextInput
              style={styles.addReflection}
              placeholder='add a reflection'
              multiline={true}
              textAlign={'left'}
              maxLength={1000}
              onChangeText={(newText) => setReflection(newText)}
              defaultValue={reflection}
            />
            <Text
              style={styles.submitCompletedTask}
              onPress={() => handleSubmit(currentTask.taskId)}
            >
              submit completed task
            </Text>
          </View>
        ) : null}

        {/* users posts section */}
        {view === 'posts' ? (
          <View>
            <Text style={styles.subheading}>your post history</Text>
            {allUserTasks.map((item) => {


              return item.completed == true ? (
                <View style={styles.postContainer} key={item.taskId}>
                  <Image
                    style={{ width: 'auto', height: 400 }}
                    source={item.defaultImgUrl ? { uri: item.defaultImgUrl } : null}
                  />
                  <Text style={styles.postTag}>{item.title}</Text>
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
            

            {/* featured section */}

            <View style={styles.featuredSectionContainer}>
              <Text style={styles.subheading}>Featured</Text>

              <ScrollView>
                <View style={styles.featuredItemsContainer}>
                  {featuredPostsData ? (
                    featuredPostsData.map((item) => (
                      <View key={item.taskId}>
                        <TouchableOpacity
                          style={styles.featuredItemTouch}
                          onPress={() => handleDisplayFeaturedPost(item.taskId)}
                        >
                          <Image
                            style={styles.featuredItem}
                            source={{ uri: item.defaultImgUrl }}
                          />
                        </TouchableOpacity>
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
            <TouchableWithoutFeedback onPress={() => handleDisplayPostText()}>
              <ImageBackground
                style={styles.displayPostImage}
                source={{ uri: displayPost.defaultImgUrl }}
              />
            </TouchableWithoutFeedback>
            <View style={styles.previousNext}>
              <Text onPress={() => handlePrevious(displayPost.taskId)}>previous</Text>
               <Text onPress={() => handleNext(displayPost.taskId)}>next</Text>
            </View>
            {displayPostText ? (
              <View style={styles.displayPostTitleContainer}>
                <Text style={styles.displayPostTitle}>{displayPost.title}</Text>
              </View>
            ) : null}
              {displayPostText ? (
              <View style={styles.displayPostTextContainer}>
                <Text style={styles.displayReflection}>
                  {displayPost.reflection}
                </Text>
              </View>
            ) : null}
             
          </View>
        ) : null}

        {/* follow new people section */}
        {view === 'followNewPeople' ? (
          <View>
            <Text>follow new people</Text>
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
  fontWeight700: {
    fontWeight: "700"
  },
  topOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
 

  twentyEight: {
    padding: 10,
  },
  twentyEightContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 10,
  },

  dashboardContainer: {
    marginTop: 30,
    borderColor: "black",
    borderWidth: 3,
    borderRadius: 5
},
userDashboard: {
  justifyContent: "space-around",
  padding: 5,  
  margin: 5,
  color: "white",
  backgroundColor: 'white',
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
  },

  dashboardCompletedCount: {
    fontSize: 40,
    textAlign: 'center',
  }, 
  dashboardCompletedContainer: {
    flexDirection: "row",
    textAlign: 'center',
  }, 

  goalNum: {
    paddingBottom: 10,
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
    textTransform: 'capitalize',
    letterSpacing: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  aboutParagraph: {
    lineHeight: 25,
    textAlign: 'justify',
    paddingBottom: 30,
  },
  taskTitle: {
    textAlign: 'center',
    paddingBottom: 25,
    fontWeight: '500',
    fontSize: 16,
  },
  taskDescription: {
    textAlign: 'center',
    paddingBottom: 20,
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
    color: 'gray',
    borderRadius: 5,
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
    borderColor: 'gray',
    overflow: 'hidden',
  },
  addPhoto: {
    textAlign: 'center',
    borderWidth: 1,
    padding: 100,
    paddingBottom: 300,
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
    paddingTop: 40,
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
    paddingTop: 40,
    paddingBottom: 40,
    marginRight: 5,
    marginLeft: 5,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 50,
  },
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
    width: '100%',
    height: 650,
  },
  displayPostTitleContainer: {
    padding: 10,
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,.5)',
    top: 10,
    textAlign: "center",
    borderRadius: "10"

  },
  displayPostTextContainer: {
    padding: 10,
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,.7)',
    bottom: 50,
    borderRadius: "10"
  },
  displayPostTitle: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  displayReflection: {
    lineHeight: 20,
    color: '#FFFFFF',
  },
  previousNext : {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

export default Tasks;
