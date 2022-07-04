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

const userProfile = StyleSheet.create({
  container: {
    backgroundColor: color.background,
    display: 'flex',
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
    // flex: 1,
    paddingTop: 20,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: color.background,
  }
})

export { authStyle, userProfile };
