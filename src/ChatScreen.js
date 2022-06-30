import { Text, View, StyleSheet } from 'react-native'
import React, { Component } from 'react'

export default class ChatScreen extends Component{
    render(){
        return (
            <View style={styles.container}>
                <Text>LoginScreen</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:"#fff",
        alignItems:'center',
        justifyContent:"center"
    }
});

