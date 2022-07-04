import React, { useState, useEffect } from 'react';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
// import { auth, onAuthStateChanged } from "firebase/auth";
import { auth, onAuthStateChanged } from '../firebase';
import AuthStack from './AuthStack';
import AppStack from './AppStack';

const Routes = () => {
  const [user, setUser] = useState(1); // tutorial used usecontext, we can change later. Not 100% sure what context is yet
  const [currentRoute, setCurrentRoute] = useState('');
  const navigationRef = useNavigationContainerRef();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [user]);

  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={() =>
        setCurrentRoute(navigationRef.getCurrentRoute().name)
      }
    >
      {user ? <AppStack currentRoute={currentRoute} /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;
