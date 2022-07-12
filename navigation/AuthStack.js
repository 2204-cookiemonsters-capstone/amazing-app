import React, { createContext } from "react";
import { View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Signup from "../src/Signup";
import LoginScreen from "../src/LoginScreen";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Login'
        component={LoginScreen}
        options={{ header: () => null }}
      />

      <Stack.Screen
        name='Signup'
        component={Signup}
        options={{ header: () => null }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
