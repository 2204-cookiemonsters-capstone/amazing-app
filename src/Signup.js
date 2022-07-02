import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, Touchable, ScrollView } from 'react-native';
import React, { Component, useState } from 'react';
import { auth, createUserWithEmailAndPassword } from "../firebase";
import { Snackbar } from "react-native-paper";
import { authStyle } from "../styles";

const Signup = (props) => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpw, setConfirmPw] = useState('');
    const [email, setEmail] = useState('');
    const [isValid, setIsValid] = useState(true);

    const handleSignUp = () => {
        if (username.length == 0) {
            setIsValid({ bool: true, boolSnack: true, message: "Please enter a username" })
            return;
        }
        if (name.length == 0) {
            setIsValid({ bool: true, boolSnack: true, message: "Please enter your name" })
            return;
        }
        if (email.length == 0) {
            setIsValid({ bool: true, boolSnack: true, message: "Please enter an email" })
            return;
        }
        if (password.length < 6) {
            setIsValid({ bool: true, boolSnack: true, message: "Passwords must be at least 6 characters" })
            return;
        }
        if (password !== confirmpw) {
            setIsValid({ bool: true, boolSnack: true, message: "Passwords must match" })
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                const user = userCredential.user;
                console.log("Signup successful")
            })
            .catch((error) => {setIsValid({ bool: true, boolSnack: true, message: error.message })})
    }

    return (
        <View style={authStyle.container}>
            <ScrollView>
                <Text style={authStyle.header}>Sign Up</Text>
                <TextInput
                    style={authStyle.input}
                    placeholder="Username"
                    value={username}
                    autoCapitalize='none'
                    onChangeText={(username) => setUsername(username.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '').replace(/[^a-z0-9]/gi, ''))}
                />
                <TextInput
                    style={authStyle.input}
                    placeholder="Name"
                    onChangeText={(name) => setName(name)}
                />
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
                <TextInput
                    style={authStyle.input}
                    placeholder="Confirm Password"
                    autoCapitalize='none'
                    secureTextEntry={true}
                    onChangeText={(confirmpw) => setConfirmPw(confirmpw)}
                />
                <TouchableOpacity style={authStyle.submitButton} title="Signup" onPress={() => handleSignUp()}>
                    <Text>Sign up</Text>
                </TouchableOpacity>
                <Text onPress={ ()=> props.navigation.navigate("Login")} style={authStyle.loginMessage}>Already have an account? Sign in.</Text>
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

export default Signup;
