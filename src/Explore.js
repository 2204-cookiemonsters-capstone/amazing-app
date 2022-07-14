import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { auth } from "../firebase";
const Explore = () => (
  <View>
    <TouchableOpacity onPress={() => auth.signOut()}>
      <Text>HERE</Text>
    </TouchableOpacity>
  </View>
);

export default Explore;
