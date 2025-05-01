import React, { useState, useEffect } from "react";
import {
  Modal,
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import {
  updateSavingsGoal,
  getSavingsGoal,
  deleteSavingsGoal,
} from "../../api/savingsGoal";
import Ionicons from "@expo/vector-icons/Ionicons";
import DatePicker from "../../components/DatePicker";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import CustomEmojiPicker from "../../components/CustomEmojiPicker";
import CustomColorPicker from "../../components/CustomColorPicker";

const EditSavingsGoal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [emojiColorModalVisible, setEmojiColorModalVisible] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const { goalId } = route.params;
  const queryClient = useQueryClient();
  console.log(
    `\n=======================\nGoal Id: ${goalId}\n=======================\n`
  );

  // State for dropdown visibility and frequency options
  const [frequencyMenuVisible, setFrequencyMenuVisible] = useState(false);
  const frequencyOptions = ["Disabled", "Monthly", "Weekly", "Custom"];

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    targetAmount: "",
    depositFrequency: null,
    depositAmount: "",
    customDepositIntervalDays: "",
    description: "",
    emoji: "",
    color: "#093565",
    TargetDate: null,
  });

  // Fetch savings goals
  const {
    data: goalData,
    isLoading: goalsLoading,
    isError: goalsError,
    error: goalsErrorDetails,
  } = useQuery({
    queryKey: ["savingsGoal", goalId],
    queryFn: () => getSavingsGoal(goalId),
    refetchOnMount: "always",
  });

  const goal = goalData;

  // Pre-populate form state with fetched goal data
  useEffect(() => {
    if (goal) {
      setFormData({
        name: goal.savingsGoalName || "",
        targetAmount: goal.targetAmount ? goal.targetAmount.toString() : "",
        depositFrequency: goal.depositFrequency || null,
        depositAmount: goal.depositAmount ? goal.depositAmount.toString() : "",
        customDepositIntervalDays: goal.customDepositIntervalDays
          ? goal.customDepositIntervalDays.toString()
          : "",
        description: goal.description || "",
        emoji: goal.emoji || "",
        color: goal.color || "#093565",
        TargetDate: goal.targetDate || null,
      });
    }
  }, [goal]);

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: (updatedGoal) => updateSavingsGoal(goalId, updatedGoal),
    onSuccess: () => {
      queryClient.invalidateQueries(["savingsGoal", goalId]);
      Alert.alert("Success", "Goal updated successfully");
      navigation.goBack();
    },
    onError: (error) => {
      console.log("Update Goal Error:", error);
      console.log("Error Response:", error.response?.data);
      console.log("Error Status:", error.response?.status);
      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to update goal"
      );
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: () => deleteSavingsGoal(goalId),
    onSuccess: () => {
      queryClient.invalidateQueries(["savingsGoals"]);
      Alert.alert("Success", "Goal deleted successfully");
      navigation.goBack();
    },
    onError: (error) => {
      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to delete goal"
      );
    },
  });

  // Handle date selection from DatePicker
  const handleDateSelected = (formattedDate) => {
    setFormData({ ...formData, TargetDate: formattedDate });
  };

  // Handle emoji selection
  const handleEmojiSelected = (emoji) => {
    setFormData({ ...formData, emoji });
  };

  // Handle color selection
  const handleColorSelected = (color) => {
    setFormData({ ...formData, color });
  };

  // Handle form submission
  const handleSave = () => {
    // Check required fields
    if (!formData.name && !goal?.savingsGoalName) {
      Alert.alert("Error", "Goal name is required");
      return;
    }

    if (
      goal?.lockType === "amountBased" &&
      !formData.targetAmount &&
      !goal?.targetAmount
    ) {
      Alert.alert("Error", "Target amount is required for amount-based goals");
      return;
    }

    if (
      goal?.lockType === "timeBased" &&
      !formData.TargetDate &&
      !goal?.targetDate
    ) {
      Alert.alert("Error", "Target date is required for time-based goals");
      return;
    }

    const effectiveDepositFrequency =
      formData.depositFrequency !== null
        ? formData.depositFrequency
        : goal?.depositFrequency || "Disabled";

    // Skip deposit-related validations if frequency is Disabled
    if (effectiveDepositFrequency !== "Disabled") {
      if (!formData.depositAmount && !goal?.depositAmount) {
        Alert.alert(
          "Error",
          "Deposit amount is required when a frequency is selected"
        );
        return;
      }

      if (
        effectiveDepositFrequency === "Custom" &&
        !formData.customDepositIntervalDays &&
        !goal?.customDepositIntervalDays
      ) {
        Alert.alert(
          "Error",
          "Custom deposit interval days are required for custom frequency"
        );
        return;
      }
    }

    // Numeric validation
    if (formData.targetAmount && isNaN(parseFloat(formData.targetAmount))) {
      Alert.alert("Error", "Target amount must be a valid number");
      return;
    }
    if (formData.depositAmount && isNaN(parseFloat(formData.depositAmount))) {
      Alert.alert("Error", "Deposit amount must be a valid number");
      return;
    }
    if (
      formData.customDepositIntervalDays &&
      isNaN(parseInt(formData.customDepositIntervalDays))
    ) {
      Alert.alert("Error", "Custom interval days must be a valid number");
      return;
    }

    // Payload
    const updatedGoal = {};
    if (formData.name) updatedGoal.savingsGoalName = formData.name;
    if (formData.description) updatedGoal.description = formData.description;
    if (formData.emoji) updatedGoal.emoji = formData.emoji;
    if (formData.color) updatedGoal.color = formData.color;

    // TargetAmount/TargetDate based on LockType
    if (goal.lockType === "timeBased") {
      updatedGoal.targetAmount = null;
      if (formData.TargetDate) updatedGoal.targetDate = formData.TargetDate;
    } else {
      updatedGoal.targetDate = null;
      if (formData.targetAmount)
        updatedGoal.targetAmount = parseFloat(formData.targetAmount);
    }

    // Handle deposit-related fields
    if (formData.depositFrequency !== null) {
      updatedGoal.depositFrequency =
        formData.depositFrequency === "Disabled"
          ? null
          : formData.depositFrequency;
    }
    if (formData.depositAmount)
      updatedGoal.depositAmount = parseFloat(formData.depositAmount);
    if (formData.customDepositIntervalDays)
      updatedGoal.customDepositIntervalDays = parseInt(
        formData.customDepositIntervalDays
      );

    if (Object.keys(updatedGoal).length === 0) {
      Alert.alert("Warning", "No changes made to the goal");
      return;
    }

    updateMutation.mutate(updatedGoal);
  };

  // Button handlers
  const handleDate = () => {
    setModalVisible(true);
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Goal",
      "Are you sure you want to delete this goal?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: () => deleteMutation.mutate(),
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  if (goalsLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00F8BE" />
      </View>
    );
  }

  const effectiveDepositFrequencyForDays =
    formData.depositFrequency !== null
      ? formData.depositFrequency
      : goal?.depositFrequency || "Disabled";
  const isDaysEditable = effectiveDepositFrequencyForDays === "Custom";

  const isDepositAmountEditable =
    effectiveDepositFrequencyForDays !== "Disabled";

  return (
    <SafeAreaView style={styles.container}>
      {modalVisible && (
        <View
          style={{
            flex: 1,
            position: "absolute",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            height: "100%",
            width: "100%",
            zIndex: 10,
            borderRadius: 16,
          }}
        >
          <Text style={{ opacity: 0, fontSize: 1 }}>.</Text>
        </View>
      )}

      {/* Emoji & Color Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={emojiColorModalVisible}
        onRequestClose={() => setEmojiColorModalVisible(false)}
      >
        <View style={styles.emojiColorModalContainer}>
          <View style={styles.emojiColorModalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setEmojiColorModalVisible(false);
                setShowEmojiPicker(false);
                setShowColorPicker(false);
              }}
            >
              <Ionicons name="close" size={28} color="#000" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Emoji | Color</Text>
            {/* Display Current Emoji and Color */}
            <View style={styles.currentEmojiColor}>
              <View
                style={[
                  styles.emojiCircle,
                  {
                    backgroundColor: formData.color || goal?.color || "#00F8BE",
                  },
                ]}
              >
                <Text style={styles.emoji}>
                  {formData.emoji || goal?.emoji || (
                    <MaterialCommunityIcons
                      name="bullseye-arrow"
                      size={100}
                      color="#093565"
                    />
                  )}
                </Text>
              </View>
            </View>

            {/* Buttons to Change Emoji and Color */}
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setShowEmojiPicker(true);
                setShowColorPicker(false);
              }}
            >
              <Text style={styles.modalButtonText}>Change Emoji</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setShowColorPicker(true);
                setShowEmojiPicker(false);
              }}
            >
              <Text style={styles.modalButtonText}>Change Color</Text>
            </TouchableOpacity>

            {/* Emoji Picker */}
            {showEmojiPicker && (
              <CustomEmojiPicker
                visible={showEmojiPicker}
                onClose={() => setShowEmojiPicker(false)}
                onSelectEmoji={handleEmojiSelected}
              />
            )}

            {/* Color Picker */}
            {showColorPicker && (
              <CustomColorPicker
                visible={showColorPicker}
                onClose={() => setShowColorPicker(false)}
                initialColor={formData.color || goal?.color || "#00F8BE"}
                onColorSelected={handleColorSelected}
              />
            )}
          </View>
        </View>
      </Modal>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#1D1B20" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Edit your goal details below.</Text>
        <View>
          <Ionicons name="create-outline" size={23} color="#1D1B20" />
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.emojiContainer}>
          <View
            style={[
              styles.emojiCircle,
              { backgroundColor: formData.color || goal?.color || "#00F8BE" },
            ]}
          >
            <Text style={styles.emoji}>
              {formData.emoji || goal?.emoji || (
                <MaterialCommunityIcons
                  name="bullseye-arrow"
                  size={100}
                  color="#093565"
                />
              )}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.editEmojiButton}
            onPress={() => setEmojiColorModalVisible(true)}
          >
            <View style={styles.editEmojiCircle}>
              <Ionicons name="create" size={16} color="#FFF" />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <View style={styles.row}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                value={formData.name}
                onChangeText={(text) =>
                  setFormData({ ...formData, name: text })
                }
                placeholder={goal?.savingsGoalName || "Goal name"}
                placeholderTextColor="rgba(30,30,30,0.27)"
              />
            </View>

            {goal.lockType === "amountBased" ? (
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Target Amount</Text>
                <TextInput
                  style={styles.input}
                  value={formData.targetAmount}
                  onChangeText={(text) =>
                    setFormData({ ...formData, targetAmount: text })
                  }
                  placeholder={
                    `KWD ${goal?.targetAmount}`
                      ? `KWD ${goal.targetAmount.toString()}`
                      : "KWD amount"
                  }
                  keyboardType="numeric"
                  placeholderTextColor="rgba(30,30,30,0.27)"
                />
              </View>
            ) : (
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Target Date</Text>
                <TouchableOpacity style={styles.input3} onPress={handleDate}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: "rgba(30,30,30,0.27)",
                    }}
                  >
                    {formData.TargetDate
                      ? new Date(formData.TargetDate).toLocaleDateString(
                          "en-GB"
                        )
                      : goal?.targetDate
                      ? new Date(goal.targetDate).toLocaleDateString("en-GB")
                      : "Select Date"}
                  </Text>
                  <AntDesign name="calendar" size={24} color="black" />
                </TouchableOpacity>
                <DatePicker
                  visible={modalVisible}
                  onClose={() => setModalVisible(false)}
                  initialDate={
                    formData.TargetDate
                      ? new Date(formData.TargetDate)
                      : goal?.targetDate
                      ? new Date(goal.targetDate)
                      : new Date()
                  }
                  onDateSelected={handleDateSelected}
                  style={{ zIndex: 1000 }}
                />
              </View>
            )}
          </View>

          <View style={styles.row}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Deposit Frequency</Text>
              <TouchableOpacity
                style={styles.dropdown}
                onPress={() => setFrequencyMenuVisible(!frequencyMenuVisible)}
              >
                <Text style={styles.dropdownText}>
                  {formData.depositFrequency !== null
                    ? formData.depositFrequency === "Disabled"
                      ? "Disabled"
                      : formData.depositFrequency
                    : goal?.depositFrequency || "Disabled"}
                </Text>
                <Ionicons name="chevron-down" size={20} color="#000" />
              </TouchableOpacity>
              {frequencyMenuVisible && (
                <View style={styles.dropdownMenu}>
                  {frequencyOptions.map((option, index) => (
                    <TouchableOpacity
                      key={option}
                      style={[
                        styles.dropdownItem,
                        index === frequencyOptions.length - 1 &&
                          styles.lastDropdownItem,
                      ]}
                      onPress={() => {
                        setFormData({
                          ...formData,
                          depositFrequency: option,
                        });
                        setFrequencyMenuVisible(false);
                      }}
                    >
                      <Text style={styles.dropdownItemText}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Days</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={[
                    styles.input,
                    !isDaysEditable && styles.disabledInput,
                  ]}
                  value={formData.customDepositIntervalDays}
                  onChangeText={(text) =>
                    setFormData({
                      ...formData,
                      customDepositIntervalDays: text,
                    })
                  }
                  placeholder={
                    goal?.customDepositIntervalDays
                      ? goal.customDepositIntervalDays.toString()
                      : "e.g., every 3 days"
                  }
                  keyboardType="numeric"
                  editable={isDaysEditable}
                  placeholderTextColor="rgba(30,30,30,0.27)"
                />
                {!isDaysEditable && (
                  <Ionicons
                    name="lock-closed"
                    size={20}
                    color="#888"
                    style={styles.lockIcon}
                  />
                )}
              </View>
            </View>
          </View>

          <View style={styles.fullWidth}>
            <Text style={styles.label}>Deposit Amount</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[
                  styles.input,
                  !isDepositAmountEditable && styles.disabledInput,
                ]}
                value={formData.depositAmount}
                onChangeText={(text) =>
                  setFormData({ ...formData, depositAmount: text })
                }
                placeholder={
                  goal?.depositAmount
                    ? goal.depositAmount.toString()
                    : "KWD amount"
                }
                keyboardType="numeric"
                editable={isDepositAmountEditable}
                placeholderTextColor="rgba(30,30,30,0.27)"
              />
              {!isDepositAmountEditable && (
                <Ionicons
                  name="lock-closed"
                  size={20}
                  color="#888"
                  style={styles.lockIcon}
                />
              )}
            </View>
          </View>

          <View style={styles.fullWidth}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={styles.input2}
              value={formData.description}
              onChangeText={(text) =>
                setFormData({ ...formData, description: text })
              }
              placeholder={goal?.description || "Add description"}
              multiline
              textAlignVertical="top"
              placeholderTextColor="rgba(30,30,30,0.27)"
            />
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.deleteButtonText}>Delete</Text>
            <Ionicons name="trash-outline" size={20} color="#E80004" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default EditSavingsGoal;

const styles = StyleSheet.create({
  emojiColorModalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Overlay for modal
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  emojiColorModalContent: {
    backgroundColor: "#FEF7FF",
    padding: 20,
    borderRadius: 20,
    height: 550,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 30,
    width: "100%",
    gap: 30,
  },
  closeButton: {
    fontSize: 64,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    position: "absolute",
    top: 20,
    right: 20,
    marginLeft: "auto",
    marginRight: "auto",
  },
  modalTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000",
    position: "absolute",
    top: 20,
  },
  modalButton: {
    backgroundColor: "rgba(30, 30, 30, 0.51)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    width: "50%",
    alignItems: "center",
  },
  modalButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: "#FEF7FF",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  headerText: {
    fontSize: 16,
    marginLeft: 12,
    color: "#000",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    alignItems: "center",
    gap: 37,
  },
  emojiContainer: {
    position: "relative",
    width: 132,
    height: 132,
  },
  emojiCircle: {
    width: 132,
    height: 132,
    borderRadius: 66,
    backgroundColor: "#00F8BE",
    justifyContent: "center",
    alignItems: "center",
  },
  emoji: {
    fontSize: 64,
    backgroundColor: "#FEF7FF",
    width: 110,
    height: 110,
    borderRadius: 55,
    textAlign: "center",
    textAlignVertical: "center",
  },
  editEmojiButton: {
    position: "absolute",
    bottom: 8,
    right: 8,
    width: 40,
    height: 40,
  },
  editEmojiCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#2F3039",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    width: "100%",
    gap: 24,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  inputGroup: {
    width: "48%",
  },
  fullWidth: {
    width: "100%",
  },
  label: {
    fontSize: 16,
    color: "#000",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "rgba(30, 30, 30, 0.09)",
    borderRadius: 14,
    paddingHorizontal: 14,
    fontSize: 16,
    color: "#1E1E1E",
  },
  input3: {
    width: "100%",
    height: 50,
    backgroundColor: "rgba(30, 30, 30, 0.09)",
    borderRadius: 14,
    paddingHorizontal: 14,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  input2: {
    width: "100%",
    height: 90,
    backgroundColor: "rgba(30, 30, 30, 0.09)",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    color: "#1E1E1E",
  },
  dropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(30, 30, 30, 0.09)",
    borderRadius: 14,
    padding: 14,
  },
  dropdownText: {
    fontSize: 16,
    color: "#1E1E1E",
  },
  dropdownMenu: {
    position: "absolute",
    top: 60,
    left: 0,
    right: 0,
    backgroundColor: "#EBE5EC",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    zIndex: 1000,
    borderTopWidth: 2,
    borderTopColor: "white",
    borderBottomWidth: 2,
    borderBottomColor: "white",
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "white",
    alignSelf: "center",
  },
  lastDropdownItem: {
    borderBottomWidth: 0,
  },
  dropdownItemText: {
    fontSize: 16,
    color: "#000",
  },
  inputWrapper: {
    position: "relative",
  },
  lockIcon: {
    position: "absolute",
    right: 10,
    top: 15,
  },
  disabledInput: {
    opacity: 0.5,
  },
  actions: {
    width: "100%",
    gap: 11,
    marginTop: "auto",
    paddingBottom: 20,
  },
  saveButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#2F3039",
    borderRadius: 39,
    justifyContent: "center",
    alignItems: "center",
  },
  saveButtonText: { fontSize: 16, color: "#FFF", fontWeight: "700" },
  cancelButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#FEF7FF",
    borderRadius: 39,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelButtonText: { fontSize: 16, color: "#1E1E1E" },
  deleteButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#FEF7FF",
    borderRadius: 39,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButtonText: { fontSize: 16, color: "#E80004", marginRight: 4 },
});
