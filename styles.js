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
    paddingTop: 50,
    padding: 15,
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
    marginTop: 32,
    height: 50,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: color.inputBorder,
    borderRadius: 30,
    paddingHorizontal: 16,
    color: "black",
    fontWeight: "600",
    width: 280,
  },
  submitButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: color.submit,
    width: 280,
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

export { authStyle };
