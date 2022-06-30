import React from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';


const messages = [
    {
      id: '1',
      userName: 'Jenny Doe',
      userImg: require('../assets/favicon.png'),
      messageTime: '4 mins ago',
      messageText:
        'Hey there, this is my test for a post of my social app in React Native.',
    },
    {
      id: '2',
      userName: 'John Doe',
      userImg: require('../assets/favicon.png'),
      messageTime: '2 hours ago',
      messageText:
        'Hey there, this is my test for a post of my social app in React Native.',
    },
    {
      id: '3',
      userName: 'Ken William',
      userImg: require('../assets/favicon.png'),
      messageTime: '1 hours ago',
      messageText:
        'Hey there, this is my test for a post of my social app in React Native.',
    },
    {
      id: '4',
      userName: 'Selina Paul',
      userImg: require('../assets/favicon.png'),
      messageTime: '1 day ago',
      messageText:
        'Hey there, this is my test for a post of my social app in React Native.',
    },
    {
      id: '5',
      userName: 'Christy Alex',
      userImg: require('../assets/favicon.png'),
      messageTime: '2 days ago',
      messageText:
        'Hey there, this is my test for a post of my social app in React Native.',
    },
  ]


 const Messages = (props) =>{

    return (
        <View style={styles.container}> 
        <FlatList data={messages} keyExtractor={message=> message.id} renderItem={({item})=>(
            <TouchableOpacity style={{width: "100%",}} onPress={()=> props.navigation.navigate("Chat")}>
                <View style={styles.userinfo}>
                    <View style={styles.userimage}>
                        <Image source = {item.userImg} style={styles.img}/>
                    </View>
                    <View style={styles.textView}>
                        <View style ={styles.userinfotext}>
                                <Text style={styles.username}>{item.userName}</Text>
                                <Text style={styles.posttime}>{item.messageTime}</Text>
                        </View>
                        <Text style={styles.messageText}>{item.messageText}</Text>
                    </View>
                    
                </View>
            </TouchableOpacity>
        )}/>
        </View>
    )
  }



  const styles = StyleSheet.create({
    container :{
        flex:1,
        paddingLeft:20,
        paddingRight:20,
        alignItems:'center',
        backgroundColor:'white',
        marginTop:70
    },
    userinfo:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    userimage:{
        paddingTop:15,
        paddingBottom:15
    },
    img:{
        width:50,
        height:50,
        borderRadius:25
    },
    textView:{
        flexDirection:'column',
        justifyContent:'center',
        padding:15,
        paddingLeft:0,
        marginLeft:10,
        width:300,
        borderBottomWidth:1,
        borderBottomColor:'#cccccc'
    },
    userinfotext:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:5
    },
    username:{
        fontSize:14,
        fontWeight:'bold',
        fontFamily:'serif'
    },
    posttime:{
        fontsize:12,
        color:'#666',
        fontfamily:'serif'
    },
    messageText:{
        fontSize:14,
        color:"#333333"
    }
});

export default Messages