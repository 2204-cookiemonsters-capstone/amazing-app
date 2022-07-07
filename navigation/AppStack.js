import React from 'react';
import { View, TouchableOpacity, Text, Image, ScrollView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Messages from '../src/Messages-Chat/Messages';
import Profile from '../src/Profile';
import Tasks from '../src/Tasks';
import AddTask from '../src/AddTask';
import List from '../src/List';
import ChatScreen from '../src/Messages-Chat/ChatScreen';
import Explore from '../src/Explore';
import SearchPage from '../src/SearchPage';
import AddFriends from '../src/AddFriends';
import FriendsList from '../src/FriendsList';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MessagesStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name='MessagesScreen'
      component={Messages}
      options={{ header: () => null }}
    />

    <Stack.Screen
      name='ChatScreen'
      component={ChatScreen}
      options={{ header: () => null }}
    />

    <Stack.Screen
      name='SearchScreen'
      component={SearchPage}
      options={{ header: () => null }}
    />

    <Stack.Screen
      name='ProfileMessages'
      component={Profile}
      options={{ header: () => null }}
    />

    <Stack.Screen
      name='AddFriends'
      component={AddFriends}
      options={{ header: () => null }}
    />

    <Stack.Screen
      name='FriendsList'
      component={FriendsList}
      options={{ header: () => null }}
    />
  </Stack.Navigator>
);

const TasksStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name='TasksScreen'
      component={Tasks}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name='Search'
      component={SearchPage}
      options={{ header: () => null }}
    />

    <Stack.Screen
      name='ProfileTasks'
      component={Profile}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name='AddFriendsTasks'
      component={AddFriends}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name='FriendsList'
      component={FriendsList}
      options={{ header: () => null }}
    />
  </Stack.Navigator>
);

const AddTaskStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name='AddTaskScreen'
      component={AddTask}
      options={{ header: () => null }}
    />

    <Stack.Screen
      name='SearchAdd'
      component={SearchPage}
      options={{ header: () => null }}
    />

    <Stack.Screen
      name='ProfileAdd'
      component={Profile}
      options={{ header: () => null }}
    />

    <Stack.Screen
      name='AddFriendsAdd'
      component={AddFriends}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name='FriendsList'
      component={FriendsList}
      options={{ header: () => null }}
    />
  </Stack.Navigator>
);

const ListStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name='ListScreen'
      component={List}
      options={{ header: () => null }}
    />

    <Stack.Screen
      name='SearchList'
      component={SearchPage}
      options={{ header: () => null }}
    />

    <Stack.Screen
      name='ProfileList'
      component={Profile}
      options={{ header: () => null }}
    />

    <Stack.Screen
      name='AddFriendsList'
      component={AddFriends}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name='FriendsList'
      component={FriendsList}
      options={{ header: () => null }}
    />
  </Stack.Navigator>
);

const ExploreStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name='ExploreScreen'
      component={Explore}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name='SearchExplore'
      component={SearchPage}
      options={{ header: () => null }}
    />

    <Stack.Screen
      name='ProfileExplore'
      component={Profile}
      options={{ header: () => null }}
    />

    <Stack.Screen
      name='AddFriendsExplore'
      component={AddFriends}
      options={{ header: () => null }}
    />
    <Stack.Screen
      name='FriendsList'
      component={FriendsList}
      options={{ header: () => null }}
    />
  </Stack.Navigator>
);

const AppStack = ({ currentRoute }) => {
  //tab bar visibility messages tab
  const getTabBarVisibility = () => {
    if (
      currentRoute === 'ChatScreen' ||
      currentRoute === 'SearchScreen' ||
      currentRoute === 'ProfileMessages' ||
      currentRoute === 'AddFriends' ||
      currentRoute === 'FriendsList'
    ) {
      return {
        display: 'none',
      };
    }
    return {
      position: 'absolute',
      backgroundColor: '#ffffff',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      height: 60,
    };
  };

  //tab bar visibility tasks tab
  const getTabBarVisibilityTasksTab = () => {
    if (
      currentRoute === 'Search' ||
      currentRoute === 'ProfileTasks' ||
      currentRoute === 'AddFriendsTasks' ||
      currentRoute === 'FriendsList'
    ) {
      return {
        display: 'none',
      };
    }
    return {
      position: 'absolute',
      backgroundColor: '#ffffff',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      height: 60,
    };
  };

  //tab bar visibility add tab
  const getTabBarVisibilityAddTab = () => {
    if (
      currentRoute === 'SearchAdd' ||
      currentRoute === 'ProfileAdd' ||
      currentRoute === 'AddFriendsAdd' ||
      currentRoute === 'FriendsList'
    ) {
      return {
        display: 'none',
      };
    }
    return {
      position: 'absolute',
      backgroundColor: '#ffffff',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      height: 60,
    };
  };

  //tab bar visibility list tab
  const getTabBarVisibilityListTab = () => {
    if (
      currentRoute === 'SearchList' ||
      currentRoute === 'ProfileList' ||
      currentRoute === 'AddFriendsList' ||
      currentRoute === 'FriendsList'
    ) {
      return {
        display: 'none',
      };
    }
    return {
      position: 'absolute',
      backgroundColor: '#ffffff',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      height: 60,
    };
  };

  //tab bar visibility explore tab
  const getTabBarVisibilityExploreTab = () => {
    if (
      currentRoute === 'SearchExplore' ||
      currentRoute === 'ProfileExplore' ||
      currentRoute === 'AddFriendsExplore' ||
      currentRoute === 'FriendsList'
    ) {
      return {
        display: 'none',
      };
    }
    return {
      position: 'absolute',
      backgroundColor: '#ffffff',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      height: 60,
    };
  };

  //header visibility messages tab
  const getHeaderVisibility = () => {
    if (
      currentRoute === 'ChatScreen' ||
      currentRoute === 'SearchScreen' ||
      currentRoute === 'ProfileMessages' ||
      currentRoute === 'AddFriends' ||
      currentRoute === 'FriendsList'
    ) {
      return false;
    }
    return true;
  };

  //header visibility tasks tab
  const getHeaderVisibilityTasksTab = () => {
    if (
      currentRoute === 'Search' ||
      currentRoute === 'ProfileTasks' ||
      currentRoute === 'AddFriendsTasks' ||
      currentRoute === 'FriendsList'
    ) {
      return false;
    }
    return true;
  };

  //header visibility add tab
  const getHeaderVisibilityAddTab = () => {
    if (
      currentRoute === 'SearchAdd' ||
      currentRoute === 'ProfileAdd' ||
      currentRoute === 'AddFriendsAdd' ||
      currentRoute === 'FriendsList'
    ) {
      return false;
    }
    return true;
  };

  //header visibility list tab
  const getHeaderVisibilityListTab = () => {
    if (
      currentRoute === 'SearchList' ||
      currentRoute === 'ProfileList' ||
      currentRoute === 'AddFriendsList' ||
      currentRoute === 'FriendsList'
    ) {
      return false;
    }
    return true;
  };

  //header visibility Explore tab
  const getHeaderVisibilityExploreTab = () => {
    if (
      currentRoute === 'SearchExplore' ||
      currentRoute === 'ProfileExplore' ||
      currentRoute === 'AddFriendsExplore' ||
      currentRoute === 'FriendsList'
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
            position: 'absolute',
            backgroundColor: '#ffffff',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            height: 60,
          },
        ],
        initialRouteName: 'AddTask',
      }}
    >
      <Tab.Screen
        name='Messages'
        component={MessagesStack}
        options={({ navigation }) => ({
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                top: 5,
              }}
            >
              <Image
                source={require('../assets/chat.png')}
                resizeMode='contain'
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#e32f45' : '#748c94', //outline of the icon, red or grey
                }}
              />
              <Text
                style={{
                  color: focused ? '#e32f45' : '#748c94',
                  fontSize: 12,
                }}
              >
                Chats
              </Text>
            </View>
          ),
          tabBarStyle: getTabBarVisibility(), //does not show navbar on chat
          headerShown: getHeaderVisibility(),
          headerTitleAlign: 'center',
          headerTitle: 'Chats',
          headerRight: () => (
            <View
              style={{
                marginRight: 10,
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: 'whitesmoke',
                  borderRadius: 25,
                  height: 35,
                  width: 35,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => navigation.navigate('AddFriends')}
              >
                <Image
                  source={require('../assets/addperson.png')}
                  resizeMode={'contain'}
                  style={{ width: 21, height: 21 }}
                />
              </TouchableOpacity>
            </View>
          ),
          headerLeft: () => (
            <View
              style={{
                marginLeft: 12,
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: 'whitesmoke',
                  borderRadius: 25,
                  height: 35,
                  width: 35,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => navigation.navigate('ProfileMessages')}
              >
                <Image
                  source={require('../assets/profile.png')}
                  resizeMode={'contain'}
                  style={{ width: 21, height: 21 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginLeft: 15,
                  backgroundColor: 'whitesmoke',
                  borderRadius: 25,
                  height: 35,
                  width: 35,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => navigation.navigate('SearchScreen')} //test only change later
              >
                <Image
                  source={require('../assets/search.png')}
                  resizeMode={'contain'}
                  style={{ width: 21, height: 21 }}
                />
              </TouchableOpacity>
            </View>
          ),
        })}
      />
      <Tab.Screen
        name='Tasks'
        component={TasksStack}
        options={({ navigation }) => ({
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                top: 5,
              }}
            >
              <Image
                source={require('../assets/28.png')}
                resizeMode='contain'
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#e32f45' : '#748c94',
                }}
              />
              <Text
                style={{
                  color: focused ? '#e32f45' : '#748c94',
                  fontSize: 12,
                }}
              >
                Tasks
              </Text>
            </View>
          ),

          headerTitleAlign: 'center',
          tabBarStyle: getTabBarVisibilityTasksTab(),
          headerShown: getHeaderVisibilityTasksTab(),
          headerTitle: '28 Day Tasks',
          headerRight: () => (
            <View
              style={{
                marginRight: 10,
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: 'whitesmoke',
                  borderRadius: 25,
                  height: 35,
                  width: 35,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => navigation.navigate('AddFriendsTasks')}
              >
                <Image
                  source={require('../assets/addperson.png')}
                  resizeMode={'contain'}
                  style={{ width: 21, height: 21 }}
                />
              </TouchableOpacity>
            </View>
          ),
          headerLeft: () => (
            <View
              style={{
                marginLeft: 12,
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: 'whitesmoke',
                  borderRadius: 25,
                  height: 35,
                  width: 35,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => navigation.navigate('ProfileTasks')}
              >
                <Image
                  source={require('../assets/profile.png')}
                  resizeMode={'contain'}
                  style={{ width: 21, height: 21 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginLeft: 15,
                  backgroundColor: 'whitesmoke',
                  borderRadius: 25,
                  height: 35,
                  width: 35,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => navigation.navigate('Search')}
              >
                <Image
                  source={require('../assets/search.png')}
                  resizeMode={'contain'}
                  style={{ width: 21, height: 21 }}
                />
              </TouchableOpacity>
            </View>
          ),
        })}
      />

      <Tab.Screen
        name='AddTask'
        component={AddTaskStack}
        options={({ navigation }) => ({
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                top: 5,
              }}
            >
              <Image
                source={require('../assets/plus.png')}
                resizeMode='contain'
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#e32f45' : '#748c94',
                }}
              />
              <Text
                style={{
                  color: focused ? '#e32f45' : '#748c94',
                  fontSize: 12,
                }}
              >
                Add
              </Text>
            </View>
          ),

          headerTitleAlign: 'center',
          headerShown: getHeaderVisibilityAddTab(),
          tabBarStyle: getTabBarVisibilityAddTab(),
          headerTitle: 'Add',
          headerRight: () => (
            <View
              style={{
                marginRight: 10,
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: 'whitesmoke',
                  borderRadius: 25,
                  height: 35,
                  width: 35,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => navigation.navigate('AddFriendsAdd')}
              >
                <Image
                  source={require('../assets/addperson.png')}
                  resizeMode={'contain'}
                  style={{ width: 21, height: 21 }}
                />
              </TouchableOpacity>
            </View>
          ),
          headerLeft: () => (
            <View
              style={{
                marginLeft: 12,
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: 'whitesmoke',
                  borderRadius: 25,
                  height: 35,
                  width: 35,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => navigation.navigate('ProfileAdd')}
              >
                <Image
                  source={require('../assets/profile.png')}
                  resizeMode={'contain'}
                  style={{ width: 21, height: 21 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginLeft: 15,
                  backgroundColor: 'whitesmoke',
                  borderRadius: 25,
                  height: 35,
                  width: 35,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => navigation.navigate('SearchAdd')}
              >
                <Image
                  source={require('../assets/search.png')}
                  resizeMode={'contain'}
                  style={{ width: 21, height: 21 }}
                />
              </TouchableOpacity>
            </View>
          ),
        })}
      />
      <Tab.Screen
        name='List'
        component={ListStack}
        options={({ navigation }) => ({
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                top: 5,
              }}
            >
              <Image
                source={require('../assets/list.png')}
                resizeMode='contain'
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#e32f45' : '#748c94',
                }}
              />
              <Text
                style={{
                  color: focused ? '#e32f45' : '#748c94',
                  fontSize: 12,
                }}
              >
                Lists
              </Text>
            </View>
          ),

          headerTitleAlign: 'center',
          headerTitle: 'Lists',
          headerShown: getHeaderVisibilityListTab(),
          tabBarStyle: getTabBarVisibilityListTab(),
          headerRight: () => (
            <View
              style={{
                marginRight: 10,
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: 'whitesmoke',
                  borderRadius: 25,
                  height: 35,
                  width: 35,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => navigation.navigate('AddFriendsList')}
              >
                <Image
                  source={require('../assets/addperson.png')}
                  resizeMode={'contain'}
                  style={{ width: 21, height: 21 }}
                />
              </TouchableOpacity>
            </View>
          ),
          headerLeft: () => (
            <View
              style={{
                marginLeft: 12,
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: 'whitesmoke',
                  borderRadius: 25,
                  height: 35,
                  width: 35,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => navigation.navigate('ProfileList')}
              >
                <Image
                  source={require('../assets/profile.png')}
                  resizeMode={'contain'}
                  style={{ width: 21, height: 21 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginLeft: 15,
                  backgroundColor: 'whitesmoke',
                  borderRadius: 25,
                  height: 35,
                  width: 35,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => navigation.navigate('SearchList')}
              >
                <Image
                  source={require('../assets/search.png')}
                  resizeMode={'contain'}
                  style={{ width: 21, height: 21 }}
                />
              </TouchableOpacity>
            </View>
          ),
        })}
      />
      <Tab.Screen
        name='Explore'
        component={ExploreStack}
        options={({ navigation }) => ({
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                top: 5,
              }}
            >
              <Image
                source={require('../assets/globe.png')}
                resizeMode='contain'
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#e32f45' : '#748c94',
                }}
              />
              <Text
                style={{
                  color: focused ? '#e32f45' : '#748c94',
                  fontSize: 12,
                }}
              >
                Explore
              </Text>
            </View>
          ),

          headerTitleAlign: 'center',
          headerTitle: 'Explore',
          headerShown: getHeaderVisibilityExploreTab(),
          tabBarStyle: getTabBarVisibilityExploreTab(),
          headerRight: () => (
            <View
              style={{
                marginRight: 10,
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: 'whitesmoke',
                  borderRadius: 25,
                  height: 35,
                  width: 35,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => navigation.navigate('AddFriendsExplore')}
              >
                <Image
                  source={require('../assets/addperson.png')}
                  resizeMode={'contain'}
                  style={{ width: 21, height: 21 }}
                />
              </TouchableOpacity>
            </View>
          ),
          headerLeft: () => (
            <View
              style={{
                marginLeft: 12,
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: 'whitesmoke',
                  borderRadius: 25,
                  height: 35,
                  width: 35,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => navigation.navigate('ProfileExplore')}
              >
                <Image
                  source={require('../assets/profile.png')}
                  resizeMode={'contain'}
                  style={{ width: 21, height: 21 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginLeft: 15,
                  backgroundColor: 'whitesmoke',
                  borderRadius: 25,
                  height: 35,
                  width: 35,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => navigation.navigate('SearchExplore')}
              >
                <Image
                  source={require('../assets/search.png')}
                  resizeMode={'contain'}
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
