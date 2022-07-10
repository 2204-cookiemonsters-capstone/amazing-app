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
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { PanGestureHandler, TapGesture,  } from 'react-native-gesture-handler';


const featuredPostsData = [
  {
    taskId: 1,
    title: 'Read a Book',
    description:
      'It can be any genre of your choice, just finish a book this month.',
    defaultImgUrl: 'https://i.imgur.com/Tr4Urao.jpg',
    month: 'July',
    year: 2022,
    category: 'reflection',
    reflection: "This is a sample reflection. This is a short reflection.",
    reflection2: "This is a sample second reflection. This reflection is a bit longer than the first one, more of a paragraph. This is a sample reflection. This reflection is a bit longer than the first one, more of a paragraph."
  },
  {
    taskId: 2,
    title: 'Breathing Meditation',
    description:
      'Find a quiet space to sit. Without changing your normal breathing pattern, bring your attention to your inhaling and exhaling. As your mind wanders, bring your focus back to your breath. Practice this type of meditation for at least 15 minutes.',
      defaultImgUrl: 'https://i.imgur.com/GyKJQjk.jpg',
      month: 'July',
      year: 2022,
      category: 'meditation',
      reflection: "This is a sample reflection. This is a short reflection.",
      reflection2: "This is a sample second reflection. This reflection is a bit longer than the first one, more of a paragraph. This is a sample reflection. This reflection is a bit longer than the first one, more of a paragraph."
  },
  {
    taskId: 3,
    title: 'Nature Walk',
    description:
      'Visit any natural environment-- a trail, a park, a lake, or whatever is available-- and go on a nature walk.',
    defaultImgUrl: 'https://i.imgur.com/NNKNIWz.jpg',
    month: 'July',
    year: 2022,
    category: 'nature',
    reflection: "This is a sample reflection. This is a short reflection.",
    reflection2: "This is a sample second reflection. This reflection is a bit longer than the first one, more of a paragraph. This is a sample reflection. This reflection is a bit longer than the first one, more of a paragraph."
  },
  {
    taskId: 4,
    title: 'Send A Letter',
    description: 'Write and mail a physical letter to someone you care about.',
    defaultImgUrl: 'https://i.imgur.com/XKzBaOA.jpg',
    month: 'July',
    year: 2022,
    category: 'kindness',
    reflection: "This is a sample reflection. This is a short reflection.",
    reflection2: "This is a sample second reflection. This reflection is a bit longer than the first one, more of a paragraph. This is a sample reflection. This reflection is a bit longer than the first one, more of a paragraph."
  },
  {
    taskId: 5,
    title: 'Purposeful Photo Album',
    description:
      'Take photos of ten important things in your life-- people, places, or objects.',
      defaultImgUrl: 'https://i.imgur.com/RcYQzBW.jpg',
      month: 'July',
      year: 2022,
      category: 'creativity',
      reflection: "This is a sample reflection. This is a short reflection.",
      reflection2: "This is a sample second reflection. This reflection is a bit longer than the first one, more of a paragraph. This is a sample reflection. This reflection is a bit longer than the first one, more of a paragraph."
  },
  {
    taskId: 6,
    title: 'Connect With Community',
    description:
      'Attend a local event or group meeting in your community',
      defaultImgUrl: 'https://i.imgur.com/8TZYNlI.jpg',
      month: 'July',
      year: 2022,
      category: 'community',
      reflection: "This is a sample reflection. This is a short reflection.",
      reflection2: "This is a sample second reflection. This reflection is a bit longer than the first one, more of a paragraph. This is a sample reflection. This reflection is a bit longer than the first one, more of a paragraph."
  },
  {
    taskId: 7,
    title: 'Full Body Stretch',
    description:
      'Spend 20+ minutes stretching your muscles, loosen up the tightness in your body.',
      defaultImgUrl:'https://i.imgur.com/uJOBwHY.jpg',
      month: 'July',
      year: 2022,
      category: 'movement',
      reflection: "This is a sample reflection. This is a short reflection.",
      reflection2: "This is a sample second reflection. This reflection is a bit longer than the first one, more of a paragraph. This is a sample reflection. This reflection is a bit longer than the first one, more of a paragraph."
  },
  {
    taskId: 8,
    title: 'Core Values Reflection',
    description: 'Journal Prompt: What are your core values? When do you feel most connected with these values?',
    defaultImgUrl: 'https://i.imgur.com/auj7RJW.jpg',
    month: 'July',
    year: 2022,
    category: 'reflection',
    reflection: "This is a sample reflection. This is a short reflection.",
    reflection2: "This is a sample second reflection. This reflection is a bit longer than the first one, more of a paragraph. This is a sample reflection. This reflection is a bit longer than the first one, more of a paragraph."
  },
  {
    taskId: 9,
    title: 'Walking Meditation',
    description: 'Walk slowly and focus on the feeling of your feet on the ground. As your attention goes elsewhere, bring your focus back to the feeling of your feet on the ground. Practice this meditation for 10+ minutes.',
      defaultImgUrl: 'https://i.imgur.com/wEF9n7F.jpg',
      month: 'July',
      year: 2022,
      category: 'meditation',
      reflection: "This is a sample reflection. This is a short reflection.",
      reflection2: "This is a sample second reflection. This reflection is a bit longer than the first one, more of a paragraph. This is a sample reflection. This reflection is a bit longer than the first one, more of a paragraph."
  },
  {
    taskId: 10,
    title: 'Water',
    description:
      'Visit a pond, lake, river, ocean, or other body of water. If the climate allows, swim, canoe, or just enjoy the sounds and wildlife near the water.',
      defaultImgUrl: 'https://i.imgur.com/kC0vOPy.jpg',
      month: 'July',
      year: 2022,
      category: 'nature',
      reflection: "This is a sample reflection. This is a short reflection.",
      reflection2: "This is a sample second reflection. This reflection is a bit longer than the first one, more of a paragraph. This is a sample reflection. This reflection is a bit longer than the first one, more of a paragraph."
  },
  {
    taskId: 11,
    title: 'Positive Review',
    description:
      'Leave a positive review for a local business or organization you support.',
      defaultImgUrl: 'https://i.imgur.com/p5Lyn9H.jpg',
      month: 'July',
      year: 2022,
      category: 'kindness',
      reflection: "This is a sample reflection. This is a short reflection.",
      reflection2: "This is a sample second reflection. This reflection is a bit longer than the first one, more of a paragraph. This is a sample reflection. This reflection is a bit longer than the first one, more of a paragraph."
  },
  {
    taskId: 12,
    title: 'Improve Your Space',
    description: 'Make some improvement to your work or living space-- redesign, organize, rearrange, build, or declutter.',
    defaultImgUrl: 'https://i.imgur.com/Cm6c0Ar.jpg',
    month: 'July',
    year: 2022,
    category: 'creativity',
    reflection: "This is a sample reflection. This is a short reflection.",
    reflection2: "This is a sample second reflection. This reflection is a bit longer than the first one, more of a paragraph. This is a sample reflection. This reflection is a bit longer than the first one, more of a paragraph."
  },
  {
    taskId: 13,
    title: 'Reconnect',
    description: 'Reach out to someone you have not spoken to in more than 3 months.',
    defaultImgUrl: 'https://i.imgur.com/kq8X3ss.jpg',
    month: 'July',
    year: 2022,
    category: 'community',
    reflection: "This is a sample reflection. This is a short reflection.",
    reflection2: "This is a sample second reflection. This reflection is a bit longer than the first one, more of a paragraph. This is a sample reflection. This reflection is a bit longer than the first one, more of a paragraph."
  },
  {
    taskId: 14,
    title: 'Core / Upper Body Strength',
    description: 'Complete a core or upper body workout of some kind for 20+ minutes',
    defaultImgUrl: 'https://i.imgur.com/2usl9dm.jpg',
    month: 'July',
    year: 2022,
    category: 'movement',
    reflection: "This is a sample reflection. This is a short reflection.",
    reflection2: "This is a sample second reflection. This reflection is a bit longer than the first one, more of a paragraph. This is a sample reflection. This reflection is a bit longer than the first one, more of a paragraph."
  },
{
  taskId: 15,
  title: 'Gratitude Reflection',
  description: 'Journal Prompt: Who are you grateful for in your life? What experiences are you most grateful for? Which of your qualities or traits are you grateful for?',
  defaultImgUrl: 'https://i.imgur.com/A6ZH2gb.jpg',
  month: 'July',
  year: 2022,
  category: 'reflection',
  reflection: "This is a sample reflection. This is a short reflection.",
  reflection2: "This is a sample second reflection. This reflection is a bit longer than the first one, more of a paragraph. This is a sample reflection. This reflection is a bit longer than the first one, more of a paragraph."
},
  {
    taskId: 16,
    title: 'Relaxation Meditation',
    description: 'While lying down, slowly scan from head to toe. As you scan, focus on relaxing each part of your body for several breaths, then move to the next part of your body. Practice for minimum 20 min.',
    defaultImgUrl: 'https://i.imgur.com/Xcz7KJ7.jpg',
    month: 'July',
    year: 2022,
    category: 'meditation',
    reflection: "This is a sample reflection. This is a short reflection.",
    reflection2: "This is a sample second reflection. This reflection is a bit longer than the first one, more of a paragraph. This is a sample reflection. This reflection is a bit longer than the first one, more of a paragraph."
  },
  {
    taskId: 17,
    title: 'Nature Sit',
    description: 'Find a peaceful place to sit in nature without any distractions. Spend at least 20 minutes sitting without using your phone, reading, music, or journaling.',
    defaultImgUrl: 'https://i.imgur.com/Ga1vIyc.jpg',
    month: 'July',
    year: 2022,
    category: 'nature',
    reflection: "This is a sample reflection. This is a short reflection.",
    reflection2: "This is a sample second reflection. This reflection is a bit longer than the first one, more of a paragraph. This is a sample reflection. This reflection is a bit longer than the first one, more of a paragraph."
  },
  {
    taskId: 18,
    title: 'Donation',
    description:
      'Make a donation of some kind-- it could be a monetary donation to a cause you care about, or it could be clothing, food, or some other item.',
      defaultImgUrl: 'https://i.imgur.com/cjOOlHY.jpg',
      month: 'July',
      year: 2022,
      category: 'kindness',
      reflection: "This is a sample reflection. This is a short reflection.",
      reflection2: "This is a sample second reflection. This reflection is a bit longer than the first one, more of a paragraph. This is a sample reflection. This reflection is a bit longer than the first one, more of a paragraph."
  },
  {
    taskId: 19,
    title: 'Album',
    description: "Listen to an entire music album from start to finish.",
    defaultImgUrl: 'https://i.imgur.com/mz0ciOf.jpg',
    month: 'July',
    year: 2022,
    category: 'creativity',
    reflection: "This is a sample reflection. This is a short reflection.",
    reflection2: "This is a sample second reflection. This reflection is a bit longer than the first one, more of a paragraph. This is a sample reflection. This reflection is a bit longer than the first one, more of a paragraph."
  },
  {
    taskId: 20,
    title: 'Volunteer',
    description: 'Volunteer for a local organization or cause.',
    defaultImgUrl: 'https://i.imgur.com/xOEG5mO.jpg',
    month: 'July',
    year: 2022,
    category: 'community',
    reflection: "This is a sample reflection. This is a short reflection.",
    reflection2: "This is a sample second reflection. This reflection is a bit longer than the first one, more of a paragraph. This is a sample reflection. This reflection is a bit longer than the first one, more of a paragraph."
  },{
    taskId: 21,
    title: 'Yoga',
    description: 'Complete a yoga or martial arts practice. Minimum 20+ min, use the internet to discover free class videos.',
    defaultImgUrl: 'https://i.imgur.com/bb17UDd.jpg',
    month: 'July',
    year: 2022,
    category: 'movement',
    reflection: "This is a sample reflection. This is a short reflection.",
    reflection2: "This is a sample second reflection. This reflection is a bit longer than the first one, more of a paragraph. This is a sample reflection. This reflection is a bit longer than the first one, more of a paragraph."
  },
  {
    taskId: 22,
    title: 'Goals',
    description: 'Journal Prompt: What is a goal you would like to accomplish in the next year? What steps or people will help you achieve this goal? What is your motivation for achieving this goal? How can you help others achieve their goals?',
    defaultImgUrl: 'https://i.imgur.com/PTcmc5o.jpg',
    month: 'July',
    year: 2022,
    category: 'reflection',
    reflection: "This is a sample reflection. This is a short reflection.",
    reflection2: "This is a sample second reflection. This reflection is a bit longer than the first one, more of a paragraph. This is a sample reflection. This reflection is a bit longer than the first one, more of a paragraph."
  },
  {
    taskId: 23,
    title: 'Compassion Meditation',
    description: 'Pracitice a compassion meditation: bring to mind people you care about. For each person, say to yourself: "May they be happy and free from unhappiness and pain". This practice helps to build your compassionate feelings for others.',
    defaultImgUrl: 'https://i.imgur.com/moDVGYn.jpg',
    month: 'July',
    year: 2022,
    category: 'meditation',
    reflection: "This is a sample reflection. This is a short reflection.",
    reflection2: "This is a sample second reflection. This reflection is a bit longer than the first one, more of a paragraph. This is a sample reflection. This reflection is a bit longer than the first one, more of a paragraph."

  },
  {
    taskId: 24,
    title: 'Care for Plants / Animals',
    description: 'Ideas: If you have a pet, spend time caring for your pet. If you have a garden or plants, spend time tending your garden or plants. In some way, spend some time caring for plants or animals.',
    defaultImgUrl: 'https://i.imgur.com/xOEG5mO.jpg',
    month: 'July',
    year: 2022,
    category: 'nature',
    reflection: "This is a sample reflection. This is a short reflection.",
    reflection2: "This is a sample second reflection. This reflection is a bit longer than the first one, more of a paragraph. This is a sample reflection. This reflection is a bit longer than the first one, more of a paragraph."

  },
  {
    taskId: 25,
    title: 'Kind Messages',
    description: 'Send messages to 3+ people who have had a positive impact on you, letting them know you appreciate them.',
    defaultImgUrl: 'https://i.imgur.com/nfy24Gz.jpg',
    month: 'July',
    year: 2022,
    category: 'kindness',
    reflection: "This is a sample reflection. This is a short reflection.",
    reflection2: "This is a sample second reflection. This reflection is a bit longer than the first one, more of a paragraph. This is a sample reflection. This reflection is a bit longer than the first one, more of a paragraph."
  },
  {
    taskId: 26,
    title: 'Hands On Art',
    description: 'Complete an art project with your hands-- paint, draw, sculpt, build, etc.',
    defaultImgUrl: 'https://i.imgur.com/VaOCIkc.jpg',
    month: 'July',
    year: 2022,
    category: 'creativity',
    reflection: "This is a sample reflection. This is a short reflection.",
    reflection2: "This is a sample second reflection. This reflection is a bit longer than the first one, more of a paragraph. This is a sample reflection. This reflection is a bit longer than the first one, more of a paragraph."
  },
  {
    taskId: 27,
    title: 'Support Local',
    description: 'Visit a locally-owned restaurant, store, or organization.',
    defaultImgUrl: 'https://i.imgur.com/X97pCMd.jpg',
    month: 'July',
    year: 2022,
    category: 'community',
    reflection: "This is a sample reflection. This is a short reflection.",
    reflection2: "This is a sample second reflection. This reflection is a bit longer than the first one, more of a paragraph. This is a sample reflection. This reflection is a bit longer than the first one, more of a paragraph."
  },
  {
    taskId: 28,
    title: 'Jog',
    description: 'Complete a walk/jog/run for at least one mile.',
    defaultImgUrl: 'https://i.imgur.com/eGvYXyM.jpg',
    month: 'July',
    year: 2022,
    category: 'movement',
    reflection: "This is a sample reflection. This is a short reflection.",
    reflection2: "This is a sample second reflection. This reflection is a bit longer than the first one, more of a paragraph. This is a sample reflection. This reflection is a bit longer than the first one, more of a paragraph."
  },
];



const Tasks = (props) => {
  const [allUserTasks, setAllUserTasks] = useState([]);
  const [view, setView] = useState('featured');
  const [goalNum, setGoalNum] = useState('28');
  const [currentTask, setCurrentTask] = useState({});
  const [displayPost, setDisplayPost] = useState({});
  const [reflection, setReflection] = useState('');
  const [displayPostText, setDisplayPostText] = useState(1);
  const [displayReflection, setDisplayReflection] = useState(1);
  const [allFriends, setAllFriends] = useState([])
  const [strengthsCount, setStrengthsCount] = useState([])
 
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
      setAllUserTasks(snapShot.data().userTasks)
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
  console.log(allFriends)
}

  const handleView = (view, item) => {
    if (view === 'tasks' || view === 'posts' || view === 'featured') {
      setDisplayPost({});
    }
    if (view === 'submit'){
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

  const handleDisplayFollowingPost = (id) => {
    let post = featuredPostsData.filter((item) => item.taskId === id);
    setDisplayPostText(1);
    setDisplayPost(post[0]);
    setView('postStack');
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

const handleGetFriends = () => {
  fetchAllFriends()
}

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
    getCompletedCount()
  }, [allUserTasks]);

// need to do a useEffect to fetch friends and featured recent posts if visits featured view / scrolls.


  return (
    
    <ScrollView>
      <View style={styles.container}>
        {/* top scroll bar */}
        {/* need to make each have onPress that sets state view to corresponding section, also makes icon/title bold and/or underlined */}

        <View style={styles.topOptions}>
          <TouchableWithoutFeedback onPress={() => handleView('posts')}>
          <Text style={styles.subheading} >
          <FontAwesome name="photo" size={24} color="black"/>
          </Text>
          </TouchableWithoutFeedback>
        
          <TouchableWithoutFeedback onPress={() => handleView('tasks')}>
          <Text style={[styles.subheading, styles.fontWeight700]} >
          <AntDesign name="dashboard" size={24} color="black"/>
          </Text>
          </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => handleView('featured')}>
          <Text style={styles.subheading} >
          <FontAwesome name="star-o" size={24} color="black"/>
          </Text>
          </TouchableWithoutFeedback>
        </View>

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

<View styles={[styles.strengthsList, styles.padding10]}>

{strengthsCount.community ? 
  <View style={styles.strengthIconRow}>
<FontAwesome name="users" size={20} color="white"/>
<Text style={styles.strengths}>community x {strengthsCount.community}</Text>
  </View> : null}

  {strengthsCount.creativity ? 
    <View style={styles.strengthIconRow}>
<FontAwesome name="lightbulb-o" size={20} color="white"/>
<Text style={styles.strengths}>{strengthsCount.creativity}</Text>
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
            <Text style={[styles.subheading, styles.fontWeight700]}>your post history</Text>
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
             <View style={styles.followingSectionContainer}>
              <Text style={[styles.subheading, styles.fontWeight700]}>Following</Text>
              <ScrollView horizontal={true}>
              
                <View style={styles.followingItemsContainer}>
                  <TouchableOpacity onPress={() => handleFollowNewPeople()}>
                    <Text style={styles.followingItemAdd}>+</Text>
                  </TouchableOpacity>

        {featuredPostsData.map((item)=> 
         <TouchableWithoutFeedback onPress={() => handleDisplayFollowingPost(item.taskId)} key={item.taskId}>
         <Image
           style={styles.followingItem}
           source={{ uri: item.defaultImgUrl }}
         />
       </TouchableWithoutFeedback>
        )
      }
      </View>
     </ScrollView>

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
            <TouchableWithoutFeedback onPress={() => handleDisplayPostText()}>
              <ImageBackground
                style={styles.displayPostImage}
                source={{ uri: displayPost.defaultImgUrl }}
              />
              </TouchableWithoutFeedback>

              <View style={styles.previousNext}>
              <View style={styles.previousIcon}>
              <AntDesign name="leftcircleo" size={32} color="white" onPress={() => handlePrevious(displayPost.taskId)}/>
              </View>

              <View style={styles.nextIcon}>

              <TouchableWithoutFeedback><Text onPress={() => handleNext(displayPost.taskId)}>next</Text>
              <AntDesign name="rightcircleo" size={32} color="white" />
              </TouchableWithoutFeedback>
              </View>  
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

{/* see friends posts section */}
{view === "followingStack" ? (
  <View>
    <Text>Following Stack</Text>
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
    textTransform: 'capitalize',
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
 
  displayPostTextContainer: {
    padding: 10,
    margin: "10%",
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,.7)',
    bottom: 10,
    borderRadius: "10",
    width: "80%",
  },
  displayPostTitle: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",

  },
  displayReflection: {
    lineHeight: 20,
    color: "white",
    textAlign: "center"
  },
  previousNext : {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  previousIcon:{
    position: 'absolute',
  left: 0,
  top: 0},
  nextIcon:{
    position: 'absolute',
    right: 0
  },
  strengthsList:{
    flexDirection: "row",
    justifyContent: "center"
  },
  strengths: {color: "white", paddingLeft: 5, paddingBottom: 5},
  strengthIconRow:{flexDirection: "row"}
  
});

export default Tasks;
