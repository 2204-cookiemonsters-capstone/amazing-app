import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { Component, useState } from "react";
import { auth, signInWithEmailAndPassword } from "../firebase";
import { Snackbar, TextInput } from "react-native-paper";
import { authStyle } from "../styles";
import { AntDesign } from "@expo/vector-icons";

const LoginScreen = (props) => {
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(true);

  const handleLogin = () => {
    if (email.length == 0) {
      setIsValid({
        bool: true,
        boolSnack: true,
        message: "Please enter an email address",
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
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Login successful");
        //UPDATE THIS TO MOVE SCREEN FORWARD IF LOGIN SUCCESSFUL
      })
      .catch((error) => {
        setIsValid({ bool: true, boolSnack: true, message: error.message });
      });
  };

  return (
    <View style={authStyle.container}>
      <ScrollView>
        <View style={authStyle.body}>
          <AntDesign name='aliwangwang-o1' size={70} />
          <Text
            style={{
              fontSize: 40,
              fontWeight: "600",
              marginTop: 10,
              marginBottom: 15,
            }}
          >
            Sign In
          </Text>
          <TextInput
            style={authStyle.input}
            autoCapitalize='none'
            label='Email'
            onChangeText={(email) => setEmail(email)}
          />
          <TextInput
            style={authStyle.input}
            autoCapitalize='none'
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
          <TouchableOpacity
            style={authStyle.submitButton}
            title='Signup'
            onPress={() => handleLogin()}
          >
            <Text style={{ fontWeight: "500", fontSize: 16 }}>Log In</Text>
          </TouchableOpacity>
          <Text
            onPress={() => props.navigation.navigate("Signup")}
            style={authStyle.loginMessage}
          >
            Don't have an account? Sign up.
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

export default LoginScreen;
