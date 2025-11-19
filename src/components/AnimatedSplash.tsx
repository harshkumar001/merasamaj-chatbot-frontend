import React, { useEffect } from "react";
import { Image, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export default function AnimatedSplash() {
  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withTiming(1, {
      duration: 700,
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(scale.value, [0, 1], [0.5, 1]),
        },
      ],
      opacity: scale.value,
    };
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Animated.View style={animatedStyle}>
        <Image
          source={require("../../assets/images/splash1.webp")}
          style={{ width: 180, height: 180, resizeMode: "contain" }}
        />
      </Animated.View>
    </View>
  );
}
