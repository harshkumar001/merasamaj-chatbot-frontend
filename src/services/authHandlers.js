import { verifyOtpCall } from "@/src/api/auth";
import { saveItem } from "../utils/storage";
import { getNodeFromDB } from "./userServices";

export async function handleOtpVerification({ otp, phone, session_id, login }) {
  try {
    // 1. Verify OTP
    const res = await verifyOtpCall({ otp, session_id, mobile: phone });

    if (!res.status) {
      return { error: res.message || "Invalid OTP" };
    }

    const token = res.Token;
    if (!token) return { error: "Token not received" };

    // 2. Parse token to check invitation or user details
    const parsed = parseJwt(token);
    console.log("user from parsed token ", parsed);
    const userFromToken = parsed?.user?.user;

    if (!userFromToken)
      return {
        // error: "User not found.",
        redirect: "(public)/register",
      };
    // 3. CASE: User invited but not registered
    if (userFromToken.invitation_data) {
      return {
        redirect: "(public)/invitation",
        data: {
          invitation: userFromToken.invitation_data,
          token,
        },
      };
    }

    // 4. CASE: Check if user exists
    const nodeResult = await getNodeFromDB({
      mobile:
        phone ||
        userFromToken?.mobile ||
        userFromToken?.registered_user?.registered_mobile,
    });

    if (!nodeResult.status) {
      // NOT REGISTERED
      return {
        redirect: "(public)/register.tsx",
        data: { mobile: phone },
      };
    }
    // 5. CASE: Registered user
    const userNode = nodeResult.user;
    userNode.token = token;

    // Save token & user via your SecureStore wrapper
    await saveItem("token", token);
    await saveItem("user", userNode);

    // Update auth state
    await login({ token, user: userNode });

    return {
      success: true,
      redirect: "/(private)/(tabs)/home",
    };
  } catch (err) {
    console.log("OTP Verify Error:", err);
    return { error: err.message || "Server Error" };
  }
}

// Token parser
export function parseJwt(token: string) {
  try {
    const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");

    const decoded = atob(base64);

    return JSON.parse(decoded);
  } catch (e) {
    console.error("JWT parse error:", e);
    return null;
  }
}
