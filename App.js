import {createAppContainer} from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import 'react-native-gesture-handler';

import LoginScreen from './src/LoginScreen'
import ChatScreen from './src/ChatScreen'
import Signup from './src/Signup';
import Messages from './src/Messages';


const AppNavigator = createStackNavigator(
  {
    Login:LoginScreen,
    Signup:Signup,
    Chat:ChatScreen,
    MessagesScreen:Messages
  },
  {
    headerMode:'none'
  }
);

export default createAppContainer(AppNavigator)