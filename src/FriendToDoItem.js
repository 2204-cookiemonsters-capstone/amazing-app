import React, {useState} from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { todoListStyle, color } from "../styles";
import { Ionicons } from "@expo/vector-icons";


const FriendToDoItem = ({todo, index, likeTodoItem, unlikeTodoItem}) => {
  const [liked, setLiked] = useState(false);

  const handleLike = (index) => {
    setLiked(true);
    likeTodoItem(index);
  }

  const handleUnlike = (index) => {
    setLiked(false);
    unlikeTodoItem(index);
  }

  return (
    <View style={todoListStyle.todoModal.todoContainer}>
      <Text
        style={[
          todoListStyle.todoModal.todo,
          {
            textDecorationLine: todo.completed ? "line-through" : "none",
            color: todo.completed ? color.list.gray : color.list.black,
          },
        ]}
      >
        {todo.title}
      </Text>
      <View>
        {liked ?
        <View style={{alignItems: 'center'}}>
          <Ionicons name='heart-sharp' size={30} color='#D85963'  onPress={() => handleUnlike(index)}/>
          <Text style={{color:'#D85963'}}>{todo.likes}</Text>
        </View>:
        <View style={{alignItems: 'center'}}>
          <Ionicons name='heart-outline' size={30} color='#73788B' onPress={() => handleLike(index)}/>
          <Text style={{color:'#73788B'}}>{todo.likes}</Text>
        </View>}
      </View>
    </View>
  );
};

export default FriendToDoItem;
