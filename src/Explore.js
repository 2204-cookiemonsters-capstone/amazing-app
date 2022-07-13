import React from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { auth } from "../firebase";

const Explore = () => (
  <View>
    <TouchableOpacity onPress={() => auth.signOut()}>
      <Text>HERE</Text>
    </TouchableOpacity>
  </View>
);

export default Explore;
