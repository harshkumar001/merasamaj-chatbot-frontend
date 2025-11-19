import { useAuth } from "@/src/hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

/* ---------------------------------------------------
   Types
--------------------------------------------------- */
type ChatItem =
  | {
      id: string;
      type: "message";
      text: string;
      user: "me" | "ai";
      createdAt: number;
    }
  | {
      id: string;
      type: "date";
      label: string;
    };

/* ---------------------------------------------------
  Date Helpers (WhatsApp-style)
--------------------------------------------------- */
function formatDate(ts: number) {
  const today = new Date();
  const date = new Date(ts);

  const isToday = today.toDateString() === date.toDateString();

  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const isYesterday = yesterday.toDateString() === date.toDateString();

  if (isToday) return "Today";
  if (isYesterday) return "Yesterday";

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/* ---------------------------------------------------
  Main ChatScreen
--------------------------------------------------- */
export default function ChatScreen() {
  const { user } = useAuth();

  const userAvatar = user?.pic_url || "https://i.pravatar.cc/100?u=user";
  const aiAvatar = "https://i.pravatar.cc/100?u=assistant";

  const [items, setItems] = useState<ChatItem[]>([
    {
      id: "welcome-date",
      type: "date",
      label: "Today",
    },
    {
      id: "1",
      type: "message",
      text: "Hello! I am your assistant. Ask me anything.",
      user: "ai",
      createdAt: Date.now(),
    },
  ]);

  const [text, setText] = useState("");
  const flatRef = useRef<FlatList>(null);

  /* ---------------------------------------------------
    Insert message WITH date separator logic
  --------------------------------------------------- */
  const addMessage = (msg: ChatItem) => {
    setItems((prev) => {
      const last = prev[prev.length - 1];

      // Only compare with previous message
      const lastDate =
        last?.type === "message" ? formatDate(last.createdAt) : last?.label;

      const newDate = msg.type === "message" ? formatDate(msg.createdAt) : null;

      const needsSeparator = msg.type === "message" && lastDate !== newDate;

      return [
        ...prev,
        ...(needsSeparator
          ? [
              {
                id: "d-" + msg.id,
                type: "date",
                label: newDate!,
              },
            ]
          : []),
        msg,
      ];
    });
  };

  /* ---------------------------------------------------
    Send Message
  --------------------------------------------------- */
  const sendMessage = () => {
    if (!text.trim()) return;

    const myMsg: ChatItem = {
      id: Date.now().toString(),
      type: "message",
      text,
      user: "me",
      createdAt: Date.now(),
    };

    addMessage(myMsg);
    setText("");

    // Mock AI reply
    setTimeout(() => {
      const aiReply: ChatItem = {
        id: Date.now().toString() + "-ai",
        type: "message",
        text, // echo
        user: "ai",
        createdAt: Date.now(),
      };
      addMessage(aiReply);
    }, 500);

    setTimeout(() => {
      flatRef.current?.scrollToEnd({ animated: true });
    }, 50);
  };

  /* ---------------------------------------------------
    Renderer for each item
  --------------------------------------------------- */
  const renderItem = ({ item }: { item: ChatItem }) => {
    if (item.type === "date") {
      return (
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{item.label}</Text>
        </View>
      );
    }

    const isMe = item.user === "me";
    const avatar = isMe ? userAvatar : aiAvatar;

    return (
      <View
        style={[
          styles.row,
          { justifyContent: isMe ? "flex-end" : "flex-start" },
        ]}
      >
        {!isMe && <Image source={{ uri: avatar }} style={styles.avatar} />}

        <View style={[styles.bubble, isMe ? styles.myBubble : styles.aiBubble]}>
          <Text style={{ color: isMe ? "#fff" : "#000" }}>{item.text}</Text>
        </View>

        {isMe && <Image source={{ uri: avatar }} style={styles.avatar} />}
      </View>
    );
  };

  /* ---------------------------------------------------
    UI
  --------------------------------------------------- */
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#fff" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "android" ? 30 : 0}
    >
      {/* Header */}
      <View style={styles.header}>
        <Image source={{ uri: aiAvatar }} style={styles.headerAvatar} />

        <View style={{ marginLeft: 10 }}>
          <Text style={styles.headerTitle}>AI Assistant</Text>
          <Text style={styles.headerSubtitle}>Online</Text>
        </View>
      </View>

      {/* Messages */}
      <FlatList
        ref={flatRef}
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 12, paddingBottom: 80 }}
        onContentSizeChange={() =>
          flatRef.current?.scrollToEnd({ animated: true })
        }
      />

      {/* Input */}
      <View style={styles.inputBar}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Message..."
          style={styles.input}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendBtn}>
          <Ionicons name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

/* ---------------------------------------------------
  Styles
--------------------------------------------------- */
const styles = StyleSheet.create({
  /* Header */
  header: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#000",
  },
  headerSubtitle: {
    fontSize: 12,
    color: "#777",
    marginTop: 2,
  },

  /* Date separator */
  dateContainer: {
    alignSelf: "center",
    backgroundColor: "#e6e6e6",
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 12,
    marginVertical: 6,
  },
  dateText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#555",
  },

  /* Message Row */
  row: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginVertical: 5,
  },

  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginHorizontal: 6,
  },

  bubble: {
    padding: 10,
    borderRadius: 14,
    maxWidth: "70%",
  },
  myBubble: {
    backgroundColor: "#4b7bec",
  },
  aiBubble: {
    backgroundColor: "#f1f1f1",
  },

  /* Input Bar */
  inputBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  sendBtn: {
    marginLeft: 8,
    backgroundColor: "#4b7bec",
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
  },
});
