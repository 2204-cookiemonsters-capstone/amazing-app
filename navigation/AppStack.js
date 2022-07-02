import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Messages from '../src/Messages-Chat/Messages';
import Profile from '../src/Profile';
import Tasks from '../src/Tasks';
import AddTask from '../src/AddTask';
import List from '../src/List';
import ChatScreen from '../src/Messages-Chat/ChatScreen';

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
  </Stack.Navigator>
);

const TasksStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name='TasksScreen'
      component={Tasks}
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
  </Stack.Navigator>
);

const ListStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name='ListScreen'
      component={List}
      options={{ header: () => null }}
    />
  </Stack.Navigator>
);

const ProfileStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name='ProfileScreen'
      component={Profile}
      options={{ header: () => null }}
    />
  </Stack.Navigator>
);

const AppStack = () => {
  const getTabBarVisibility = (route) => {
    //not show navbar in chat component, follow this format for other components. console.log(route.getState() to see object)
    console.log(route.getState());

    const routeName = route.getState().routes[0].state //need .routes[0].state or else will return error when switching between auth stack and app stack
      ? route.getState().routes[0].state.routeNames[
          route.getState().routes[0].state.index
        ]
      : '';

    if (routeName === 'ChatScreen') {
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
                Chat
              </Text>
            </View>
          ),
          tabBarStyle: getTabBarVisibility(navigation), //does not show navbar on chat
        })}
      />
      <Tab.Screen
        name='Tasks'
        component={TasksStack}
        options={{
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
        }}
      />
      <Tab.Screen
        name='AddTask'
        component={AddTaskStack}
        options={{
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
        }}
      />
      <Tab.Screen
        name='List'
        component={ListStack}
        options={{
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
        }}
      />
      <Tab.Screen
        name='Profile'
        component={ProfileStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                top: 5,
              }}
            >
              <Image
                source={require('../assets/profile.png')}
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
                Profile
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppStack;
//tabBarVisible: getTabBarVisibility(route),

/* navigation.getState() object below, use for reference, delete for production

{
  "history": Array [
    Object {
      "key": "Messages-_SuWQvH1eQgzLGe-SE2rB",
      "type": "route",
    },
  ],
  "index": 0,
  "key": "tab-AV8C1hjzDMLNOqbsDOxlo",
  "routeNames": Array [
    "Messages",
    "Tasks",
    "AddTask",
    "List",
    "Profile",
  ],
  "routes": Array [
    Object {
      "key": "Messages-_SuWQvH1eQgzLGe-SE2rB",
      "name": "Messages",
      "params": undefined,
      "state": Object {
        "index": 0,
        "key": "stack-wa9-rpm0eGyPd2tznRVM_",
        "routeNames": Array [
          "MessagesScreen",
          "ChatScreen",
        ],
        "routes": Array [
          Object {
            "key": "MessagesScreen-owTryi7kBjrTL_-w7MC5T",
            "name": "MessagesScreen",
            "params": undefined,
          },
        ],
        "stale": false,
        "type": "stack",
      },
    },
    Object {
      "key": "Tasks-jVY95xisYjHuJTHMKYbg-",
      "name": "Tasks",
      "params": undefined,
    },
    Object {
      "key": "AddTask-eD4zwAyGgK4hI3crGCC9P",
      "name": "AddTask",
      "params": undefined,
    },
    Object {
      "key": "List-gW3C70MmfrMnkeSJAIhN8",
      "name": "List",
      "params": undefined,
    },
    Object {
      "key": "Profile-YiWwxz1gBV9wlf_msmQUF",
      "name": "Profile",
      "params": undefined,
    },
  ],
  "stale": false,
  "type": "tab",
}
*/
