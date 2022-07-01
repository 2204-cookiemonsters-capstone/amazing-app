import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
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
    console.log(route.getState());

    const routeName = route.getState().routes[0].state //need .routes[0].state or else will return error when switching between auth stack and app stack
      ? route.getState().routes[0].state.routeNames[
          route.getState().routes[0].state.index
        ]
      : '';

    if (routeName === 'ChatScreen') return false;
    return true;
  };

  return (
    <Tab.Navigator>
      <Tab.Screen
        name='Messages'
        component={MessagesStack}
        options={({ navigation }) =>
          getTabBarVisibility(navigation)
            ? {
                tabBarStyle: {
                  display: 'flex',
                },
              }
            : {
                tabBarStyle: {
                  display: 'none',
                },
              }
        }
      />
      <Tab.Screen name='Tasks' component={TasksStack} />
      <Tab.Screen name='AddTask' component={AddTaskStack} />
      <Tab.Screen name='List' component={ListStack} />
      <Tab.Screen name='Profile' component={ProfileStack} />
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
