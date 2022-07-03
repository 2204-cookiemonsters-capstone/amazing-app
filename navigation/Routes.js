import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
// import { auth, onAuthStateChanged } from "firebase/auth";
import { auth, onAuthStateChanged } from "../firebase";
import AuthStack from './AuthStack';
import AppStack from './AppStack';

const Routes = () => {
  const [user, setUser] = useState(''); // tutorial used usecontext, we can change later. Not 100% sure what context is yet

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [])

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;
