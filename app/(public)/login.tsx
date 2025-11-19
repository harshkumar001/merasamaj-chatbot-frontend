import { sendOtpCall } from "@/src/api/auth";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const sendOtp = async () => {
    if (!phone.trim()) {
      Alert.alert("Error", "Please enter a valid phone number");
      return;
    }

    setLoading(true);

    try {
      const res = await sendOtpCall(phone);
      if (!res.status) {
        Alert.alert("Error", "Failed to send OTP");
        return;
      }

      // PASS BOTH phone + session_id
      router.push(
        `/otp?phone=${encodeURIComponent(
          phone
        )}&session_id=${encodeURIComponent(res.session_id)}`
      );
    } catch (e) {
      console.error(e);
      Alert.alert("Error", "Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 16 }}>
      <Text style={{ marginBottom: 10 }}>Enter Phone Number</Text>

      <TextInput
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          marginVertical: 12,
          padding: 10,
        }}
      />

      <Button
        title={loading ? "Sending..." : "Send OTP"}
        onPress={sendOtp}
        disabled={!phone || loading}
      />
    </View>
  );
}
