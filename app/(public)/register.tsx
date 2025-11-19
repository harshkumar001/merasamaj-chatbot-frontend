import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Complete your profile to continue</Text>

        <TextInput
          placeholder="Full Name"
          placeholderTextColor="#999"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

        <TextInput
          placeholder="Email Address"
          placeholderTextColor="#999"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  card: {
    backgroundColor: "white",
    padding: 25,
    borderRadius: 16,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 6,
    color: "#222",
  },
  subtitle: {
    fontSize: 15,
    marginBottom: 25,
    color: "#666",
  },
  input: {
    backgroundColor: "#f2f2f2",
    padding: 14,
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 15,
    color: "#222",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "600",
  },
});
