import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { auth, signOut } from '../firebase';
import { authStyle } from '../styles';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Profile = ({ navigation }) => {
  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <View>
      <View style={{ display: 'flex', marginTop: 40, marginLeft: 13 }}>
        <TouchableOpacity
          style={{
            backgroundColor: 'aqua', //random vibrant color for now, style our app later
            borderRadius: 25,
            height: 35,
            width: 35,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name='left' color='black' />
        </TouchableOpacity>
      </View>
      <Text>Profile page</Text>
      <TouchableOpacity
        style={authStyle.submitButton}
        title='Signout'
        onPress={() => handleSignOut()}
      >
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
