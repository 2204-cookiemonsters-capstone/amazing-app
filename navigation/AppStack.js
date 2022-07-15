import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  Platform,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Messages from "../src/Messages-Chat/Messages";
import Profile from "../src/Profile";
import Tasks from "../src/Tasks";
import AddTask from "../src/AddTask";
import List from "../src/List";
import ChatScreen from "../src/Messages-Chat/ChatScreen";
import Explore from "../src/Explore";
import SearchPage from "../src/SearchPage";
import AddFriends from "../src/AddFriends";
import FriendsList from "../src/FriendsList";
import AddChat from "../src/Messages-Chat/AddChat";
import SingleProfile from "../src/SingleProfile";
import ProfilePageNotYou from "../src/ProfilePageNotYou";

import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MessagesStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="MessagesScreen"
      component={Messages}
      options={{ header: () => null }}
    />

    <Stack.Screen
      name="ChatScreen"
      component={ChatScreen}
      options={({ route, navigation }) => ({
        title: route.params.username,
        headerBackTitleVisible: false,
        headerTitleAlign: "center",
        headerLeft: () => (
          <TouchableOpacity
            style={{
              backgroundColor: "white",
              borderRadius: 25,
              height: 35,
              width: 35,
              alignItems: "center",
              justifyContent: "center",
              marginLeft: 13,
              shadowColor: "#7F5DF0",
              shadowOffset: {
                width: 0,
                height: 10,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.5,
              elevation: 5,
            }}
            onPress={() => navigation.goBack()}
          >
            <AntDesign name="left" color="black" size={18} />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity
            style={{
              backgroundColor: "white",
              borderRadius: 25,
              height: 35,
              width: 35,
              alignItems: "center",
              justifyContent: "center",
              shadowColor: "#7F5DF0",
              shadowOffset: {
                width: 0,
                height: 10,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.5,
              elevation: 5,
              marginRight: 12,
            }}
            onPress={() => navigation.navigate("SingleProfile")}
          >
            <Entypo name="dots-three-horizontal" color="black" size={18} />
          </TouchableOpacity>
        ),
      })}
    />

    <Stack.Screen
      name="Search"
      component={SearchPage}
      options={{ header: () => null }}
    />

    <Stack.Screen
      name="ProfileMessages"
      component={Profile}
      options={{ header: () => null }}
    />

    <Stack.Screen
      name="AddFriends"
      component={AddFriends}
      options={{ header: () => null }}
    />

    <Stack.Screen
      name="FriendsList"
      component={FriendsList}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="AddChat"
      component={AddChat}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="SingleProfile"
      component={SingleProfile}
      options={{ header: () => null }}
    />

    <Stack.Screen
      name="ProfilePageNotYou"
      component={ProfilePageNotYou}
      options={{ header: () => null }}
    />
  </Stack.Navigator>
);

const TasksStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="TasksScreen"
      component={Tasks}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="Search"
      component={SearchPage}
      options={{ header: () => null }}
    />

    <Stack.Screen
      name="ProfileTasks"
      component={Profile}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="AddFriends"
      component={AddFriends}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="FriendsList"
      component={FriendsList}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="AddChat"
      component={AddChat}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="SingleProfile"
      component={SingleProfile}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="ProfilePageNotYou"
      component={ProfilePageNotYou}
      options={{ header: () => null }}
    />
  </Stack.Navigator>
);

const AddTaskStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="AddTaskScreen"
      component={AddTask}
      options={{ header: () => null }}
    />

    <Stack.Screen
      name="Search"
      component={SearchPage}
      options={{ header: () => null }}
    />

    <Stack.Screen
      name="ProfileAdd"
      component={Profile}
      options={{ header: () => null }}
    />

    <Stack.Screen
      name="AddFriends"
      component={AddFriends}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="FriendsList"
      component={FriendsList}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="AddChat"
      component={AddChat}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="SingleProfile"
      component={SingleProfile}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="ProfilePageNotYou"
      component={ProfilePageNotYou}
      options={{ header: () => null }}
    />
  </Stack.Navigator>
);

const ListStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="ListScreen"
      component={List}
      options={{ header: () => null }}
    />

    <Stack.Screen
      name="Search"
      component={SearchPage}
      options={{ header: () => null }}
    />

    <Stack.Screen
      name="ProfileList"
      component={Profile}
      options={{ header: () => null }}
    />

    <Stack.Screen
      name="AddFriends"
      component={AddFriends}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="FriendsList"
      component={FriendsList}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="AddChat"
      component={AddChat}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="SingleProfile"
      component={SingleProfile}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="ProfilePageNotYou"
      component={ProfilePageNotYou}
      options={{ header: () => null }}
    />
  </Stack.Navigator>
);

const ExploreStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="ExploreScreen"
      component={Explore}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="Search"
      component={SearchPage}
      options={{ header: () => null }}
    />

    <Stack.Screen
      name="ProfileExplore"
      component={Profile}
      options={{ header: () => null }}
    />

    <Stack.Screen
      name="AddFriends"
      component={AddFriends}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="FriendsList"
      component={FriendsList}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="AddChat"
      component={AddChat}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="SingleProfile"
      component={SingleProfile}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name="ProfilePageNotYou"
      component={ProfilePageNotYou}
      options={{ header: () => null }}
    />
  </Stack.Navigator>
);

const AppStack = ({ currentRoute }) => {
  //tab bar visibility messages tab
  const getTabBarVisibility = () => {
    if (
      currentRoute === "ChatScreen" ||
      currentRoute === "Search" ||
      currentRoute === "ProfileMessages" ||
      currentRoute === "AddFriends" ||
      currentRoute === "FriendsList" ||
      currentRoute === "AddChat" ||
      currentRoute === "SingleProfile"
    ) {
      return {
        display: "none",
      };
    }
    return {
      position: "absolute",
      backgroundColor: "#ffffff",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      height: 60,
    };
  };

  //tab bar visibility tasks tab
  const getTabBarVisibilityTasksTab = () => {
    if (
      currentRoute === "Search" ||
      currentRoute === "ProfileTasks" ||
      currentRoute === "AddFriends" ||
      currentRoute === "FriendsList" ||
      currentRoute === "AddChat" ||
      currentRoute === "SingleProfile"
    ) {
      return {
        display: "none",
      };
    }
    return {
      position: "absolute",
      backgroundColor: "#ffffff",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      height: 60,
    };
  };

  //tab bar visibility add tab
  const getTabBarVisibilityAddTab = () => {
    if (
      currentRoute === "Search" ||
      currentRoute === "ProfileAdd" ||
      currentRoute === "AddFriends" ||
      currentRoute === "FriendsList" ||
      currentRoute === "AddChat" ||
      currentRoute === "SingleProfile"
    ) {
      return {
        display: "none",
      };
    }
    return {
      position: "absolute",
      backgroundColor: "#ffffff",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      height: 60,
    };
  };

  //tab bar visibility list tab
  const getTabBarVisibilityListTab = () => {
    if (
      currentRoute === "Search" ||
      currentRoute === "ProfileList" ||
      currentRoute === "AddFriends" ||
      currentRoute === "FriendsList" ||
      currentRoute === "AddChat" ||
      currentRoute === "SingleProfile"
    ) {
      return {
        display: "none",
      };
    }
    return {
      position: "absolute",
      backgroundColor: "#ffffff",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      height: 60,
    };
  };

  //tab bar visibility explore tab
  const getTabBarVisibilityExploreTab = () => {
    if (
      currentRoute === "Search" ||
      currentRoute === "ProfileExplore" ||
      currentRoute === "AddFriends" ||
      currentRoute === "FriendsList" ||
      currentRoute === "AddChat" ||
      currentRoute === "SingleProfile"
    ) {
      return {
        display: "none",
      };
    }
    return {
      position: "absolute",
      backgroundColor: "#ffffff",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      height: 60,
    };
  };

  //header visibility messages tab
  const getHeaderVisibility = () => {
    if (
      currentRoute === "ChatScreen" ||
      currentRoute === "Search" ||
      currentRoute === "ProfileMessages" ||
      currentRoute === "AddFriends" ||
      currentRoute === "FriendsList" ||
      currentRoute === "AddChat" ||
      currentRoute === "SingleProfile"
    ) {
      return false;
    }
    return true;
  };

  //header visibility tasks tab
  const getHeaderVisibilityTasksTab = () => {
    if (
      currentRoute === "Search" ||
      currentRoute === "ProfileTasks" ||
      currentRoute === "AddFriends" ||
      currentRoute === "FriendsList" ||
      currentRoute === "AddChat" ||
      currentRoute === "SingleProfile"
    ) {
      return false;
    }
    return true;
  };

  //header visibility add tab
  const getHeaderVisibilityAddTab = () => {
    if (
      currentRoute === "Search" ||
      currentRoute === "ProfileAdd" ||
      currentRoute === "AddFriends" ||
      currentRoute === "FriendsList" ||
      currentRoute === "AddChat" ||
      currentRoute === "SingleProfile"
    ) {
      return false;
    }
    return true;
  };

  //header visibility list tab
  const getHeaderVisibilityListTab = () => {
    if (
      currentRoute === "Search" ||
      currentRoute === "ProfileList" ||
      currentRoute === "AddFriends" ||
      currentRoute === "FriendsList" ||
      currentRoute === "AddChat" ||
      currentRoute === "SingleProfile"
    ) {
      return false;
    }
    return true;
  };

  //header visibility Explore tab
  const getHeaderVisibilityExploreTab = () => {
    if (
      currentRoute === "Search" ||
      currentRoute === "ProfileExplore" ||
      currentRoute === "AddFriends" ||
      currentRoute === "FriendsList" ||
      currentRoute === "AddChat" ||
      currentRoute === "SingleProfile"
    ) {
      return false;
    }
    return true;
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: [
          {
            position: "absolute",
            backgroundColor: "#ffffff",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            height: Platform.OS === "ios" ? 80 : 60,
          },
        ],
        initialRouteName: "AddTask",
      }}
    >
      <Tab.Screen
        name="Feed"
        component={ExploreStack}
        options={({ navigation }) => ({
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: Platform.OS === "ios" ? 15 : 9,
              }}
            >
              <Image
                source={require("../assets/homepng.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#7A28CB" : "#748c94",
                }}
              />
              <Text
                style={{
                  color: focused ? "#e32f45" : "#748c94",
                  fontSize: 12,
                }}
              ></Text>
            </View>
          ),

          headerTitleAlign: "center",
          headerTitle: "Feed",
          headerShown: getHeaderVisibilityExploreTab(),
          tabBarStyle: getTabBarVisibilityExploreTab(),
          headerRight: () => (
            <View
              style={{
                marginRight: 10,
                display: "flex",
                flexDirection: "row",
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "white",
                  borderRadius: 25,
                  height: 35,
                  width: 35,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => navigation.navigate("AddFriends")}
              >
                <Image
                  source={require("../assets/addperson.png")}
                  resizeMode={"contain"}
                  style={{ width: 21, height: 21 }}
                />
              </TouchableOpacity>
            </View>
          ),
          headerLeft: () => (
            <View
              style={{
                marginLeft: 12,
                display: "flex",
                flexDirection: "row",
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "white",
                  borderRadius: 25,
                  height: 35,
                  width: 35,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => navigation.navigate("ProfileExplore")}
              >
                <Image
                  source={require("../assets/profile.png")}
                  resizeMode={"contain"}
                  style={{ width: 21, height: 21 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginLeft: 15,
                  backgroundColor: "white",
                  borderRadius: 25,
                  height: 35,
                  width: 35,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => navigation.navigate("Search")}
              >
                <Image
                  source={require("../assets/search.png")}
                  resizeMode={"contain"}
                  style={{ width: 21, height: 21 }}
                />
              </TouchableOpacity>
            </View>
          ),
        })}
      />

      <Tab.Screen
        name="Tasks"
        component={TasksStack}
        options={({ navigation }) => ({
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: Platform.OS === "ios" ? 15 : 9,
              }}
            >
              <Image
                source={require("../assets/28.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#2374AB" : "#748c94",
                }}
              />
              <Text
                style={{
                  color: focused ? "#e32f45" : "#748c94",
                  fontSize: 12,
                }}
              ></Text>
            </View>
          ),

          headerTitleAlign: "center",
          tabBarStyle: getTabBarVisibilityTasksTab(),
          headerShown: getHeaderVisibilityTasksTab(),
          headerTitle: "28 Tasks",
          headerRight: () => (
            <View
              style={{
                marginRight: 10,
                display: "flex",
                flexDirection: "row",
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "white",
                  borderRadius: 25,
                  height: 35,
                  width: 35,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => navigation.navigate("AddFriends")}
              >
                <Image
                  source={require("../assets/addperson.png")}
                  resizeMode={"contain"}
                  style={{ width: 21, height: 21 }}
                />
              </TouchableOpacity>
            </View>
          ),
          headerLeft: () => (
            <View
              style={{
                marginLeft: 12,
                display: "flex",
                flexDirection: "row",
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "white",
                  borderRadius: 25,
                  height: 35,
                  width: 35,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => navigation.navigate("ProfileTasks")}
              >
                <Image
                  source={require("../assets/profile.png")}
                  resizeMode={"contain"}
                  style={{ width: 21, height: 21 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginLeft: 15,
                  backgroundColor: "white",
                  borderRadius: 25,
                  height: 35,
                  width: 35,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => navigation.navigate("Search")}
              >
                <Image
                  source={require("../assets/search.png")}
                  resizeMode={"contain"}
                  style={{ width: 21, height: 21 }}
                />
              </TouchableOpacity>
            </View>
          ),
        })}
      />

      {/* <Tab.Screen
        name='AddTask'
        component={AddTaskStack}
        options={({ navigation }) => ({
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: Platform.OS === "ios" ? 15 : 9,
              }}
            >
              <Image
                source={require("../assets/plus.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#e32f45" : "#748c94",
                }}
              />
              <Text
                style={{
                  color: focused ? "#e32f45" : "#748c94",
                  fontSize: 12,
                }}
              ></Text>
            </View>
          ),

          headerTitleAlign: "center",
          headerShown: getHeaderVisibilityAddTab(),
          tabBarStyle: getTabBarVisibilityAddTab(),
          headerTitle: "Add",
          headerRight: () => (
            <View
              style={{
                marginRight: 10,
                display: "flex",
                flexDirection: "row",
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "white",
                  borderRadius: 25,
                  height: 35,
                  width: 35,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => navigation.navigate("AddFriends")}
              >
                <Image
                  source={require("../assets/addperson.png")}
                  resizeMode={"contain"}
                  style={{ width: 21, height: 21 }}
                />
              </TouchableOpacity>
            </View>
          ),
          headerLeft: () => (
            <View
              style={{
                marginLeft: 12,
                display: "flex",
                flexDirection: "row",
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "white",
                  borderRadius: 25,
                  height: 35,
                  width: 35,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => navigation.navigate("ProfileAdd")}
              >
                <Image
                  source={require("../assets/profile.png")}
                  resizeMode={"contain"}
                  style={{ width: 21, height: 21 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginLeft: 15,
                  backgroundColor: "white",
                  borderRadius: 25,
                  height: 35,
                  width: 35,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => navigation.navigate("Search")}
              >
                <Image
                  source={require("../assets/search.png")}
                  resizeMode={"contain"}
                  style={{ width: 21, height: 21 }}
                />
              </TouchableOpacity>
            </View>
          ),
        })}
      /> */}
      <Tab.Screen
        name="List"
        component={ListStack}
        options={({ navigation }) => ({
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: Platform.OS === "ios" ? 15 : 9,
              }}
            >
              <Image
                source={require("../assets/list.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#5CD859" : "#748c94",
                }}
              />
              <Text
                style={{
                  color: focused ? "#e32f45" : "#748c94",
                  fontSize: 12,
                }}
              ></Text>
            </View>
          ),

          headerTitleAlign: "center",
          headerTitle: "Lists",
          headerShown: getHeaderVisibilityListTab(),
          tabBarStyle: getTabBarVisibilityListTab(),
          headerRight: () => (
            <View
              style={{
                marginRight: 10,
                display: "flex",
                flexDirection: "row",
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "white",
                  borderRadius: 25,
                  height: 35,
                  width: 35,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => navigation.navigate("AddFriends")}
              >
                <Image
                  source={require("../assets/addperson.png")}
                  resizeMode={"contain"}
                  style={{ width: 21, height: 21 }}
                />
              </TouchableOpacity>
            </View>
          ),
          headerLeft: () => (
            <View
              style={{
                marginLeft: 12,
                display: "flex",
                flexDirection: "row",
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "white",
                  borderRadius: 25,
                  height: 35,
                  width: 35,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => navigation.navigate("ProfileList")}
              >
                <Image
                  source={require("../assets/profile.png")}
                  resizeMode={"contain"}
                  style={{ width: 21, height: 21 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginLeft: 15,
                  backgroundColor: "white",
                  borderRadius: 25,
                  height: 35,
                  width: 35,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => navigation.navigate("Search")}
              >
                <Image
                  source={require("../assets/search.png")}
                  resizeMode={"contain"}
                  style={{ width: 21, height: 21 }}
                />
              </TouchableOpacity>
            </View>
          ),
        })}
      />

      <Tab.Screen
        name="Messages"
        component={MessagesStack}
        options={({ navigation }) => ({
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: Platform.OS === "ios" ? 15 : 9,
              }}
            >
              <Image
                source={require("../assets/chat.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#e32f45" : "#748c94", //outline of the icon, red or grey
                }}
              />
              <Text
                style={{
                  color: focused ? "#e32f45" : "#748c94",
                  fontSize: 12,
                }}
              ></Text>
            </View>
          ),
          tabBarStyle: getTabBarVisibility(), //does not show navbar on chat
          headerShown: getHeaderVisibility(),
          headerTitleAlign: "center",
          headerTitle: "Chats",
          headerRight: () => (
            <View
              style={{
                marginRight: 10,
                display: "flex",
                flexDirection: "row",
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "white",
                  borderRadius: 25,
                  height: 35,
                  width: 35,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => navigation.navigate("AddFriends")}
              >
                <Image
                  source={require("../assets/addperson.png")}
                  resizeMode={"contain"}
                  style={{ width: 21, height: 21 }}
                />
              </TouchableOpacity>
            </View>
          ),
          headerLeft: () => (
            <View
              style={{
                marginLeft: 12,
                display: "flex",
                flexDirection: "row",
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "white",
                  borderRadius: 25,
                  height: 35,
                  width: 35,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => navigation.navigate("ProfileMessages")}
              >
                <Image
                  source={require("../assets/profile.png")}
                  resizeMode={"contain"}
                  style={{ width: 21, height: 21 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginLeft: 15,
                  backgroundColor: "white",
                  borderRadius: 25,
                  height: 35,
                  width: 35,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => navigation.navigate("Search")} //test only change later
              >
                <Image
                  source={require("../assets/search.png")}
                  resizeMode={"contain"}
                  style={{ width: 21, height: 21 }}
                />
              </TouchableOpacity>
            </View>
          ),
        })}
      />
    </Tab.Navigator>
  );
};

export default AppStack;
