import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import {
  Svg,
  Path,
  G,
  Defs,
  ClipPath,
  Rect,
  LinearGradient,
  Stop,
  RadialGradient,
  TSpan,
} from "react-native-svg";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const StatusBarIcon = () => (
  <Svg width={412} height={52} viewBox="0 0 412 52" fill="none">
    <Text fill="#1D1B20" fontSize={14} fontWeight="500" letterSpacing="0.01em">
      <TSpan x={24} y={36.785}>
        9:30
      </TSpan>
    </Text>
    <Path
      opacity={0.1}
      d="M350.5 26.417c-3.4 0-6.375 1.487-8.5 3.825l8.5 10.341 8.5-10.341c-2.125-2.338-5.1-3.825-8.5-3.825Z"
      fill="#1D1B20"
    />
    <Path d="m373.583 26.417-14.166 14.166h14.166V26.417Z" fill="#1D1B20" />
    <Path
      opacity={0.3}
      d="M385.5 26h-3v1.5H381c-.552 0-1 .504-1 1.125v11.25c0 .621.448 1.125 1 1.125h6c.552 0 1-.504 1-1.125v-11.25c0-.621-.448-1.125-1-1.125h-1.5V26Z"
      fill="#1D1B20"
    />
    <Path
      d="M380 34v5.95c0 .58.448 1.05 1 1.05h6c.552 0 1-.47 1-1.05V34h-8Z"
      fill="#1D1B20"
    />
  </Svg>
);

const ChartComponent = () => (
  <Svg width={380} height={154} viewBox="0 0 380 154" fill="none">
    <G clipPath="url(#a)">
      <G opacity={0.7}>
        <Path
          d="M258.778 0v154"
          stroke="url(#b)"
          strokeWidth={2}
          strokeDasharray="2 2"
        />
      </G>
      <Path
        d="M1.944 40.657.22 47.839A8.003 8.003 0 0 0 0 49.705V146c0 4.418 3.582 8 8 8h364c4.418 0 8-3.582 8-8v-39.948a8.001 8.001 0 0 0-2.644-5.46c-2.644-2.09-7.931-6.27-13.219-5.914-5.287.356-10.575 5.247-15.862.895-5.288-4.352-10.575-17.948-15.863-9.02-5.288 8.93-10.576 40.384-15.863 38.813-5.287-1.571-10.575-36.167-15.862-52.25-5.288-16.082-10.575-13.65-15.863-14.218-5.287-.568-10.575-4.135-15.862-9.006-5.288-4.87-10.575-11.044-15.863-16.61-5.287-5.565-10.575-10.522-15.862 4.64-5.288 15.161-10.575 50.441-15.863 50.891-5.287.45-10.575-33.93-15.862-37.738-5.288-3.807-10.575 23-15.863 38.482-5.287 15.522-10.575 19.8-15.862 24.67-5.288 4.87-10.575 10.334-15.863-5.154-5.287-15.488-10.575-51.928-15.862-54.118-5.288-2.19-10.575 29.87-15.863 43.196-5.287 13.326-10.575 7.917-15.862-.667-5.288-8.66-10.575-20.571-15.863-30.057-5.287-9.485-10.575-16.546-15.862-10.29-5.288 6.255-10.575 25.826-15.863 29.618-5.287 3.792-10.575-8.195-15.862-23.304C41.6 48.266 36.313 30.034 31.025 19.172 25.738 8.31 20.45 4.817 15.163 10.937 9.875 17.057 4.588 32.79 1.944 40.657Z"
        fill="url(#c)"
      />
      <Path
        d="M265 41.5c0 4.245-3.235 7.5-7 7.5s-7-3.255-7-7.5 3.235-7.5 7-7.5 7 3.255 7 7.5Z"
        fill="#A3A9EE"
        stroke="#A3CFEE"
        strokeWidth={4}
      />
    </G>
    <Defs>
      <RadialGradient
        id="b"
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="matrix(0 87.07 -3012.94 0 257.778 62.711)"
      >
        <Stop stopColor="#1573FE" />
        <Stop offset={1} stopColor="#1573FE" stopOpacity={0} />
      </RadialGradient>
      <LinearGradient
        id="c"
        x1={190}
        y1={7.938}
        x2={190}
        y2={154}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#15FED3" stopOpacity={0.6} />
        <Stop offset={1} stopColor="#1573FE" stopOpacity={0} />
      </LinearGradient>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h380v154H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

const TransactionItem = ({ title, amount, color, showConfetti }) => (
  <View style={styles.transactionItem}>
    <View style={styles.transactionIcon}>
      <Svg width={48} height={48} viewBox="0 0 48 48" fill="none">
        <Path
          d="M10 42h28a4 4 0 0 0 4-4V10a4 4 0 0 0-4-4H10a4 4 0 0 0-4 4v28a4 4 0 0 0 4 4Zm0 0 22-22 10 10M20 17a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          stroke="#1E1E1E"
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
    <View style={styles.transactionDetails}>
      <Text style={styles.transactionTitle}>{title}</Text>
      <Text style={styles.transactionAmount}>{amount}</Text>
      <View style={[styles.progressBar, { backgroundColor: color }]} />
    </View>
    {showConfetti && (
      <View style={styles.confettiContainer}>
        <Svg width={44} height={35} viewBox="0 0 44 35" fill="none">
          <Path
            d="M20.733 20.673c1.531-.632 1.797-1.707 1.99-2.492.187-.753.32-1.295 1.429-1.901 2.676-1.46 3.604-4.891 3.642-5.037l-1.713-.355c-.008.028-.781 2.795-2.706 3.847-1.852 1.01-2.153 2.228-2.372 3.117-.166.674-.228.924-.863 1.186-2.21.91-2.53 2.178-2.763 3.103-.203.806-.338 1.34-1.81 1.952l.597 1.632c2.361-.981 2.691-2.291 2.931-3.247.2-.787.32-1.262 1.638-1.805zm-2.8-6.022c.885-.242 2.096-.574 3.06-2.45 1.006-1.958 3.733-2.788 3.78-2.802l.002-.001-.17-.713-.233-.988c-.145.042-3.556 1.06-4.947 3.769-.576 1.123-1.117 1.272-1.864 1.476-.781.215-1.852.508-2.443 2.055-.509 1.329-.981 1.461-1.764 1.68-.951.266-2.253.63-3.174 3.013l1.65.552c.573-1.487 1.104-1.635 1.906-1.858.92-.258 2.18-.61 3.033-2.84.245-.64.494-.71 1.164-.892z"
            fill="#A7FF7B"
          />
          <Path
            d="m18.358 9.594.001 1.875-1.876-.001.001-1.876 1.874.002zm.549 18.077v-1.875l1.875-.001v1.876l-1.875-.001zm-6.546-13.801v-1.875l1.876.001-.001 1.875-1.875-.001zm11.86-.787-1.875.001v-1.875h1.875v1.874zm-16.425 3.477v-1.875h1.875v1.875h-1.875zm15.644 4.983-.001 1.875-1.875-.001.001-1.875 1.875.001zm-9.963.409v-1.875h1.875v1.875h-1.875zm12.323-4.642v1.875l-1.875-.001v-1.875l1.875.001zm-7.961.749v-1.875h1.875v1.874h-1.875z"
            fill="#A7FF7B"
          />
        </Svg>
      </View>
    )}
  </View>
);

const Dashboard = () => {
  return (
    // <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
       

        <View style={styles.totalSavings}>
          <Text style={styles.savingsLabel}>Total saving</Text>
          <Text style={styles.savingsAmount}>KWD 24.44</Text>
        </View>

        <View style={styles.dateSelector}>
          <TouchableOpacity style={styles.datePicker}>
            <Text style={styles.dateText}>Date</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.chartContainer}>
          <ChartComponent />
        </View>

        <View style={styles.transactionsList}>
          <TransactionItem
            title="Travel"
            amount="KWD 100"
            color="#37C4C6"
            showConfetti={true}
          />
          <TransactionItem
            title="Kids"
            amount="KWD 24"
            color="#B537C6"
            showConfetti={false}
          />
          <TransactionItem
            title="Rent"
            amount="KWD 24.44"
            color="#D8696B"
            showConfetti={false}
          />
            <TransactionItem
            title="Rent"
            amount="KWD 24.44"
            color="#D8696B"
            showConfetti={false}
          />
            <TransactionItem
            title="Rent"
            amount="KWD 24.44"
            color="#D8696B"
            showConfetti={false}
          />
        </View>
      </ScrollView>

      
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEF7FF",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    height: 52,
    paddingHorizontal: 24,
    paddingVertical: 10,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  totalSavings: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  savingsLabel: {
    fontFamily: Platform.OS === "ios" ? "Inter" : "Roboto",
    fontSize: 16,
    color: "#000",
    marginBottom: 8,
  },
  savingsAmount: {
    fontFamily: Platform.OS === "ios" ? "Albert Sans" : "Roboto",
    fontSize: 25,
    fontWeight: "900",
    color: "#000",
  },
  dateSelector: {
    alignItems: "center",
    marginVertical: 20,
    paddingHorizontal: 16,
  },
  datePicker: {
    backgroundColor: "#2F3039",
    paddingVertical: 4,
    paddingHorizontal: 14,
    borderRadius: 39,
    minWidth: 100,
    alignItems: "center",
  },
  dateText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: Platform.OS === "ios" ? "Inter" : "Roboto",
  },
  chartContainer: {
    marginHorizontal: 16,
    height: 180,
    alignItems: "center",
    marginVertical: 20,
  },
  transactionsList: {
    paddingHorizontal: 16,
    marginTop: 10,
    flex: 1,
  },
  transactionItem: {
    borderRadius: 14,
    padding: 12,
    marginBottom: 16,
    flexDirection: "row",
    position: "relative",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  transactionIcon: {
    width: 48,
    height: 48,
    marginRight: 18,
  },
  transactionDetails: {
    flex: 1,
    paddingRight: 60,
  },
  transactionTitle: {
    fontFamily: Platform.OS === "ios" ? "Inter" : "Roboto",
    fontWeight: "700",
    fontSize: 16,
    color: "#1E1E1E",
    marginTop: 8,
  },
  transactionAmount: {
    fontFamily: Platform.OS === "ios" ? "Albert Sans" : "Roboto",
    fontSize: 16,
    color: "#000",
    position: "absolute",
    right: 16,
    top: 11,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginTop: 20,
    width: "100%",
  },
  confettiContainer: {
    position: "absolute",
    right: 0,
    top: -8,
    flexDirection: "row",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 67,
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: "#FEF7FF",
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.1)",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  footerButton: {
    width: 50,
    height: 50,
    borderRadius: 37,
    alignItems: "center",
    justifyContent: "center",
  },
  footerButtonText: {
    fontSize: 24,
    color: "#000",
  },
});

export default Dashboard;
