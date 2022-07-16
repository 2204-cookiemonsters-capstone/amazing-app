import {
  AntDesign,
  EvilIcons,
  FontAwesome,
  Octicons,
} from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { auth } from "../firebase";
const SinglePost = () => {
  const [caption, setCaption] = useState(
    "Hello! How was your day? My day was great. Hope yours is going well too. This was my image from the beach today. It was alot of fun. I hope to do this again soon!"
  );
  const [showAllCaption, setShowAllCaption] = useState(false);

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        marginBottom: 20,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          borderBottomWidth: 0.2,
          borderBottomColor: "aliceblue",
          height: 55,
        }}
      >
        <Image
          source={require("../assets/favicon.png")}
          style={{ width: 40, height: 40, borderRadius: 70, marginLeft: 10 }}
        />
        <Text style={{ fontSize: 16, marginLeft: 3 }}>Name Here</Text>
      </View>
      <View style={{ width: "100%", height: 410 }}>
        <Image
          source={require("../assets/favicon.png")}
          style={{ height: "100%", width: "100%" }}
        />
      </View>
      <View
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "row",
          height: 50,
        }}
      >
        <TouchableOpacity>
          <AntDesign name='hearto' size={26} style={{ marginLeft: 13 }} />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            source={require("../assets/commenting.png")}
            style={{ width: 25, height: 25, marginLeft: 24 }}
          />
        </TouchableOpacity>
      </View>
      <View style={{ marginLeft: 13 }}>
        <Text style={{ fontWeight: "500", fontSize: 15 }}>231 likes</Text>
      </View>
      <View
        style={{
          width: "100%",
          backgroundColor: "white",
          marginLeft: 13,
          marginTop: 3,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginRight: 15,
            backgroundColor: "white",
          }}
        >
          <Text style={{ flexShrink: 1 }}>
            <Text style={{ fontWeight: "500" }}>username: </Text>
            {caption.length > 80 && !showAllCaption ? (
              <Text>
                {caption.slice(0, 80)}
                <Text
                  style={{ color: "gray" }}
                  onPress={() => setShowAllCaption(true)}
                >
                  ...more
                </Text>
              </Text>
            ) : caption.length > 80 && showAllCaption ? (
              <Text>{caption}</Text>
            ) : caption.length < 80 ? (
              <Text>{caption}</Text>
            ) : null}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default SinglePost;
