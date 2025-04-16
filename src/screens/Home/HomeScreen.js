import {
  SafeAreaView,
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  PanResponder,
  Animated,
} from "react-native";
import React, { useState, useRef } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { LineChart } from "react-native-chart-kit";

const HomeScreen = () => {
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    month: "",
    amount: 0,
  });

  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43], // Savings amounts over months
      },
    ],
  };

  const chartConfig = {
    backgroundColor: "transparent",
    backgroundGradientFrom: "transparent",
    backgroundGradientTo: "transparent",
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, 0)`, // Hide labels
    propsForBackgroundLines: {
      stroke: "transparent",
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#ffa726",
      fill: "#fb8c00",
    },
  };

  const screenWidth = Dimensions.get("window").width;
  const chartWidth = screenWidth - 32 - 40;
  const chartHeight = 220;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        const { locationX, locationY } = evt.nativeEvent;
        // Approximate dot positions based on chart width and number of data points
        const dataPoints = chartData.datasets[0].data;
        const dotSpacing = chartWidth / (dataPoints.length - 1);
        const closestDotIndex = Math.round(locationX / dotSpacing);
        if (closestDotIndex >= 0 && closestDotIndex < dataPoints.length) {
          const dotX = closestDotIndex * dotSpacing;
          const dotY =
            chartHeight - (dataPoints[closestDotIndex] / 100) * chartHeight; // Approximate y-position
          setTooltip({
            visible: true,
            x: dotX,
            y: dotY - 40, // Position above the dot
            month: chartData.labels[closestDotIndex],
            amount: dataPoints[closestDotIndex],
          });
        }
      },
      onPanResponderRelease: () => {
        setTooltip({ ...tooltip, visible: false });
      },
    })
  ).current;

  return (
    <View style={styles.scrollView}>
      <View style={styles.row}>
        <View style={styles.image}>
          <MaterialIcons name="account-circle" size={45} color="black" />
        </View>
        <Image
          source={{
            uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/hMN4DI2FNU/7xmv6dxc_expires_30_days.png",
          }}
          resizeMode={"stretch"}
          style={styles.image2}
        />
      </View>
      <Text style={styles.text}>{"Total saving"}</Text>
      <Text style={styles.text2}>{"KWD 24.44"}</Text>
      <View style={styles.view}>
        <TouchableOpacity
          style={styles.buttonRow}
          onPress={() => alert("Pressed!")}
        >
          <Text style={styles.text3}>{"Date"}</Text>
          <AntDesign name="down" size={15} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.column}>
        <View {...panResponder.panHandlers}>
          <LineChart
            data={chartData}
            width={chartWidth}
            height={chartHeight}
            yAxisLabel=""
            yAxisSuffix=""
            yAxisInterval={1}
            chartConfig={chartConfig}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
            transparent={true}
            onDataPointClick={({ value, index, x, y }) => {
              setTooltip({
                visible: true,
                x: x,
                y: y - 40, // Position above the dot
                month: chartData.labels[index],
                amount: value,
              });
            }}
          />
          {tooltip.visible && (
            <View
              style={[
                styles.tooltip,
                {
                  left: tooltip.x - 50, // Center the tooltip
                  top: tooltip.y,
                },
              ]}
            >
              <Text style={styles.tooltipText}>
                {`${tooltip.month}: KWD ${tooltip.amount}`}
              </Text>
            </View>
          )}
        </View>
      </View>
      <Text style={styles.text6}>{"Savings Goals"}</Text>
      <View style={styles.column2}>
        <View style={styles.column3}>
          <View style={styles.row2}>
            <Image
              source={{
                uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/hMN4DI2FNU/8uqctwi4_expires_30_days.png",
              }}
              resizeMode={"stretch"}
              style={styles.image4}
            />
            <View style={styles.column4}>
              <View style={styles.row3}>
                <Text style={styles.text7}>{"Travel"}</Text>
                <Text style={styles.text8}>{"KWD 100"}</Text>
              </View>
              <View style={styles.box}></View>
            </View>
          </View>
          <View style={styles.box2}></View>
          <View style={styles.row2}>
            <Image
              source={{
                uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/hMN4DI2FNU/xvu7dn40_expires_30_days.png",
              }}
              resizeMode={"stretch"}
              style={styles.image5}
            />
            <View style={styles.column4}>
              <View style={styles.row3}>
                <Text style={styles.text7}>{"Kids"}</Text>
                <Text style={styles.text8}>{"KWD 24"}</Text>
              </View>
              <View style={styles.box3}></View>
            </View>
          </View>
          <View style={styles.box2}></View>
          <View style={styles.row4}>
            <Image
              source={{
                uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/hMN4DI2FNU/pxppn3ob_expires_30_days.png",
              }}
              resizeMode={"stretch"}
              style={styles.image5}
            />
            <View style={styles.column4}>
              <View style={styles.row5}>
                <Text style={styles.text7}>{"Rent"}</Text>
                <Text style={styles.text8}>{"KWD 24.44"}</Text>
              </View>
              <View style={styles.box4}></View>
            </View>
          </View>
          <Text style={styles.text10}>{"See All"}</Text>
        </View>
        <Image
          source={{
            uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/hMN4DI2FNU/em1sgz79_expires_30_days.png",
          }}
          resizeMode={"stretch"}
          style={styles.absoluteImage}
        />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  absoluteImage: {
    position: "absolute",
    bottom: -47,
    right: 0,
    width: 60,
    height: 60,
  },
  box: {
    height: 8,
    backgroundColor: "#36C3C6",
    borderRadius: 64,
  },
  box2: {
    width: 287,
    height: 1,
    backgroundColor: "#00000057",
    marginBottom: 13,
    marginLeft: 71,
  },
  box3: {
    height: 8,
    backgroundColor: "#B536C6",
    borderRadius: 64,
  },
  box4: {
    height: 8,
    backgroundColor: "#D8686A",
    borderRadius: 64,
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2E3039",
    borderRadius: 39,
    paddingVertical: 4,
    paddingHorizontal: 14,
  },
  column: {
    alignItems: "center",
    backgroundColor: "#00000033",
    paddingTop: 7,
    paddingBottom: 20,
    paddingHorizontal: 20,
    marginBottom: 14,
    marginHorizontal: 16,
  },
  column2: {
    marginBottom: 133,
    marginHorizontal: 16,
  },
  column3: {
    alignItems: "flex-start",
    backgroundColor: "#f2effd",
    borderRadius: 14,
    paddingVertical: 23,
  },
  column4: {
    flex: 1,
  },
  image: {
    width: 41,
    height: 41,
  },
  image2: {
    width: 34,
    height: 41,
  },
  image3: {
    width: 20,
    height: 20,
  },
  image4: {
    width: 41,
    height: 41,
    marginRight: 7,
  },
  image5: {
    width: 41,
    height: 41,
    marginRight: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    marginTop: 8,
    marginBottom: 9,
    marginHorizontal: 16,
  },
  row2: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 23,
    marginBottom: 14,
  },
  row3: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 9,
  },
  row4: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 9,
    paddingHorizontal: 23,
    marginBottom: 14,
  },
  row5: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  text: {
    color: "#000000",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 11,
    marginHorizontal: 16,
  },
  text2: {
    color: "#000000",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 11,
    marginHorizontal: 16,
  },
  text3: {
    color: "#FFFFFF",
    fontSize: 16,
    marginRight: 13,
  },
  text4: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  text5: {
    color: "#000000",
    fontSize: 16,
    textAlign: "center",
    width: 135,
  },
  text6: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 13,
    marginLeft: 16,
  },
  text7: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "left",
    marginRight: 4,
    flex: 1,
  },
  text8: {
    color: "#000000",
    fontSize: 16,
    textAlign: "right",
    flex: 1,
  },
  text9: {
    color: "#1E1E1E",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginRight: 4,
    flex: 1,
  },
  text10: {
    color: "#000000",
    fontSize: 16,
    textAlign: "center",
    alignSelf: "center",
  },
  view: {
    alignItems: "center",
  },
  view2: {
    backgroundColor: "#2E303966",
    borderRadius: 39,
    paddingTop: 7,
    paddingBottom: 8,
    paddingHorizontal: 29,
    marginBottom: 18,
  },
  tooltip: {
    position: "absolute",
    backgroundColor: "#2E3039",
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  tooltipText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
});
