import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import {
  collection,
  getDocs,
  addDoc,
  query,
  onSnapshot,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { auth, firestore } from "../firebase";
import { ScrollView } from "react-native-gesture-handler";

const image = require("../assets/favicon.png");

const SearchPage = ({ navigation }) => {
  const [searchValue, setSearchValue] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [renderedUsers, setRenderedUsers] = useState([]);
  const firstThreeUsers = renderedUsers.slice(0, 3);

  const [showAll, setShowAll] = useState(false);
  const [showAllSearch, setShowAllSearch] = useState(false);

  const height = () => {
    return allUsers.length * 92 + 150;
  };

  const heightNoShowAll = () => {
    return firstThreeUsers.length * 92 + 150;
  };

  const fetchAllUsers = async () => {
    const reference = collection(firestore, "users");

    onSnapshot(reference, (snapShot) => {
      const users = [];

      snapShot.forEach((doc) => {
        users.push(doc.data());
      });

      allUsers !== users ? setAllUsers(users) : null;
      renderedUsers !== users ? setRenderedUsers(users) : null;
    });
  };

  const search = (value) => {
    const filtered = allUsers.filter(
      (user) =>
        user.name
          .toLowerCase()
          .slice(0, value.length)
          .includes(value.toLowerCase()) ||
        user.username
          .toLowerCase()
          .slice(0, value.length)
          .includes(value.toLowerCase())
    );

    setRenderedUsers(filtered);
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <View>
      <View
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <View
          style={{
            marginTop: 40,
            marginLeft: 15,
            marginRight: 25,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            borderRadius: 50,
            backgroundColor: "white",
            height: 40,
            paddingHorizontal: 16,
            flexGrow: 1,
            marginBottom: 5,
            shadowColor: "#7F5DF0",
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.5,
            elevation: 5,
          }}
        >
          <Image
            source={require("../assets/search2.png")}
            style={{
              width: 22,
              height: 22,
              resizeMode: "contain",
            }}
          />
          <TextInput
            placeholder='Find Friends'
            onChangeText={(value) => {
              setSearchValue(value);
              search(value);
            }}
            style={{
              paddingHorizontal: 16,
              color: "black",
              fontWeight: "600",
              flexGrow: 1,
            }}
          />
        </View>
        <View style={{ marginTop: 40 }}>
          <TouchableOpacity
            style={{ right: 15 }}
            onPress={() => navigation.goBack()}
          >
            <Text style={{ fontWeight: "900", fontSize: 15 }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {searchValue === "" || !searchValue ? (
          <View style={{ height: showAll ? height() : heightNoShowAll() }}>
            <Text
              style={{
                fontWeight: "700",
                fontSize: 17,
                margin: 25,
              }}
            >
              Quick Add
            </Text>
            {showAll
              ? allUsers.map((item) => (
                  <TouchableOpacity
                    key={item.userid}
                    style={{
                      marginLeft: 15,
                      marginRight: 15,
                      paddingTop: 7,
                      paddingBottom: 0,
                      borderColor: "#cccccc",
                      display: "flex",
                      flexDirection: "row",
                      paddingLeft: 10,
                      paddingRight: 15,
                      borderTopLeftRadius: item === allUsers[0] ? 8 : 0,
                      borderTopRightRadius: item === allUsers[0] ? 8 : 0,
                      backgroundColor: "white",
                      marginBottom: 1,
                      shadowColor: "#7F5DF0",
                      shadowOffset: {
                        width: 0,
                        height: 10,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.5,
                      elevation: 5,
                    }}
                  >
                    <TouchableOpacity>
                      <Image
                        source={image}
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: 25,
                          marginTop: 10,
                          marginBottom: 10,
                          marginRight: 5,
                        }}
                      />
                    </TouchableOpacity>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "42%",
                      }}
                    >
                      <Text style={{ fontSize: 18, fontWeight: "400" }}>
                        {item.name}
                      </Text>
                      <Text style={{ color: "gray" }}>{item.username}</Text>
                      <Text>3 Mutual Friends</Text>
                    </View>
                    <View
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        marginLeft: 25,
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          backgroundColor: "#CBC3E3",
                          borderRadius: 25,
                          height: 30,
                          width: 95,
                          justifyContent: "center",
                          alignItems: "center",
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <View
                          style={{
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Image
                            source={require("../assets/ADDFRIEND2.png")}
                            style={{ width: 15, height: 15 }}
                          />
                        </View>
                        <Text style={{ marginLeft: 5 }}>Add</Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                ))
              : firstThreeUsers.map((item) => (
                  <TouchableOpacity
                    key={item.userid}
                    style={{
                      marginLeft: 15,
                      marginRight: 15,
                      paddingTop: 7,
                      paddingBottom: 0,
                      borderColor: "#cccccc",
                      display: "flex",
                      flexDirection: "row",
                      paddingLeft: 10,
                      paddingRight: 15,
                      borderTopLeftRadius: item === allUsers[0] ? 8 : 0,
                      borderTopRightRadius: item === allUsers[0] ? 8 : 0,
                      backgroundColor: "white",
                      marginBottom: 1,
                      shadowColor: "#7F5DF0",
                      shadowOffset: {
                        width: 0,
                        height: 10,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.5,
                      elevation: 5,
                    }}
                  >
                    <TouchableOpacity>
                      <Image
                        source={image}
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: 25,
                          marginTop: 10,
                          marginBottom: 10,
                          marginRight: 5,
                        }}
                      />
                    </TouchableOpacity>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "42%",
                      }}
                    >
                      <Text style={{ fontSize: 18, fontWeight: "400" }}>
                        {item.name}
                      </Text>
                      <Text style={{ color: "gray" }}>{item.username}</Text>
                      <Text>3 Mutual Friends</Text>
                    </View>
                    <View
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        marginLeft: 25,
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          backgroundColor: "#CBC3E3",
                          borderRadius: 25,
                          height: 30,
                          width: 95,
                          justifyContent: "center",
                          alignItems: "center",
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <View
                          style={{
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Image
                            source={require("../assets/ADDFRIEND2.png")}
                            style={{ width: 15, height: 15 }}
                          />
                        </View>
                        <Text style={{ marginLeft: 5 }}>Add</Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                ))}
            {!showAll ? (
              <TouchableOpacity
                style={{
                  marginLeft: 15,
                  marginRight: 15,
                  paddingTop: 7,
                  paddingBottom: 7,
                  borderColor: "#cccccc",
                  display: "flex",
                  flexDirection: "row",
                  paddingLeft: 10,
                  paddingRight: 15,
                  height: 40,
                  justifyContent: "center",
                  alignItems: "center",
                  borderBottomRightRadius: 8,
                  borderBottomLeftRadius: 8,
                  backgroundColor: "white",
                  shadowColor: "#7F5DF0",
                  shadowOffset: {
                    width: 0,
                    height: 10,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.5,
                  elevation: 5,
                }}
                onPress={() => setShowAll(true)}
              >
                <Text>View More</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{
                  marginLeft: 15,
                  marginRight: 15,
                  paddingTop: 7,
                  paddingBottom: 7,
                  borderColor: "#cccccc",
                  display: "flex",
                  flexDirection: "row",
                  paddingLeft: 10,
                  paddingRight: 15,
                  height: 40,
                  justifyContent: "center",
                  alignItems: "center",
                  borderBottomRightRadius: 8,
                  borderBottomLeftRadius: 8,
                  backgroundColor: "white",
                  shadowColor: "#7F5DF0",
                  shadowOffset: {
                    width: 0,
                    height: 10,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.5,
                  elevation: 5,
                }}
                onPress={() => setShowAll(false)}
              >
                <Text>View Less</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : searchValue !== "" && renderedUsers.length ? (
          <View style={{ height: showAll ? height() : heightNoShowAll() }}>
            <Text
              style={{
                fontWeight: "700",
                fontSize: 17,
                margin: 25,
              }}
            >
              Add Friends
            </Text>
            {showAllSearch
              ? renderedUsers.map((item) => (
                  <TouchableOpacity
                    key={item.userid}
                    style={{
                      marginLeft: 15,
                      marginRight: 15,
                      paddingTop: 7,
                      paddingBottom: 0,
                      borderColor: "#cccccc",
                      display: "flex",
                      flexDirection: "row",
                      paddingLeft: 10,
                      paddingRight: 15,
                      borderTopLeftRadius: item === allUsers[0] ? 8 : 0,
                      borderTopRightRadius: item === allUsers[0] ? 8 : 0,
                      backgroundColor: "white",
                      marginBottom: 1,
                      shadowColor: "#7F5DF0",
                      shadowOffset: {
                        width: 0,
                        height: 10,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.5,
                      elevation: 5,
                    }}
                  >
                    <TouchableOpacity>
                      <Image
                        source={image}
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: 25,
                          marginTop: 10,
                          marginBottom: 10,
                          marginRight: 5,
                        }}
                      />
                    </TouchableOpacity>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "42%",
                      }}
                    >
                      <Text style={{ fontSize: 18, fontWeight: "400" }}>
                        {item.name}
                      </Text>
                      <Text style={{ color: "gray" }}>{item.username}</Text>
                      <Text>3 Mutual Friends</Text>
                    </View>
                    <View
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        marginLeft: 25,
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          backgroundColor: "#CBC3E3",
                          borderRadius: 25,
                          height: 30,
                          width: 95,
                          justifyContent: "center",
                          alignItems: "center",
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <View
                          style={{
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Image
                            source={require("../assets/ADDFRIEND2.png")}
                            style={{ width: 15, height: 15 }}
                          />
                        </View>
                        <Text style={{ marginLeft: 5 }}>Add</Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                ))
              : firstThreeUsers.map((item) => (
                  <TouchableOpacity
                    key={item.userid}
                    style={{
                      marginLeft: 15,
                      marginRight: 15,
                      paddingTop: 7,
                      paddingBottom: 0,
                      borderColor: "#cccccc",
                      display: "flex",
                      flexDirection: "row",
                      paddingLeft: 10,
                      paddingRight: 15,
                      borderTopLeftRadius: item === allUsers[0] ? 8 : 0,
                      borderTopRightRadius: item === allUsers[0] ? 8 : 0,
                      backgroundColor: "white",
                      marginBottom: 1,
                      shadowColor: "#7F5DF0",
                      shadowOffset: {
                        width: 0,
                        height: 10,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.5,
                      elevation: 5,
                    }}
                  >
                    <TouchableOpacity>
                      <Image
                        source={image}
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: 25,
                          marginTop: 10,
                          marginBottom: 10,
                          marginRight: 5,
                        }}
                      />
                    </TouchableOpacity>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "42%",
                      }}
                    >
                      <Text style={{ fontSize: 18, fontWeight: "400" }}>
                        {item.name}
                      </Text>
                      <Text style={{ color: "gray" }}>{item.username}</Text>
                      <Text>3 Mutual Friends</Text>
                    </View>
                    <View
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        marginLeft: 25,
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          backgroundColor: "#CBC3E3",
                          borderRadius: 25,
                          height: 30,
                          width: 95,
                          justifyContent: "center",
                          alignItems: "center",
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <View
                          style={{
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Image
                            source={require("../assets/ADDFRIEND2.png")}
                            style={{ width: 15, height: 15 }}
                          />
                        </View>
                        <Text style={{ marginLeft: 5 }}>Add</Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                ))}
            {!showAllSearch ? (
              <TouchableOpacity
                style={{
                  marginLeft: 15,
                  marginRight: 15,
                  paddingTop: 7,
                  paddingBottom: 7,
                  borderColor: "#cccccc",
                  display: "flex",
                  flexDirection: "row",
                  paddingLeft: 10,
                  paddingRight: 15,
                  height: 40,
                  justifyContent: "center",
                  alignItems: "center",
                  borderBottomRightRadius: 8,
                  borderBottomLeftRadius: 8,
                  backgroundColor: "white",
                  shadowColor: "#7F5DF0",
                  shadowOffset: {
                    width: 0,
                    height: 10,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.5,
                  elevation: 5,
                }}
                onPress={() => setShowAllSearch(true)}
              >
                <Text>View More</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{
                  marginLeft: 15,
                  marginRight: 15,
                  paddingTop: 7,
                  paddingBottom: 7,
                  borderColor: "#cccccc",
                  display: "flex",
                  flexDirection: "row",
                  paddingLeft: 10,
                  paddingRight: 15,
                  height: 40,
                  justifyContent: "center",
                  alignItems: "center",
                  borderBottomRightRadius: 8,
                  borderBottomLeftRadius: 8,
                  backgroundColor: "white",
                  shadowColor: "#7F5DF0",
                  shadowOffset: {
                    width: 0,
                    height: 10,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.5,
                  elevation: 5,
                }}
                onPress={() => setShowAllSearch(false)}
              >
                <Text>View Less</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
};

export default SearchPage;

/* <TouchableOpacity
              style={{
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
                paddingLeft: 10,
                paddingRight: 15,
              }}
            >
              <TouchableOpacity>
                <Image
                  source={image}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    margin: 10,
                  }}
                />
              </TouchableOpacity>
              <View style={{ display: "flex", flexDirection: "column" }}>
                <Text>{item.name}</Text>
                <Text>{item.username}</Text>
                <Text>3 Mutual Friends</Text>
              </View>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: 30,
                }}
              >
                <TouchableOpacity
                  style={{
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
                  }}
                >
                  <View style={{ marginLeft: 13, marginRight: 8 }}>
                    <Image
                      source={require("../assets/ADDFRIEND2.png")}
                      style={{ width: 15, height: 15 }}
                    />
                  </View>
                  <Text style={{ marginRight: 14 }}>Remove</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>

            */
