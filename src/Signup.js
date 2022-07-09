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
    title: 'Read a Book',
    description:
      'It can be any genre of your choice, just finish a book this month.',
    defaultImgUrl: 'https://i.imgur.com/D7Iht7E.jpg',
    month: 'July',
    year: 2022,
    category: 'reflection',
  },
  {
    taskId: 2,
    title: 'Breathing Meditation',
    description:
      'Find a quiet space to sit. Without changing your normal breathing pattern, bring your attention to your inhaling and exhaling. As your mind wanders, bring your focus back to your breath. Practice this type of meditation for at least 15 minutes.',
      defaultImgUrl: 'https://i.imgur.com/syBzUa2.jpg',
      month: 'July',
      year: 2022,
      category: 'meditation',
  },
  {
    taskId: 3,
    title: 'Nature Walk',
    description:
      'Visit any natural environment-- a trail, a park, a lake, or whatever is available-- and go on a nature walk.',
    defaultImgUrl: 'https://i.imgur.com/NNKNIWz.jpg',
    month: 'July',
    year: 2022,
    category: 'nature',
  },
  {
    taskId: 4,
    title: 'Send A Letter',
    description: 'Write and mail a physical letter to someone you care about.',
    defaultImgUrl: 'https://i.imgur.com/NNKNIWz.jpg',
    month: 'July',
    year: 2022,
    category: 'kindness'
  },
  {
    taskId: 5,
    title: 'Purposeful Photo Album',
    description:
      'Take photos of ten important things in your life-- people, places, or objects.',
      defaultImgUrl: 'https://i.imgur.com/hlhLJcq.jpg',
      month: 'July',
      year: 2022,
      category: 'creativity'
  },
  {
    taskId: 6,
    title: 'Connect With Community',
    description:
      'Attend a local event or group meeting in your community',
      defaultImgUrl: 'https://i.imgur.com/xVtrThI.jpg',
      month: 'July',
      year: 2022,
      category: 'community'
  },
  {
    taskId: 7,
    title: 'Full Body Stretch',
    description:
      'Spend 20+ minutes stretching your muscles, loosen up the tightness in your body.',
      defaultImgUrl:'https://i.imgur.com/xVtrThI.jpg',
      month: 'July',
      year: 2022,
      category: 'movement'
  },
  {
    taskId: 8,
    title: 'Core Values Reflection',
    description: 'Journal Prompt: What are your core values? When do you feel most connected with these values?',
    defaultImgUrl: 'https://i.imgur.com/xVtrThI.jpg',
    month: 'July',
    year: 2022,
    category: 'reflection'
  },
  {
    taskId: 9,
    title: 'Walking Meditation',
    description: 'Walk slowly and focus on the feeling of your feet on the ground. As your attention goes elsewhere, bring your focus back to the feeling of your feet on the ground. Practice this meditation for 10+ minutes.',
      defaultImgUrl: 'https://i.imgur.com/xVtrThI.jpg',
      month: 'July',
      year: 2022,
      category: 'meditation'
  },
  {
    taskId: 10,
    title: 'Water',
    description:
      'Visit a pond, lake, river, ocean, or other body of water. If the climate allows, swim, canoe, or just enjoy the sounds and wildlife near the water.',
      defaultImgUrl: 'https://i.imgur.com/xVtrThI.jpg',
      month: 'July',
      year: 2022,
      category: 'nature'
  },
  {
    taskId: 11,
    title: 'Positive Review',
    description:
      'Leave a positive review for a local business or organization you support.',
      defaultImgUrl: 'https://i.imgur.com/xVtrThI.jpg',
      month: 'July',
      year: 2022,
      category: 'kindness'
  },
  {
    taskId: 12,
    title: 'Improve Your Space',
    description: 'Make some improvement to your work or living space-- redesign, organize, rearrange, build, or declutter.',
    defaultImgUrl: 'https://i.imgur.com/xVtrThI.jpg',
    month: 'July',
    year: 2022,
    category: 'creativity'
  },
  {
    taskId: 13,
    title: 'Reconnect',
    description: 'Reach out to someone you have not spoken to in more than 3 months.',
    defaultImgUrl: 'https://i.imgur.com/xVtrThI.jpg',
    month: 'July',
    year: 2022,
    category: 'community'
  },
  {
    taskId: 14,
    title: 'Core / Upper Body Strength',
    description: 'Complete a core or upper body workout of some kind for 20+ minutes',
    defaultImgUrl: 'https://i.imgur.com/xVtrThI.jpg',
    month: 'July',
    year: 2022,
    category: 'movement'
  },
{
  taskId: 15,
  title: 'Gratitude Reflection',
  description: 'Journal Prompt: Who are you grateful for in your life? What experiences are you most grateful for? Which of your qualities or traits are you grateful for?',
  defaultImgUrl: 'https://i.imgur.com/xVtrThI.jpg',
  month: 'July',
  year: 2022,
  category: 'reflection'
},
  {
    taskId: 16,
    title: 'Relaxation Meditation',
    description: 'While lying down, slowly scan from head to toe. As you scan, focus on relaxing each part of your body for several breaths, then move to the next part of your body. Practice for minimum 20 min.',
    defaultImgUrl: 'https://i.imgur.com/xVtrThI.jpg',
    month: 'July',
    year: 2022,
    category: 'meditation'
  },
  {
    taskId: 17,
    title: 'Nature Sit',
    description: 'Find a peaceful place to sit in nature without any distractions. Spend at least 20 minutes sitting without using your phone, reading, music, or journaling.',
    defaultImgUrl: 'https://i.imgur.com/xVtrThI.jpg',
    month: 'July',
    year: 2022,
    category: 'nature'
  },
  {
    taskId: 18,
    title: 'Donation',
    description:
      'Make a donation of some kind-- it could be a monetary donation to a cause you care about, or it could be clothing, food, or some other item.',
      defaultImgUrl: 'https://i.imgur.com/xVtrThI.jpg',
      month: 'July',
      year: 2022,
      category: 'kindness'
  },
  {
    taskId: 19,
    title: 'Album',
    description: "Listen to an entire music album from start to finish.",
    defaultImgUrl: 'https://i.imgur.com/xVtrThI.jpg',
    month: 'July',
    year: 2022,
    category: 'creativity'
  },
  {
    taskId: 20,
    title: 'Volunteer',
    description: 'Volunteer for a local organization or cause.',
    defaultImgUrl: 'https://i.imgur.com/xVtrThI.jpg',
    month: 'July',
    year: 2022,
    category: 'community'
  },{
    taskId: 21,
    title: 'Yoga',
    description: 'Complete a yoga or martial arts practice. Minimum 20+ min, use the internet to discover free class videos.',
    defaultImgUrl: 'https://i.imgur.com/xVtrThI.jpg',
    month: 'July',
    year: 2022,
    category: 'movement'
  },
  {
    taskId: 22,
    title: 'Goals',
    description: 'Journal Prompt: What is a goal you would like to accomplish in the next year? What steps or people will help you achieve this goal? What is your motivation for achieving this goal? How can you help others achieve their goals?',
    defaultImgUrl: 'https://i.imgur.com/xVtrThI.jpg',
    month: 'July',
    year: 2022,
    category: 'reflection'
  },
  {
    taskId: 23,
    title: 'Compassion Meditation',
    description: 'Pracitice a compassion meditation: bring to mind people you care about. For each person, say to yourself: "May they be happy and free from unhappiness and pain". This practice helps to build your compassionate feelings for others.',
    defaultImgUrl: 'https://i.imgur.com/xVtrThI.jpg',
    month: 'July',
    year: 2022,
    category: 'meditation'

  },
  {
    taskId: 24,
    title: 'Care for Nature',
    description: 'Ideas: If you have a pet, spend time caring for your pet. If you have a garden or plants, spend time tending your garden or plants. In some way, spend some time caring for plants or animals.',
    defaultImgUrl: 'https://i.imgur.com/xVtrThI.jpg',
    month: 'July',
    year: 2022,
    category: 'nature'

  },
  {
    taskId: 25,
    title: 'Kind Messages',
    description: 'Send messages to 3+ people who have had a positive impact on you, letting them know you appreciate them.',
    defaultImgUrl: 'https://i.imgur.com/xVtrThI.jpg',
    month: 'July',
    year: 2022,
    category: 'kindness'

  },
  {
    taskId: 26,
    title: 'Hands On Art',
    description: 'Complete an art project with your hands-- paint, draw, sculpt, build, etc.',
    defaultImgUrl: 'https://i.imgur.com/xVtrThI.jpg',
    month: 'July',
    year: 2022,
    category: 'creativity'
  },
  {
    taskId: 27,
    title: 'Support Local',
    description: 'Visit a locally-owned restaurant, store, or organization.',
    defaultImgUrl: 'https://i.imgur.com/xVtrThI.jpg',
    month: 'July',
    year: 2022,
    category: 'community'
  },
  {
    taskId: 28,
    title: 'Jog',
    description: 'Complete a walk/jog/run for at least one mile.',
    defaultImgUrl: 'https://i.imgur.com/xVtrThI.jpg',
    month: 'July',
    year: 2022,
    category: 'movement'
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
