import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import { Svg, Path } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import IntroStep from "../../../components/goal/IntroStep";
import TargetDateStep from "../../../components/goal/TargetDateStep";
import GoalTypeStep from "../../../components/goal/GoalTypeStep";
import GoalDetailsStep from "../../../components/goal/GoalDetailsStep";
import GoalScheduleStep from "../../../components/goal/GoalScheduleStep";
import LockTypeStep from "../../../components/goal/LockTypeStep";
import { useMutation } from "@tanstack/react-query";
import { createSavingsGoal } from "../../api/savingsGoal";

const CreateGoalScreen = () => {
  const navigation = useNavigation();
  const [step, setStep] = useState(1);
  const [goalData, setGoalData] = useState({
    lockType: "",
    targetDate: null,
    goalType: "",
    amount: null,
    description: "",
    frequency: null,
    contribution: null,
    initialManualPayment: false,
    initialAutomaticPayment: false,
    initialManualPaymentAmount: null,
    customIntervalDays: null,
  });

  // Adjust total steps based on lockType
  const totalSteps = goalData.lockType === "TimeBased" ? 6 : 5;

  const createMutation = useMutation({
    mutationKey: ["createSavingsGoal"],
    mutationFn: (data) => createSavingsGoal(data),
    onSuccess: () => {
      alert("Savings goal created successfully!");
      navigation.navigate("HomeNav", { screen: "HomeScreen" });
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message ||
        "Error creating savings goal. Please try again.";
      if (errorMessage.includes("Bank account not found")) {
        alert(
          "No bank account linked. Please link a bank account to create a savings goal.",
        );
      } else {
        alert(errorMessage);
      }
    },
  });

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const setLockType = (lockType) => {
    setGoalData({ ...goalData, lockType });
  };

  const setTargetDate = (date) => {
    setGoalData({ ...goalData, targetDate: date });
  };

  const setGoalType = (type) => {
    setGoalData({ ...goalData, goalType: type });
  };

  const setGoalDetails = ({ amount, description }) => {
    setGoalData({ ...goalData, amount, description });
  };

  const handleSubmit = (scheduleData) => {
    const finalData = { ...goalData, ...scheduleData };

    const apiData = {
      savingsGoalName: finalData.goalType,
      targetAmount: finalData.amount ? parseFloat(finalData.amount) : null,
      targetDate: finalData.targetDate || null,
      description: finalData.description || null,
      lockType: finalData.lockType,
      depositAmount: finalData.contribution ? parseFloat(finalData.contribution) : null,
      depositFrequency: finalData.frequency || null,
      customDepositIntervalDays: finalData.customIntervalDays
        ? parseInt(finalData.customIntervalDays)
        : null,
      emoji: "🎯", // Example emoji, adjust as needed
      initialManualPayment: finalData.initialManualPayment || false,
      initialAutomaticPayment: finalData.initialAutomaticPayment || false,
      initialManualPaymentAmount: finalData.initialManualPaymentAmount
        ? parseFloat(finalData.initialManualPaymentAmount)
        : null,
    };

    createMutation.mutate(apiData);
  };

  // Determine the current step's component
  const getCurrentStep = () => {
    if (step === 1) {
      return <IntroStep onNext={handleNext} />;
    }
    if (step === 2) {
      return (
        <LockTypeStep
          onNext={handleNext}
          onBack={handleBack}
          setLockType={setLockType}
        />
      );
    }
    if (step === 3 && goalData.lockType === "TimeBased") {
      return (
        <TargetDateStep
          onNext={handleNext}
          onBack={handleBack}
          setTargetDate={setTargetDate}
        />
      );
    }
    const adjustedStep = goalData.lockType === "TimeBased" ? step : step + 1;
    if (adjustedStep === 4) {
      return (
        <GoalTypeStep
          onNext={handleNext}
          onBack={handleBack}
          setGoalType={setGoalType}
        />
      );
    }
    if (adjustedStep === 5) {
      return (
        <GoalDetailsStep
          onNext={handleNext}
          onBack={handleBack}
          goalType={goalData.goalType}
          lockType={goalData.lockType}
          setGoalDetails={setGoalDetails}
        />
      );
    }
    if (adjustedStep === 6) {
      return (
        <GoalScheduleStep
          onBack={handleBack}
          goalType={goalData.goalType}
          amount={goalData.amount}
          description={goalData.description}
          lockType={goalData.lockType}
          onSubmit={handleSubmit}
        />
      );
    }
    return null;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <View style={styles.content}>
        <Text style={styles.title}>LET'S CREATE A SAVINGS GOALS !</Text>
        <Text style={styles.subtitle}>
          Step {step} of {totalSteps}
        </Text>

        {getCurrentStep()}

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${(step / totalSteps) * 100}%` },
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            Step {step} of {totalSteps}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#FEF7FF",
     maxWidth: Dimensions.get("window").width,
    marginTop : -20,
  },
  backButton: {
    position: "absolute",
    left: 16,
    top: 53,
    width: 24,
    height: 24,
    zIndex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 85,
    paddingBottom: 20,
  },
  title: {
    fontSize: 23,
    fontWeight: "900",
    color: "#000",
    marginBottom: 21,
    fontFamily: "Roboto",
  },
  subtitle: {
    fontSize: 16,
    color: "#000",
    marginBottom: 33,
    fontWeight: "400",
    fontFamily: "Roboto",
  },
  progressContainer: {
    marginTop: 40,
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
    color: "#1e1e1e80",
    textAlign: "center",
    fontFamily: "Roboto",
  },
});

export default CreateGoalScreen;