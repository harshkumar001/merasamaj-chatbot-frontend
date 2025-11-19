import { LoginResponse } from "../types";
import api from "./api";

// Send OTP
export const sendOtpCall = async (mobile: string) => {
  return await api.post("/mobile/login", { mobile });
};

// Verify OTP
export const verifyOtpCall = async (req_body) => {
  const res = await api.post<LoginResponse>("/mobile/verify", req_body);
  return res.data; // { token, user }
};
