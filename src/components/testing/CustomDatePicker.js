import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { format, getDaysInMonth } from "date-fns";
import PropTypes from "prop-types";

const months = [
  "January", "February", "March",
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

const years = Array.from({ length: 201 }, (_, i) => (1900 + i).toString());

const CustomDatePicker = ({
  initialDate = new Date(),
  onDateChange,
  containerStyle,
  textStyle,
  pickerStyle,
  pickerItemStyle,
  showFormData = false,
}) => {
  const [selectedDay, setSelectedDay] = useState(format(initialDate, "dd"));
  const [selectedMonth, setSelectedMonth] = useState(
    format(initialDate, "MMMM")
  );
  const [selectedYear, setSelectedYear] = useState(format(initialDate, "yyyy"));
  const [days, setDays] = useState([]);

  useEffect(() => {
    const year = parseInt(selectedYear);
    const monthIndex = months.indexOf(selectedMonth);
    const date = new Date(year, monthIndex, 1);
    const maxDays = getDaysInMonth(date);
    const newDays = Array.from({ length: maxDays }, (_, i) =>
      (i + 1).toString().padStart(2, "0")
    );
    setDays(newDays);

    if (parseInt(selectedDay) > maxDays) {
      setSelectedDay(newDays[maxDays - 1]);
    }
  }, [selectedMonth, selectedYear, selectedDay]);

  useEffect(() => {
    const selectedDate = new Date(
      parseInt(selectedYear),
      months.indexOf(selectedMonth),
      parseInt(selectedDay)
    );
    const formattedDate = format(selectedDate, "yyyy-MM-dd");

    if (showFormData) {
      const formData = new FormData();
      formData.append("date", formattedDate);
      console.log("FormData date:", formData.get("date"));
    }

    if (onDateChange) {
      onDateChange(selectedDate);
    }
  }, [selectedDay, selectedMonth, selectedYear, onDateChange, showFormData]);

  // Create a Date object for display
  const selectedDate = new Date(
    parseInt(selectedYear),
    months.indexOf(selectedMonth),
    parseInt(selectedDay)
  );

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Display selected date */}
      <Text style={[styles.dateText, textStyle]}>
        {format(selectedDate, "dd | MMMM | yyyy")}
      </Text>

      {/* Picker container */}
      <View style={styles.pickerContainer}>
        {/* Day Picker */}
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedDay}
            onValueChange={(itemValue) => setSelectedDay(itemValue)}
            style={[styles.picker, pickerStyle]}
            itemStyle={[styles.pickerItem, pickerItemStyle]}
          >
            {days.map((day) => (
              <Picker.Item key={day} label={day} value={day} />
            ))}
          </Picker>
        </View>

        {/* Month Picker */}
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedMonth}
            onValueChange={(itemValue) => setSelectedMonth(itemValue)}
            style={[styles.picker, pickerStyle]}
            itemStyle={[styles.pickerItem, pickerItemStyle]}
          >
            {months.map((month) => (
              <Picker.Item key={month} label={month} value={month} />
            ))}
          </Picker>
        </View>

        {/* Year Picker */}
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedYear}
            onValueChange={(itemValue) => setSelectedYear(itemValue)}
            style={[styles.picker, pickerStyle]}
            itemStyle={[styles.pickerItem, pickerItemStyle]}
          >
            {years.map((year) => (
              <Picker.Item key={year} label={year} value={year} />
            ))}
          </Picker>
        </View>
      </View>
    </View>
  );
};

// PropTypes for validation
DatePicker.propTypes = {
  initialDate: PropTypes.instanceOf(Date),
  onDateChange: PropTypes.func,
  containerStyle: PropTypes.object,
  textStyle: PropTypes.object,
  pickerStyle: PropTypes.object,
  pickerItemStyle: PropTypes.object,
  showFormData: PropTypes.bool,
};

const styles = StyleSheet.create({
  container: {
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

export default CustomDatePicker;
