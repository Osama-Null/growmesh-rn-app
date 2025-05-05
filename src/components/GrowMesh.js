import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Image,
} from "react-native";
import { sendGrokMessage } from "../api/grok";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import LottieView from "lottie-react-native";

const GrowMesh = ({
  messages,
  setMessages,
  onClose,
  systemPrompt,
  contextData,
}) => {
  const [inputText, setInputText] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const flatListRef = useRef(null);

  // Ensure messages is an array
  const safeMessages = Array.isArray(messages) ? messages : [];

  // Add welcome message when the chatbot opens
  useEffect(() => {
    if (safeMessages.length === 0) {
      const welcomeMessage = {
        id: Math.random().toString(36).substring(7),
        text: "Hi, I'm GrowMesh! How can I help you today?",
        createdAt: new Date(),
        user: { _id: 2, name: "GrowMesh" },
      };
      setMessages([welcomeMessage]);
    }
  }, [setMessages, safeMessages.length]);

  const handleSend = async () => {
    if (inputText.trim() === "") return;

    const newMessage = {
      id: Math.random().toString(36).substring(7),
      text: inputText,
      createdAt: new Date(),
      user: { _id: 1, name: "User" },
    };

    // Add user's message to the chat
    setMessages((prev) => {
      const safePrev = Array.isArray(prev) ? prev : [];
      console.log("Adding user message:", newMessage);
      console.log("Previous messages:", safePrev);
      const updatedMessages = [newMessage, ...safePrev];
      console.log("Updated messages:", updatedMessages);
      return updatedMessages;
    });

    // Clear the input text immediately after sending
    setInputText("");
    Keyboard.dismiss();

    // Show the "thinking" animation
    setIsThinking(true);

    try {
      // Construct the messages array with the full chat history
      const chatHistory = safeMessages.map((msg) => ({
        role: msg.user._id === 1 ? "user" : "assistant",
        content: msg.text,
      }));

      // Add the current user message to the history
      const messagesForApi = [
        ...chatHistory,
        { role: "user", content: inputText },
      ];

      const botResponse = await sendGrokMessage(
        systemPrompt,
        contextData,
        messagesForApi // Pass the full chat history
      );
      console.log("Grok API response:", botResponse);

      const botMessage = {
        id: Math.random().toString(36).substring(7),
        text: botResponse,
        createdAt: new Date(),
        user: { _id: 2, name: "GrowMesh" },
      };
      setMessages((prev) => {
        const safePrev = Array.isArray(prev) ? prev : [];
        console.log("Adding bot message:", botMessage);
        console.log("Previous messages:", safePrev);
        const updatedMessages = [botMessage, ...safePrev];
        console.log("Updated messages:", updatedMessages);
        return updatedMessages;
      });
    } catch (error) {
      const errorMessage = {
        id: Math.random().toString(36).substring(7),
        text: "Sorry, I encountered an error. Please try again.",
        createdAt: new Date(),
        user: { _id: 2, name: "GrowMesh" },
      };
      setMessages((prev) => {
        const safePrev = Array.isArray(prev) ? prev : [];
        console.log("Adding error message:", errorMessage);
        console.log("Previous messages:", safePrev);
        const updatedMessages = [errorMessage, ...safePrev];
        console.log("Updated messages:", updatedMessages);
        return updatedMessages;
      });
    } finally {
      setIsThinking(false);
    }
  };

  const renderMessage = ({ item }) => {
    const isCurrentUser = item.user._id === 1;
    return (
      <View
        style={[
          styles.messageContainer,
          isCurrentUser ? styles.sentMessage : styles.receivedMessage,
        ]}
      >
        <Text style={styles.messageText}>{item.text}</Text>
        <Text style={styles.messageTime}>
          {new Date(item.createdAt).toLocaleTimeString()}
        </Text>
      </View>
    );
  };

  const renderThinkingAnimation = () => {
    if (!isThinking) return null;
    return (
      <View style={styles.thinkingContainer}>
        <LottieView
          source={require("../../assets/app/think.json")}
          autoPlay
          loop
          style={styles.thinkingAnimation}
        />
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.header}>
        <View
          style={{
            flexDirection: "row",
            gap: 5,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../assets/app/g.png")}
            resizeMode={"stretch"}
            style={{
              height: 40,
              width: 40,
            }}
          />
          <Text style={styles.headerText}>GrowMesh</Text>
        </View>

        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Entypo name="cross" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <FlatList
        ref={flatListRef}
        data={safeMessages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        inverted
        style={styles.messageList}
      />
      {renderThinkingAnimation()}
      <View style={styles.inputToolbar}>
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message..."
          placeholderTextColor={"white"}
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <AntDesign name="arrowup" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.83)",
    borderRadius: 15,
    padding: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderRadius: 15,
  },
  headerText: {
    fontSize: 23,
    fontWeight: "bold",
    color: "black",
  },
  closeButton: {
    padding: 5,
  },
  messageList: {
    flex: 1,
  },
  messageContainer: {
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    maxWidth: "80%",
  },
  sentMessage: {
    alignSelf: "flex-end",
    backgroundColor: "rgba(9, 53, 101, 0.54)",
  },
  receivedMessage: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(0, 0, 0, 0.54)",
  },
  messageText: {
    fontSize: 16,
    color: "white",
  },
  messageTime: {
    fontSize: 12,
    color: "white",
    alignSelf: "flex-end",
    marginTop: 5,
  },
  inputToolbar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "rgba(30, 30, 30, 0.67)",
    borderRadius: 15,
  },
  textInput: {
    flex: 1,
    color: "white",
  },
  sendButton: {
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.33)",
    borderRadius: 50,
  },
  thinkingContainer: {
    padding: 10,
  },
  thinkingAnimation: {
    width: 50,
    height: 50,
  },
});

export default GrowMesh;
