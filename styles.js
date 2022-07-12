import { StyleSheet } from "react-native";

//Set color here and reference in stylesheets below to change color across the entire app
const color = {
  link: "blue",
  error: "red",
  background: "white",
  inputBorder: "#BAB7C3",
  header: "black",
  submit: "#9075E3",
  list: {
    black: "#2D3436",
    blue: "#24A6D9",
    lightBlue: "#A7CBD9",
    white: "#FFFFFF",
    gray: '#A4A4A4',
    lightGray: '#CACACA',
    red: '#D85963'
  },
};

const authStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: color.background,
  },
  header: {
    fontWeight: "800",
    fontSize: 30,
    color: color.header,
    marginTop: 32,
    textAlign: "center",
  },
  body: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: color.background,
    textAlign: "center",
  },
  input: {
    marginTop: 20,
    color: "black",
    fontWeight: "600",
    width: 280,
  },
  submitButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: color.submit,
    width: 200,
    height: 50,
    marginTop: 32,
    borderRadius: 30,
  },
  loginMessage: {
    marginTop: 20,
    textAlign: "center",
    color: color.link,
  },
  snackbarError: {
    backgroundColor: color.error,
  },
});

const userProfile = StyleSheet.create({
  container: {
    backgroundColor: color.background,
  },
  topNav: {
    display: "flex",
    marginTop: 40,
    marginLeft: 13,
    marginRight: 13,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerButtons: {
    backgroundColor: "aqua", //random vibrant color for now, style our app later
    borderRadius: 25,
    height: 35,
    width: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    marginTop: 10,
    fontSize: 15,
  },
  body: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: color.background,
    textAlign: "center",
  },
  input: {
    marginTop: 20,
    color: "black",
    fontWeight: "600",
    width: 280,
  },
  header: {
    backgroundColor: 'white',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center'
  },
  panelHandle: {
    width:40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10
  },
  panel: {
    padding: 20,
    backgroundColor: 'white'
  },
  panelTitle: {
    fontSize: 20,
    height: 30
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: color.submit,
    alignItems: 'center',
    marginVertical: 7
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white'
  }
});

const friendList = StyleSheet.create({
  friendRow: {
    marginLeft: 25,
    marginTop: 10,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    marginRight: 25,
    borderColor: "#cccccc",
    display: "flex",
    flexDirection: "row",
  },
  infoContainer: {
    display: "flex",
    flexDirection: "column",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 10,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 30,
  },
  button: {
    backgroundColor: "red",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
  },
  acceptButton: {
    backgroundColor: "lime",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
  },
});

const todoListStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.list.white,
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    backgroundColor: color.list.lightBlue,
    height: 1,
    flex: 1,
    alignSelf: "center",
  },
  title: {
    fontSize: 38,
    fontWeight: "800",
    color: color.list.black,
    paddingHorizontal: 64,
  },
  addList: {
    borderWidth: 2,
    borderColor: color.list.lightBlue,
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  add: {
    color: color.list.blue,
    fontWeight: "600",
    fontSize: 14,
    marginTop: 8,
  },
  listContainer: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginHorizontal: 12,
    alignItems: "center",
    width: 200,
  },
  listTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: color.list.white,
    marginBottom: 18,
  },
  count: {
    fontSize: 48,
    fontWeight: "200",
    color: color.list.white,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "700",
    color: color.list.white,
  },
  addListModal: {
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      fontSize: 28,
      fontWeight: "800",
      color: color.list.black,
      alignSelf: "center",
      marginBottom: 16,
    },
    input: {
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: color.list.blue,
      borderRadius: 6,
      height: 50,
      paddingHorizontal: 16,
      fontSize: 18
    },
    create : {
      marginTop: 24,
      height: 50,
      borderRadius: 6,
      alignItems: 'center',
      justifyContent: 'center',
    },
    colorSelect: {
      width: 30,
      height: 30,
      borderRadius: 4
    },
    colorContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 12
    }
  },
  todoModal: {
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    section: {
      // flex: 1,
      alignSelf: 'stretch'
    },
    header: {
      justifyContent: 'flex-end',
      marginLeft: 64,
      borderBottomWidth: 3,
      paddingTop: 16
    },
    title: {
      fontSize: 30,
      fontWeight: "800",
      color: color.list.black
    },
    taskCount: {
      marginTop: 4,
      marginBottom: 16,
      color: color.list.gray,
      fontWeight: '600'
    },
    footer: {
      paddingHorizontal: 32,
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 16
    },
    input: {
      flex: 1,
      height: 48,
      borderWidth: StyleSheet.hairlineWidth,
      borderRadius: 6,
      marginRight: 8,
      paddingHorizontal: 8
    },
    addTodo: {
      borderRadius: 4,
      padding: 16,
      alignItems: 'center',
      justifyContent: 'center'
    },
    todoContainer: {
      paddingVertical: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingLeft: 32,
      paddingRight: 16
    },
    todo: {
      color: color.list.black,
      fontWeight: '700',
      fontSize: 16
    },
    todoCheckbox: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    deleteButton: {
      flex: 1,
      backgroundColor: color.list.red,
      justifyContent: 'center',
      alignItems: 'center',
      width: 100
    }
  }
});

export { authStyle, userProfile, friendList, todoListStyle, color };
