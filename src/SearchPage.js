import React from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { auth } from '../firebase';
import { authStyle } from '../styles';

const SearchPage = ({ navigation }) => (
  <View
    style={{
      marginTop: 40,
      marginLeft: 30,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <TextInput
      placeholder='Search'
      style={{
        height: 40,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 30,
        paddingHorizontal: 16,
        color: 'black',
        fontWeight: '600',
        width: 270,
        backgroundColor: 'ghostwhite',
        right: 28,
      }}
    />
    <TouchableOpacity style={{ right: 10 }} onPress={() => navigation.goBack()}>
      <Text style={{ fontWeight: '900', fontSize: 15 }}>Cancel</Text>
    </TouchableOpacity>
  </View>
);

export default SearchPage;
