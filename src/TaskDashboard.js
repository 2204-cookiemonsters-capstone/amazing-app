import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,

} from 'react-native';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


const TaskDashboard = ({getBackgroundColor, handleGoalNum, handleView, view, goalNum, allUserTasks, completed, strengthsCount}) => {
  return (
<>
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
              </>
  )
}

export default TaskDashboard


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
  borderRadius: 5, 
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
    height: 800,
    justifyContent: 'space-between',
  },
  displayPostImage: {
    width: '110%',
    height: 800,
    marginLeft: -20,
    marginRight: -20,
  },
  displayPostTitleContainer: {
    padding: 2,
    margin: "10%",
    position: 'absolute',
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
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  displayPostTextContainer: {
    padding: 10,
    margin: "10%",
    position: 'absolute',
    top: 300,
    borderRadius: 10,
    width: "80%",
    backgroundColor: "rgb(0,0,0)"
  },
  displayPostLinkContainer: {
    padding: 10,
    margin: "10%",
    position: 'absolute',
    top: 300,
    borderRadius: 10,
    width: "80%",
    backgroundColor: "rgb(255,255,255)"
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
    paddingRight: 70,
    width: 110,
    marginLeft: 0,
    justifyContent: "center",
    textAlign: "center",

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
    justifyContent: "center",
    textAlign: "center",
    paddingLeft: 40,
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
      flexDirection: "row", 
      alignItems: "center"},
    visibility:{
      flexDirection: "row", 
      alignItems: "center", 
      justifyContent: "center"
    },
    visibilityOptions:{
      flexDirection:"row", 
      justifyContent: "center", 
      paddingTop: 30, 
      paddingBottom: 30}
});
