import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";

const IntroAdd = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>LET'S CREATE A SAVINGS{"\n"}GOAL!</Text>
        </View>

        <View style={styles.imageContainer}>
          {/* Your Lottie animation here */}
          <LottieView
            source={require("../../../assets/app/add.json")}
            autoPlay
            loop={false}
            style={{
              width: 400,
              height: 400,
              bottom: 123,
            }}
          />
          <Image
            source={require("../../../assets/app/abk.png")}
            resizeMode={"stretch"}
            style={{
              height: 90,
              width: 90,
              position: "absolute",
              top: 270,
              alignSelf: "center",
            }}
          />
        </View>
      </View>

      {/* Start Button always at bottom */}
      <TouchableOpacity
        style={styles.startButton}
        onPress={() => {
          navigation.navigate("AddGoal");
        }}
      >
        <Text style={styles.startButtonText}>Start</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default IntroAdd;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEF7FF",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 38,
  },
  titleContainer: {
    alignSelf: "flex-start",
  },
  title: {
    fontSize: 25,
    fontWeight: "900",
    color: "#000",
    lineHeight: 35,
    fontFamily: "Roboto",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  lottieAnimation: {
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").width * 0.9,
    maxWidth: 400,
    maxHeight: 400,
  },
  startButton: {
    position: "absolute", // <-- important
    bottom: 100, // <-- distance from bottom
    left: 20,
    right: 20,
    backgroundColor: "#2F3039",
    borderRadius: 39,
    paddingVertical: 22,
    alignItems: "center",
    maxWidth: 380,
    alignSelf: "center",
  },
  startButtonText: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "700",
    fontFamily: "Roboto",
  },
});
