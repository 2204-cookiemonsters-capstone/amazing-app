import {createAppContainer} from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import 'react-native-gesture-handler';

import LoginScreen from './components/LoginScreen'
import ChatScreen from './components/ChatScreen'
import Signup from './components/Signup';



const AppNavigator = createStackNavigator(
  {
    Login:LoginScreen,
    Signup:Signup,
    Chat:ChatScreen
  },
  {
    headerMode:'none'
  }
);

export default createAppContainer(AppNavigator)