import { AntDesign } from "@expo/vector-icons";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import { auth, firestore } from "../firebase";

const screenwidth = Dimensions.get("window").width;
const screenheight = Dimensions.get("window").height;

const TaskFeaturedImageModal = ({
  featuredPostsData,
  setShowImageModal,
  selectedPost,
}) => {
  const scrollRef = useRef();
  const [counter, setCounter] = useState(0);
  const counterPlus = counter + 1;
  const counterMinus = counter - 1;

  const handleLeftClick = () => {
    if (counter !== 0) setCounter(counter - 1);
    if (counter < 0) setCounter(0);
    scrollRef.current.scrollTo({ x: counterMinus * screenwidth });
    console.log(counter);
  };

  const handleRightClick = () => {
    if (counter !== 27) setCounter(counter + 1);
    if (counter > 27) setCounter(27);
    scrollRef.current.scrollTo({ x: counterPlus * screenwidth });
    console.log(counter);
  };

  const fetchFeaturedPost = () => {
    const reference = doc(firestore, "users", auth.currentUser.uid);
    getDoc(reference).then((x) => {
      scrollRef.current.scrollTo({
        x: (x.data().selectedFeaturedPost.taskId - 1) * screenwidth,
      });
      setCounter(x.data().selectedFeaturedPost.taskId - 1);
    });
  };

  useEffect(() => {
    fetchFeaturedPost();
  }, []);

  return (
    <View style={{ width: screenwidth, height: screenheight }}>
      <TouchableOpacity
        style={{
          ...styles.backButton,
          position: "absolute",
          zIndex: 100000,
          top: Platform.OS === "ios" ? 35 : 25,
        }}
        onPress={() => setShowImageModal(false)}
      >
        <AntDesign name='close' size={17} />
      </TouchableOpacity>

      <ScrollView
        horizontal
        pagingEnabled
        ref={scrollRef}
        scrollEnabled={false}
      >
        {featuredPostsData.map((item) => (
          <View
            style={{ width: screenwidth, height: screenheight }}
            key={item.taskId}
          >
            <TouchableOpacity
              activeOpacity={0}
              style={{
                height: "100%",
                zIndex: 100,
                width: "50%",
                opacity: 0,
                position: "absolute",
              }}
              onPress={() => handleLeftClick()}
            />
            <Image
              resizeMethod='resize'
              source={{ uri: item.defaultImgUrl }}
              style={{ width: "100%", height: "100%" }}
            />
            <TouchableOpacity
              activeOpacity={0}
              style={{
                height: "100%",
                zIndex: 100,
                width: "50%",
                left: "50%",
                opacity: 0,
                position: "absolute",
              }}
              onPress={() => handleRightClick()}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default TaskFeaturedImageModal;

const styles = StyleSheet.create({
  backButton: {
    backgroundColor: "white",
    borderRadius: 25,
    height: 30,
    width: 30,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 13,
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
