import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import FontAwesome from "@expo/vector-icons/FontAwesome";
const TaskPosts = ({
  getTimeDifference,
  handleView,
  allUserTasks,
  handleDelete,
  getBackgroundColor,
}) => {
  return (
    <View>
      <Text style={[styles.subheading, styles.fontWeight700]}>
        Your Post History
      </Text>
      {allUserTasks.map((item) => {
        return item.completed == true ? (
          <View style={styles.postContainer} key={item.taskId}>
            <Image
              style={{
                width: "auto",
                height: 400,
                borderWidth: 5,
                borderColor: getBackgroundColor(item.category),
              }}
              source={item.defaultImgUrl ? { uri: item.defaultImgUrl } : null}
            />
            <View style={styles.postTitleEditContainer}>
              <View style={{ paddingBottom: 10 }}>
                <Text style={styles.postTag}>{item.title}</Text>
                <View style={{ paddingBottom: 10 }}>
                  {getTimeDifference(item.completedTime) < 60 ? (
                    <Text
                      style={{
                        fontSize: 12,
                        color: "#666",
                        marginRight: 30,
                      }}
                    >
                      {getTimeDifference(item.completedTime)} minutes ago
                    </Text>
                  ) : getTimeDifference(item.completedTime) >= 60 &&
                    getTimeDifference(item.completedTime) < 1440 ? (
                    <Text
                      style={{
                        fontSize: 12,
                        color: "#666",
                        marginRight: 30,
                      }}
                    >
                      {" "}
                      {Math.floor(
                        getTimeDifference(item.completedTime) / 60
                      )}{" "}
                      {Math.floor(
                        getTimeDifference(item.completedTime) / 60
                      ) === 1
                        ? "hour ago"
                        : "hours ago"}
                    </Text>
                  ) : (
                    <Text
                      style={{
                        fontSize: 12,
                        color: "#666",
                        marginRight: 30,
                      }}
                    >
                      {Math.floor(getTimeDifference(item.completedTime) / 1440)}{" "}
                      {Math.floor(
                        getTimeDifference(item.completedTime) / 1440
                      ) === 1
                        ? "day ago"
                        : "days ago"}
                    </Text>
                  )}
                </View>
                <View
                  style={{ flexDirection: "row", justifyContent: "flex-start" }}
                >
                  <FontAwesome name='eye' size={12} color='gray' />
                  <Text style={[{ paddingLeft: 5, color: "gray" }]}>
                    {item.visibility}
                  </Text>
                </View>
              </View>
              <View style={styles.postEditDeleteContainer}>
                <TouchableWithoutFeedback
                  onPress={() => handleView("submitEdit", item)}
                >
                  <FontAwesome
                    name='pencil'
                    size={16}
                    color='black'
                    style={styles.postEdit}
                  />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                  onPress={() => handleDelete(item.taskId)}
                >
                  <FontAwesome
                    name='trash'
                    size={16}
                    color='black'
                    style={styles.postEdit}
                  />
                </TouchableWithoutFeedback>
              </View>
            </View>
            <Text style={styles.reflection}>{item.reflection}</Text>
          </View>
        ) : null;
      })}
    </View>
  );
};
export default TaskPosts;
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
