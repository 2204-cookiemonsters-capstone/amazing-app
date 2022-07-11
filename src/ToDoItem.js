import React, {useState} from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { todoListStyle, color } from "../styles";
import { Ionicons } from "@expo/vector-icons";


const ToDoItem = ({todo, index, toggleTodoCompleted}) => {
  const [liked, setLiked] = useState(false);

  return (
    <View style={todoListStyle.todoModal.todoContainer}>
      <TouchableOpacity onPress={() => toggleTodoCompleted(index)}>
        <Ionicons
          name={todo.completed ? "ios-square" : "ios-square-outline"}
          size={24}
          color={color.list.gray}
          style={{ width: 32 }}
        />
      </TouchableOpacity>
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
      {liked ? <Ionicons name='heart-sharp' size={30} color='#D85963'/> : <Ionicons name='heart-outline' size={30} color='#73788B'/>}
        <Text>{todo.likes}</Text>
      </View>
    </View>
  );
};

export default ToDoItem;
