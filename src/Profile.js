import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { auth, signOut } from "../firebase";
import { authStyle } from "../styles";

const Profile = () => {
  const handleSignOut = () => {
    signOut(auth)
  }

  return (
    <View>
      <Text>Profile page</Text>
      <TouchableOpacity style={authStyle.submitButton} title="Signout" onPress={() => handleSignOut()}>
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
