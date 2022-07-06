import React from "react";
import { Text, View } from 'react-native';
import { todoListStyle } from "../styles";

const ToDoList = ({ list }) => {
  const completedCount = list.todos.filter(todo => todo.completed == true).length;
  const remainingCount = list.todos.length - completedCount;

  return (
    <View style={[todoListStyle.listContainer, {backgroundColor: list.color}]}>
      <Text style={todoListStyle.listTitle} numberOfLines={1} >
        {list.name}
      </Text>

      <View style={{alignItems: 'center'}}>
        <Text style={todoListStyle.count}>{remainingCount}</Text>
        <Text style={todoListStyle.subtitle}>Remaining</Text>
      </View>
      <View style={{alignItems: 'center'}}>
        <Text style={todoListStyle.count}>{completedCount}</Text>
        <Text style={todoListStyle.subtitle}>Completed</Text>
      </View>
    </View>
  )
}

export default ToDoList;
