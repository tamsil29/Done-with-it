import React from "react";
import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Props {
  name: string;
  iconColor?: string;
  size?: number;
  backgroundColor?: string;
}

function Icon({
  name,
  iconColor = "#fff",
  size = 40,
  backgroundColor = "#000",
}: Props) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <MaterialCommunityIcons
        name={name as any}
        color={iconColor}
        size={size * 0.5}
      />
    </View>
  );
}

export default Icon;
