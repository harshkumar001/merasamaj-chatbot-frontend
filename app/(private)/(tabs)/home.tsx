import { useAuth } from "@/src/hooks/useAuth";
import useTheme from "@/src/hooks/useTheme";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

export default function Home() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { user } = useAuth();
  console.log("User in Home:", user);

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: colors.background }}>
      <Text style={{ color: colors.text, fontSize: 22 }}>{t("hello")}</Text>

      <Text style={{ color: colors.text, marginTop: 10, fontSize: 18 }}>
        {t("welcome")}, {user?.name ?? t("user")}
      </Text>
    </View>
  );
}
