import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  SafeAreaView,
  FlatList,
} from "react-native";
import { auth, firestore } from "../firebase";
import { todoListStyle, color } from "../styles";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { tempData } from "./List";

export default class TodoModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.list.name,
      color: this.props.list.color,
      todos: this.props.list.todos,
    };
  }

  renderTodo = (todo) => {
    return (
      <View style={todoListStyle.todoModal.todoContainer}>
        <TouchableOpacity>
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
    );
  };

  render() {
    const taskCount = this.state.todos.length;
    const completedCount = this.state.todos.filter(
      (todo) => todo.completed
    ).length;

    return (
      <SafeAreaView style={todoListStyle.todoModal.container}>
        <TouchableOpacity
          style={{ position: "absolute", top: 64, right: 32, zIndex: 10 }}
          onPress={this.props.closeModal}
        >
          <AntDesign name="close" size={24} color={color.list.black} />
        </TouchableOpacity>

        <View
          style={[
            todoListStyle.todoModal.section,
            todoListStyle.todoModal.header,
            { borderBottomColor: this.state.color },
          ]}
        >
          <View>
            <Text style={todoListStyle.todoModal.title}>{this.state.name}</Text>
            <Text style={todoListStyle.todoModal.taskCount}>
              {completedCount} of {taskCount} tasks
            </Text>
          </View>
        </View>
        <View style={[todoListStyle.todoModal.section, { flex: 3 }]}>
          <FlatList
            data={this.state.todos}
            renderItem={({ item }) => this.renderTodo(item)}
            keyExtractor={(item) => item.title}
            contentContainerStyle={{
              paddingHorizontal: 32,
              paddingVertical: 64,
            }}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <KeyboardAvoidingView
          style={[
            todoListStyle.todoModal.section,
            todoListStyle.todoModal.footer,
          ]}
          behavior="padding"
        >
          <TextInput
            style={[
              todoListStyle.todoModal.input,
              { borderColor: this.state.color },
            ]}
          />
          <TouchableOpacity
            style={[
              todoListStyle.todoModal.addTodo,
              { backgroundColor: this.state.color },
            ]}
          >
            <AntDesign name="plus" size={16} color={color.list.white} />
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}
