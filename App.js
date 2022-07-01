import React from 'react';
import 'react-native-gesture-handler';

import Routes from './navigation/Routes';

const App = () => {
  return <Routes />;
};

export default App;

// const AppNavigator = createStackNavigator(
//   {
//     Login: LoginScreen,
//     Signup: Signup,
//     Chat: ChatScreen,
//     MessagesScreen: Messages,
//   },
//   {
//     headerMode: 'none',
//   }
// );

// export default createAppContainer(AppNavigator);
