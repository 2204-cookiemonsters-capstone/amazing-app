import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, Touchable, ScrollView } from 'react-native'
import React, { Component } from 'react'
import {Ionicons} from '@expo/vector-icons'

export default class Signup extends Component{
    state={
        name:"",
        password:"",
        confirmpw:'',
        firstName:'',
        lastName:'',
        email:''
    }

    continue = () =>{
        this.props.navigation.navigate("MessagesScreen", { name:this.state.name})
    }

    render(){
        return (
            <View style={styles.container}>
                <ScrollView>
                <View style={styles.circle}/>
                <View style={{marginTop:64}}>
                    <Image source = {require('../assets/favicon.png')} style={{width:100, height:100, alignSelf:'center'}}/>
                </View>
              
                <View style={{marginHorizontal:32}}>
                <Text style={styles.header}>Signup</Text>
                    <TextInput style={styles.input} placeholder="First Name" onChangeText={firstName => {this.setState({firstName})}} value = {this.state.firstName}/>
                </View>

                <View style={{marginHorizontal:32}}>
                    <TextInput style={styles.input} placeholder="Last Name" onChangeText={lastName => {this.setState({lastName})}} value = {this.state.lastName}/>
                </View>

                <View style={{marginHorizontal:32}}>
                    <TextInput style={styles.input} placeholder="Email" onChangeText={email => {this.setState({email})}} value = {this.state.email}/>
                </View>

                <View style={{marginHorizontal:32}}>
                    <TextInput style={styles.input} placeholder="Username" onChangeText={name => {this.setState({name})}} value = {this.state.name}/>
                </View>

                <View style={{marginHorizontal:32}}>
                    <TextInput style={styles.input} placeholder="Password" onChangeText={password => {this.setState({password})}} value = {this.state.password}/>
                </View>

                <View style={{marginHorizontal:32}}>
                    <TextInput style={styles.input} placeholder="Confirm Password" onChangeText={confirmpw => {this.setState({confirmpw})}} value = {this.state.confirmpw}/>
                    <View style={{display:'flex', marginTop:64, flexDirection:'row'}}>
                    <Text onPress={ ()=> this.props.navigation.navigate("Login")} style={{color:'blue'}}>Login</Text>
                    <View style={{flexGrow:1}}/>
                        <TouchableOpacity style={styles.continue} onPress={this.continue}>
                            <Ionicons name = "md-arrow-forward" size = {24} color = 'white'/>
                        </TouchableOpacity>
                    </View>
                </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
       
        backgroundColor:"#F4F5F7"
    },
    circle:{
        width:500,
        height:500,
        borderRadius:500 / 2, 
        backgroundColor:'white',
        position: "absolute",
        left:120,
        top:-20
    },
    header:{
        fontWeight: "800", //font weight is the only number that needs to be in quotes or or it crashes expo
        fontSize:30,
        color:'black',
        marginTop:32
    },
    input:{
        marginTop:32,
        height:50,
        borderWidth:StyleSheet.hairlineWidth,
        borderColor:'#BAB7C3',
        borderRadius:30,
        paddingHorizontal:16,
        color:'black',
        fontWeight:'600'
    },
    continue:{
        width:70,
        height:70,
        borderRadius:70/2,
        backgroundColor:'#9075E3',
        alignItems:'center',
        justifyContent:'center'
    }
});

