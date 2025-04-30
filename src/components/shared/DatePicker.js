import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
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

const DatePicker = ({ visible, onClose, initialDate, onDateSelected }) => {
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
  const [selectedYear, setSelectedYear] = useState(
    initialDate ? initialDate.getFullYear().toString() : currentYear.toString()
  );
  const [selectedMonth, setSelectedMonth] = useState(
    initialDate ? months[initialDate.getMonth()] : currentMonthName
  );
  const [selectedDay, setSelectedDay] = useState(
    initialDate
      ? initialDate.getDate().toString().padStart(2, "0")
      : currentDay.toString().padStart(2, "0")
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

  const handleSubmit = () => {
    const selectedDate = new Date(
      parseInt(selectedYear),
      months.indexOf(selectedMonth),
      parseInt(selectedDay)
    );
    const formattedDate = format(selectedDate, "yyyy-MM-dd");
    onDateSelected(formattedDate); // Pass the selected date back
    onClose(); // Close the modal
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={28} color="#000" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Select date</Text>
          {/* ============================ Start From Here ============================ */}
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
                  <Picker.Item key={day} label={day} value={day} style={styles.pickerList}/>
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
          {/* ============================ Ends Here ============================ */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Select</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FEF7FF",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },
  submitButton: {
    backgroundColor: "rgb(9, 53, 101)",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  pickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: 480,
    marginVertical: 40,
  },
  pickerWrapper: {
    flex: 1,
    marginHorizontal: 4,
    backgroundColor: "rgba(30, 30, 30, 0.09)",
    borderRadius: 8,
  },
  picker: {
    height: 50,
  },
  pickerItem: {
    fontSize: 18,
    color: "#1F2937",
  },
});

export default DatePicker;
