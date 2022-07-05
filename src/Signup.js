import { Text, View, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { TextInput } from "react-native-paper";
import React, { useState } from 'react';
import { auth, createUserWithEmailAndPassword, firestore } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import { Snackbar } from "react-native-paper";
import { authStyle } from "../styles";

const Signup = (props) => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(true);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(true);
    const [email, setEmail] = useState('');
    const [isValid, setIsValid] = useState(false);

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
        if (password !== confirmPassword) {
            setIsValid({ bool: true, boolSnack: true, message: "Passwords must match" })
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                const user = userCredential.user;
                console.log("Signup successful")
            })
            .then(() => {
                setDoc(doc(firestore, 'users', auth.currentUser.uid), {
                    username, name, email, score: 0
                })
            })
            .catch((error) => {setIsValid({ bool: true, boolSnack: true, message: error.message })})
    }

    return (
        <View style={authStyle.container}>
            <ScrollView>
                <View style={authStyle.body}>
                <Text style={authStyle.header}>Sign Up</Text>
                <TextInput
                    style={authStyle.input}
                    value={username}
                    autoCapitalize='none'
                    mode="outlined"
                    label="Username"
                    onChangeText={(username) => setUsername(username.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '').replace(/[^a-z0-9]/gi, ''))}
                />
                <TextInput
                    style={authStyle.input}
                    mode="outlined"
                    label="Name"
                    onChangeText={(name) => setName(name)}
                />
                <TextInput
                    style={authStyle.input}
                    autoCapitalize='none'
                    mode="outlined"
                    label="Email"
                    onChangeText={(email) => setEmail(email)}
                />
                <TextInput
                    style={authStyle.input}
                    autoCapitalize='none'
                    secureTextEntry={passwordVisible}
                    mode="outlined"
                    label="Password"
                    right={<TextInput.Icon name={passwordVisible ? "eye" : "eye-off"} onPress={() => setPasswordVisible(!passwordVisible)} />}
                    onChangeText={(password) => setPassword(password)}
                />
                <TextInput
                    style={authStyle.input}
                    autoCapitalize='none'
                    secureTextEntry={confirmPasswordVisible}
                    mode="outlined"
                    label="Confirm Password"
                    right={<TextInput.Icon name={confirmPasswordVisible ? "eye" : "eye-off"} onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)} />}
                    onChangeText={(confirmpw) => setConfirmPassword(confirmpw)}
                />
                <TouchableOpacity style={authStyle.submitButton} title="Signup" onPress={() => handleSignUp()}>
                    <Text>Sign up</Text>
                </TouchableOpacity>
                <Text onPress={ ()=> props.navigation.navigate("Login")} style={authStyle.loginMessage}>Already have an account? Sign in.</Text>
                </View>
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
