import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  SafeAreaView,
  FlatList,
  Keyboard,
} from "react-native";
import { todoListStyle, color, userProfile } from "../styles";
import ToDoItem from "./ToDoItem";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";
import * as ImagePicker from "expo-image-picker";

const TodoModal = ({ list, updateList, closeModal }) => {
  const [newTodo, setNewTodo] = useState("");

  // declare variables for bottom sheet to post photos to story
  const bs = React.createRef();
  // console.log("BS", bs)
  const fall = new Animated.Value(1);
  // Handler to select an image from library
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      // setImage(result.uri);
      console.log("IMAGE FROM LIBRARY", result);
    }
  };
  // Handler to launch camera
  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've denied permission to allow this app to use your camera.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      console.log("IMAGE FROM CAMERA", result);
    }
  };

  const renderInner = () => (
    <View style={userProfile.panel}>
      <View style={{ alignItems: "center" }}>
        <Text style={userProfile.panelTitle}>Add to your story</Text>
      </View>
      <TouchableOpacity style={userProfile.panelButton} onPress={takePhoto}>
        <Text style={userProfile.panelButtonTitle}>Take a photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={userProfile.panelButton} onPress={pickImage}>
        <Text style={userProfile.panelButtonTitle}>Choose from library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={userProfile.panelButton}
        onPress={() => bs.current.snapTo(1)}
      >
        <Text style={userProfile.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <View style={userProfile.header}>
      <View style={userProfile.panelHeader}>
        <View style={userProfile.panelHandle}></View>
      </View>
    </View>
  );

  const toggleTodoCompleted = (index) => {
    list.todos[index].completed = !list.todos[index].completed;
    updateList(list);
    if (list.todos[index].completed) {
      bs.current.snapTo(0);
    }
  };

  const addTodo = () => {
    if (!list.todos.some((todo) => todo.title === newTodo)) {
      list.todos.push({ title: newTodo, completed: false, likes: 0 });
      updateList(list);
    }
    setNewTodo("");
    Keyboard.dismiss();
  };

  const deleteTodo = (index) => {
    list.todos.splice(index, 1);
    updateList(list);
  };

  const taskCount = list.todos.length;
  const completedCount = list.todos.filter((todo) => todo.completed).length;

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <BottomSheet
        ref={bs}
        snapPoints={[300, 0]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
      />
      <SafeAreaView style={todoListStyle.todoModal.container}>
        <TouchableOpacity
          style={{ position: "absolute", top: 64, right: 32, zIndex: 10 }}
          onPress={closeModal}
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
            <Text style={todoListStyle.todoModal.title}>{list.name}</Text>
            <Text style={todoListStyle.todoModal.taskCount}>
              {completedCount} of {taskCount} tasks
            </Text>
          </View>
        </View>
        <View
          style={[
            todoListStyle.todoModal.section,
            { flex: 3, marginVertical: 16 },
          ]}
        >
          <FlatList
            data={list.todos}
            renderItem={({ item, index }) => (
              <ToDoItem
                todo={item}
                index={index}
                toggleTodoCompleted={toggleTodoCompleted}
                deleteTodo={deleteTodo}
              />
            )}
            keyExtractor={(item) => item.title}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <View
          style={[
            todoListStyle.todoModal.section,
            todoListStyle.todoModal.footer,
          ]}
        >
          <TextInput
            style={[todoListStyle.todoModal.input, { borderColor: list.color }]}
            onChangeText={(text) => setNewTodo(text)}
            value={newTodo}
          />
          <TouchableOpacity
            style={[todoListStyle.todoModal.addTodo, { backgroundColor: list.color },
            ]}
            onPress={() => addTodo()}
          >
            <AntDesign name="plus" size={16} color={color.list.white} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default TodoModal;
