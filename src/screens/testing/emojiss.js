import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import emojiData from "../../data/emojis"; // Your emoji file

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

const EmojiPicker = ({ onSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState("Smileys & Emotion");
  const [searchTerm, setSearchTerm] = useState("");

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

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search emoji..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      {/* Category Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categories}
      >
        {categories.map((cat) => (
          <TouchableOpacity key={cat} onPress={() => setSelectedCategory(cat)}>
            <Text
              style={[
                styles.categoryTab,
                selectedCategory === cat && styles.activeTab,
              ]}
            >
              {cat.split(" ")[0]} {/* Display first word of category */}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Emoji Grid */}
      <FlatList
        data={filteredEmojis}
        numColumns={6}
        keyExtractor={(item, index) => `${item.emoji}-${index}`}
        contentContainerStyle={styles.emojiList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.emojiButton}
            onPress={() => onSelect(item.emoji)}
          >
            <Text style={styles.emoji}>{item.emoji}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default EmojiPicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchInput: {
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  categories: {
    flexDirection: "row",
    marginBottom: 10,
  },
  categoryTab: {
    marginRight: 12,
    fontSize: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#ddd",
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: "#aaa",
  },
  emojiList: {
    alignItems: "center",
  },
  emojiButton: {
    padding: 8,
    margin: 4,
  },
  emoji: {
    fontSize: 28,
  },
});
