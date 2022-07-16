import React, { useState, useEffect } from "react";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
// import { auth, onAuthStateChanged } from "firebase/auth";
import { auth, onAuthStateChanged } from "../firebase";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import { ActivityIndicator, View } from "react-native";

const Routes = () => {
  const [user, setUser] = useState(null); // tutorial used usecontext, we can change later. Not 100% sure what context is yet
  const [currentRoute, setCurrentRoute] = useState("");
  const [loading, setLoading] = useState(true);
  const navigationRef = useNavigationContainerRef();

  useEffect(() => {
    // setLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setUser(false);
        setLoading(false);
      }
    });
  }, [user]);

  const LoadingScreen = () => (
    <View style={{ marginTop: "50%" }}>
      <ActivityIndicator size='large' />
    </View>
  );

  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={() =>
        setCurrentRoute(navigationRef.getCurrentRoute().name)
      }
    >
      {loading ? (
        <LoadingScreen />
      ) : user ? (
        <AppStack currentRoute={currentRoute} />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

export default Routes;
