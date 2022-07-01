import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, Touchable, ScrollView } from 'react-native';
import React, { Component, useState } from 'react';
import { auth, createUserWithEmailAndPassword } from "../firebase";

const Signup = (props) => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpw, setConfirmPw] = useState('');
    const [email, setEmail] = useState('');
    const [isValid, setIsValid] = useState(true);

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                const user = userCredential.user;
                console.log("Signup successful")
            })
            .catch(error => alert(error.message))
    }

//  const continue = () =>{
//         this.props.navigation.navigate("MessagesScreen", { name:this.state.name})
//  }

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.header}>Sign Up</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    value={username}
                    autoCapitalize='none'
                    onChangeText={(username) => setUsername(username.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '').replace(/[^a-z0-9]/gi, ''))}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    onChangeText={(name) => setName(name)}
                />
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
                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    autoCapitalize='none'
                    secureTextEntry={true}
                    onChangeText={(confirmpw) => setConfirmPw(confirmpw)}
                />
                <TouchableOpacity style={styles.submitButton} title="Signup" onPress={() => handleSignUp()}>
                    <Text>Sign up</Text>
                </TouchableOpacity>
                <Text onPress={ ()=> props.navigation.navigate("Login")} style={styles.loginMessage}>Already have an account? Sign in.</Text>
            </ScrollView>
        </View>
    )
}

export default Signup;

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
