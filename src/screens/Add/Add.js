// import { StyleSheet, Text, View } from "react-native";
// import React from "react";
// import { useNavigation } from "@react-navigation/native";
// import LottieView from "lottie-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// const { width } = Dimensions.get("window");

// const Add = () => {
//   const navigation = useNavigation();

//   return (
    <SafeAreaView style={styles.safeArea}>
  //     <View style={styles.container}>
//         {showInitial && (
//             <View style={styles.content}>

//             <View style={styles.titleContainer}>
//               <Text style={styles.title}>LET'S CREATE A SAVINGS{"\n"}GOAL!</Text>
//             </View>
    
//             <View style={styles.imageContainer}>
//               <LottieView
//                 source={require("../assets/savinggoal.json")}
//                 autoPlay
//                 loop
//                 style={styles.lottieAnimation}
//               />
//             </View>
    
            <TouchableOpacity
              style={styles.startButton}
              onPress={}
            >
              <Text style={styles.startButtonText}>Start</Text>
            </TouchableOpacity>
          </View>
        )}
        {showStep1 && (<View></View>)}
        {showStep2 && (<View></View>)} */}
        <Text>Hi</Text>
      </View>
    </SafeAreaView>
  );
};

export default Add;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FEF7FF",
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    width: "100%",
    paddingHorizontal: 16,
  },
  statusBar: {
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingTop: 22,
    paddingBottom: 10,
  },
  timeText: {
    fontFamily: "Roboto",
    fontSize: 14,
    fontWeight: "500",
    color: "#1d1b20",
    letterSpacing: 0.14,
  },
  signalIcon: {
    width: 46,
    height: 17,
  },
  batteryIcon: {
    width: 24,
    height: 24,
  },
  titleContainer: {
    alignSelf: "flex-start",
    paddingHorizontal: 24,
    marginTop: 38,
  },
  title: {
    fontSize: 25,
    fontFamily: "Roboto",
    fontWeight: "900",
    color: "#000",
    lineHeight: 35,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  lottieAnimation: {
    width: Dimensions.get("window").width * 6,
    height: Dimensions.get("window").width * 10,
    maxWidth: 400,
    maxHeight: 400,
  },
  startButton: {
    backgroundColor: "#2F3039",
    borderRadius: 39,
    width: "90%",
    maxWidth: 380,
    paddingVertical: 22,
    marginTop: 46,
    alignItems: "center",
  },
  startButtonText: {
    fontFamily: "Roboto",
    fontSize: 16,
    color: "#FFF",
    fontWeight: "700",
  },
  navigationBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 67,
    marginTop: 46,
    width: "100%",
    maxWidth: 380,
  },
  navButton: {
    width: 50,
    height: 50,
    borderRadius: 41,
    alignItems: "center",
    justifyContent: "center",
  },
  navIcon: {
    width: 50,
    height: 50,
  },
  addButton: {
    width: 51,
    height: 51,
    borderRadius: 41,
    backgroundColor: "#2F3039",
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "500",
  },
  gestureBar: {
    width: "100%",
    height: 24,
    backgroundColor: "#F3EDF7",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 9,
  },
  gestureBarHandle: {
    width: 108,
    height: 4,
    backgroundColor: "#1D1B20",
    borderRadius: 12,
  },
});
