import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const AddFriends = ({ navigation }) => (
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
    <Text>AddFriends page</Text>
  </View>
);

export default AddFriends;
