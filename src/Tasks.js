import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  Swipeable,
} from "react-native-gesture-handler";
import { auth, firestore } from "../firebase";
import {
  collection,
  onSnapshot,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

import { featuredPostsData } from "./assets/featuredPostsData";
import TaskIcons from "./TaskIcons";
import TaskDashboard from "./TaskDashboard";
import TaskAbout from "./TaskAbout";
import TaskSubmit from "./TaskSubmit";
import TaskEdit from "./TaskEdit";
import TaskFriendsPosts from "./TaskFriendsPosts";
import TaskPosts from "./TaskPosts";
import TaskFeatured from "./TaskFeatured";
import TaskFeaturedPostStack from "./TaskFeaturedPostStack";

const Tasks = (props) => {
  const [allUserTasks, setAllUserTasks] = useState([]);
  const [view, setView] = useState("featured");
  const [goalNum, setGoalNum] = useState("28");
  const [currentTask, setCurrentTask] = useState({});
  const [displayPost, setDisplayPost] = useState({});
  const [reflection, setReflection] = useState("");
  const [visibility, setVisibility] = useState("friends");
  const [displayPostText, setDisplayPostText] = useState(1);
  const [allFriends, setAllFriends] = useState([]);
  const [strengthsCount, setStrengthsCount] = useState([]);
  const [friendsPosts, setFriendsPosts] = useState([]);
  const [currentFriendUsername, setCurrentFriendUsername] = useState("");

  let completed = allUserTasks.filter((item) => item.completed === true);

  const getCompletedCount = () => {
    if (completed.length) {
      let nature = completed.filter((item) => item.category === "nature");
      let natureCount = nature.length;
      let meditation = completed.filter(
        (item) => item.category === "meditation"
      );
      let meditationCount = meditation.length;
      let movement = completed.filter((item) => item.category === "movement");
      let movementCount = movement.length;
      let reflection = completed.filter(
        (item) => item.category === "reflection"
      );
      let reflectionCount = reflection.length;
      let creativity = completed.filter(
        (item) => item.category === "creativity"
      );
      let creativityCount = creativity.length;
      let kindness = completed.filter((item) => item.category === "kindness");
      let kindnessCount = kindness.length;
      let community = completed.filter((item) => item.category === "community");
      let communityCount = community.length;
      let strengthsList = {
        ...strengthsCount,
        nature: natureCount,
        meditation: meditationCount,
        movement: movementCount,
        reflection: reflectionCount,
        creativity: creativityCount,
        kindness: kindnessCount,
        community: communityCount,
      };
      if (strengthsCount != strengthsList) {
        setStrengthsCount(strengthsList);
      }
    }
  };

  // updates a single users posts
  async function updateUserPosts(taskId) {
    const snapShot = await getDoc(
      doc(firestore, "users", auth.currentUser.uid, "posts", "July")
    );

    let previousPosts = snapShot.data().userTasks;

    let userTasks = previousPosts.map((item) =>
      item.taskId !== taskId
        ? item
        : {
            ...item,
            completed: true,
            completedTime: Date.now(),
            reflection: reflection,
            visibility: visibility,
          }
    );

    const postsRef = await doc(
      firestore,
      "users",
      auth.currentUser.uid,
      "posts",
      "July"
    );

    setDoc(postsRef, { userTasks }, { merge: true });
  }

  // updates goal num to 7, 14, 21, or 28
  async function updateGoalNum(num) {
    const postsRef = await doc(
      firestore,
      "users",
      auth.currentUser.uid,
      "posts",
      "July"
    );
    setDoc(postsRef, { goalNum: num }, { merge: true });
  }

  // grabs a single users 28 posts
  async function fetchUserPosts() {
    const snapShot = await getDoc(
      doc(firestore, "users", auth.currentUser.uid, "posts", "July")
    );
    let userTasks = snapShot.data().userTasks;
    userTasks.sort((b, a) => a.completedTime - b.completedTime);
    setAllUserTasks(userTasks);
  }

  const fetchAllFriends = async () => {
    // const snapShot = await getDocs(
    onSnapshot(
      collection(firestore, "users", auth.currentUser.uid, "friendships"),
      async (snapShot) => {
        // );
        const friends = [];
        snapShot.forEach((doc) => {
          if (doc.data().status === "friends") {
            friends.push(doc.data());
          }
        });
        const friendDocs = await Promise.all(
          friends.map((f) => getDoc(doc(firestore, "users", f.userid)))
        );
        const friendsItems = friendDocs.map((i) => i.data());

        setAllFriends(friendsItems);
      }
    );
    console.log(allFriends);
  };

  async function fetchFriendsPosts(id) {
    const snapShot = await getDoc(doc(firestore, "users", id, "posts", "July"));
    let friendsPosts = snapShot.data().userTasks;
    friendsPosts.sort((b, a) => a.completedTime - b.completedTime);
    setFriendsPosts(friendsPosts);
  }

  const handleView = (view, item) => {
    if (view === "tasks" || view === "posts" || view === "featured") {
      setDisplayPost({});
      setFriendsPosts([]);
    }
    if (view === "submit" || "submitEdit") {
      setCurrentTask(item);
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
    } else {
      color === "#8021D9";
    }
    return color;
  };

  const handleDisplayFeaturedPost = (id) => {
    let post = featuredPostsData.filter((item) => item.taskId === id);
    setDisplayPostText(1);
    setDisplayPost(post[0]);
    setView("postStack");
  };

  const handleDisplayFollowing = (id, username) => {
    fetchFriendsPosts(id);
    setCurrentFriendUsername(username);
    setView("friendsPosts");
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

  const handleDelete = async (taskId) => {
    const snapShot = await getDoc(
      doc(firestore, "users", auth.currentUser.uid, "posts", "July")
    );

    let previousPosts = snapShot.data().userTasks;

    let userTasks = previousPosts.map((item) =>
      item.taskId !== taskId
        ? item
        : { ...item, completed: false, completedTime: null, reflection: "" }
    );

    const postsRef = await doc(
      firestore,
      "users",
      auth.currentUser.uid,
      "posts",
      "July"
    );

    setDoc(postsRef, { userTasks }, { merge: true });
    fetchUserPosts();
  };

  const handlePrevious = (taskId) => {
    let previousPost = featuredPostsData.filter(
      (item) => item.taskId === taskId - 1
    );
    setDisplayPostText(1);
    previousPost.length ? setDisplayPost(previousPost[0]) : setView("featured");
  };

  const handleNext = (taskId) => {
    let nextPost = featuredPostsData.filter(
      (item) => item.taskId === taskId + 1
    );
    setDisplayPostText(1);
    nextPost.length ? setDisplayPost(nextPost[0]) : setView("featured");
  };

  const handleGoalNum = (num) => {
    updateGoalNum(num);
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
    updateUserPosts(taskId);
    setAllUserTasks(newUserTasks);
    setReflection("");
    setVisibility("friends");
    setCurrentTask({});
    setView("posts");
  };

  const getTimeDifference = (timesent) => {
    const timeNow = new Date().getTime();
    const difference = (timeNow - timesent) / 1000;
    const diff = difference / 60;

    return Math.abs(Math.round(diff));
  };

  useEffect(() => {
    fetchUserPosts();
    fetchAllFriends();
  }, []);

  useEffect(() => {
    fetchUserPosts();
    getCompletedCount();
  }, [allUserTasks]);

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* top icon bar */}
        {view === "postStack" ? null : (
          <TaskIcons view={view} handleView={handleView} />
        )}

        {/* your tasks section */}
        {view === "tasks" ? (
          <View>
            {/* your dashboard */}
            <TaskDashboard
              handleGoalNum={handleGoalNum}
              goalNum={goalNum}
              getBackgroundColor={getBackgroundColor}
              handleView={handleView}
              view={view}
              allUserTasks={allUserTasks}
              completed={completed}
              strengthsCount={strengthsCount}
            />

            <Text
              style={[styles.about, styles.center]}
              onPress={() => handleView("about")}
            >
              about
            </Text>
          </View>
        ) : null}

        {/* about view */}
        {view === "about" ? <TaskAbout /> : null}

        {/* submit a post section */}
        {view === "submit" ? (
          <TaskSubmit
            handleSubmit={handleSubmit}
            setReflection={setReflection}
            reflection={reflection}
            setVisibility={setVisibility}
            visibility={visibility}
            currentTask={currentTask}
          />
        ) : null}

        {view === "submitEdit" ? (
          <TaskEdit
            handleSubmit={handleSubmit}
            setReflection={setReflection}
            reflection={reflection}
            setVisibility={setVisibility}
            visibility={visibility}
            currentTask={currentTask}
          />
        ) : null}

        {/* users posts section */}
        {view === "posts" ? (
          <TaskPosts
            handleView={handleView}
            handleDelete={handleDelete}
            view={view}
            getTimeDifference={getTimeDifference}
            allUserTasks={allUserTasks}
          />
        ) : null}

        {/* users posts section */}
        {view === "friendsPosts" ? (
          <TaskFriendsPosts
            currentFriendUsername={currentFriendUsername}
            friendsPosts={friendsPosts}
          />
        ) : null}

        {/* following section */}
        {view === "featured" ? (
          <TaskFeatured
            handleDisplayFeaturedPost={handleDisplayFeaturedPost}
            handleDisplayFollowing={handleDisplayFollowing}
            allFriends={allFriends}
          />
        ) : null}

        {/* single featured posts section */}
        {view === "postStack" ? (
          <TaskFeaturedPostStack
            displayPost={displayPost}
            displayPostText={displayPostText}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            handleDisplayPostText={handleDisplayPostText}
          />
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
    textAlign: "center",
  },
  padding10: {
    padding: 10,
  },
  white: { color: "white" },
  fontWeight700: {
    fontWeight: "700",
  },
  topOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  twentyEight: {
    padding: 10,
    color: "white",
  },
  twentyEightContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    paddingTop: 20,
    paddingBottom: 10,
  },

  dashboardContainer: {
    borderColor: "black",
    backgroundColor: "#3F88C5",
    borderRadius: 5,
  },
  dashboardPipe: {
    height: 70,
    borderLeftWidth: 1,
    borderColor: "white",
  },

  userDashboard: {
    justifyContent: "space-around",
    padding: 5,
    margin: 5,
    backgroundColor: '"#5BD858"',
  },
  dashboardRowTop: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 15,
    paddingBottom: 10,
  },
  dashboardRowBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingTop: 5,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderColor: "white",
  },

  dashboardCompletedCount: {
    fontSize: 40,
    textAlign: "center",
    color: "white",
  },
  dashboardCompletedContainer: {
    flexDirection: "row",
    textAlign: "center",
    color: "white",
  },
  goalNum: {
    paddingBottom: 10,
    color: "white",
  },
  newList: {
    textAlign: "center",
    paddingBottom: 30,
    color: "gray",
  },
  subheading: {
    textAlign: "center",
    paddingBottom: 20,
    paddingTop: 20,
    letterSpacing: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  about: {
    paddingTop: 30,
    color: "lightgray",
  },
  aboutParagraph: {
    lineHeight: 25,
    textAlign: "justify",
    paddingBottom: 30,
  },
  taskTitle: {
    textAlign: "center",
    padding: 15,
    fontWeight: "500",
    fontSize: 16,
    color: "white",
  },
  taskIconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
  },

  taskDescription: {
    textAlign: "center",
    padding: 15,
    color: "white",
  },
  completed: {
    paddingBottom: 30,
  },
  goToSubmitContainer: {
    textAlign: "center",
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  goToSubmit: {
    padding: 5,
    margin: 5,
    borderWidth: 1,
    color: "white",
    borderRadius: 5,
    borderColor: "white",
  },
  uncompletedContainer: {
    backgroundColor: "#585BD9",
    borderRadius: 5,
    margin: 5,
    width: 300,
  },
  submitCompletedTask: {
    textAlign: "center",
    padding: 10,
    backgroundColor: "white",
    width: "60%",
    marginLeft: "20%",
    marginRight: "20%",
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "white",
    overflow: "hidden",
  },
  addPhoto: {
    textAlign: "center",
    borderWidth: 1,
    padding: 100,
    paddingBottom: 300,
  },
  inputReflection: {
    marginTop: 30,
    marginBottom: 30,
  },
  submitHeading: {
    marginLeft: 20,
    marginRight: 20,
  },
  addReflection: {
    textAlign: "center",
    margin: 30,
  },
  submitPostBtn: {
    textAlign: "center",
    padding: 50,
  },

  featuredContainer: {
    flexDirection: "column",
  },
  followingSectionContainer: {
    flex: 1,
  },
  followingItemsContainer: {
    flexDirection: "row",
    flex: 1,
  },
  followingItemAdd: {
    width: 100,
    height: 100,
    textAlign: "center",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 0,
    paddingBottom: 40,
    marginRight: 5,
    marginLeft: 5,
    borderColor: "black",
    borderWidth: 2,
    borderStyle: "solid",
    borderRadius: 50,
    backgroundColor: "white",
    overflow: "hidden",
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
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 50,
    alignItems: "center",
  },
  followingItemUsername: {
    color: "black",
    paddingLeft: 5,
  },

  featuredSectionContainer: {
    flex: 1,
  },
  featuredItemsContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    width: "100%",
  },
  featuredItemTouch: {
    width: "100%",
  },
  featuredItem: {
    width: 183,
    height: 250,
    padding: 1,
    margin: 1,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
  },

  imageContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },

  imageBackground: {
    flex: 1,
    alignItems: "center",
    resizeMode: "contain",
  },
  postTag: {
    fontWeight: "800",
    paddingTop: 20,
    paddingBottom: 10,
  },
  reflection: {
    paddingBottom: 20,
  },
  postContainer: {
    backgroundColor: "white",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "lightgray",
    paddingBottom: 5,
    marginBottom: 10,
  },
  displayPostContainer: {
    width: "100%",
    height: 800,
    justifyContent: "space-between",
  },
  displayPostImage: {
    width: "110%",
    height: 800,
    marginLeft: -20,
    marginRight: -20,
  },
  displayPostTitleContainer: {
    padding: 2,
    margin: "10%",
    position: "absolute",
    // backgroundColor: 'rgba(0,0,0,.1)',
    top: 10,
    borderRadius: 10,
    width: "80%",
  },
  displayPostTitle: {
    fontSize: 46,
    color: "white",
    textAlign: "center",
    fontWeight: "700",
    textTransform: "lowercase",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  displayPostTextContainer: {
    padding: 10,
    margin: "10%",
    position: "absolute",
    top: 300,
    borderRadius: 10,
    width: "80%",
    backgroundColor: "rgb(0,0,0)",
  },
  displayPostLinkContainer: {
    padding: 10,
    margin: "10%",
    position: "absolute",
    top: 300,
    borderRadius: 10,
    width: "80%",
    backgroundColor: "rgb(255,255,255)",
  },
  displayReflection: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
    fontWeight: "700",
  },
  displayReflectionLink: {
    fontSize: 16,
    color: "black",
    textAlign: "center",
    fontWeight: "700",
  },
  previousNext: {
    position: "absolute",
    width: "112%",
    marginLeft: -20,
    height: 800,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  previous: {
    paddingTop: 330,
    paddingBottom: 330,
    paddingRight: 70,
    width: 110,
    marginLeft: 0,
    justifyContent: "center",
    textAlign: "center",
  },
  showDisplayReflection: {
    paddingTop: 330,
    paddingBottom: 330,
    width: 200,
  },
  next: {
    paddingTop: 330,
    paddingBottom: 330,
    width: 130,
    justifyContent: "center",
    textAlign: "center",
    paddingLeft: 40,
  },
  strengths: {
    color: "white",
    paddingLeft: 5,
    paddingBottom: 5,
  },
  strengthIconRow: {
    flexDirection: "row",
    paddingRight: 15,
    paddingBottom: 10,
  },

  strengthsIconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  postTitleEditContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  postEdit: {
    marginTop: 20,
    marginRight: 10,
  },
  postEditDeleteContainer: {
    flexDirection: "row",
  },
  friendsPostTitleCommentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconAndNameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  visibility: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  visibilityOptions: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 30,
    paddingBottom: 30,
  },
});

export default Tasks;
