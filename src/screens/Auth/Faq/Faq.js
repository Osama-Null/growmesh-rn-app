import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Svg, Path } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import faqs from "../../../data/questions";

const Faq = () => {
  const navigation = useNavigation();
  const [expanded, setExpanded] = useState(null);

  const toggleExpand = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <Path
            d="M7.825 13L13.425 18.6L12 20L4 12L12 4L13.425 5.4L7.825 11H20V13H7.825Z"
            fill="#1D1B20"
          />
        </Svg>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>Frequently Asked Questions</Text>
        <Text style={styles.subtitle}>Find answers to common questions below.</Text>

        {faqs.map((faq, index) => (
          <View key={index} style={styles.faqItem}>
            <TouchableOpacity
              style={styles.questionContainer}
              onPress={() => toggleExpand(index)}
            >
              <Text style={styles.question}>{faq.question}</Text>
              <Text style={styles.arrow}>{expanded === index ? "−" : "+"}</Text>
            </TouchableOpacity>
            {expanded === index && (
              <Text style={styles.answer}>{faq.answer}</Text>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#white",
    maxWidth: Dimensions.get("window").width,
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
    marginTop : 20,
    paddingHorizontal: 16,
    paddingTop: 85,
    paddingBottom: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: "900",
    color: "#000",
    marginBottom: 21,
  },
  subtitle: {
    fontSize: 16,
    color: "#000",
    marginBottom: 33,
    fontWeight: "400",
  },
  faqItem: {
    marginBottom: 16,
    backgroundColor: "white",
    borderRadius: 14,
    padding: 14,
  },
  questionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  question: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1E1E1E",
    flex: 1,
  },
  arrow: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2F3039",
  },
  answer: {
    fontSize: 14,
    color: "#1E1E1E",
    marginTop: 10,
    lineHeight: 20,
  },
});

export default Faq;