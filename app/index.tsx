import { useAuth } from "@/src/hooks/useAuth";
import { Redirect } from "expo-router";

export default function Index() {
  const { token, loading, user } = useAuth();
  console.log("User in Index:", user, "Token:", token);
  // Still loading token? -> do nothing (RootLayout splash will show)
  if (loading) return null;

  // If logged in -> private tabs home
  if (token) {
    return <Redirect href="/(private)/(tabs)/home" />;
  }

  // If not logged in
  return <Redirect href="/(public)/login" />;
}
