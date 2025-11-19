import { useAuth } from "@/src/hooks/useAuth";
import { handleOtpVerification } from "@/src/services/authHandlers";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";

export default function OTP() {
  const router = useRouter();
  const { login } = useAuth();

  const params = useLocalSearchParams();
  const phone = typeof params.phone === "string" ? params.phone : "";
  const session_id =
    typeof params.session_id === "string" ? params.session_id : "";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const verify = async () => {
    if (!otp) {
      Alert.alert("Error", "Enter OTP");
      return;
    }

    setLoading(true);

    const result = await handleOtpVerification({
      otp,
      phone,
      session_id,
      login,
    });

    setLoading(false);

    // ❌ ERROR CASE
    if (result?.error) {
      Alert.alert("Error", result.error);
      return;
    }

    // 🔀 REDIRECT CASE
    if (result?.redirect) {
      router.replace({
        pathname: result.redirect,
        params: result.data,
      });
      return;
    }

    // ✅ SUCCESS CASE
    if (result?.success) {
      router.replace(result.redirect);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 16 }}>
      <Text style={{ fontSize: 16 }}>
        Enter OTP sent to <Text style={{ fontWeight: "bold" }}>{phone}</Text>
      </Text>

      <TextInput
        value={otp}
        onChangeText={setOtp}
        keyboardType="number-pad"
        maxLength={6}
        placeholder="Enter OTP"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          marginVertical: 16,
          padding: 10,
          fontSize: 20,
          textAlign: "center",
        }}
      />

      <Button
        title={loading ? "Verifying..." : "Verify OTP"}
        onPress={verify}
        disabled={!otp || loading}
      />
    </View>
  );
}
