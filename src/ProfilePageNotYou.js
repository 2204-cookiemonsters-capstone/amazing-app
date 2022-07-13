import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

const ProfilePageNotYou = (props) => {
  const { userid, name, score, username } = props.route.params;

  const [visible, setVisible] = useState(false);
  console.log("PROPSSS", name);

  const getWidthScore = () => {
    return Number(30 + String(score).length * 9);
  };

  useState(() => {
    setVisible(true);
  }, []);

  const topMargin = Platform.OS === "ios" ? 30 : 0;
  return (
    <Modal
      animationType='slide'
      visible={visible}
      onRequestClose={() => setVisible(false)}
    >
      <View style={{ backgroundColor: "#F0F0F0", height: "100%" }}>
        <View style={{ display: "flex", flexDirection: "column" }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: 30,
              marginTop: topMargin,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                borderRadius: 25,
                height: 35,
                width: 35,
                alignItems: "center",
                justifyContent: "center",
                marginLeft: 15,
                marginTop: 15,
                shadowColor: "#7F5DF0",
                shadowOffset: {
                  width: 0,
                  height: 10,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.5,
                elevation: 5,
              }}
              onPress={() => {
                setVisible(false);
                props.navigation.navigate(props.route.params.from);
              }}
            >
              <AntDesign name='down' size={20} />
            </TouchableOpacity>
            <View style={{ flexGrow: 1 }} />
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              height: 60,
              marginTop: 0,
              marginLeft: 20,
            }}
          >
            <TouchableWithoutFeedback>
              <Image
                source={
                  // imageUrl
                  //   ? { uri: imageUrl }
                  //   : require("../assets/defaultprofileicon.webp")
                  require("../assets/favicon.png")
                }
                style={{
                  width: 60,
                  height: 60,
                  resizeMode: "contain",
                  borderRadius: 40,
                }}
              />
            </TouchableWithoutFeedback>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: 20,
              }}
            >
              <Text
                style={{ fontSize: 18, fontWeight: "500", marginBottom: 13 }}
              >
                {name}
              </Text>

              <Text style={{ color: "grey", fontSize: 12 }}>{username}</Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 15,
              height: 30,
              justifyContent: "center",
              alignItems: "center",
              width: getWidthScore(),
              display: "flex",
              flexDirection: "row",
              marginTop: 10,
              marginLeft: 15,
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
            <AntDesign name='aliwangwang-o1' style={{ marginRight: 3 }} />
            <Text>{score}</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ProfilePageNotYou;
