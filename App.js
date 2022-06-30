import {createAppContainer} from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import 'react-native-gesture-handler';

import LoginScreen from './src/LoginScreen'
import ChatScreen from './src/ChatScreen'
import Signup from './src/Signup';



const AppNavigator = createStackNavigator(
  {
    Login:LoginScreen,
    Chat:ChatScreen
  },
  {
    headerMode:'none'
  }
);

export default createAppContainer(AppNavigator)