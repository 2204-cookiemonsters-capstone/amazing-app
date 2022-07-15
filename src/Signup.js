import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { TextInput } from "react-native-paper";
import React, { useState } from "react";
import { auth, createUserWithEmailAndPassword, firestore } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import { Snackbar } from "react-native-paper";
import { authStyle } from "../styles";
import { userTasks } from "./assets/userTasksData";
import { AntDesign, Ionicons } from "@expo/vector-icons";


const Signup = ({ navigation }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(true);
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(false);

  const handleSignUp = () => {
    if (username.length == 0) {
      setIsValid({
        bool: true,
        boolSnack: true,
        message: "Please enter a username",
      });
      return;
    }
    if (name.length == 0) {
      setIsValid({
        bool: true,
        boolSnack: true,
        message: "Please enter your name",
      });
      return;
    }
    if (email.length == 0) {
      setIsValid({
        bool: true,
        boolSnack: true,
        message: "Please enter an email",
      });
      return;
    }
    if (password.length < 6) {
      setIsValid({
        bool: true,
        boolSnack: true,
        message: "Passwords must be at least 6 characters",
      });
      return;
    }
    if (password !== confirmPassword) {
      setIsValid({
        bool: true,
        boolSnack: true,
        message: "Passwords must match",
      });
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Signup successful");
      })
      .then(() => {
        setDoc(doc(firestore, "users", auth.currentUser.uid), {
          userid: auth.currentUser.uid,
          username,
          name,
          email,
          score: 0,
        });
      })
      .then(() => {
        setDoc(doc(firestore, "users", auth.currentUser.uid, "posts", "July"), {
          userTasks,
          goalNum: 28,
        });
      })
      .catch((error) => {
        setIsValid({ bool: true, boolSnack: true, message: error.message });
      });
  };

  return (
    
    <View style={{ marginTop: 30, backgroundColor: "white", height: "100%" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
      
      <View style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", marginTop: 15, marginLeft: 15 }}>
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                borderRadius: 25,
                height: 35,
                width: 35,
                alignItems: "center",
                justifyContent: "center",
                marginTop: 3,
                shadowColor: "gray",
                shadowOffset: {
                  width: 0,
                  height: 10,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.5,
                elevation: 5,
              }}
              onPress={() => navigation.goBack()}
            >
              <AntDesign name='left' size={20} color="#F24C00" />
            </TouchableOpacity>
            </View>

        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 5,
          }}
        >
            <View style={{ flexGrow: 1 , flexDirection: "row", justifyContent: "center"}}>
            <View  />
            {/* <Ionicons
              name='ios-list-circle-outline'
              size={100}
              style={{ marginRight: "50%", marginLeft: "25%" }}
            /> */}
            <Image style={{width: 175, height: 175, borderRadius: 100}}source={require('../assets/cover.png')} />
          </View>

          <Text
            style={{
              fontSize: 40,
              fontWeight: "600",
              marginTop: 10,
              marginBottom: 3,
            }}
          >
            Sign Up
          </Text>
          <TextInput
            style={authStyle.input}
            theme={{colors: {primary: "#F24C00"}}}
            value={username}
            autoCapitalize='none'
            label='Username'
            onChangeText={(username) =>
              setUsername(
                username
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
                  .replace(/\s+/g, "")
                  .replace(/[^a-z0-9]/gi, "")
              )
            }
          />
          <TextInput
            style={authStyle.input}
            theme={{colors: {primary: "#F24C00"}}}
            label='Name'
            onChangeText={(name) => setName(name)}
          />
          <TextInput
            style={authStyle.input}
            theme={{colors: {primary: "#F24C00"}}}
            autoCapitalize='none'
            label='Email'
            onChangeText={(email) => setEmail(email)}
          />
          <TextInput
            style={authStyle.input}
            autoCapitalize='none'
            theme={{colors: {primary: "#F24C00"}}}
            secureTextEntry={passwordVisible}
            label='Password'
            right={
              <TextInput.Icon
                name={passwordVisible ? "eye" : "eye-off"}
                onPress={() => setPasswordVisible(!passwordVisible)}
              />
            }
            onChangeText={(password) => setPassword(password)}
          />
          <TextInput
            style={authStyle.input}
            autoCapitalize='none'
            theme={{colors: {primary: "#F24C00"}}}
            secureTextEntry={confirmPasswordVisible}
            label='Confirm Password'
            right={
              <TextInput.Icon
                name={confirmPasswordVisible ? "eye" : "eye-off"}
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
            <Text style={{ fontWeight: "500", fontSize: 16, color: "white" }}>Sign up</Text>
          </TouchableOpacity>
          <Text
            onPress={() => navigation.navigate("Login")}
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
