import { StyleSheet } from "react-native";

//Set color here and reference in stylesheets below to change color across the entire app
const color = {
  link: 'blue',
  error: 'red',
  background: 'white',
  inputBorder: '#BAB7C3',
  header: 'black',
  submit: '#9075E3',
}

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
    display: 'flex',
    marginTop: 40,
    marginLeft: 13,
    marginRight: 13,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  headerButtons: {
    backgroundColor: 'aqua', //random vibrant color for now, style our app later
    borderRadius: 25,
    height: 35,
    width: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginTop: 10,
    fontSize: 15,
  },
  body: {
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: color.background,
    textAlign: 'center'
  },
  input: {
    marginTop: 20,
    color: "black",
    fontWeight: "600",
    width: 280,
  }
})

export { authStyle, userProfile };
