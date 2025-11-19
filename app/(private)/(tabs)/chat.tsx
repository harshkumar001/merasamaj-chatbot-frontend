import { useAuth } from "@/src/hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useKeyboardController } from "react-native-keyboard-controller";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const colors = {
  primary: "#4b7bec",
  teal: "#20bf6b",
  grey: "#d1d8e0",
  dark: "#1e272e",
};

// -------------------- HEADER --------------------
const Header = ({ title, onBack, avatar }) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={onBack} style={styles.headerBack}>
      <Ionicons name="chevron-back" size={28} color={colors.dark} />
    </TouchableOpacity>

    <View style={styles.headerTitleContainer}>
      <Image source={{ uri: avatar }} style={styles.headerAvatar} />
      <Text numberOfLines={1} style={styles.headerTitle}>
        {title}
      </Text>
    </View>

    <View style={{ width: 44 }} />
  </View>
);

// -------------------- MESSAGE BUBBLE --------------------
const MessageBubble = ({ item, currentUserId }) => {
  const isMine = item.userId === currentUserId;

  return (
    <View
      style={[
        styles.bubbleContainer,
        isMine ? styles.bubbleRight : styles.bubbleLeft,
      ]}
    >
      <Text style={[styles.bubbleText, isMine && { color: "#fff" }]}>
        {item.text}
      </Text>
    </View>
  );
};

// -------------------- MAIN CHAT SCREEN --------------------
export default function ChatScreen({ navigation, route }) {
  const { user } = useAuth();

  const chatTitle = route?.params?.title ?? "Chat";
  const peerAvatar = route?.params?.avatar ?? "https://i.pravatar.cc/300";

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const flatListRef = useRef(null);

  // MOCK: initial assistant message
  useEffect(() => {
    setMessages([
      {
        id: "welcome-1",
        text: "This is your assistant. Ask me anything!",
        createdAt: Date.now(),
        userId: "assistant",
      },
    ]);
  }, []);

  // -------------------- Keyboard Animation --------------------
  const { height: keyboardHeight } = useKeyboardController();

  const animatedInput = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withTiming(-keyboardHeight, { duration: 180 }),
      },
    ],
  }));

  // -------------------- SEND MESSAGE --------------------
  const sendMessage = useCallback(() => {
    if (!text.trim()) return;

    const msg = {
      id: `local-${Date.now()}`,
      text,
      createdAt: Date.now(),
      userId: user?.email ?? "me",
    };

    setMessages((prev) => [msg, ...prev]);
    setText("");

    // Auto-scroll
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });

    // Mock: assistant reply
    setTimeout(() => {
      setMessages((prev) => [
        {
          id: `ai-${Date.now()}`,
          text: `You said: "${msg.text}"`,
          createdAt: Date.now(),
          userId: "assistant",
        },
        ...prev,
      ]);
    }, 700);
  }, [text, user]);

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <Header
        title={chatTitle}
        avatar={peerAvatar}
        onBack={() => navigation.goBack()}
      />

      {/* CHAT LIST */}
      <FlatList
        ref={flatListRef}
        data={messages}
        inverted
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MessageBubble item={item} currentUserId={user?.email} />
        )}
        contentContainerStyle={{ paddingVertical: 12 }}
      />

      {/* INPUT BAR */}
      <Animated.View style={[styles.inputBar, animatedInput]}>
        <TextInput
          placeholder="Message..."
          style={styles.input}
          value={text}
          onChangeText={setText}
          multiline
        />

        <TouchableOpacity onPress={sendMessage} style={styles.sendBtn}>
          <Ionicons name="send" size={20} color="white" />
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}

// -------------------- STYLES --------------------
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "white" },

  // Header
  header: {
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#eee",
    paddingHorizontal: 12,
    backgroundColor: "white",
  },
  headerBack: { width: 44, justifyContent: "center" },
  headerTitleContainer: { flex: 1, flexDirection: "row", alignItems: "center" },
  headerAvatar: { width: 36, height: 36, borderRadius: 18, marginRight: 12 },
  headerTitle: { fontSize: 16, fontWeight: "600", color: colors.dark },

  // Bubbles
  bubbleContainer: {
    maxWidth: "75%",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 18,
    marginVertical: 6,
    marginHorizontal: 12,
  },
  bubbleLeft: {
    backgroundColor: "#f1f1f1",
    alignSelf: "flex-start",
  },
  bubbleRight: {
    backgroundColor: colors.primary,
    alignSelf: "flex-end",
  },
  bubbleText: { fontSize: 15, color: colors.dark },

  // Input Bar
  inputBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#eee",
    padding: 10,
  },
  input: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 10,
    maxHeight: 120,
  },
  sendBtn: {
    marginLeft: 10,
    backgroundColor: colors.primary,
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
});
