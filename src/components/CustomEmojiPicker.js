import React, { useState, useEffect, useMemo } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import emojiData from "../data/emojis"; // Your emoji file

const { width } = Dimensions.get("window");
const EMOJI_BUTTON_SIZE = width / 7; // Adjust based on 6 columns

// Define categories based on emojis.js
const categories = [
  "Smileys & Emotion",
  "Animals & Nature",
  "Food & Drink",
  "Travel & Places",
  "Activities",
  "Objects",
  "Symbols",
  "Flags",
];

// EmojiPicker Component
const EmojiPicker = ({ onSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState("Smileys & Emotion");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState(null); // New state for selected emoji

  // Memoized filtering for performance
  const filteredEmojis = useMemo(() => {
    return emojiData.filter((item) => {
      if (!item || !item.category || !item.emoji) return false;

      // Match category
      const matchCategory = item.category === selectedCategory;

      // Match search term across description, aliases, and tags
      const description =
        item.description && typeof item.description === "string"
          ? item.description
          : "";
      const aliases = Array.isArray(item.aliases) ? item.aliases.join(" ") : "";
      const tags = Array.isArray(item.tags) ? item.tags.join(" ") : "";
      const searchableText = `${description} ${aliases} ${tags}`.toLowerCase();
      const matchSearch = searchableText.includes(searchTerm.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchTerm]);

  // Handle emoji selection
  const handleEmojiPress = (emoji) => {
    setSelectedEmoji(emoji); // Set the selected emoji
    onSelect(emoji); // Pass to parent
  };

  // Render each emoji in the grid
  const renderEmojiItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.emojiButton,
        selectedEmoji === item.emoji && styles.emojiButtonSelected, // Apply highlight if selected
      ]}
      onPress={() => handleEmojiPress(item.emoji)}
    >
      <Text style={styles.emoji}>{item.emoji}</Text>
    </TouchableOpacity>
  );

  // Render category tabs
  const renderCategoryTab = (category) => (
    <TouchableOpacity
      key={category}
      onPress={() => setSelectedCategory(category)}
    >
      <Text
        style={[
          styles.categoryTab,
          selectedCategory === category && styles.activeTab,
        ]}
      >
        {category.split(" ")[0]} {/* Display first word of category */}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.pickerContent}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search emoji..."
        placeholderTextColor="#7E8D85"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      {/* Category Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categories}
        contentContainerStyle={styles.categoriesContent}
      >
        {categories.map((category) => renderCategoryTab(category))}
      </ScrollView>

      {/* Emoji Grid */}
      <FlatList
        data={filteredEmojis}
        numColumns={6}
        keyExtractor={(item, index) => `${item.emoji}-${index}`}
        contentContainerStyle={styles.emojiList}
        renderItem={renderEmojiItem}
        style={styles.emojiGrid}
      />
    </View>
  );
};

// CustomEmojiPicker Component
const CustomEmojiPicker = ({ visible, onClose, onSelectEmoji }) => {
  const handleSubmit = () => {
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
          <Text style={styles.modalTitle}>Select Emoji</Text>
          <EmojiPicker onSelect={onSelectEmoji} />
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
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Overlay for modal
    borderRadius: 20,
  },
  modalContent: {
    backgroundColor: "#FEF7FF",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 500,
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
  pickerContent: {
    flex: 1,
    marginVertical: 10,
    height: 60,
  },
  searchInput: {
    backgroundColor: "#1E1E1E1A",
    color: "#000",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  categories: {
    flexGrow: 0,
    marginBottom: 10,
  },
  categoriesContent: {
    paddingHorizontal: 5,
  },
  categoryTab: {
    marginRight: 12,
    fontSize: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#1E1E1E1A",
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: "rgba(9, 53, 101, 0.24)",
  },
  emojiGrid: {
    flex: 1,
  },
  emojiList: {
    paddingBottom: 20,
  },
  emojiButton: {
    width: EMOJI_BUTTON_SIZE,
    height: EMOJI_BUTTON_SIZE,
    alignItems: "center",
    justifyContent: "center",
    margin: 2,
  },
  emojiButtonSelected: {
    backgroundColor: "rgba(9, 53, 101, 1)",
    borderRadius: 8,
  },
  emoji: {
    fontSize: 28,
  },
  submitButton: {
    backgroundColor: "rgba(9, 53, 101, 1)",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CustomEmojiPicker;
