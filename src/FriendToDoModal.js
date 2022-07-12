import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  SafeAreaView,
  FlatList,
  Keyboard
} from "react-native";
import { todoListStyle, color } from "../styles";
import FriendToDoItem from "./FriendToDoItem";
import { AntDesign, Ionicons } from "@expo/vector-icons";

export default class FriendTodoModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newTodo: ''
    };
  }

  likeTodoItem = index => {
    let list = this.props.list;
    list.todos[index].likes = list.todos[index].likes + 1;
    this.props.updateList(list);
  }

  unlikeTodoItem = index => {
    let list = this.props.list;
    list.todos[index].likes = list.todos[index].likes - 1;
    this.props.updateList(list);
  }

  addTodo = () => {
    let list = this.props.list;
    list.todos.push({title: this.state.newTodo, completed: false, likes: 0});

    this.props.updateList(list);
    this.setState({ newTodo: ''});

    Keyboard.dismiss();
  }

  render() {
    const list = this.props.list;
    const taskCount = list.todos.length;
    const completedCount = list.todos.filter((todo) => todo.completed).length;

    return (
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
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
            { borderBottomColor: list.color },
          ]}
        >
          <View>
            <Text>FRIEND'S MODAL</Text>
            <Text style={todoListStyle.todoModal.title}>{list.name}</Text>
            <Text style={todoListStyle.todoModal.taskCount}>
              {completedCount} of {taskCount} tasks
            </Text>
          </View>
        </View>
        <View style={[todoListStyle.todoModal.section, { flex: 3 }]}>
          <FlatList
            data={list.todos}
            renderItem={({ item, index }) => <FriendToDoItem todo={item} index={index} toggleTodoCompleted={this.toggleTodoCompleted} likeTodoItem={this.likeTodoItem} unlikeTodoItem={this.unlikeTodoItem} />}
            keyExtractor={(_, index) => index.toString()}
            contentContainerStyle={{
              paddingHorizontal: 32,
              paddingVertical: 64,
            }}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <View
          style={[
            todoListStyle.todoModal.section,
            todoListStyle.todoModal.footer,
          ]}
        >
          <TextInput style={[todoListStyle.todoModal.input, { borderColor: list.color }]}
            onChangeText={text => this.setState({newTodo: text})}
            value={this.state.newTodo}
          />
          <TouchableOpacity style={[todoListStyle.todoModal.addTodo, { backgroundColor: list.color }]}
            onPress={() => this.addTodo()}
          >
            <AntDesign name="plus" size={16} color={color.list.white} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}
