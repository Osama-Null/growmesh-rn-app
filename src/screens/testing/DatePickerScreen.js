import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { format, getDaysInMonth } from "date-fns";

// Static months array
const months = [
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

const DatePickerScreen = () => {
  // Get today's date dynamically
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonthIndex = today.getMonth();
  const currentMonthName = months[currentMonthIndex];
  const currentDay = today.getDate();

  // Dynamically generate years from current year to current year + 50
  const availableYears = Array.from({ length: 51 }, (_, i) =>
    (currentYear + i).toString()
  );

  // Initialize state with today's date
  const [selectedYear, setSelectedYear] = useState(currentYear.toString());
  const [selectedMonth, setSelectedMonth] = useState(currentMonthName);
  const [selectedDay, setSelectedDay] = useState(
    currentDay.toString().padStart(2, "0")
  );

  // Compute available months based on selected year
  const availableMonths =
    selectedYear === currentYear.toString()
      ? months.slice(currentMonthIndex)
      : months;

  // Compute available days based on selected year and month
  const monthIndex = months.indexOf(selectedMonth);
  const isCurrentYearAndMonth =
    selectedYear === currentYear.toString() &&
    selectedMonth === currentMonthName;
  const maxDays = getDaysInMonth(new Date(parseInt(selectedYear), monthIndex));
  const availableDays = isCurrentYearAndMonth
    ? Array.from({ length: maxDays - currentDay + 1 }, (_, i) =>
        (currentDay + i).toString().padStart(2, "0")
      )
    : Array.from({ length: maxDays }, (_, i) =>
        (i + 1).toString().padStart(2, "0")
      );

  // Adjust selectedMonth when selectedYear changes
  useEffect(() => {
    if (!availableMonths.includes(selectedMonth)) {
      setSelectedMonth(availableMonths[0]);
    }
  }, [selectedYear, availableMonths]);

  // Adjust selectedDay when selectedYear or selectedMonth changes
  useEffect(() => {
    if (!availableDays.includes(selectedDay)) {
      setSelectedDay(availableDays[0]);
    }
  }, [selectedYear, selectedMonth, availableDays]);

  // Log selected date to FormData
  useEffect(() => {
    const selectedDate = new Date(
      parseInt(selectedYear),
      months.indexOf(selectedMonth),
      parseInt(selectedDay)
    );
    const formattedDate = format(selectedDate, "yyyy-MM-dd");
    const formData = new FormData();
    formData.append("date", formattedDate);
    console.log("FormData date:", formData.get("date"));
  }, [selectedDay, selectedMonth, selectedYear]);

  // Create Date object for display
  const selectedDate = new Date(
    parseInt(selectedYear),
    months.indexOf(selectedMonth),
    parseInt(selectedDay)
  );

  return (
    <View style={styles.container}>
      {/* Display selected date */}
      <Text style={styles.dateText}>
        {format(selectedDate, "dd | MMMM | yyyy")}
      </Text>

      {/* Picker container */}
      <View style={styles.pickerContainer}>
        {/* Day Picker */}
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedDay}
            onValueChange={(itemValue) => setSelectedDay(itemValue)}
            style={styles.picker}
            itemStyle={styles.pickerItem}
          >
            {availableDays.map((day) => (
              <Picker.Item key={day} label={day} value={day} />
            ))}
          </Picker>
        </View>

        {/* Month Picker */}
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedMonth}
            onValueChange={(itemValue) => setSelectedMonth(itemValue)}
            style={styles.picker}
            itemStyle={styles.pickerItem}
          >
            {availableMonths.map((month) => (
              <Picker.Item key={month} label={month} value={month} />
            ))}
          </Picker>
        </View>

        {/* Year Picker */}
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedYear}
            onValueChange={(itemValue) => setSelectedYear(itemValue)}
            style={styles.picker}
            itemStyle={styles.pickerItem}
          >
            {availableYears.map((year) => (
              <Picker.Item key={year} label={year} value={year} />
            ))}
          </Picker>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  dateText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 24,
  },
  pickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: 480,
  },
  pickerWrapper: {
    flex: 1,
    marginHorizontal: 4,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  picker: {
    height: 192,
  },
  pickerItem: {
    fontSize: 18,
    color: "#1F2937",
  },
});

export default DatePickerScreen;
