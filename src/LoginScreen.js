import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import React, { Component, useState } from 'react';
import { auth, signInWithEmailAndPassword } from "../firebase";
import { Snackbar } from "react-native-paper";
import { authStyle } from "../styles";

const LoginScreen = (props) => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isValid, setIsValid] = useState(true);

    const handleLogin = () => {
        if (email.length == 0) {
            setIsValid({ bool: true, boolSnack: true, message: "Please enter an email address" })
            return;
        }
        if (password.length < 6) {
            setIsValid({ bool: true, boolSnack: true, message: "Passwords must be at least 6 characters" })
            return;
        }
        signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                const user = userCredential.user;
                console.log("Login successful")
                //UPDATE THIS TO MOVE SCREEN FORWARD IF LOGIN SUCCESSFUL
            })
            .catch((error) => {setIsValid({ bool: true, boolSnack: true, message: error.message })})
    }

    return (
        <View style={authStyle.container}>
            <ScrollView>
                <Text style={authStyle.header}>Sign In</Text>
                <TextInput
                    style={authStyle.input}
                    placeholder="Email"
                    autoCapitalize='none'
                    onChangeText={(email) => setEmail(email)}
                />
                <TextInput
                    style={authStyle.input}
                    placeholder="Password"
                    autoCapitalize='none'
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                />
                <TouchableOpacity style={authStyle.submitButton} title="Signup" onPress={() => handleLogin()}>
                    <Text>Log In</Text>
                </TouchableOpacity>
                <Text onPress={ ()=> props.navigation.navigate("Signup")} style={authStyle.loginMessage}>Don't have an account? Sign up.</Text>
                <Snackbar
                    visible={isValid.boolSnack}
                    style={authStyle.snackbarError}
                    duration={2000}
                    onDismiss={() => { setIsValid({ boolSnack: false }) }}>
                    {isValid.message}
                </Snackbar>
            </ScrollView>
        </View>
    )
}

export default LoginScreen;
