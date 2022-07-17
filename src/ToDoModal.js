import React, { useState } from "react";
import { Text, View, TouchableOpacity, KeyboardAvoidingView, TextInput, SafeAreaView, FlatList, Keyboard } from "react-native";
import { Snackbar } from "react-native-paper";
import { todoListStyle, color, userProfile, authStyle } from "../styles";
import ToDoItem from "./ToDoItem";
import { auth, firestore, storage } from "../firebase";
import { ref, uploadBytes, blob, getDownloadURL } from "firebase/storage";
import { doc, setDoc, increment, addDoc, collection } from "firebase/firestore";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";
import * as ImagePicker from "expo-image-picker";
import { v4 as uuidv4 } from "uuid";
import Toast from "react-native-root-toast";

const TodoModal = ({ list, updateList, closeModal }) => {
  const [newTodo, setNewTodo] = useState("");
  const [isValid, setIsValid] = useState(false);

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
      quality: 0.6,
      base64: true,
    });

    const id = uuidv4();
    const imageRef = ref(storage, `${auth.currentUser.uid}/stories/${id}`);

    const img = await fetch(result.uri);
    const bytes = await img.blob();
    uploadBytes(imageRef, bytes).then(() => {
      const reference = ref(
        storage,
        `${auth.currentUser.uid}/stories/${id}`
      );

      getDownloadURL(reference).then((x) => {
        const colRef = collection(firestore, "users", auth.currentUser.uid, "stories");
        addDoc(
          colRef,
          {
            storyImg: x,
            userid: auth.currentUser.uid,
            dateTime: new Date()
          }
        );
        Toast.show("Added to your story", {
          duration: Toast.durations.LONG,
        });
      });
    });

    bs.current.snapTo(1);
  };

  // Handler to launch camera
  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert(
        "You've denied permission to allow this app to access your camera."
      );
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.6,
    });

    const id = uuidv4();
    const imageRef = ref(storage, `${auth.currentUser.uid}/stories/${id}`);

    const img = await fetch(result.uri);
    const bytes = await img.blob();
    uploadBytes(imageRef, bytes).then(() => {
      const reference = ref(
        storage,
        `${auth.currentUser.uid}/stories/${id}`
      );

      getDownloadURL(reference).then((x) => {
        const colRef = collection(firestore, "users", auth.currentUser.uid, "stories");
        addDoc(
          colRef,
          {
            storyImg: x,
            userid: auth.currentUser.uid,
            dateTime: new Date()
          }
        );
        Toast.show("Added to your story", {
          duration: Toast.durations.LONG,
        });
      });
    });

    bs.current.snapTo(1);
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
    // update state
    updateList(list);
    //increase user score by like count
    if(list.todos[index].completed) {
      const userRef = doc(firestore, 'users', auth.currentUser.uid);
      let updatedUser = {score: increment(list.todos[index].likes)};
      setDoc(userRef, updatedUser, {merge: true});
    // launch bottom sheet to post to stories
      bs.current.snapTo(0);
    }
    //decrease user score if they mark task as not completed
    if(!list.todos[index].completed) {
      const userRef = doc(firestore, 'users', auth.currentUser.uid);
      let updatedUser = {score: increment(-list.todos[index].likes)};
      setDoc(userRef, updatedUser, {merge: true});
    }
  };

  const addTodo = () => {
    if(!newTodo) {
      setIsValid({
        bool: true,
        boolSnack: true,
        message: "Please enter a task",
      });
      return
    }

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
          <Snackbar
            visible={isValid.boolSnack}
            style={authStyle.snackbarError}
            duration={2000}
            onDismiss={() => {
              setIsValid({ boolSnack: false });
            }}
          >
            {isValid.message}
          </Snackbar>
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
