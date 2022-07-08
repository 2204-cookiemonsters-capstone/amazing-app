import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import React, { useState } from 'react';
import { auth, createUserWithEmailAndPassword, firestore } from '../firebase';
import { setDoc, doc } from 'firebase/firestore';
import { Snackbar } from 'react-native-paper';
import { authStyle } from '../styles';

const userTasks = [
  {
    taskId: 1,
    title: 'read a book',
    description:
      'it can be any genre of your choice, just finish a book this month',
    defaultImgUrl: 'https://i.imgur.com/D7Iht7E.jpg',
    month: 'July',
    year: 2022,
    category: ''

  },
  {
    taskId: 2,
    title: 'meditate',
    description:
      'spend 30 minutes practicing meditation.',
      defaultImgUrl: 'https://i.imgur.com/syBzUa2.jpg',
      month: 'July',
      year: 2022,
      category: ''

  },
  {
    taskId: 3,
    title: 'spend an hour in nature',
    description:
      'nature description',
    defaultImgUrl: 'https://i.imgur.com/NNKNIWz.jpg',
    month: 'July',
    year: 2022,
    category: ''


  },
  {
    taskId: 4,
    title: 'write a letter to someone you care about and send it in the mail',
    description: 'write and send a letter in the mail',
    defaultImgUrl: 'https://i.imgur.com/NNKNIWz.jpg',
    month: 'July',
    year: 2022,
    category: ''


  },
  {
    taskId: 5,
    title: 'spend 30 minutes practicing deep breathing',
    description:
      'sample description for this task this is just a sample description for a task this is just a sample description for a task',
      defaultImgUrl: 'https://i.imgur.com/hlhLJcq.jpg',
      month: 'July',
      year: 2022,
      category: ''


  },
  {
    taskId: 6,
    title: 'complete an art project',
    description:
      'sample description for this task this is just a sample description for a task this is just a sample description for a task',
      defaultImgUrl: 'https://i.imgur.com/xVtrThI.jpg',
      month: 'July',
      year: 2022,
      category: ''


  },
  {
    taskId: 7,
    title: 'write a journal entry',
    description:
      'sample description for this task this is just a sample description for a task this is just a sample description for a task',
      defaultImgUrl:'https://i.imgur.com/xVtrThI.jpg',
      month: 'July',
      year: 2022,
      category: ''

 
  },
  {

    taskId: 8,
    title: 'record a family story',
    description: 'write or record a story from a family member',
    defaultImgUrl: 'https://i.imgur.com/xVtrThI.jpg',
    month: 'July',
    year: 2022,
    category: ''


  },
  {
    taskId: 9,
    title: '10 meaningful photos',
    description:
      'Take ten photos of important people, places or things in your life',
      defaultImgUrl: 'https://i.imgur.com/xVtrThI.jpg',
      month: 'July',
      year: 2022,
      category: ''


  },
  {

    taskId: 10,
    title: 'visit water',
    description:
      'visit a pond, lake, river, ocean, or other body of water and observe the water',
      defaultImgUrl: 'https://i.imgur.com/xVtrThI.jpg',
      month: 'July',
      year: 2022,
      category: ''


  },
  {

    taskId: 11,
    title: 'walking meditation',
    description:
      'go on a walk, and focus on feeling the ground beneath your feet with each step',
      defaultImgUrl: 'https://i.imgur.com/xVtrThI.jpg',
      month: 'July',
      year: 2022,
      category: ''


  },
  {
    taskId: 12,
    title: 'watch a movie',
    description: 'watch a movie',
    defaultImgUrl: 'https://i.imgur.com/xVtrThI.jpg',
    month: 'July',
    year: 2022,
    category: ''


  },
  {

    taskId: 13,
    title: 'be a critic',
    description: 'write positive reviews for the locally owned places you love',
    defaultImgUrl: 'https://i.imgur.com/xVtrThI.jpg',
    month: 'July',
    year: 2022,
    category: ''


  },
  {

    taskId: 14,
    title: 'listen to an album',
    description: 'listen to an entire album start to finish',
    defaultImgUrl: 'https://i.imgur.com/xVtrThI.jpg',
    month: 'July',
    year: 2022,
    category: ''


  },
{
  taskId: 15,
  title: 'task 15',
  description: '30 minute walk',
  defaultImgUrl: 'https://i.imgur.com/xVtrThI.jpg',
  month: 'July',
  year: 2022,
  category: ''


},
  {
    taskId: 16,
    title: 'movement',
    description: 'yoga, dance, martial arts. Move your body for 30 minutes.',
    defaultImgUrl: 'https://i.imgur.com/xVtrThI.jpg',
    month: 'July',
    year: 2022,
    category: ''


  },
  {
    taskId: 17,
    title: 'stretch',
    description: 'from head to toe, stretch each part of your body',
    defaultImgUrl: 'https://i.imgur.com/xVtrThI.jpg',
    month: 'July',
    year: 2022,
    category: ''


  },
  {
    taskId: 18,
    title: 'relaxation',
    description:
      'lie down and spend 10 minutes relaxing your body without falling asleep',
      defaultImgUrl: 'https://i.imgur.com/xVtrThI.jpg',
      month: 'July',
      year: 2022,
      category: ''


  },
  {
    taskId: 19,
    title: 'new food',
    description: "eat something you've never tried before",
    defaultImgUrl: 'https://i.imgur.com/xVtrThI.jpg',

    month: 'July',
    year: 2022,
    category: ''


  },
  {
    taskId: 20,
    title: 'volunteer',
    description: 'volunteer',
    defaultImgUrl: 'https://i.imgur.com/xVtrThI.jpg',
    month: 'July',
    year: 2022,
    category: ''


  },{
    taskId: 21,
    title: 'task 21',
    description: 'task 21 description',
    defaultImgUrl: 'https://i.imgur.com/xVtrThI.jpg',
    month: 'July',
    year: 2022,
    category: ''


  },
  {
    taskId: 22,
    title: 'task 22',
    description: 'task 22 description',
    defaultImgUrl: 'https://i.imgur.com/xVtrThI.jpg',

    month: 'July',
    year: 2022,
    category: ''


  },
  {
    taskId: 23,
    title: 'task 23',
    description: 'task 23 description',
    defaultImgUrl: 'https://i.imgur.com/xVtrThI.jpg',

    month: 'July',
    year: 2022,
    category: ''

  },
  {
    taskId: 24,
    title: 'task 24',
    description: 'task 24 description',
    defaultImgUrl: 'https://i.imgur.com/xVtrThI.jpg',
    
    month: 'July',
    year: 2022,
    category: ''

  },
  {
    taskId: 25,
    title: 'task 25',
    description: 'task 25 description',
    defaultImgUrl: 'https://i.imgur.com/xVtrThI.jpg',

    month: 'July',
    year: 2022,
    category: ''

  },
  {
    taskId: 26,
    title: 'task 26',
    description: 'task 26 description',
    defaultImgUrl: 'https://i.imgur.com/xVtrThI.jpg',

    month: 'July',
    year: 2022,
    category: ''

  },
  {
    taskId: 27,
    title: 'task 27',
    description: 'task 27 description',
    defaultImgUrl: 'https://i.imgur.com/xVtrThI.jpg',

    month: 'July',
    year: 2022,
    category: ''

  },
  {
    taskId: 28,
    title: 'task 28',
    description: 'task 28 description',
    defaultImgUrl: 'https://i.imgur.com/xVtrThI.jpg',

    month: 'July',
    year: 2022,
    category: ''

  },
];

const Signup = (props) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(true);
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(false);

  const handleSignUp = () => {
    if (username.length == 0) {
      setIsValid({
        bool: true,
        boolSnack: true,
        message: 'Please enter a username',
      });
      return;
    }
    if (name.length == 0) {
      setIsValid({
        bool: true,
        boolSnack: true,
        message: 'Please enter your name',
      });
      return;
    }
    if (email.length == 0) {
      setIsValid({
        bool: true,
        boolSnack: true,
        message: 'Please enter an email',
      });
      return;
    }
    if (password.length < 6) {
      setIsValid({
        bool: true,
        boolSnack: true,
        message: 'Passwords must be at least 6 characters',
      });
      return;
    }
    if (password !== confirmPassword) {
      setIsValid({
        bool: true,
        boolSnack: true,
        message: 'Passwords must match',
      });
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Signup successful');
      })
      .then(() => {
        setDoc(doc(firestore, 'users', auth.currentUser.uid), {
          userid: auth.currentUser.uid,
          username,
          name,
          email,
          score: 0,
        });
      })
      .then(()=>{
        setDoc(
          doc(firestore, 'users', auth.currentUser.uid, "posts", "July"), 
          {userTasks, goalNum: 28}
          )    
      })
      .catch((error) => {
        setIsValid({ bool: true, boolSnack: true, message: error.message });
      });
  };

  return (
    <View style={authStyle.container}>
      <ScrollView
      showsVerticalScrollIndicator={false}>
        <View style={authStyle.body}>
          <Text style={authStyle.header}>Sign Up</Text>
          <TextInput
            style={authStyle.input}
            value={username}
            autoCapitalize='none'
            mode='outlined'
            label='Username'
            onChangeText={(username) =>
              setUsername(
                username
                  .normalize('NFD')
                  .replace(/[\u0300-\u036f]/g, '')
                  .replace(/\s+/g, '')
                  .replace(/[^a-z0-9]/gi, '')
              )
            }
          />
          <TextInput
            style={authStyle.input}
            mode='outlined'
            label='Name'
            onChangeText={(name) => setName(name)}
          />
          <TextInput
            style={authStyle.input}
            autoCapitalize='none'
            mode='outlined'
            label='Email'
            onChangeText={(email) => setEmail(email)}
          />
          <TextInput
            style={authStyle.input}
            autoCapitalize='none'
            secureTextEntry={passwordVisible}
            mode='outlined'
            label='Password'
            right={
              <TextInput.Icon
                name={passwordVisible ? 'eye' : 'eye-off'}
                onPress={() => setPasswordVisible(!passwordVisible)}
              />
            }
            onChangeText={(password) => setPassword(password)}
          />
          <TextInput
            style={authStyle.input}
            autoCapitalize='none'
            secureTextEntry={confirmPasswordVisible}
            mode='outlined'
            label='Confirm Password'
            right={
              <TextInput.Icon
                name={confirmPasswordVisible ? 'eye' : 'eye-off'}
                onPress={() =>
                  setConfirmPasswordVisible(!confirmPasswordVisible)
                }
              />
            }
            onChangeText={(confirmpw) => setConfirmPassword(confirmpw)}
          />
          <TouchableOpacity
            style={authStyle.submitButton}
            title='Signup'
            onPress={() => handleSignUp()}
          >
            <Text>Sign up</Text>
          </TouchableOpacity>
          <Text
            onPress={() => props.navigation.navigate('Login')}
            style={authStyle.loginMessage}
          >
            Already have an account? Sign in.
          </Text>
        </View>
        <Snackbar
          visible={isValid.boolSnack}
          style={authStyle.snackbarError}
          duration={2000}
          onDismiss={() => {
            setIsValid({ boolSnack: false });
          }}
        >
          {isValid.message}
        </Snackbar>
      </ScrollView>
    </View>
  );
};

export default Signup;
