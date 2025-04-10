import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Svg, Path } from "react-native-svg";

const { width } = Dimensions.get("window");

const TargetDateScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const currentDate = new Date();

  // Generate calendar days
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getMonthDays = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = new Date(year, month, 1).getDay();

    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleDateSelect = (date) => {
    if (date && date > currentDate) {
      setSelectedDate(date);
    }
  };

  const handleContinue = () => {
    navigation.navigate("GoalType", {
      lockType: "date",
      targetDate: selectedDate.toISOString(),
    });
  };

  const changeMonth = (increment) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + increment);
    setSelectedDate(newDate);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
            <Path
              d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
              fill="#1D1B20"
            />
          </Svg>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Choose Target Date</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.calendarHeader}>
          <TouchableOpacity onPress={() => changeMonth(-1)}>
            <Text style={styles.navigationButton}>←</Text>
          </TouchableOpacity>
          <Text style={styles.monthYear}>
            {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
          </Text>
          <TouchableOpacity onPress={() => changeMonth(1)}>
            <Text style={styles.navigationButton}>→</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.weekDays}>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <Text key={day} style={styles.weekDay}>
              {day}
            </Text>
          ))}
        </View>

        <View style={styles.calendar}>
          {getMonthDays().map((date, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dayButton,
                date &&
                  date.toDateString() === selectedDate.toDateString() &&
                  styles.selectedDay,
                date && date <= currentDate && styles.disabledDay,
              ]}
              onPress={() => date && handleDateSelect(date)}
              disabled={!date || date <= currentDate}
            >
              <Text
                style={[
                  styles.dayText,
                  date &&
                    date.toDateString() === selectedDate.toDateString() &&
                    styles.selectedDayText,
                  date && date <= currentDate && styles.disabledDayText,
                ]}
              >
                {date ? date.getDate() : ""}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.selectedDateContainer}>
          <Text style={styles.selectedDateLabel}>Selected Target Date:</Text>
          <Text style={styles.selectedDateValue}>
            {selectedDate.toLocaleDateString()}
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: "40%" }]} />
          </View>
          <Text style={styles.progressText}>Step 2 of 5</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEF7FF",
  },
  header: {
    width: "100%",
    height: 52,
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 16,
    color: "#1D1B20",
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  navigationButton: {
    fontSize: 24,
    color: "#2F3039",
    padding: 8,
  },
  monthYear: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1D1B20",
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  weekDays: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 8,
  },
  weekDay: {
    width: width / 7 - 8,
    textAlign: "center",
    fontSize: 14,
    color: "#1D1B20",
    opacity: 0.6,
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  calendar: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  dayButton: {
    width: width / 7 - 8,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 4,
  },
  selectedDay: {
    backgroundColor: "#2F3039",
    borderRadius: 20,
  },
  disabledDay: {
    opacity: 0.3,
  },
  dayText: {
    fontSize: 16,
    color: "#1D1B20",
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  selectedDayText: {
    color: "#FFF",
  },
  disabledDayText: {
    color: "#1D1B20",
  },
  selectedDateContainer: {
    marginTop: 32,
    padding: 16,
    backgroundColor: "rgba(255,255,255,0.5)",
    borderRadius: 14,
  },
  selectedDateLabel: {
    fontSize: 14,
    color: "#1D1B20",
    opacity: 0.6,
    marginBottom: 8,
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  selectedDateValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1D1B20",
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  footer: {
    padding: 16,
  },
  continueButton: {
    backgroundColor: "#2F3039",
    borderRadius: 39,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  continueButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#2F3039",
    borderRadius: 2,
  },
  progressText: {
    fontSize: 14,
    color: "#1D1B20",
    opacity: 0.6,
    textAlign: "center",
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
});

export default TargetDateScreen;
