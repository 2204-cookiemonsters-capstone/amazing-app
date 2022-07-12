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
      <View style={{alignItems: 'center'}}>
        {liked ? <Ionicons name='heart-sharp' size={30} color='#D85963'  onPress={() => handleUnlike(index)}/> : <Ionicons name='heart-outline' size={30} color='#73788B' onPress={() => handleLike(index)}/>}
        <Text>{todo.likes}</Text>
      </View>
    </View>
  );
};

export default FriendToDoItem;
