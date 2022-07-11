import React from "react";
import { Text, View, TouchableOpacity, Modal } from "react-native";
import { todoListStyle } from "../styles";
import FriendTodoModal from "./FriendToDoModal";

class FriendToDoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showListVisible: false,
    };
  }

  toggleListModal() {
    this.setState({ showListVisible: !this.state.showListVisible });
  }

  render() {
    const list = this.props.list;
    const completedCount = list.todos.filter(
      (todo) => todo.completed == true
    ).length;
    const remainingCount = list.todos.length - completedCount;

    return (
      <View>
        <Modal
          animationType="slide"
          visible={this.state.showListVisible}
          onRequestClose={() => this.toggleListModal()}
        >
          <FriendTodoModal
            list={list}
            closeModal={() => this.toggleListModal()}
            updateList={this.props.updateList}
          />
        </Modal>

        <TouchableOpacity
          style={[
            todoListStyle.listContainer,
            { backgroundColor: list.color || "black" },
          ]}
          onPress={() => this.toggleListModal()}
        >
          <Text style={todoListStyle.listTitle} numberOfLines={1}>
            {list.name}
          </Text>

          <View style={{ alignItems: "center" }}>
            <Text style={todoListStyle.count}>{remainingCount}</Text>
            <Text style={todoListStyle.subtitle}>Remaining</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={todoListStyle.count}>{completedCount}</Text>
            <Text style={todoListStyle.subtitle}>Completed</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default FriendToDoList;
