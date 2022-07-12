import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  TextInput
} from "react-native";
import { todoListStyle, color } from "../styles";
import { AntDesign } from "@expo/vector-icons";

export default class AddListModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      color: this.backgroundColors[0]
    };
  }
  backgroundColors = ['#5CD859', '#24A6D9', '#595BD9', '#8022D9', '#D159D8', '#D85963', '#D88559'];

  renderColors() {
    return this.backgroundColors.map(color => {
      return (
        <TouchableOpacity key={color} style={[todoListStyle.addListModal.colorSelect, {backgroundColor: color}]} onPress={() => this.setState({ color })} />
      )
    })
  }

  createTodo = () => {
    const { name, color } = this.state;

    const list = {name, color};
    this.props.addList(list);

    this.setState({ name: ""});
    this.props.closeModal();
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={todoListStyle.addListModal.container}
        behavior="padding"
      >
        <TouchableOpacity
          style={{ position: "absolute", top: 64, right: 32 }}
          onPress={this.props.closeModal}
        >
          <AntDesign name="close" size={24} color={color.list.black} />
        </TouchableOpacity>

        <View style={{ alignSelf: "stretch", marginHorizontal: 32 }}>
          <Text style={todoListStyle.addListModal.title}>Create a New List</Text>
          <TextInput style={todoListStyle.addListModal.input} placeholder="List Name" onChangeText={text => this.setState({name: text})}/>

          <View style={todoListStyle.addListModal.colorContainer}>{this.renderColors()}</View>

          <TouchableOpacity style={[todoListStyle.addListModal.create, {backgroundColor: this.state.color}]} onPress={this.createTodo} >
            <Text style={{color: color.list.white, fontWeight: '600'}}>Create</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
