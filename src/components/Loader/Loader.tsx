import React from "react";
import { ActivityIndicator, Modal, View } from "react-native";

export type LoaderType = "fullscreen" | "inline" | "modal" | "top";

export default function Loader({
  visible,
  type = "fullscreen",
}: {
  visible: boolean;
  type?: LoaderType;
}) {
  if (!visible) return null;

  if (type === "inline") {
    return (
      <View className="flex-row justify-center items-center p-2">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (type === "top") {
    return (
      <View className="absolute top-10 w-full items-center z-50">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (type === "modal") {
    return (
      <Modal transparent visible>
        <View className="flex-1 bg-black/40 justify-center items-center">
          <ActivityIndicator size="large" />
        </View>
      </Modal>
    );
  }

  // fullscreen
  return (
    <View className="absolute inset-0 bg-black/30 justify-center items-center z-50">
      <ActivityIndicator size="large" />
    </View>
  );
}
