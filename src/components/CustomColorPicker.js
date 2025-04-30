import React, { useState, useRef } from "react";
import {
  Modal,
  View,
  PanResponder,
  StyleSheet,
  Dimensions,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Svg, { Circle, Path } from "react-native-svg";

const { width } = Dimensions.get("window");
const WHEEL_SIZE = width * 0.8;
const CENTER = WHEEL_SIZE / 2;
const RADIUS = CENTER * 0.9;

const CustomColorPicker = ({
  visible,
  onClose,
  onColorSelected,
  initialColor = "#2596be",
}) => {
  const [selectedColor, setSelectedColor] = useState(initialColor);
  const [hexInput, setHexInput] = useState(initialColor);
  const wheelRef = useRef(null);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        const { pageX, pageY } = evt.nativeEvent;
        wheelRef.current.measure((x, y, w, h, px, py) => {
          const touchX = pageX - px - CENTER;
          const touchY = pageY - py - CENTER;
          const distance = Math.sqrt(touchX * touchX + touchY * touchY);
          if (distance > RADIUS) return;

          const angle = Math.atan2(touchY, touchX) * (180 / Math.PI);
          const hue = (angle + 360) % 360; // Ensure positive hue
          const saturation = Math.min(distance / RADIUS, 1) * 100;
          const color = hslToHex(hue, saturation, 50);
          setSelectedColor(color);
          setHexInput(color);
          onColorSelected(color);
        });
      },
    })
  ).current;

  const handleHexInput = (text) => {
    const cleanedText = text.startsWith("#") ? text : `#${text}`;
    setHexInput(cleanedText);
    if (/^#[0-9A-F]{6}$/i.test(cleanedText)) {
      setSelectedColor(cleanedText);
      onColorSelected(cleanedText);
    }
  };

  const hslToHex = (h, s, l) => {
    s /= 100;
    l /= 100;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;
    let r, g, b;
    if (h >= 0 && h < 60) [r, g, b] = [c, x, 0];
    else if (h < 120) [r, g, b] = [x, c, 0];
    else if (h < 180) [r, g, b] = [0, c, x];
    else if (h < 240) [r, g, b] = [0, x, c];
    else if (h < 300) [r, g, b] = [x, 0, c];
    else [r, g, b] = [c, 0, x];
    r = Math.round((r + m) * 255)
      .toString(16)
      .padStart(2, "0");
    g = Math.round((g + m) * 255)
      .toString(16)
      .padStart(2, "0");
    b = Math.round((b + m) * 255)
      .toString(16)
      .padStart(2, "0");
    return `#${r}${g}${b}`;
  };

  const renderColorWheel = () => {
    const segments = 60;
    const angleStep = 360 / segments;
    const paths = [];
    for (let i = 0; i < segments; i++) {
      const startAngle = i * angleStep;
      const endAngle = (i + 1) * angleStep;
      const startRad = (startAngle * Math.PI) / 180;
      const endRad = (endAngle * Math.PI) / 180;
      const x1 = CENTER + RADIUS * Math.cos(startRad);
      const y1 = CENTER + RADIUS * Math.sin(startRad);
      const x2 = CENTER + RADIUS * Math.cos(endRad);
      const y2 = CENTER + RADIUS * Math.sin(endRad);
      const d = [
        `M ${CENTER},${CENTER}`,
        `L ${x1},${y1}`,
        `A ${RADIUS},${RADIUS} 0 0 1 ${x2},${y2}`,
        "Z",
      ].join(" ");
      const color = hslToHex(startAngle, 100, 50);
      paths.push(<Path key={i} d={d} fill={color} />);
    }
    return paths;
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

          <Text style={styles.modalTitle}>Select Color</Text>
          <View ref={wheelRef} {...panResponder.panHandlers}>
            <Svg height={WHEEL_SIZE} width={WHEEL_SIZE}>
              {renderColorWheel()}
              <Circle cx={CENTER} cy={CENTER} r={RADIUS * 0.2} fill="white" />
            </Svg>
          </View>
          <View style={styles.previewContainer}>
            <View
              style={[styles.preview, { backgroundColor: selectedColor }]}
            />
            <View style={{
              justifyContent:"center",
              alignItems:"center",
              marginBottom: 20,
            }}>
              <Text>Hex</Text>
              <TextInput
                style={[styles.hexInput, { borderBottomColor: selectedColor }]}
                value={hexInput}
                onChangeText={handleHexInput}
                placeholder="#RRGGBB"
                maxLength={7}
                autoCapitalize="characters"
              ></TextInput>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomColorPicker;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Overlay for modal
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalContent: {
    backgroundColor: "#FEF7FF",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 550,
    alignItems: "center",
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
  previewContainer: {
    alignItems: "center",
    marginTop: 20,
    flexDirection: "row",
    gap: 20,
  },
  preview: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  label: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  hexInput: {
    fontSize: 23,
    borderBottomWidth: 1,
  },
});
