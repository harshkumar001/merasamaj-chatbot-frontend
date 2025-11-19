import { device_info, KUTUMB_SERVER_DETAILS } from "@/src/config/constants";
import api from "./api";

export const getNodeDetailsFromEmailOrMobile = async (
  email?: string,
  mobile?: string,
  token?: string | null
) => {
  const payload: any = {
    action: "get_node_with_email",
    device_info,
  };

  if (email) payload.email = email;
  if (mobile) payload.mobile = mobile;

  try {
    const url = `${KUTUMB_SERVER_DETAILS.NODE_URI}/tasks/run_actions.php`;

    // Using axios POST
    const { data } = await api.post(url, payload, {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    return data; // same behavior as old app
  } catch (error) {
    console.log("Error in getNodeDetailsFromEmailOrMobile:", error);
    throw error;
  }
};
