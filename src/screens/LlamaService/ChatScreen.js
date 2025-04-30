// import React, { useState, useCallback, useEffect } from "react";
// import { GiftedChat } from "react-native-gifted-chat";
// import axios from "axios";

// const ChatScreen = () => {
//     const [messages, setMessages] = useState([]);
//     useEffect(() => {
//       // Initial message from the bot
//       setMessages([
//         {
//           _id: 1,
//           text: "Hello! I’m your financial assistant. How can I help with your savings goals today?",
//           createdAt: new Date(),
//           user: {
//             _id: 2,
//             name: "Financial Assistant",
//           },
//         },
//       ]);
//     }, []);

//     const onSend = useCallback(async (newMessages = []) => {
//       setMessages((previousMessages) =>
//         GiftedChat.append(previousMessages, newMessages)
//       );

//       const userMessage = newMessages[0].text;

//       try {
//         const response = await axios.post(
//           "https://192.168.1.100:5001/api/llama/send-message",
//           {
//             message: userMessage,
//           },
//           {
//             timeout: 30000, // 30 seconds timeout
//           }
//         );

//         const botMessage = {
//           _id: Math.random().toString(36).substring(7),
//           text: response.data.Response,
//           createdAt: new Date(),
//           user: {
//             _id: 2,
//             name: "Financial Assistant",
//           },
//         };

//         setMessages((previousMessages) =>
//           GiftedChat.append(previousMessages, [botMessage])
//         );
//       } catch (error) {
//         const errorMessage = {
//           _id: Math.random().toString(36).substring(7),
//           text: "Sorry, I encountered an error. Please try again.",
//           createdAt: new Date(),
//           user: {
//             _id: 2,
//             name: "Financial Assistant",
//           },
//         };
//         setMessages((previousMessages) =>
//           GiftedChat.append(previousMessages, [errorMessage])
//         );
//       }
//     }, []);
//   return (
//     <GiftedChat
//       messages={messages}
//       onSend={(messages) => onSend(messages)}
//       user={{
//         _id: 1,
//       }}
//     />
//   );
// };

// export default ChatScreen;

// const styles = StyleSheet.create({});
