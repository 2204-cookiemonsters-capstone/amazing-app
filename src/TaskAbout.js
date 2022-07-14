import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  
} from 'react-native';


const TaskAbout = () => {
  return (
<ScrollView>
            <View>
              <Text style={styles.subheading}>the 28 tasks challenge</Text>
            
              <Text style={[styles.subheading, styles.fontWeight700]}>what</Text>
              <Text style={styles.aboutParagraph}>
                Every month, we share a list of 28 tasks for all users to achieve. These tasks are intended to inspire our users to spend time in nature, connecting with their communities, and practicing activities proven by research to promote wellbeing and increase happiness.
              </Text>
              <Text style={[styles.subheading, styles.fontWeight700]}>why</Text>
              <Text style={styles.aboutParagraph}>
                
                Lots of social media wants to users to stay on their devices-- endlessly scrolling, shopping, and making comparisons. Our tasks are all intended
                to motivate our users to find balance and practice activities known to make life a little more enjoyable and meaningful.
              </Text>
              <Text style={[styles.subheading, styles.fontWeight700]}>how</Text>
              <Text style={styles.aboutParagraph}>
                All you have to do is choose a task and begin. If 28 tasks is
                beyond your current grasp, you can adjust your monthly goal to 7, 14, or 21
                tasks. To complete a task, simply click on that task and submit a short reflection on the activity.
              </Text>
            </View>
          </ScrollView>
  )
}

export default TaskAbout


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
