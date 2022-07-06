import React from "react";
import { Text, View, TouchableOpacity, FlatList } from "react-native";
import { auth, firestore } from "../firebase";
import { AntDesign } from "@expo/vector-icons";
import ToDoList from "./ToDoList";
import { todoListStyle, color } from "../styles";

export default class List extends React.Component {
  render() {
    return (
      <View style={todoListStyle.container}>
        <Text>User: {auth.currentUser.uid}</Text>
        <View style={{ flexDirection: "row" }}>
          <View style={todoListStyle.divider} />
          <Text style={todoListStyle.title}>
            Todo{" "}
            <Text style={{ fontWeight: "300", color: color.list.blue }}>Lists</Text>
          </Text>
          <View style={todoListStyle.divider} />
        </View>

        <View style={{ marginVertical: 48 }}>
          <TouchableOpacity style={todoListStyle.addList}>
            <AntDesign name="plus" size={16} color={color.list.blue} />
          </TouchableOpacity>

          <Text style={todoListStyle.add}>Add List</Text>
        </View>

        <View style={{ height: 275, paddingLeft: 32 }}>
          <FlatList
            data={tempData}
            keyExtractor={(item) => item.name}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => <ToDoList list={item} />}
          />
        </View>
      </View>
    );
  }
}

export const tempData = [
  {
    name: "Plan a trip",
    color: "#24A6D9",
    todos: [
      {
        title: "Book Flight",
        completed: false
      },
      {
        title: "Passport Check",
        completed: false
      },
      {
        title: "Reserve Hotel Room",
        completed: false
      },
      {
        title: "Pack Luggage",
        completed: false
      }
    ]
  },
  {
    name: "Errands",
    color: "#8022D9",
    todos: [
      {
        title: "Buy Milk",
        completed: false
      },
      {
        title: "Walk the Dog",
        completed: true
      },
      {
        title: "Workout",
        completed: true
      },
      {
        title: "Go to DMV",
        completed: false
      }
    ]
  },
  {
    name: "Birthday Party",
    color: "#595BD9",
    todos: [
      {
        title: "Buy Balloons",
        completed: false
      },
      {
        title: "Send Invitations",
        completed: true
      },
      {
        title: "Make Dinner Reservations",
        completed: true
      },
      {
        title: "Wrap Gifts",
        completed: false
      }
    ]
  },
];
