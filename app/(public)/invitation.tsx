import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Invitation() {
  const params = useLocalSearchParams();
  const invitation = params?.invitation || null;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>You're Invited! 🎉</Text>
        <Text style={styles.subtitle}>
          You have been invited to join our platform.
        </Text>

        {invitation && (
          <View style={styles.inviteBox}>
            <Text style={styles.inviteLabel}>Invitation Details</Text>

            {Object.keys(invitation).map((key) => (
              <Text key={key} style={styles.inviteText}>
                • {key}: {invitation[key]}
              </Text>
            ))}
          </View>
        )}

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryBtn}>
          <Text style={styles.secondaryText}>Reject Invitation</Text>
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
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
    color: "#222",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    marginBottom: 25,
    color: "#666",
    textAlign: "center",
  },
  inviteBox: {
    backgroundColor: "#f2f2f2",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },
  inviteLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  inviteText: {
    fontSize: 14,
    color: "#444",
    marginVertical: 2,
  },
  button: {
    backgroundColor: "#28a745",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "600",
  },
  secondaryBtn: {
    marginTop: 14,
    paddingVertical: 12,
    alignItems: "center",
  },
  secondaryText: {
    color: "#888",
    fontSize: 15,
  },
});
