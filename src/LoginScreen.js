import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import React, { Component, useState } from 'react';
import { auth, signInWithEmailAndPassword } from "../firebase";

const LoginScreen = (props) => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isValid, setIsValid] = useState(true);

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                const user = userCredential.user;
                console.log("Login successful")
                //UPDATE THIS TO MOVE SCREEN FORWARD IF LOGIN SUCCESSFUL
            })
            .catch(error => alert(error.message))
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.header}>Sign In</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    autoCapitalize='none'
                    onChangeText={(email) => setEmail(email)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    autoCapitalize='none'
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                />
                <TouchableOpacity style={styles.submitButton} title="Signup" onPress={() => handleLogin()}>
                    <Text>Log In</Text>
                </TouchableOpacity>
                <Text onPress={ ()=> props.navigation.navigate("Signup")} style={styles.loginMessage}>Don't have an account? Sign up.</Text>
            </ScrollView>
        </View>
    )
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingTop: 50,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    header:{
        fontWeight: "800", //font weight is the only number that needs to be in quotes or or it crashes expo
        fontSize:30,
        color:'black',
        marginTop:32,
        textAlign: 'center'
    },
    input:{
        marginTop:32,
        height:50,
        borderWidth:StyleSheet.hairlineWidth,
        borderColor:'#BAB7C3',
        borderRadius:30,
        paddingHorizontal:16,
        color:'black',
        fontWeight:'600',
        width: 280
    },
    submitButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9075E3',
        width: 280,
        height: 50,
        marginTop: 32,
        borderRadius: 30,
    },
    loginMessage: {
        marginTop: 20,
        textAlign: 'center',
        color: 'blue'
    }
});
