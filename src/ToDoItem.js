import React, { useState } from "react";
import { Text, View, TouchableOpacity, Animated } from "react-native";
import { todoListStyle, color } from "../styles";
import { Ionicons } from "@expo/vector-icons";
import { Swipeable } from "react-native-gesture-handler";

const ToDoItem = ({ todo, index, toggleTodoCompleted, deleteTodo }) => {
  const [liked, setLiked] = useState(false);

  const rightActions = (dragX, index) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0.9],
      extrapolate: 'clamp'
    })

    const opacity = dragX.interpolate({
      inputRange: [-100, -20, 0],
      outputRange: [1, 0.9, 0],
      extrapolate: 'clamp'
    })

    return (
      <TouchableOpacity onPress={() => deleteTodo(index)}>
        <Animated.View style={[todoListStyle.todoModal.deleteButton, {opacity: opacity}]}>
          <Animated.Text style={{color: 'white', fontWeight: '800', transform: [{scale}]}}>Delete</Animated.Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable renderRightActions={(_, dragX) => rightActions(dragX, index)}>
      <View style={todoListStyle.todoModal.todoContainer}>
        <View style={todoListStyle.todoModal.todoCheckbox}>
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
        </View>
        <View style={{ alignItems: "center" }}>
          <Ionicons name="heart-outline" size={30} color="#73788B" />
          <Text>{todo.likes}</Text>
        </View>
      </View>
    </Swipeable>
  );
};

export default ToDoItem;
