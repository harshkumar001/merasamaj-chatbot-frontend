import { getNodeDetailsFromEmailOrMobile as apiCall } from "@/src/api/user";

export async function getNodeFromDB({
  email,
  mobile,
}: {
  email?: string;
  mobile?: string;
}) {
  try {
    const result = await apiCall(email, mobile);

    // CASE 1 → User found (id or _id)
    if (result?.id || result?._id) {
      return {
        status: true,
        user: result,
      };
    }

    // CASE 2 → User NOT found
    return {
      status: false,
      message: "User not registered",
    };
  } catch (e) {
    console.log("Error fetching node:", e);

    return {
      status: false,
      error: true,
      message: "Server error",
    };
  }
}
