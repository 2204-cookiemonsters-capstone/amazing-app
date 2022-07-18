import React, {useState, useEffect} from "react";
import { Text, View, TouchableOpacity, FlatList, Modal } from "react-native";
import {ActivityIndicator} from 'react-native-paper';
import { auth, firestore } from "../firebase";
import { doc, getDocs, addDoc, collection, setDoc, deleteDoc } from "firebase/firestore";
import { AntDesign } from "@expo/vector-icons";
import ToDoList from "./ToDoList";
import { todoListStyle, color } from "../styles";
import AddListModal from "./AddListModal";

const List = ({ navigation }) => {
  const [addTodoVisible, setAddTodoVisible] = useState(false)
  const [lists, setLists] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getLists();
  }, [loading])

  let getLists = async () => {
    const snapShot = await getDocs(collection(firestore, "users", auth.currentUser.uid, "Todo Lists"));
    console.log("FETCHED TODO LISTS FROM FIRESTORE");
    let todos = [];
    snapShot.forEach(doc => {
      let todo = doc.data();
      todo.id = doc.id;
      todos.push(todo);
    });
    setLists(todos);
    setLoading(false);
  }

  if(loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={color.list.orange} />
      </View>
    )
  }

  const toggleAddTodoModal = () => {
    setAddTodoVisible(!addTodoVisible);
  }

  const renderSingleList = list => {
    return <ToDoList list={list} updateList={updateList} deleteList={deleteList}/>
  }

  const addList = async (list) => {
    let listToSave = {
      name: list.name,
      color: list.color,
      todos: []
    }
    const docRef = await addDoc(collection(firestore, 'users', auth.currentUser.uid, "Todo Lists"), listToSave)
    listToSave.id = docRef.id;
    let updatedLists = [...lists];
    updatedLists.push(listToSave);
    setLists(updatedLists);
  }

  const updateList = list => {
    const todoRef = doc(firestore, 'users', auth.currentUser.uid, 'Todo Lists', list.id)
    setDoc(todoRef, list, {merge: true});
    //Update state here
    setLists(lists.map(item => item.id === list.id ? list : item))
  }

  const deleteList = async (list) => {
    await deleteDoc(doc(firestore, 'users', auth.currentUser.uid, 'Todo Lists', list.id))
    let updatedLists = [...lists].filter(item => item.id != list.id)
    setLists(updatedLists);
  }

  return (
    <View style={todoListStyle.container}>
      <Modal animationType="slide" visible={addTodoVisible} onRequestClose={() => toggleAddTodoModal()}>
        <AddListModal closeModal={() => toggleAddTodoModal()} addList={addList}/>
      </Modal>
      <View style={{ flexDirection: "row" }}>
        <View style={todoListStyle.divider} />
        <Text style={todoListStyle.title}>
          My{" "}
          <Text style={{ fontWeight: "300", color: color.list.blue }}>
            Lists
          </Text>
        </Text>
        <View style={todoListStyle.divider} />
      </View>

      <View style={{ marginVertical: 48 }}>
        <TouchableOpacity
          style={todoListStyle.addList}
          onPress={() => toggleAddTodoModal()}
        >
          <AntDesign name="plus" size={16} color={color.list.blue} />
        </TouchableOpacity>

        <Text style={todoListStyle.add}>Add List</Text>
      </View>

      {lists.length > 0 ?
        (
          <View style={{ height: 275, paddingLeft: 30 }}>
            <FlatList
              data={lists}
              keyExtractor={(item) => item.id}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => renderSingleList(item)}
              keyboardShouldPersistTaps = 'always'
            />
          </View>
        ) :
        (
          <View>
            <Text style={{fontSize: 20}}>You have no lists</Text>
          </View>
        )
      }

    </View>
  );
}

export default List;
